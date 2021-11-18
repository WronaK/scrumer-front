import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";
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
}
