import {Injectable} from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
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

  setStoryPoints(id: number, storyPoints: string) {
    return this.http.patch(this.url + id + "/points/" + storyPoints, null);
  }

  removeUserStory(id: number) {
    return this.http.delete(this.url + id);
  }

  addIssueToUserStory(idUserStory: number, issue: CreateIssue) {
    return this.http.put<CreateIssue>(this.url + idUserStory + "/issue", issue);
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
