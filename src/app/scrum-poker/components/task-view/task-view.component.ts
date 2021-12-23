import {Component, Input, OnInit} from '@angular/core';
import {TaskCommand, TypeTask} from "../../../model/scrum.poker.command";
import {UserStoryService} from "../../../services/user-story.service";
import {IssueService} from "../../../services/issue.service";
import {FormControl} from "@angular/forms";
import {IssueCommand, UserStory} from "../../../model/task";
import {ScrumPokerService} from "../../../services/scrum-poker.service";
import {LoginUserService} from "../../../services/login-user.service";

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  @Input()
  tasks!: TaskCommand[];

  @Input()
  idCreator!: number;

  index = 0;

  currentTask!: TaskCommand;

  title!: FormControl;
  description!: FormControl;
  priorityFC!: FormControl;
  typeIssue!: FormControl;
  storyPoints!: FormControl;
  userStory!: FormControl;
  statusIssue!: FormControl;
  statusUserStory!: FormControl;

  issue!: IssueCommand;
  userStoryCommand!: UserStory;

  typeTask = TypeTask

  constructor(
    private userStoryService: UserStoryService,
    private issueService: IssueService,
    private scrumPokerService: ScrumPokerService,
    public loginService: LoginUserService
  ) {
  }

  ngOnInit(): void {

    this.initForm();
    if (this.tasks.length >= this.index) {
      this.currentTask = this.tasks[this.index];
      this.scrumPokerService.setCurrentTask(this.currentTask.idTask);

     this.loadData();
    }
  }

  nextTask() {
    if (this.index + 1 <= this.tasks.length) {
      this.index += 1;
      this.currentTask = this.tasks[this.index];
      this.scrumPokerService.setCurrentTask(this.currentTask.idTask);
      this.loadData();
      console.log("next", this.index)
    }
  }

  previewsTask() {
    if (this.index - 1 >= 0) {
      this.index -= 1;
      this.currentTask = this.tasks[this.index];
      this.scrumPokerService.setCurrentTask(this.currentTask.idTask);
      this.loadData()
      console.log("previews", this.index)

    }
  }

  loadData() {
    console.log("Current taks: ", this.currentTask.typeTask);
    console.log("CC: ", this.currentTask.typeTask===TypeTask.USER_STORY);

    if (this.currentTask.typeTask == TypeTask.ISSUE) {
      this.setDataIssue(this.currentTask.idTask)
    } else if (this.currentTask.typeTask === TypeTask.USER_STORY) {
      console.log("User story set")
      this.setDataUserStory(this.currentTask.idTask);
    }
  }

  disabled = true;

  initForm(): void {
    this.title = new FormControl({ value: '', disabled: this.disabled});
    this.description = new FormControl({ value: '', disabled: this.disabled});
    this.priorityFC = new FormControl({ value: '', disabled: this.disabled});
    this.typeIssue = new FormControl({ value: '', disabled: this.disabled});
    this.storyPoints = new FormControl({ value: '', disabled: this.disabled});
    this.userStory = new FormControl({ value: '', disabled: this.disabled});
    this.statusIssue = new FormControl({ value: '', disabled: this.disabled});
    this.statusUserStory = new FormControl({ value: '', disabled: this.disabled});
  }

  setDataIssue(id: number): void {
    this.issueService.getIssueById(id).subscribe(
      issue => {
        this.issue = issue;
        this.title.setValue(issue.title);
        this.description.setValue(issue.description);
        this.priorityFC.setValue(issue.priority);
        this.typeIssue.setValue(issue.typeIssue);
        this.storyPoints.setValue(issue.storyPoints);
        this.statusIssue.setValue(issue.statusIssue);
        this.userStory.setValue(issue.titleUserStory);
      }
    )
  }

  setDataUserStory(id: number): void {
    this.userStoryService.getUserStory(id).subscribe(
      userStory => {
        this.userStoryCommand = userStory;
        this.title.setValue(userStory.title);
        this.description.setValue(userStory.description);
        this.priorityFC.setValue(userStory.priority);
        this.storyPoints.setValue(userStory.storyPoints);
        this.statusUserStory.setValue(userStory.statusIssue)
      }
    )
  }
}
