import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {SuggestedUser} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  getSuggestedUser(name: string): Observable<SuggestedUser[]> {
    return this.http.get<SuggestedUser[]>("api/users/find/" + name);
  }

  uploadImageProfile(file: File) {
    const formData: FormData = new FormData();

    formData.append('profile', file);

    const req = new HttpRequest('POST', "/api/users/profile", formData, {
      responseType: 'json'
    });

    return this.http.request(req);
  }
}
