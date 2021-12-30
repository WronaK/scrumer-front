import {Component, Inject} from '@angular/core';
import {SuggestedUser} from "../../../user/model/user";
import {FormArray, FormControl, FormGroup} from "@angular/forms";
import {UsersService} from "../../../user/services/users.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SuggestedTeam} from "../../../team/model/team";
import {TeamsService} from "../../../team/services/teams.service";
import {WebSocketService} from "../../../services/web-socket.service";
import {ScrumPokerService} from "../../services/scrum-poker.service";

@Component({
  selector: 'app-create-scrum-poker',
  templateUrl: './create-scrum-poker.component.html',
  styleUrls: ['./create-scrum-poker.component.scss']
})
export class CreateScrumPokerComponent {

  formGroup!: FormGroup;

  members: SuggestedUser[] = [];
  teams: SuggestedTeam[] = [];

  filteredOptionUser: SuggestedUser[] = [];
  suggestedUser: SuggestedUser[] = [];

  filteredOptionTeam: SuggestedTeam[] = [];
  suggestedTeam: SuggestedTeam[] = [];

  idCreator!: number;
  membersFormControl = new FormArray([]);
  teamsFormControl = new FormArray([]);

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
    this.membersFormControl.push(new FormControl(''))
    this.teamsFormControl.push(new FormControl(''))


    this.formGroup = new FormGroup({
      member: this.membersFormControl,
      team: this.teamsFormControl
    });

    this.filterUser();
    this.filterTeam();
  }

  private filterUser(): void {
    this.membersFormControl.controls.forEach(control => {
      control.valueChanges
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
    this.teamsFormControl.controls.forEach(control => {
      control.valueChanges
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
    this.membersFormControl.push(new FormControl(''));
    this.filterUser();
  }

  addTeam() {
    this.teamsFormControl.push(new FormControl(''));
    this.filterTeam();
  }

  startScrumPoker() {

    let users: number[] = [];

    this.membersFormControl.controls.forEach(formControl => {
      if (formControl.value.id !=undefined) {
        users.push(formControl.value.id)
      }
    })

    let teams: number[] = [];

    this.membersFormControl.controls.forEach(formControl => {
      if (formControl.value.id !=undefined) {
        teams.push(formControl.value.id)
      }
    })
    this.scrumPokerService.startScrumPoker({
      idCreator: this.idCreator,
      invitedTeams: teams,
      invitedMembers: users
    }).subscribe(() => this.dialogRef.close());
  }

  removeMember(i: number) {
    this.membersFormControl.removeAt(i);
  }

  removeTeam(i: number) {
    this.teamsFormControl.removeAt(i);
  }
}
