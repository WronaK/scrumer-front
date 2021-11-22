import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TeamsService} from "../../services/teams.service";
import {SuggestedTeam} from "../../model/team";
import {ProjectsService} from "../../services/projects.service";

@Component({
  selector: 'app-join-team-to-project',
  templateUrl: './join-team-to-project.component.html',
  styleUrls: ['./join-team-to-project.component.scss']
})
export class JoinTeamToProjectComponent {

  formGroup!: FormGroup;
  teamName!: FormControl;
  accessCode!: FormControl;

  filteredOption: SuggestedTeam[] = [];
  suggestedTeam: SuggestedTeam[] = [];

  idProject!: number;

  constructor(
    private dialogRef: MatDialogRef<JoinTeamToProjectComponent>,
    private teamService: TeamsService,
    private projectService: ProjectsService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.idProject = data.idProject;
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

  joinToProject() {
      this.projectService.joinTeamToProject(this.idProject, {idTeam: this.teamName.value.id, accessCode: this.accessCode.value})
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
