import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";
import {JoinTeam, Team} from "../../team/model/team";
import {CreateUserStory, UserStory} from "../user-story/model/task";
import {CreateProject, ProjectDetails, ProjectInformation, SuggestedProject, UpdateProject} from "../model/project";

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

  getProductBacklog(id: number): Observable<UserStory[]> {
    return this.http.get<UserStory[]>(this.url + id + '/product_backlog');
  }

  addUserStory(id: number, task: CreateUserStory) {
    return this.http.put<CreateUserStory>(this.url + id + '/product_backlog', task)
  }

  getTeamsWorkProject(id: number): Observable<Team[]> {
    return this.http.get<Team[]>(this.url + id + "/teams");
  }

  joinTeamToProject(id: number, team: JoinTeam) {
    return this.http.put<JoinTeam>(this.url + id + "/team", team);
  }

  removeTeamsWithProject(id: number, idTeams: number) {
    return this.http.patch(this.url + id + "/teams/" + idTeams + "/remove", null);
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

  getSuggestedProject(name: any): Observable<SuggestedProject[]> {
    return this.http.get<SuggestedProject[]>(this.url + "find/" + name);
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
}
