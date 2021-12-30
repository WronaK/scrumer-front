import {Component, Input} from '@angular/core';
import {ScrumPokerService} from "../../services/scrum-poker.service";
import {TeamVote} from "../../model/scrum.poker.command";
import {LoggedUserDataService} from "../../../login/services/logged-user-data.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {tap} from "rxjs/operators";
import {AcceptEstimationComponent} from "../../dialogs/accept-estimation/accept-estimation.component";
import {ScrumPokerObservableService} from "../../services/scrum-poker-observable.service";

@Component({
  selector: 'app-preview-estimation-results',
  templateUrl: './preview-estimation-results.component.html',
  styleUrls: ['./preview-estimation-results.component.scss']
})
export class PreviewEstimationResultsComponent {
  @Input()
  teamEstimation!: TeamVote[];

  @Input()
  idCreator!: number

  result: string = "???";

  constructor(
    private observableScrumPokerService: ScrumPokerObservableService,
    private scrumPokerService: ScrumPokerService,
    public loginUserService: LoggedUserDataService,
    private dialog: MatDialog
  ) {
    this.observableScrumPokerService.resultChange.subscribe((value) => this.result = value);
  }

  startEstimation() {
    this.scrumPokerService.startEstimationPoker();
  }

  stopEstimation() {
    this.scrumPokerService.stopEstimation();
  }

  searchTypeTask() {
    return this.observableScrumPokerService.scrumPoker.tasks.filter(task => task.idTask == this.observableScrumPokerService.scrumPoker.currentTask)[0].typeTask;
  }

  saveResult() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      result: this.result,
      idTask: this.observableScrumPokerService.scrumPoker.currentTask,
      typeTask: this.searchTypeTask()
    }
    this.dialog.open(AcceptEstimationComponent, dialogConfig)
      .afterClosed().pipe(
      tap(() => {
      })
    ).subscribe();
  }
}
