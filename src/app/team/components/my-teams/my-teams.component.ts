import {Component, OnInit, ViewChild} from '@angular/core';
import {tap} from "rxjs/operators";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {TeamDetails} from "../../model/team";
import {TeamsService} from "../../services/teams.service";
import {TeamsSubscribeService} from "../../services/teams-subscribe.service";
import {Router} from "@angular/router";
import {CreateTeamComponent} from "../../dialog/create-team/create-team.component";
import {ResourceDescriptionComponent} from "../../../shared/components/resource-description/resource-description.component";
import {JoinTheTeamComponent} from "../../dialog/join-the-team/join-the-team.component";

@Component({
  selector: 'app-my-teams',
  templateUrl: './my-teams.component.html',
  styleUrls: ['./my-teams.component.scss']
})
export class MyTeamsComponent implements OnInit {

  teams: TeamDetails[] = [];
  indexTeam!: number;

  @ViewChild('resourceDescription')
  resourceDescription!: ResourceDescriptionComponent;

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
    this.dialog.open(JoinTheTeamComponent, dialogConfig)
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
    if (this.resourceDescription != undefined)
      this.resourceDescription.refrash(this.teams[this.indexTeam]);
  }
}
