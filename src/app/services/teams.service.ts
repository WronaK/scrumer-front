import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Team} from "../model/team";

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

  getAllTeams(): Observable<any> {
    return this.http.get<Team[]>(this.url);
  }

  getTeams(): Observable<any> {
    return this.http.get<Team[]>(this.url + 'my-teams');
  }
}
