import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {ProjectsService} from "../services/projects.service";
import {ProjectDetails} from "../model/project.details";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-all-projects',
  templateUrl: './all-projects.component.html',
  styleUrls: ['./all-projects.component.scss']
})
export class AllProjectsComponent implements OnInit {

  @ViewChild('widgetsContent') widgetsContent!: ElementRef;
  projects: ProjectDetails[] = [];
  isDashboard!: boolean;

  constructor(
    private projectsService: ProjectsService,
    private router: Router) { }

  ngOnInit(): void {
    this.isDashboard = this.router.isActive('dashboard', true);
    if(this.isDashboard) {
      this.projectsService.getProjects().pipe(tap(projects => this.projects = projects)).subscribe();
    } else {
      this.projectsService.getAllProjects().pipe(tap(projects => this.projects = projects)).subscribe();
    }
  }

  goToProject(id: number): void {
    this.router.navigate(['project/' + id]);
  }
}
