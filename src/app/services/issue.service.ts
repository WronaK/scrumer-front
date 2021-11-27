import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CreateIssue, IssueCommand} from "../model/task";

@Injectable({
  providedIn: 'root'
})
export class IssueService {

  private url = 'api/issue/';
  constructor(
    private http: HttpClient
  ) { }

  getIssueById(id: number): Observable<IssueCommand> {
    return this.http.get<IssueCommand>(this.url + id);
  }

  moveUserStoryToTeam(id: number, idUserStory: number) {
    return this.http.patch("api/teams/" + id + "/user/story/" + idUserStory, null);
  }

  changeStatusIssue(id: number) {
    return this.http.patch(this.url + id + "/status", null);
  }

  addIssueToRealize(idIssue: number, idUser: number) {
    return this.http.patch(this.url + idIssue + "/realize/" + idUser, null);
  }

  getMyIssue() {
    return this.http.get<IssueCommand[]>(this.url);
  }

  addIssue(issue: CreateIssue) {
    return this.http.post<CreateIssue>(this.url, issue);
  }

  addIssueToRealizeMe(idIssue: number) {
    return this.http.patch(this.url + idIssue + "/realize/me", null);
  }
}
