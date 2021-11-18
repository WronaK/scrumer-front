import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SuggestedUser} from "../../model/user";
import {CreateProject} from "../../model/project";
import {MatDialogRef} from "@angular/material/dialog";
import {ProjectsService} from "../../services/projects.service";
import {UsersService} from "../../services/users.service";

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.scss']
})
export class CreateProjectComponent {

  projectFormGroup!: FormGroup;
  projectName!: FormControl;
  accessCode!: FormControl;
  description!: FormControl;
  productOwner!: FormControl;

  filteredOption: SuggestedUser[] = [];
  suggestedUser: SuggestedUser[] = [];

  constructor(
    private dialogRef: MatDialogRef<CreateProjectComponent>,
    private projectService: ProjectsService,
    private usersService: UsersService
  ) {

    this.initForm();
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

  public createProject(): void {
    this.projectService.createProject(this.getData())
      .subscribe(() => this.dialogRef.close());
  }

  private getData(): CreateProject {
    return  {
      projectName: this.projectName.value,
      accessCode: this.accessCode.value,
      description: this.description.value,
      productOwner: this.productOwner.value.id,
    }
  }

  private filterData(enteredData: SuggestedUser) {
    this.filteredOption = this.suggestedUser.filter(item => {
      return item.username.toLowerCase().indexOf(enteredData.username.toLowerCase()) > -1;
    })
  }

}
