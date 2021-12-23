import { Injectable } from '@angular/core';
import {ResultEstimation, ScrumPoker} from "../model/scrum.poker.command";
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ScrumPokerObservableService {

  scrumPoker!: ScrumPoker;
  start: boolean = false;

  selectedDeck: Subject<string> =  new Subject<string>();

  resultChange: Subject<string> = new Subject<string>();

  startChange: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  setStartEstimation(value: boolean) {
    this.startChange.next(value);
  }

  setScrumPoker(response: any) {
    this.scrumPoker.idScrumPoker = response.idScrumPoker;
    this.scrumPoker.scrumPokerStatus = response.scrumPokerStatus;
    this.scrumPoker.tasks = response.tasks;
    this.scrumPoker.members = response.members;
    this.scrumPoker.idCreator = response.idCreator;
    this.scrumPoker.individualEstimation = response.individualEstimation;
    this.scrumPoker.currentTask = response.currentTask
  }

  setCurrentTask(taskId: number) {
    this.scrumPoker.currentTask = taskId;
  }

  newVote(idUser: number) {
    const index = this.scrumPoker.individualEstimation
      .findIndex(value => value.idUser == idUser);

    this.scrumPoker.individualEstimation[index].estimation = "X";
  }

  setResult(result: ResultEstimation) {
    this.resultChange.next(result.resultEstimation);

    result.estimation.forEach(estimation => {
      const index = this.scrumPoker.individualEstimation.findIndex(value => value.idUser == estimation.idUser);
      this.scrumPoker.individualEstimation[index].estimation = estimation.estimation;
    })
  }

  resetResult() {
    this.resultChange.next("???");
    this.scrumPoker.individualEstimation.forEach(value => value.estimation = "???");
  }
}
