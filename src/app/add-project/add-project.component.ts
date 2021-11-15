import {Component, Inject, OnInit} from '@angular/core';
import {tap} from "rxjs/operators";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {UpdateProject} from "../model/update.project";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProjectsService} from "../services/projects.service";
import {CreateProject} from "../model/create.project";
import {UserFind} from "../model/userFind";
import {UsersService} from "../services/users.service";

@Component({
  selector: 'app-add-project',
  templateUrl: './add-project.component.html',
  styleUrls: ['./add-project.component.scss']
})
export class AddProjectComponent implements OnInit {

  projectNameFC: FormControl;
  passwordFC: FormControl;
  projectForm: FormGroup;
  descriptionFC: FormControl;
  productOwnerFC: FormControl;
  filteredOption: UserFind[] = [];

  request: String;

  idProject!: number;
  project!: UpdateProject;
  options: UserFind[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddProjectComponent>,
    private projectService: ProjectsService,
    private usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) data: any
  )
  {
    this.request = data.request;
    this.passwordFC = new FormControl('', Validators.required);
    this.projectNameFC = new FormControl('', Validators.required);
    this.descriptionFC = new FormControl('', Validators.required);
    this.productOwnerFC = new FormControl('', Validators.required);
    this.projectForm = new FormGroup({
      projectNameFC: this.projectNameFC,
      passwordFC: this.passwordFC,
      descriptionFC: this.descriptionFC
    });

    this.productOwnerFC.valueChanges.subscribe(response => {
      if (response.length > 3) {
        console.log("FIlter: " + response);
        this.usersService.getProductOwner(response).subscribe(
          lists =>  { this.options = lists;
            this.filteredOption = lists;}
        )
      }
      this.filterData(response);
    })

  if(this.request == "UPDATE") {
      this.idProject = data.id;
      this.getProject();
    }
  }

  ngOnInit(): void {
  }

  save() {
    if(this.request == "UPDATE") {
      this.update();
    } else if(this.request == "ADD") {
      this.create();
    }
  }

  create() {
    this.projectService.createProject(this.getData())
      .subscribe(() => this.dialogRef.close());
  }

  update() {
    this.projectService.updateProject(this.getTaskToUpdate())
      .subscribe(() => this.dialogRef.close());
  }

  getData(): CreateProject {
    return  {
      name: this.projectNameFC.value,
      accessCode: this.passwordFC.value,
      description: this.descriptionFC.value,
      productOwner: this.productOwnerFC.value.email,
    }
  }

  setData() {
    this.projectNameFC.setValue(this.project.name);
    this.passwordFC.setValue(this.project.accessCode);
    this.descriptionFC.setValue(this.project.description);
    this.productOwnerFC.setValue(this.project.productOwner);
  }

  getTaskToUpdate() {
    return {
      id: this.idProject,
      name: this.projectNameFC.value,
      accessCode: this.passwordFC.value,
      description: this.descriptionFC.value,
      productOwner: this.productOwnerFC.value,
    }
  }

  getProject() {
    this.projectService.getProjectByIdUpdate(this.idProject)
      .pipe(tap(project => this.project = project))
      .subscribe(() => this.setData());
  }

  filterData(enteredData: UserFind) {
    this.filteredOption = this.options.filter(item => {
      return item.username.toLowerCase().indexOf(enteredData.username.toLowerCase()) > -1;
    })
  }
}
