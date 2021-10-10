import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Team} from "../model/team";
import {UpdateTeam} from "../model/update.team";
import {Members} from "../model/member";
import {JoinProject} from "../model/join.project";
import {JoinTeam} from "../model/join.teams";
import {Project} from "../model/project";
import {User} from "../model/user";
import {TeamDetails} from "../model/team.details";
import {SprintBacklog} from "../model/sprint.backlog";

class CreateTeam {
}

@Injectable({
  providedIn: 'root'
})
export class TeamsService {

  private url = 'api/teams/';
  constructor(private http: HttpClient) { }

  createTeam(team: CreateTeam) {
    return this.http.post(this.url, team);
  }

  getTeamById(id: number): Observable<any> {
    return this.http.get<TeamDetails>(this.url + id);
  }

  getAllTeams(): Observable<any> {
    return this.http.get<Team[]>(this.url);
  }

  getTeams(): Observable<any> {
    return this.http.get<Team[]>(this.url + 'my-teams');
  }

  getTasksSprintBacklog(id: number): Observable<SprintBacklog> {
    return this.http.get<SprintBacklog>(this.url + id + '/sprint_backlog');
  }

  getProjectsById(id: number): Observable<any> {
    return this.http.get<Project[]>(this.url + id + '/projects');
  }

  getMembers(id: number) {
    return this.http.get<User[]>(this.url + id + '/members');
  }

  updateTeam(team: UpdateTeam) {
    return this.http.put<UpdateTeam>(this.url, team);
  }

  addMembers(id: number, members: Members) {
    return this.http.put<Members>(this.url + id + '/members', members);
  }

  joinProject(id: number, projects: JoinProject) {
    return this.http.put<JoinProject>(this.url + id + '/projects', projects);
  }

  joinTeam(team: JoinTeam) {
    return this.http.put<JoinTeam>('api/users/join', team);
  }

  removeProjectWithTeam(id: number, idProject: number) {
    return this.http.patch(this.url + id + "/projects/" + idProject + "/remove", null);
  }
}
