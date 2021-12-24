import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SuggestedTeam} from "../../../model/team";
import {MatDialogRef} from "@angular/material/dialog";
import {TeamsService} from "../../../services/teams.service";

@Component({
  selector: 'app-join-the-team',
  templateUrl: './join-the-team.component.html',
  styleUrls: ['./join-the-team.component.scss']
})
export class JoinTheTeamComponent {

  formGroup!: FormGroup;
  teamName!: FormControl;
  accessCode!: FormControl;

  filteredOption: SuggestedTeam[] = [];
  suggestedTeam: SuggestedTeam[] = [];

  constructor(
    private dialogRef: MatDialogRef<JoinTheTeamComponent>,
    private teamService: TeamsService
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.teamName = new FormControl('', Validators.required);
    this.accessCode = new FormControl('', Validators.required);

    this.formGroup = new FormGroup({
      teamName: this.teamName,
      accessCode: this.accessCode
    })

    this.filterTeam();
  }

  private filterTeam(): void {
    this.teamName.valueChanges
      .subscribe(response => {
        if (response.length >= 3) {
          this.teamService.getSuggestedTeam(response)
            .subscribe(list => {
              this.suggestedTeam = list;
              this.filteredOption = list;
            })
        }
        this.filterData(response);
      })
  }

  joinToTeam() {
    this.teamService.joinToTeam({idTeam: this.teamName.value.id, accessCode: this.accessCode.value})
      .subscribe(() => this.dialogRef.close());
  }

  private filterData(enteredData: String) {
    return this.filteredOption = this.suggestedTeam.filter(item => {
      item.name.toLowerCase().includes(enteredData.toString().toLowerCase());
    })
  }

  getName(option: SuggestedTeam) {
    return option.name;
  }
}
