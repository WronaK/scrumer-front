import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SuggestedUser} from "../../../user/model/user";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProjectsService} from "../../services/projects.service";
import {UsersService} from "../../../user/services/users.service";
import {ProjectInformation, UpdateProject} from "../../model/project";

@Component({
  selector: 'app-update-project',
  templateUrl: './update-project.component.html',
  styleUrls: ['./update-project.component.scss']
})
export class UpdateProjectComponent {

  projectFormGroup!: FormGroup;
  projectName!: FormControl;
  accessCode!: FormControl;
  description!: FormControl;
  productOwner!: FormControl;
  project!: ProjectInformation;
  idProject!: number;

  filteredOption: SuggestedUser[] = [];
  suggestedUser: SuggestedUser[] = [];

  constructor(
    private dialogRef: MatDialogRef<UpdateProjectComponent>,
    private projectService: ProjectsService,
    private usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.idProject = data.id;

    this.initForm();
    this.getProjects();
  }

  private initForm(): void {
    this.accessCode = new FormControl('', Validators.required);
    this.projectName = new FormControl('', Validators.required);
    this.description = new FormControl('', Validators.required);
    this.productOwner = new FormControl('', Validators.required);

    this.projectFormGroup = new FormGroup({
      projectName: this.projectName,
      password: this.accessCode,
      description: this.description,
      productOwner: this.productOwner
    });

    this.filterProductOwner();
  }

  private filterProductOwner(): void {
    this.productOwner.valueChanges
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

  private setData(): void {
      this.projectName.setValue(this.project.name);
      this.accessCode.setValue(this.project.accessCode);
      this.description.setValue(this.project.description);
      this.productOwner.setValue({username: this.project.username} as SuggestedUser);
  }

  public updateProject(): void {
      this.projectService.updateProject(this.getData())
        .subscribe(() => this.dialogRef.close());
  }

  private getData(): UpdateProject {
    return  {
      id: this.idProject,
      projectName: this.projectName.value,
      accessCode: this.accessCode.value,
      description: this.description.value,
      productOwner: this.productOwner.value.id,
    }
  }

  private filterData(enteredData: String) {
    return this.filteredOption = this.suggestedUser.filter(item => {
      item.username.toLowerCase().includes(enteredData.toString().toLowerCase());
    });
  }

  private getProjects(): void {
    this.projectService.getInformationAboutProject(this.idProject).subscribe(
      project => {
        this.project = project;
        this.setData();
      }
    )
  }

  getUsername(option: SuggestedUser): string {
    return option.username;
  }
}
