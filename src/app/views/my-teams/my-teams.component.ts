import { Component, OnInit } from '@angular/core';
import {tap} from "rxjs/operators";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {Team} from "../../model/team";
import {TeamsService} from "../../services/teams.service";
import {JoinTeamComponent} from "../../dialog/join-team/join-team.component";
import {TeamsSubscribeService} from "../../services/teams-subscribe.service";
import {Router} from "@angular/router";
import {CreateTeamComponent} from "../../dialog/create-team/create-team.component";

@Component({
  selector: 'app-my-teams',
  templateUrl: './my-teams.component.html',
  styleUrls: ['./my-teams.component.scss']
})
export class MyTeamsComponent implements OnInit {

  teams: Team[] = [];
  indexTeam!: number;

  constructor(
    private teamsService: TeamsService,
    private teasSubscribeService: TeamsSubscribeService,
    private dialog: MatDialog,
    private router: Router) { }

  ngOnInit(): void {
    this.getTeams();
  }

  getTeams() {
    this.teasSubscribeService.uploadTeams();
    this.teasSubscribeService.getTeams().pipe(tap(teams => this.teams = teams)).subscribe();
  }

  addTeam() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      request: "ADD"
    };
    this.dialog.open(CreateTeamComponent, dialogConfig)
      .afterClosed()
      .pipe(
        tap( () => {
            this.teasSubscribeService.uploadTeams()
          }
        )).subscribe();
  }

  joinTeam() {
    const dialogConfig= new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      request: "ADD"
    };
    this.dialog.open(JoinTeamComponent, dialogConfig)
      .afterClosed()
      .pipe(
        tap( () => {
            this.teasSubscribeService.uploadTeams()
          }
        )).subscribe();
  }

  goToTeam(id: number) {
    this.router.navigate(['team/' + id]);
  }

  selectedTeam(idTeam: number) {
    this.indexTeam = this.teams.findIndex(team => team.id == idTeam);
  }
}
