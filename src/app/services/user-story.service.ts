import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {CreateIssue, UpdateUserStory, UserStory} from "../model/task";

@Injectable({
  providedIn: 'root'
})
export class UserStoryService {


  private url = '/api/user/story/';
  constructor(
    private http: HttpClient
  ) { }

  getUserStory(id: number): Observable<UserStory> {
    return this.http.get<UserStory>(this.url + id);
  }

  updateUserStory(userStory: UpdateUserStory): Observable<any> {
    return this.http.put<UpdateUserStory>(this.url, userStory);
  }

  removeUserStory(id: number) {
    return this.http.delete(this.url + id);
  }

  addIssueToUserStory(idUserStory: number, issue: CreateIssue) {
    return this.http.put<CreateIssue>(this.url + idUserStory + "/issue", issue);
  }
}
