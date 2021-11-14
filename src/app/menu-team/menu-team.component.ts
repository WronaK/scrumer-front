import {Component} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {TeamsDetailsService} from "../services/teams-details.service";
import {AddTeamComponent} from "../add-team/add-team.component";
import {tap} from "rxjs/operators";
import {JoinProjectComponent} from "../join-project/join-project.component";
import {AddMembersComponent} from "../add-members/add-members.component";
import {WebSocketService} from "../services/web-socket.service";

@Component({
  selector: 'app-menu-team',
  templateUrl: './menu-team.component.html',
  styleUrls: ['./menu-team.component.scss']
})
export class MenuTeamComponent {

  constructor(
    private dialog: MatDialog,
    private teamDetailsService: TeamsDetailsService,
    private webSocketService: WebSocketService
  ) { }

  updateTeam() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: this.teamDetailsService.idTeam,
      request: "UPDATE"
    };
    this.dialog.open(AddTeamComponent, dialogConfig)
      .afterClosed().pipe(
      tap(() => {
        this.teamDetailsService.loadsTeam()
      })
    ).subscribe();
  }

  joinTeam() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: this.teamDetailsService.idTeam
    };
    this.dialog.open(JoinProjectComponent, dialogConfig)
      .afterClosed().pipe(
      tap(() => {
        this.teamDetailsService.loadsProjects()
      })
    ).subscribe();
  }

  addMembers() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: this.teamDetailsService.idTeam
    };
    this.dialog.open(AddMembersComponent, dialogConfig)
      .afterClosed().pipe(
      tap(() => {
        this.teamDetailsService.loadsMembers()
      })
    ).subscribe();
  }

  startSrumPoker() {
    this.webSocketService.initScrumPoker(this.teamDetailsService.idTeam);
  }
}
