import { Component, OnInit } from '@angular/core';
import {Project} from "../model/project";
import {ProjectsService} from "../services/projects.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ProjectsSubscribeService} from "../services/projects-subscribe.service";
import {tap} from "rxjs/operators";
import {AddProjectComponent} from "../add-project/add-project.component";

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss']
})
export class MyProjectsComponent implements OnInit {
  projects: Project[] = [];
  constructor(
    private projectsService: ProjectsService,
    private dialog: MatDialog,
    private projectsSubscribeService: ProjectsSubscribeService) { }

  ngOnInit(): void {
    this.getProjects();
  }

  getProjects() {
    this.projectsSubscribeService.uploadProject();
    this.projectsSubscribeService.getProjects().pipe(tap(projects => this.projects = projects)).subscribe();
  }

  addProject() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      request: "ADD"
    };
    this.dialog.open(AddProjectComponent, dialogConfig)
      .afterClosed()
      .pipe(
        tap(() => {
          this.projectsSubscribeService.uploadProject()
        })
      ).subscribe();
  }
}
