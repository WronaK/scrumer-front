import {Component, OnInit, ViewChild} from '@angular/core';
import {tap} from "rxjs/operators";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {TeamDetails} from "../../model/team";
import {TeamsService} from "../../services/teams.service";
import {JoinTeamComponent} from "../../dialog/join-team/join-team.component";
import {TeamsSubscribeService} from "../../services/teams-subscribe.service";
import {Router} from "@angular/router";
import {CreateTeamComponent} from "../../dialog/create-team/create-team.component";
import {ResourceDescription} from "../../model/resource";
import {ResourceDescriptionComponent} from "../../component-elements/resource-description/resource-description.component";

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
    this.resourceDescription.refrash(this.teams[this.indexTeam]);
  }
}
