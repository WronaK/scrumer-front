import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {TeamsService} from "../services/teams.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-join-team',
  templateUrl: './join-team.component.html',
  styleUrls: ['./join-team.component.scss']
})
export class JoinTeamComponent {

  teamForm: FormGroup;
  teamNameFC: FormControl;
  accessCodeFC: FormControl;

  constructor(
    private dialogRef: MatDialogRef<JoinTeamComponent>,
    private teamService: TeamsService
  ) {
    this.teamNameFC = new FormControl('', Validators.required);
    this.accessCodeFC = new FormControl('', Validators.required);

    this.teamForm = new FormGroup({
      teamNameFC: this.teamNameFC,
      accessCodeFC: this.accessCodeFC
    });
  }

  save() {
    this.teamService.joinTeam({
      name: this.teamNameFC.value,
      accessCode: this.accessCodeFC.value
    }).subscribe(() => this.dialogRef.close());
  }
}
