import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TeamsDetailsService} from "../../services/teams-details.service";
import {TeamInformation} from "../../model/team";
import {TeamsService} from "../../services/teams.service";

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss']
})
export class TeamComponent implements OnInit {

  team!: TeamInformation;

  constructor(
    private teamsService: TeamsService,
    private teamsDetailsService: TeamsDetailsService,
    private route: ActivatedRoute
  ) {
    route.params.subscribe(params => {
      this.teamsDetailsService.setId(parseInt(params['id']))
    })
  }

  ngOnInit(): void {
    this.teamsService.getInformationAboutTeam(this.teamsDetailsService.idTeam)
      .subscribe(team => this.team = team);
  }
}
