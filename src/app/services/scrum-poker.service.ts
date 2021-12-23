import {Injectable, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {NotificationStartScrumPokerComponent} from "../scrum-poker/dialogs/notification-start-scrum-poker/notification-start-scrum-poker.component";
import {HttpClient} from "@angular/common/http";
import {
  ChangeEstimationStatus,
  CreateScrumPoker,
  JoinScrumPoker, ResultEstimation,
  ScrumPoker,
  ScrumPokerStatus, VoteCommand
} from "../model/scrum.poker.command";
import {Subject} from "rxjs";
import {Router} from "@angular/router";
import {LoginUserService} from "./login-user.service";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ScrumPokerService implements OnInit {

  userId: number[] = [];

  scrumPoker!: ScrumPoker;
  start: boolean = false;

  selectedDeck: Subject<string> =  new Subject<string>();

  resultChange: Subject<string> = new Subject<string>();

  startChange: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private loginUserService: LoginUserService) {
    console.log(this.userId)
    this.userId = [];
  }

  ngOnInit(): void {
    this.userId = [];
  }

  notificationStartScrumPoker(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: id
    }

    this.dialog.open(NotificationStartScrumPokerComponent, dialogConfig).afterClosed().subscribe( result => {
      if (result) {
        this.joinScrumPoker({idScrumPoker: id, idUser: this.loginUserService.loginUser.id})
      }
    })
  }

  startScrumPoker(createScrumPoker: CreateScrumPoker) {
    return this.http.post<ScrumPoker>("/api/scrum/poker/start", createScrumPoker)
      .pipe(
        tap(scrumPoker => {
          this.scrumPoker = scrumPoker;
          this.router.navigate(['scrum-poker/' + scrumPoker.idScrumPoker])
        })
      );
  }

  setStartEstimation(value: boolean) {
    this.startChange.next(value);
  }

  joinScrumPoker(joinScrumPoker: JoinScrumPoker) {
    this.http.post<ScrumPoker>("/api/scrum/poker/join", joinScrumPoker)
      .subscribe(scrumPoker => {
        this.scrumPoker = scrumPoker;
        this.router.navigate(['scrum-poker/' + scrumPoker.idScrumPoker])

        if (scrumPoker.scrumPokerStatus == ScrumPokerStatus.IN_PROCESS_ESTIMATION) {
          this.setStartEstimation(true);
        }
      });
  }

  startEstimationPoker() {
    this.resetResult();

    if (this.scrumPoker.currentTask == null) {
      this.scrumPoker.currentTask = this.scrumPoker.tasks[0].idTask
    }
    return this.http.post<void>("/api/scrum/poker/start/estimation", {idTask: this.scrumPoker.currentTask, idScrumPoker: this.scrumPoker.idScrumPoker} as ChangeEstimationStatus)
      .subscribe(() => this.selectedDeck.next(""));
  }

  vote(value: string) {
    return this.http.post<void>("/api/scrum/poker/vote",
      {estimation: value, idScrumPoker: this.scrumPoker.idScrumPoker,
      idUser: this.loginUserService.loginUser.id, idTask: this.scrumPoker.currentTask} as VoteCommand);
  }

  setCurrentTask(taskId: number) {
    this.scrumPoker.currentTask = taskId;
  }

  setScrumPoker(scrumPoker: ScrumPoker) {
    this.scrumPoker.idScrumPoker = scrumPoker.idScrumPoker;
    this.scrumPoker.scrumPokerStatus = scrumPoker.scrumPokerStatus;
    this.scrumPoker.tasks = scrumPoker.tasks;
    this.scrumPoker.members = scrumPoker.members;
    this.scrumPoker.idCreator = scrumPoker.idCreator;
    this.scrumPoker.individualEstimation = scrumPoker.individualEstimation;
    this.scrumPoker.currentTask = scrumPoker.currentTask
  }

  newVote(idUser: number) {
    const index = this.scrumPoker.individualEstimation
      .findIndex(value => value.idUser == idUser);

    this.scrumPoker.individualEstimation[index].estimation = "X";
  }

  setResult(result: ResultEstimation) {
    this.resultChange.next(result.resultEstimation);
    // this.result = result.resultEstimation;

    result.estimation.forEach(estimation => {
      const index = this.scrumPoker.individualEstimation.findIndex(value => value.idUser == estimation.idUser);
      this.scrumPoker.individualEstimation[index].estimation = estimation.estimation;
    })
  }

  resetResult() {
    this.resultChange.next("???");

    this.scrumPoker.individualEstimation.forEach(value => value.estimation = "???");
  }

  stopEstimation() {
    return this.http.post<void>("/api/scrum/poker/stop/estimation", {idTask: this.scrumPoker.currentTask, idScrumPoker: this.scrumPoker.idScrumPoker} as ChangeEstimationStatus)
      .subscribe();
  }
}
