import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TeamsService} from "../../services/teams.service";
import {MatDialogRef} from "@angular/material/dialog";
import {JoinTeam} from "../../model/team";

@Component({
  selector: 'app-join-team',
  templateUrl: './join-team.component.html',
  styleUrls: ['./join-team.component.scss']
})
export class JoinTeamComponent {

  joinTeamFormGroup!: FormGroup;
  teamName!: FormControl;
  accessCode!: FormControl;

  constructor(
    private dialogRef: MatDialogRef<JoinTeamComponent>,
    private teamService: TeamsService
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.teamName = new FormControl('', Validators.required);
    this.accessCode = new FormControl('', Validators.required);

    this.joinTeamFormGroup = new FormGroup({
      teamNameFC: this.teamName,
      accessCodeFC: this.accessCode
    });
  }


  join() {
    // this.teamService.joinTeam(this.getData())
    //   .subscribe(() => this.dialogRef.close());
  }

  private getData(): JoinTeam {
    return {
      teamName: this.teamName.value,
      accessCode: this.accessCode.value
    }
  }
}
