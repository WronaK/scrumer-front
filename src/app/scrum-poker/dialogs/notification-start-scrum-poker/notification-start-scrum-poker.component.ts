import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-notification-start-scrum-poker',
  templateUrl: './notification-start-scrum-poker.component.html',
  styleUrls: ['./notification-start-scrum-poker.component.scss']
})
export class NotificationStartScrumPokerComponent {

  id!: string

  constructor(
    private router: Router,
    private dialogRef: MatDialogRef<NotificationStartScrumPokerComponent>,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.id = data.id;
  }

  add() {
    this.dialogRef.close(true);
  }
}
