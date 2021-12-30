import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProjectsService} from "../../../services/projects.service";
import {PriorityStatus, PriorityStatusLabelMapping} from "../../model/task";
import {UserStoryService} from "../../services/user-story.service";

@Component({
  selector: 'app-add-user-story',
  templateUrl: './add-user-story.component.html',
  styleUrls: ['./add-user-story.component.scss']
})
export class AddUserStory {

  priorityStatusLabelMapping = PriorityStatusLabelMapping;
  priority = Object.values(PriorityStatus);
  userStoryFormGroup!: FormGroup;
  title!: FormControl;
  description!: FormControl;
  priorityFC!: FormControl;

  id: number;

  constructor(private dialogRef: MatDialogRef<AddUserStory>,
              private projectService: ProjectsService,
              private userStoryService: UserStoryService,
              @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.id = data.id;
    this.initForm();
  }

  initForm(): void {
    this.title = new FormControl('', Validators.required);
    this.description = new FormControl('', Validators.required);
    this.priorityFC = new FormControl('', Validators.required);

    this.userStoryFormGroup = new FormGroup({
      titleFc: this.title,
      descriptionFC: this.description,
      priorityFC: this.priorityFC
    });
  }

  create() {
    this.projectService.addUserStory(this.id, this.getData())
      .subscribe(() => this.dialogRef.close());
  }

  getData() {
    return {
      title: this.title.value,
      description: this.description.value,
      priority: this.priorityFC.value
    }
  }
}
