import { Injectable } from '@angular/core';
import {NotificationService} from "./notification.service";
import {ScrumPokerObservableService} from "./scrum-poker-observable.service";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class ScrumPokerNotificationService {

  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";

  constructor(
    private notificationService: NotificationService,
    private observableScrumPokerService: ScrumPokerObservableService,
    private _snackBar: MatSnackBar
  ) { }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  executionEvent(response: any) {
    switch (response.method) {
      case "NOTIFICATION":
        this.displayNotificationOfNewEvent(response);
        break;
      case "JOIN":
        this.joinNewMember(response);
        break;
      case "START":
        this.startEstimation(response);
        break;
      case "STOP":
        this.stopEstimation(response);
        break;
      case "VOTE":
        this.displayNewVote(response);
        break;
    }
  }

  displayNotificationOfNewEvent(response: any) {
    this.notificationService.notificationStartScrumPoker(response.idScrumPoker);
  }

  joinNewMember(response: any) {
    this.observableScrumPokerService.setScrumPoker(response);
  }

  startEstimation(response: any) {
    this.observableScrumPokerService.resultChange.next("???");
    this.observableScrumPokerService.setScrumPoker(response);
    this.openSnackBar("Start estimating for the task number " + response.currentTask);
    this.observableScrumPokerService.setStartEstimation(true);
    this.observableScrumPokerService.selectedDeck.next("");
    this.observableScrumPokerService.setCurrentTask(this.observableScrumPokerService.scrumPoker.currentTask);
  }

  stopEstimation(response: any) {
    this.observableScrumPokerService.setResult(response);
    this.openSnackBar("Stop estimating for the task number " + response.idTask);
    this.observableScrumPokerService.setStartEstimation(false);
  }

  displayNewVote(response: any) {
    this.observableScrumPokerService.newVote(response.idUser);
  }

}
