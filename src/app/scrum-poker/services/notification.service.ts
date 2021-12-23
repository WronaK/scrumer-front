import { Injectable } from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {NotificationStartScrumPokerComponent} from "../dialogs/notification-start-scrum-poker/notification-start-scrum-poker.component";
import {JoinScrumPoker, ScrumPoker, ScrumPokerStatus} from "../../model/scrum.poker.command";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {LoggedUserDataService} from "../../services/logged-user-data.service";
import {ScrumPokerObservableService} from "./scrum-poker-observable.service";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(
    private dialog: MatDialog,
    private http: HttpClient,
    private router: Router,
    private loggedUserDataService: LoggedUserDataService,
    private scrumPokerObservableService: ScrumPokerObservableService
  ) { }

  notificationStartScrumPoker(id: string) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: id
    }

    this.dialog.open(NotificationStartScrumPokerComponent, dialogConfig).afterClosed().subscribe( result => {
      if (result) {
        this.joinScrumPoker({idScrumPoker: id, idUser: this.loggedUserDataService.loginUser.id})
      }
    })
  }

  joinScrumPoker(joinScrumPoker: JoinScrumPoker) {
    this.http.post<ScrumPoker>("/api/scrum/poker/join", joinScrumPoker)
      .subscribe(scrumPoker => {
        this.scrumPokerObservableService.scrumPoker = scrumPoker;
        this.router.navigate(['scrum-poker/' + scrumPoker.idScrumPoker])

        if (scrumPoker.scrumPokerStatus == ScrumPokerStatus.IN_PROCESS_ESTIMATION) {
          this.scrumPokerObservableService.setStartEstimation(true);
        }
      });
  }
}
