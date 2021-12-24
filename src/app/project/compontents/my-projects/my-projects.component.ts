import {Component, OnInit, ViewChild} from '@angular/core';
import {ProjectsService} from "../../../services/projects.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ProjectsSubscribeService} from "../../../services/projects-subscribe.service";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";
import {ProjectDetails} from "../../../model/project";
import {CreateProjectComponent} from "../../dialog/create-project/create-project.component";
import {ResourceDescriptionComponent} from "../../../shared/components/resource-description/resource-description.component";

@Component({
  selector: 'app-my-projects',
  templateUrl: './my-projects.component.html',
  styleUrls: ['./my-projects.component.scss']
})
export class MyProjectsComponent implements OnInit {
  indexProject!: number;

  projects: ProjectDetails[] = [];

  @ViewChild('resourceDescription')
  resourceDescription!: ResourceDescriptionComponent;

  constructor(
    private projectsService: ProjectsService,
    private dialog: MatDialog,
    private projectsSubscribeService: ProjectsSubscribeService,
    private router: Router) { }

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
    this.dialog.open(CreateProjectComponent, dialogConfig)
      .afterClosed()
      .pipe(
        tap(() => {
          this.projectsSubscribeService.uploadProject()
        })
      ).subscribe();
  }

  goToProject(id: number): void {
    this.router.navigate(['project/' + id]);
  }

  selectedProject(idProject: number) {
    this.indexProject = this.projects.findIndex(project => project.id == idProject);
    if (this.resourceDescription != undefined)
      this.resourceDescription.refrash(this.projects[this.indexProject]);
  }
}
