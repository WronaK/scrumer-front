import {Component, Input, OnInit} from '@angular/core';
import {ScrumPokerService} from "../services/scrum-poker.service";
import {TaskCommand, TeamVote} from "../model/scrum.poker.command";
import {LoginUserService} from "../services/login-user.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {UpdateProjectComponent} from "../dialog/update-project/update-project.component";
import {tap} from "rxjs/operators";
import {AcceptEstimationComponent} from "../dialog/accept-estimation/accept-estimation.component";

@Component({
  selector: 'app-team-estimation',
  templateUrl: './team-estimation.component.html',
  styleUrls: ['./team-estimation.component.scss']
})
export class TeamEstimationComponent implements OnInit {
  @Input()
  teamEstimation!: TeamVote[];

  @Input()
  idCreator!: number

  result: string = "???";

  // teamEstimate: string[] = ['?', '?', '?', '?', '?', '?', '?', '?', '?','?', '?', '?'];
  constructor(
    private scrumPokerService: ScrumPokerService,
    public loginUserService: LoginUserService,
    private dialog: MatDialog
  ) {
    this.scrumPokerService.resultChange.subscribe((value) => this.result = value);
  }

  ngOnInit(): void {
  }

  startEstimation() {
    this.scrumPokerService.startEstimationPoker();
  }

  stopEstimation() {
    this.scrumPokerService.stopEstimation();
  }

  searchTypeTask() {
    return this.scrumPokerService.scrumPoker.tasks.filter(task => task.idTask == this.scrumPokerService.scrumPoker.currentTask)[0].typeTask;
  }

  acceptResult() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      result: this.result,
      idTask: this.scrumPokerService.scrumPoker.currentTask,
      typeTask: this.searchTypeTask()
    }
    this.dialog.open(AcceptEstimationComponent, dialogConfig)
      .afterClosed().pipe(
      tap(() => {
      })
    ).subscribe();
  }
}
