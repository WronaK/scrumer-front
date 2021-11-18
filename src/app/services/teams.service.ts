import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Team, TeamDetails, TeamInformation, UpdateTeam} from "../model/team";
import {JoinProject, Project} from "../model/project";
import {User} from "../model/user";
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

  getInformationAboutTeam(idTeam: number): Observable<TeamInformation> {
    return this.http.get<TeamInformation>(this.url + idTeam + "/information");
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

  addMember(idTeam: number, idMember: number) {
    return this.http.put(this.url + idTeam + '/member/' + idMember, null);
  }

  joinProject(id: number, projects: JoinProject) {
    return this.http.put<JoinProject>(this.url + id + '/projects', projects);
  }


  removeProjectWithTeam(id: number, idProject: number) {
    return this.http.patch(this.url + id + "/projects/" + idProject + "/remove", null);
  }
}
