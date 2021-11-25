import {Component, Inject} from '@angular/core';
import {PriorityStatus, PriorityStatusLabelMapping, UpdateUserStory} from "../../model/task";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-update-user-story',
  templateUrl: './update-user-story.component.html',
  styleUrls: ['./update-user-story.component.scss']
})
export class UpdateUserStoryComponent {

  userStoryFormGroup!: FormGroup;
  title!: FormControl;
  description!: FormControl;
  storyPoints!: FormControl;
  priorityFC!: FormControl;

  priorityStatusLabelMapping = PriorityStatusLabelMapping;
  priority = Object.values(PriorityStatus);

  idUserStory: number;

  constructor(
    private dialogRef: MatDialogRef<UpdateUserStoryComponent>,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
      this.idUserStory = data.id;
      this.initForm();
      this.initValue();
  }

  initForm(): void {
    this.title = new FormControl('', Validators.required);
    this.description = new FormControl('', Validators.required);
    this.priorityFC = new FormControl('', Validators.required);
    this.storyPoints = new FormControl('', Validators.required);

    this.userStoryFormGroup = new FormGroup({
      title: this.title,
      description: this.description,
      priorityFC: this.priorityFC,
      storyPoints: this.storyPoints
    });
  }

  initValue(): void {
    this.taskService.getUserStory(this.idUserStory).subscribe(
      userStory => {
        this.title.setValue(userStory.title);
        this.description.setValue(userStory.description);
        this.priorityFC.setValue(userStory.priority);
        this.storyPoints.setValue(userStory.storyPoints);
      }
    )
  }

  update() {
    this.taskService.updateUserStory(this.getData())
      .subscribe(() => this.dialogRef.close());
  }

  getData(): UpdateUserStory {
    return {
      id: this.idUserStory,
      title: this.title.value,
      description: this.description.value,
      priority: this.priorityFC.value,
      storyPoints: this.storyPoints.value
    }
}
}
