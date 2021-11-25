import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {CreateIssue, IssueCommand, UpdateUserStory, UserStory} from "../model/task";

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private url = 'api/tasks/';
  constructor(
    private http: HttpClient
  ) { }

  getUserStory(id: number): Observable<UserStory> {
    return this.http.get<UserStory>("/api/user/story/" + id);
  }

  getIssueById(id: number): Observable<IssueCommand> {
    return this.http.get<IssueCommand>("/api/issue/" + id);
  }

  updateUserStory(userStory: UpdateUserStory): Observable<any> {
    return this.http.put<UpdateUserStory>("/api/user/story/", userStory);
  }

  removeUserStory(id: number) {
    return this.http.delete("/api/user/story/" + id);
  }

  moveUserStoryToTeam(id: number, idUserStory: number) {
    return this.http.patch("api/teams/" + id + "/user/story/" + idUserStory, null);
  }

  changeStatusIssue(id: number) {
    return this.http.patch("api/issue/" + id + "/status", null);
  }

  addIssueToRealize(idIssue: number, idUser: number) {
    return this.http.patch("api/issue/" + idIssue + "/realize/" + idUser, null);
  }

  getMyIssue() {
    return this.http.get<IssueCommand[]>("api/issue");
  }

  addIssueToUserStory(idUserStory: number, issue: CreateIssue) {
    return this.http.put<CreateIssue>("/api/user/story/" + idUserStory + "/issue", issue);
  }

  addIssue(issue: CreateIssue) {
    return this.http.post<CreateIssue>("api/issue", issue);
  }
}
