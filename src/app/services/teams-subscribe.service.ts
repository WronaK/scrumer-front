import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {Team, TeamDetails} from "../model/team";
import {TeamsService} from "./teams.service";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TeamsSubscribeService {

  private teams$: BehaviorSubject<TeamDetails[]> = new BehaviorSubject<TeamDetails[]>([]);

  constructor(private teamsService: TeamsService) { };

  getTeams(): Observable<TeamDetails[]> {
    return this.teams$.asObservable();
  }

  setTeam(teams: TeamDetails[]) {
    this.teams$.next(teams);
  }

  uploadTeams() {
    this.teamsService.getTeams()
      .pipe(tap(teams => this.setTeam(teams))).subscribe();
  }
}
