import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SuggestedUser} from "../../model/user";
import {MatDialogRef} from "@angular/material/dialog";
import {UsersService} from "../../services/users.service";
import {CreateTeam} from "../../model/team";
import {TeamsService} from "../../services/teams.service";

@Component({
  selector: 'app-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent {
  teamFormGroup!: FormGroup;
  teamName!: FormControl;
  description!: FormControl;
  accessCode!: FormControl;
  scrumMaster!: FormControl;

  filteredOption: SuggestedUser[] = [];
  suggestedUser: SuggestedUser[] = [];

  constructor(
    private dialogRef: MatDialogRef<CreateTeamComponent>,
    private teamsService: TeamsService,
    private usersService: UsersService
  ) {
    this.initForm();
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

  public createTeam(): void {
    this.teamsService.createTeam(this.getData())
      .subscribe(() => this.dialogRef.close());
  }

  private getData(): CreateTeam {
    return  {
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

  getUsername(option: SuggestedUser) {
    return option.username;
  }

}
