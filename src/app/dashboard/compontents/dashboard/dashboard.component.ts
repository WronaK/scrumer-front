import {Component, OnInit} from '@angular/core';
import {TeamDetails} from "../../../model/team";
import {ProjectDetails} from "../../../model/project";
import {tap} from "rxjs/operators";
import {TeamsSubscribeService} from "../../../services/teams-subscribe.service";
import {ProjectsSubscribeService} from "../../../services/projects-subscribe.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CreateTeamComponent} from "../../../team/dialog/create-team/create-team.component";
import {CreateProjectComponent} from "../../../project/dialog/create-project/create-project.component";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  teams: TeamDetails[] = [];
  projects: ProjectDetails[] = [];

  constructor(
    private teasSubscribeService: TeamsSubscribeService,
    private projectsSubscribeService: ProjectsSubscribeService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getTeams();
    this.getProjects();
  }

  getProjects() {
    this.projectsSubscribeService.uploadProject();
    this.projectsSubscribeService.getProjects().pipe(tap(projects => this.projects = projects)).subscribe();
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

  addProject() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      request: "ADD"
    };
    this.dialog.open(CreateProjectComponent, dialogConfig)
      .afterClosed()
      .pipe(
        tap(() => {
          this.projectsSubscribeService.uploadProject()
        })
      ).subscribe();
  }
}
