import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SuggestedUser} from "../../model/user";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TeamsService} from "../../services/teams.service";
import {UsersService} from "../../services/users.service";
import {TeamInformation, UpdateTeam} from "../../model/team";

@Component({
  selector: 'app-update-team',
  templateUrl: './update-team.component.html',
  styleUrls: ['./update-team.component.scss']
})
export class UpdateTeamComponent {

  teamFormGroup!: FormGroup;
  teamName!: FormControl;
  description!: FormControl;
  accessCode!: FormControl;
  scrumMaster!: FormControl;
  team!: TeamInformation;
  idTeam!: number;

  filteredOption: SuggestedUser[] = [];
  suggestedUser: SuggestedUser[] = [];

  constructor(
    private dialogRef: MatDialogRef<UpdateTeamComponent>,
    private teamsService: TeamsService,
    private usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.idTeam = data.id;

    this.initForm();
    this.getTeam();
  }

  private initForm(): void {
    this.accessCode = new FormControl('', Validators.required);
    this.teamName = new FormControl('', Validators.required);
    this.description = new FormControl('', Validators.required);
    this.scrumMaster = new FormControl('', Validators.required);

    this.teamFormGroup = new FormGroup({
      teamName: this.teamName,
      password: this.accessCode,
      description: this.description,
      scrumMaster: this.scrumMaster
    });

    this.filterScrumMaster();
  }

  private filterScrumMaster(): void {
    this.scrumMaster.valueChanges
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

  updateTeam(): void {
    this.teamsService.updateTeam(this.getData())
      .subscribe(() => this.dialogRef.close());
  }

  private setData(): void {
    this.teamName.setValue(this.team.name);
    this.accessCode.setValue(this.team.accessCode);
    this.description.setValue(this.team.description);
    this.scrumMaster.setValue({username: this.team.username} as SuggestedUser);
  }

  private getData(): UpdateTeam {
    return  {
      id: this.idTeam,
      teamName: this.teamName.value,
      accessCode: this.accessCode.value,
      description: this.description.value,
      scrumMaster: this.scrumMaster.value.id,
    }
  }

  private filterData(enteredData: String) {
    return this.filteredOption = this.suggestedUser.filter(item => {
      item.username.toLowerCase().includes(enteredData.toString().toLowerCase());
    });
  }

  private getTeam(): void {
    this.teamsService.getInformationAboutTeam(this.idTeam).subscribe(
      team => {
        this.team = team;
        this.setData();
      }
    )
  }

  getUsername(option: SuggestedUser) {
    return option.username;
  }
}
