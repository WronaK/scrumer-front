import {Component, Inject} from '@angular/core';
import {FormControl} from "@angular/forms";
import {IssueService} from "../../../../services/issue.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {IssueCommand} from "../../../../model/task";

@Component({
  selector: 'app-show-issue',
  templateUrl: './show-issue.component.html',
  styleUrls: ['./show-issue.component.scss']
})
export class ShowIssueComponent {

  title!: FormControl;
  description!: FormControl;
  priorityFC!: FormControl;
  typeIssue!: FormControl;
  storyPoints!: FormControl;
  userStory!: FormControl;
  statusIssue!: FormControl;

  idIssue!: number;

  disabled = true;

  issue!: IssueCommand;

  constructor(
    private issueService: IssueService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.idIssue = data.idIssue;
    this.initForm();
    this.setData();
  }

  initForm(): void {
    this.title = new FormControl({ value: '', disabled: this.disabled});
    this.description = new FormControl({ value: '', disabled: this.disabled});
    this.priorityFC = new FormControl({ value: '', disabled: this.disabled});
    this.typeIssue = new FormControl({ value: '', disabled: this.disabled});
    this.storyPoints = new FormControl({ value: '', disabled: this.disabled});
    this.userStory = new FormControl({ value: '', disabled: this.disabled});
    this.statusIssue = new FormControl({ value: '', disabled: this.disabled});
  }

  setData(): void {
    this.issueService.getIssueById(this.idIssue).subscribe(
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
}
