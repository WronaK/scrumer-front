import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TeamsService} from "../../services/teams.service";
import {ProjectsService} from "../../services/projects.service";
import {SuggestedProject} from "../../model/project";

@Component({
  selector: 'app-join-project-to-team',
  templateUrl: './join-project-to-team.component.html',
  styleUrls: ['./join-project-to-team.component.scss']
})
export class JoinProjectToTeamComponent {

  formGroup!: FormGroup;
  projectName!: FormControl;
  accessCode!: FormControl;

  filteredOption: SuggestedProject[] = [];
  suggestedProject: SuggestedProject[] = [];

  idTeam!: number;

  constructor(
    private dialogRef: MatDialogRef<JoinProjectToTeamComponent>,
    private teamService: TeamsService,
    private projectService: ProjectsService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.idTeam = data.idTeam;
    this.initForm();
  }

  private initForm(): void {
    this.projectName = new FormControl('', Validators.required);
    this.accessCode = new FormControl('', Validators.required);

    this.formGroup = new FormGroup({
      projectName: this.projectName,
      accessCode: this.accessCode
    })

    this.filterProject();
  }

  private filterProject(): void {
    this.projectName.valueChanges
      .subscribe(response => {
        if (response.length >= 3) {
          this.projectService.getSuggestedProject(response)
            .subscribe(list => {
              this.suggestedProject = list;
              this.filteredOption = list;
            })
        }
        this.filterData(response);
      })
  }

  joinToTeam() {
    const project = this.filteredOption.find(project => project.name == this.projectName.value);
    if (project != undefined)
      this.teamService.joinProjectToTeam(this.idTeam, {idProject: project.id, accessCode: this.accessCode.value})
        .subscribe(() => this.dialogRef.close());
  }

  private filterData(enteredData: String) {
    return this.filteredOption = this.suggestedProject.filter(item => {
      item.name.toLowerCase().includes(enteredData.toString().toLowerCase());
    })
  }

  getName(option: SuggestedProject) {
    return option.name;
  }
}
