import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ProjectDetails} from "../model/project.details";
import {Team} from "../model/team";
import {ProjectsService} from "./projects.service";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ProjectDetailsService {

  idProject!: number;
  private project$: BehaviorSubject<ProjectDetails | null> = new BehaviorSubject<ProjectDetails | null>(null);
  private teams$: BehaviorSubject<Team[]> = new BehaviorSubject<Team[]>([]);

  constructor(private projectService: ProjectsService) { }

  setId(id: number) {
    this.idProject = id;
  }

  getProject(): Observable<ProjectDetails | null> {
    return this.project$.asObservable();
  }

  setProject(project: ProjectDetails) {
    this.project$.next(project);
  }

  getTeams(): Observable<Team[]> {
    return this.teams$.asObservable();
  }

  setTeam(teams: Team[]) {
    this.teams$.next(teams);
  }
  uploadProject() {
    this.projectService.getProjectById(this.idProject)
      .pipe(tap(project => this.setProject(project))).subscribe();
  }

  uploadTeams() {
    this.projectService.getTeamsWorkProject(this.idProject)
      .pipe(tap(teams => this.setTeam(teams))).subscribe();
  }
}
