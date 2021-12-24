import {Component, Inject} from '@angular/core';
import {FormControl} from "@angular/forms";
import {UserStory} from "../../../../model/task";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {UserStoryService} from "../../../../services/user-story.service";

@Component({
  selector: 'app-show-user-story-in-sprint-board',
  templateUrl: './show-user-story-in-sprint-board.component.html',
  styleUrls: ['./show-user-story-in-sprint-board.component.scss']
})
export class ShowUserStoryInSprintBoardComponent {

  title!: FormControl;
  description!: FormControl;
  priorityFC!: FormControl;
  storyPoints!: FormControl;

  idUserStory!: number;

  disabled = true;

  userStory!: UserStory;
  statusUserStory!: FormControl;

  constructor(
    private userStoryService: UserStoryService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.idUserStory = data.idUserStory;
    this.initForm();
    this.setData();
  }

  initForm(): void {
    this.title = new FormControl({ value: '', disabled: this.disabled});
    this.description = new FormControl({ value: '', disabled: this.disabled});
    this.priorityFC = new FormControl({ value: '', disabled: this.disabled});
    this.storyPoints = new FormControl({ value: '', disabled: this.disabled});
    this.statusUserStory = new FormControl({ value: '', disabled: this.disabled});
  }

  setData(): void {
    this.userStoryService.getUserStory(this.idUserStory).subscribe(
      userStory => {
        this.userStory = userStory;
        this.title.setValue(userStory.title);
        this.description.setValue(userStory.description);
        this.priorityFC.setValue(userStory.priority);
        this.storyPoints.setValue(userStory.storyPoints);
        this.statusUserStory.setValue(userStory.statusIssue)
      }
    )
  }
}
