import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TaskService} from "../../services/task.service";
import {FormControl} from "@angular/forms";

@Component({
  selector: 'app-remove-user-story',
  templateUrl: './remove-user-story.component.html',
  styleUrls: ['./remove-user-story.component.scss']
})
export class RemoveUserStoryComponent {

  idUserStory: number;

  titleFC!: FormControl;
  descriptionFC!: FormControl;
  priorityFC!: FormControl;
  storyPointFC!: FormControl;
  statusFC!: FormControl;

  disabled=true;

  constructor(
    private dialogRef: MatDialogRef<RemoveUserStoryComponent>,
    private taskService: TaskService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.idUserStory = data.id;

    this.titleFC = new FormControl({ value: '', disabled: this.disabled });
    this.descriptionFC = new FormControl({ value: '', disabled: this.disabled });
    this.priorityFC = new FormControl({ value: '', disabled: this.disabled });
    this.storyPointFC = new FormControl({ value: '', disabled: this.disabled });
    this.statusFC = new FormControl({ value: '', disabled: this.disabled });
    this.setData();
  }

  removeUserStory(): void {
    this.taskService.removeUserStory(this.idUserStory).subscribe(() => this.dialogRef.close());
  }

  setData(): void {
    this.taskService.getUserStory(this.idUserStory).subscribe(userStory => {
      this.titleFC.setValue(userStory.title);
      this.descriptionFC.setValue(userStory.description);
      this.priorityFC.setValue(userStory.priority);
      this.statusFC.setValue(userStory.statusIssue);
    })
  }
}
