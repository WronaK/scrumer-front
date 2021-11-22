import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ProjectDetailsService} from "../../services/project-details.service";
import {JoinTeamToProjectComponent} from "../../dialog/join-team-to-project/join-team-to-project.component";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-menu-project',
  templateUrl: './menu-project.component.html',
  styleUrls: ['./menu-project.component.scss']
})
export class MenuProjectComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
    private projectDetailsService: ProjectDetailsService
  ) { }

  ngOnInit(): void {
  }

  updateProject() {
    // const dialogConfig = new MatDialogConfig();
    // dialogConfig.disableClose = true;
    // dialogConfig.autoFocus = true;
    // dialogConfig.data = {
    //   id: this.projectDetailsService.idProject,
    //   request: "UPDATE"
    // };
    // this.dialog.open(AddProjectComponent, dialogConfig)
    //   .afterClosed().pipe(
    //   tap(() => {
    //     this.projectDetailsService.uploadProject()
    //   })
    // ).subscribe();
  }

  addTeam() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      idProject: this.projectDetailsService.idProject,
    };
    this.dialog.open(JoinTeamToProjectComponent, dialogConfig)
      .afterClosed().pipe(
      tap(() => {
        this.projectDetailsService.uploadTeams()
      })
    ).subscribe();
  }
}
