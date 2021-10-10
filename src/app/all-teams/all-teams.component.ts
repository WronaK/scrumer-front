import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {Team} from "../model/team";
import {TeamsService} from "../services/teams.service";

@Component({
  selector: 'app-all-teams',
  templateUrl: './all-teams.component.html',
  styleUrls: ['./all-teams.component.scss']
})
export class AllTeamsComponent implements OnInit {

  @ViewChild('widgetsContent') widgetsContent!: ElementRef;
  teams: Team[] = [];
  isDashboard!: boolean;

  constructor(
    private teamsService: TeamsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isDashboard = this.router.isActive('dashboard', true);
    // if(this.isDashboard) {
    //   this.teamsService.getTeams().pipe(tap(teams => this.teams = teams)).subscribe();
    // } else {
    //   this.teamsService.getAllTeams().pipe(tap(teams => this.teams = teams)).subscribe();
    // }
  }

  goToTeam(id: number) {
    this.router.navigate(['team/' + id]);
  }
}
