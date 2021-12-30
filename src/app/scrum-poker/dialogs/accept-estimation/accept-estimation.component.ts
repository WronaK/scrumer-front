import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TypeTask} from "../../model/scrum.poker.command";
import {UserStoryService} from "../../../project/user-story/services/user-story.service";
import {IssueService} from "../../../team/issue/services/issue.service";

@Component({
  selector: 'app-accept-estimation',
  templateUrl: './accept-estimation.component.html',
  styleUrls: ['./accept-estimation.component.scss']
})
export class AcceptEstimationComponent implements OnInit {
  value: string[] = ['?', '0', '0.5', '1', '2', '3', '5', '8', '13', '20', '40', '100'];
  selectedDeck!: string;
  idTask!: number;
  taskType!: TypeTask;

  constructor(
    private dialogRef: MatDialogRef<AcceptEstimationComponent>,
    private userStoryService: UserStoryService,
    private issueService: IssueService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.searchValue(data.result)
    this.idTask = data.idTask;
    this.taskType = data.typeTask;
  }

  ngOnInit(): void {
  }


  searchValue(value: string) {
      var differrence = 100;
      let val = ""

      for(let i = 1; i < this.value.length; i++) {
        if(Math.abs(differrence) > Math.abs(parseFloat(this.value[i]) - parseFloat(value))) {
          differrence = Math.abs(parseFloat(this.value[i]) - parseFloat(value));
          val = this.value[i]
        }
      }
      this.selectedDeck=val
      console.log(this.selectedDeck)
  }
  save() {
    if (this.taskType==TypeTask.USER_STORY) {
      this.userStoryService.setStoryPoints(this.idTask, this.selectedDeck).subscribe( () => this.dialogRef.close())
    } else if (this.taskType==TypeTask.ISSUE) {
      this.issueService.setStoryPoints(this.idTask, this.selectedDeck).subscribe(() => this.dialogRef.close())
    }
  }

  accept(v: string) {
    this.selectedDeck = v
  }
}
