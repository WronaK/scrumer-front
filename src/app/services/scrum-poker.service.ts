import {Injectable, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {NotificationStartScrumPokerComponent} from "../notification-start-scrum-poker/notification-start-scrum-poker.component";

@Injectable({
  providedIn: 'root'
})
export class ScrumPokerService implements OnInit {

  userId: number[] = [];

  constructor(
    private dialog: MatDialog
  ) {
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
    return this.dialog.open(NotificationStartScrumPokerComponent, dialogConfig)
  }

  addUser(id: number) {
    this.userId.push(id);
  }
}
