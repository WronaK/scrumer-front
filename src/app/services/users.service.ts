import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {UserFind} from "../model/userFind";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  getProductOwner(name: string): Observable<UserFind[]> {
    return this.http.get<UserFind[]>("api/users/find/" + name);
  }
}
