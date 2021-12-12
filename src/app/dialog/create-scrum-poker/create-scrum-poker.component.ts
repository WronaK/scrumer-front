import {Component, Inject} from '@angular/core';
import {SuggestedUser} from "../../model/user";
import {FormControl, FormGroup} from "@angular/forms";
import {UsersService} from "../../services/users.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SuggestedTeam} from "../../model/team";
import {TeamsService} from "../../services/teams.service";
import {WebSocketService} from "../../services/web-socket.service";
import {ScrumPokerService} from "../../services/scrum-poker.service";

@Component({
  selector: 'app-create-scrum-poker',
  templateUrl: './create-scrum-poker.component.html',
  styleUrls: ['./create-scrum-poker.component.scss']
})
export class CreateScrumPokerComponent {

  formGroup!: FormGroup;
  member!: FormControl;
  team!: FormControl;

  members: SuggestedUser[] = [];
  teams: SuggestedTeam[] = [];

  filteredOptionUser: SuggestedUser[] = [];
  suggestedUser: SuggestedUser[] = [];

  filteredOptionTeam: SuggestedTeam[] = [];
  suggestedTeam: SuggestedTeam[] = [];

  idCreator!: number;

  constructor(
    private dialogRef: MatDialogRef<CreateScrumPokerComponent>,
    private usersService: UsersService,
    private teamService: TeamsService,
    private webSocketService: WebSocketService,
    private scrumPokerService: ScrumPokerService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.initForm()
    this.idCreator = data.idUser;
  }

  private initForm(): void {
    this.member = new FormControl('');
    this.team = new FormControl('');

    this.formGroup = new FormGroup({
      member: this.member,
      team: this.team
    });

    this.filterUser();
    this.filterTeam();
  }

  private filterUser(): void {
    this.member.valueChanges
      .subscribe(response => {
        if (response.length >= 3) {
          this.usersService.getSuggestedUser(response)
            .subscribe(list => {
                this.suggestedUser = list;
                this.filteredOptionUser = list;
              }
            )
        }
        this.filterDataUser(response);
      })
  }

  private filterDataUser(enteredData: String) {
    return this.filteredOptionUser = this.suggestedUser.filter(item => {
      item.username.toLowerCase().includes(enteredData.toString().toLowerCase());
    });
  }

  getUsername(option: SuggestedUser) {
    if (option != null)
      return option.username;
    return ''
  }

  private filterTeam(): void {
    this.team.valueChanges
      .subscribe(response => {
        if (response.length >= 3) {
          this.teamService.getSuggestedTeam(response)
            .subscribe(list => {
              this.suggestedTeam = list;
              this.filteredOptionTeam = list;
            })
        }
        this.filterDataTeam(response);
      })
  }

  private filterDataTeam(enteredData: String) {
    return this.filteredOptionTeam = this.suggestedTeam.filter(item => {
      item.name.toLowerCase().includes(enteredData.toString().toLowerCase());
    })
  }

  getName(option: SuggestedTeam) {
    if (option != null)
      return option.name;
    return '';
  }

  addUser() {
    console.log(this.member.value)
    if (this.member.value != null) {
      this.members.push({id: this.member.value.id, username: this.member.value.username, email: this.member.value.email});
      this.member.reset()
    }
  }

  addTeam() {
    if (this.team.value != null) {
      this.teams.push({id: this.team.value.id, name: this.team.value.name});
      this.team.reset();
    }
  }

  startScrumPoker() {
    this.scrumPokerService.startScrumPoker({
      idCreator: this.idCreator,
      invitedTeams: this.teams.map(team => team.id),
      invitedMembers: this.members.map(member => member.id)
    }).subscribe(() => this.dialogRef.close());
  }
}
