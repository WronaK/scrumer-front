import { Component, OnInit } from '@angular/core';
import {TeamsService} from "../../../team/services/teams.service";
import {TeamDetails} from "../../../team/model/team";
import {Router} from "@angular/router";

@Component({
  selector: 'app-select-team',
  templateUrl: './select-team.component.html',
  styleUrls: ['./select-team.component.scss']
})
export class SelectTeamComponent implements OnInit {
  teams: TeamDetails[] = [];

  constructor(
    private teamsService: TeamsService,
    private router: Router,
  ) { }
  ngOnInit(): void {
    this.teamsService.getTeams().subscribe(teams => this.teams = teams);
  }

  selectedTeam(id: number) {
    this.router.navigate(["daily/" + id]);
  }
}
