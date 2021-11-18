import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {JoinTeams, Team} from "../model/team";
import {CreateTask, Task} from "../model/task";
import {CreateProject, ProjectDetails, ProjectInformation, UpdateProject} from "../model/project";

@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  private url = 'api/projects/';
  constructor(
    private http: HttpClient
  ) { }

  createProject(project: CreateProject) {
    return this.http.post(this.url, project);
  }

  getProjectById(id: number): Observable<ProjectDetails> {
    return this.http.get<ProjectDetails>(this.url + id);
  }

  getInformationAboutProject(idProject: number): Observable<ProjectInformation> {
    return this.http.get<ProjectInformation>(this.url + idProject + "/information");
  }

  getProjectByIdUpdate(id: number): Observable<UpdateProject> {
    return this.http.get<UpdateProject>(this.url + id + "/update");
  }

  updateProject(project: UpdateProject) {
    return this.http.put<UpdateProject>(this.url, project);
  }

  getProjects(): Observable<any>  {
    return this.http.get<ProjectDetails[]>(this.url + "my-projects");
  }

  getAllProjects(): Observable<any> {
    return this.http.get<ProjectDetails[]>(this.url);
  }

  getTasksToProductBacklog(id: number): Observable<Task[]> {
    return this.http.get<Task[]>(this.url + id + '/product_backlog');
  }

  addTaskToProductBacklog(id: number, task: CreateTask) {
    return this.http.put<CreateTask>(this.url + id + '/product_backlog', task)
  }

  getTeamsWorkProject(id: number): Observable<Team[]> {
    return this.http.get<Team[]>(this.url + id + "/teams");
  }

  joinTeamsToProject(id: number, teams: JoinTeams) {
    return this.http.put<JoinTeams>(this.url + id + "/teams", teams);
  }

  removeTeamsWithProject(id: number, idTeams: number) {
    return this.http.patch(this.url + id + "/teams/" + idTeams + "/remove", null);
  }
}
