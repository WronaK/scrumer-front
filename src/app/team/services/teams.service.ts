import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {JoinTeam, SuggestedTeam, Team, TeamDetails, TeamInformation, UpdateTeam} from "../model/team";
import {JoinProject, Project} from "../../project/model/project";
import {User} from "../../user/model/user";
import {SprintBacklog} from "../sprint-board/model/sprint.backlog";

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

  getTeams(): Observable<TeamDetails[]> {
    return this.http.get<TeamDetails[]>(this.url + 'my-teams');
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

  uploadCover(id: number, file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', this.url+id+"/cover", formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  getSuggestedTeam(name: String): Observable<SuggestedTeam[]> {
    return this.http.get<SuggestedTeam[]>(this.url + "find/" + name);
  }

  joinProjectToTeam(id: number, project: JoinProject) {
    return this.http.put<JoinProject>(this.url + id + "/project", project);
  }

  joinToTeam(team: JoinTeam) {
    return this.http.put<JoinTeam>(this.url + "/member", team);
  }

  uploadAttachment(id: number, file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', this.url+id+"/attachment", formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.http.request(req);
  }

  importCsv(idTeam: number, file: File): Observable<ImportResult> {
    const formData: FormData = new FormData();

    formData.append('csv', file);

    // const req = new HttpRequest('POST', "api/csv/"+idTeam+"/import", formData, {
    // });

    return this.http.post<ImportResult>("/api/csv/"+idTeam+"/import", formData);
  }
}
