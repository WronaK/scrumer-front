import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ChangeEstimationStatus, CreateScrumPoker, ScrumPoker, VoteCommand} from "../model/scrum.poker.command";
import {Router} from "@angular/router";
import {LoggedUserDataService} from "../../services/logged-user-data.service";
import {tap} from "rxjs/operators";
import {ScrumPokerObservableService} from "./scrum-poker-observable.service";

@Injectable({
  providedIn: 'root'
})
export class ScrumPokerService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private loggedUserDataService: LoggedUserDataService,
    private observableScrumPokerService: ScrumPokerObservableService) {
  }

  startScrumPoker(createScrumPoker: CreateScrumPoker) {
    return this.http.post<ScrumPoker>("/api/scrum/poker/start", createScrumPoker)
      .pipe(
        tap(scrumPoker => {
          this.observableScrumPokerService.scrumPoker = scrumPoker;
          this.router.navigate(['scrum-poker/' + scrumPoker.idScrumPoker])
        })
      );
  }

  startEstimationPoker() {
    this.observableScrumPokerService.resetResult();

    if (this.observableScrumPokerService.scrumPoker.currentTask == null) {
      this.observableScrumPokerService.scrumPoker.currentTask = this.observableScrumPokerService.scrumPoker.tasks[0].idTask
    }
    return this.http.post<void>("/api/scrum/poker/start/estimation", {idTask: this.observableScrumPokerService.scrumPoker.currentTask, idScrumPoker: this.observableScrumPokerService.scrumPoker.idScrumPoker} as ChangeEstimationStatus)
      .subscribe(() => this.observableScrumPokerService.selectedDeck.next(""));
  }

  vote(value: string) {
    return this.http.post<void>("/api/scrum/poker/vote",
      {estimation: value, idScrumPoker: this.observableScrumPokerService.scrumPoker.idScrumPoker,
      idUser: this.loggedUserDataService.loginUser.id, idTask: this.observableScrumPokerService.scrumPoker.currentTask} as VoteCommand);
  }

  stopEstimation() {
    return this.http.post<void>("/api/scrum/poker/stop/estimation", {idTask: this.observableScrumPokerService.scrumPoker.currentTask, idScrumPoker: this.observableScrumPokerService.scrumPoker.idScrumPoker} as ChangeEstimationStatus)
      .subscribe();
  }
}
