import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SuggestedUser} from "../../../user/model/user";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UsersService} from "../../../user/services/users.service";
import {TeamsService} from "../../services/teams.service";

@Component({
  selector: 'app-add-team-member',
  templateUrl: './add-team-member.component.html',
  styleUrls: ['./add-team-member.component.scss']
})
export class AddTeamMemberComponent {
  formGroup!: FormGroup;
  member!: FormControl;

  filteredOption: SuggestedUser[] = [];
  suggestedUser: SuggestedUser[] = [];

  idTeam!: number;

  constructor(
    private dialogRef: MatDialogRef<AddTeamMemberComponent>,
    private teamsService: TeamsService,
    private usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.idTeam = data.id;
    this.initForm();
  }

  private initForm(): void {
    this.member = new FormControl('', Validators.required);

    this.formGroup = new FormGroup({
      member: this.member
    })

    this.filterTeamMember();
  }

  private filterTeamMember(): void {
    this.member.valueChanges
      .subscribe(response => {
        if (response.length >= 3) {
          this.usersService.getSuggestedUser(response)
            .subscribe(list => {
                this.suggestedUser = list;
                this.filteredOption = list;
              }
            )
        }
        this.filterData(response);
      })
  }

  private filterData(enteredData: String) {
    this.filteredOption = this.suggestedUser.filter(item => {
      return item.username.toLowerCase().indexOf(enteredData.toString().toLowerCase()) > -1;
    })
  }

  public addMember(): void {
    this.teamsService.addMember(this.idTeam, this.member.value.id)
      .subscribe(() => this.dialogRef.close())
  }

  getUsername(option: SuggestedUser): string {
    return option.username;
  }
}
