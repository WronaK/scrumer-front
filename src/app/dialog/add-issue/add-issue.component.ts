import {Component, Inject} from '@angular/core';
import {
  CreateIssue,
  PriorityStatus,
  PriorityStatusLabelMapping,
  StatusIssue,
  Type,
  TypeLabelMapping
} from "../../model/task";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-add-issue',
  templateUrl: './add-issue.component.html',
  styleUrls: ['./add-issue.component.scss']
})
export class AddIssueComponent {
  formGroup!: FormGroup;

  title!: FormControl;
  description!: FormControl;
  priorityFC!: FormControl;
  typeIssueFC!: FormControl;

  typeIssueLabelMapping = TypeLabelMapping;
  typeIssue = Object.values(Type);


  priorityStatusLabelMapping = PriorityStatusLabelMapping;
  priority = Object.values(PriorityStatus);


  idUserStory!: number;
  statusIssue!: StatusIssue;
  idTeam!: number

  constructor(
    private dialogRef: MatDialogRef<AddIssueComponent>,
    private tasksService: TaskService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.statusIssue = data.statusIssue;
    this.idUserStory = data.idUserStory;
    this.idTeam = data.idTeam;

    this.initForm()
  }

  initForm(): void {
    this.title = new FormControl('', Validators.required);
    this.description = new FormControl('', Validators.required);
    this.priorityFC = new FormControl('', Validators.required);
    this.typeIssueFC = new FormControl('', Validators.required);

    this.formGroup = new FormGroup({
      titleFc: this.title,
      descriptionFC: this.description,
      priorityFC: this.priorityFC,
      typeIssueFC: this.typeIssueFC,
    });
  }

  create() {
    if (this.idUserStory < 0) {
      this.createIssue()
    } else {
      this.createAndAddToUserStory()
    }
  }

  createAndAddToUserStory(): void {
    this.tasksService.addIssueToUserStory(this.idUserStory, this.getData()).subscribe(
      () => this.dialogRef.close()
    )
  }

  createIssue(): void {
    this.tasksService.addIssue(this.getData()).subscribe(
      () => this.dialogRef.close()
    )
  }

  getData(): CreateIssue {
    return {
      idTeam: this.idTeam,
      title: this.title.value,
      description: this.description.value,
      priority: this.priorityFC.value,
      statusIssue: this.statusIssue,
      typeIssue: this.typeIssueFC.value
    }
  }
}
