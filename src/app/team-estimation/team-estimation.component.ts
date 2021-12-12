import {Component, Input, OnInit} from '@angular/core';
import {ScrumPokerService} from "../services/scrum-poker.service";
import {TeamVote} from "../model/scrum.poker.command";

@Component({
  selector: 'app-team-estimation',
  templateUrl: './team-estimation.component.html',
  styleUrls: ['./team-estimation.component.scss']
})
export class TeamEstimationComponent implements OnInit {

  @Input()
  teamEstimation!: TeamVote[];

  result: string = "???";

  // teamEstimate: string[] = ['?', '?', '?', '?', '?', '?', '?', '?', '?','?', '?', '?'];
  constructor(private scrumPokerService: ScrumPokerService) {
    this.scrumPokerService.resultChange.subscribe((value) => this.result = value);
  }

  ngOnInit(): void {
  }

  startEstimation() {
    this.scrumPokerService.startEstimationPoker();
  }

  stopEstimation() {
    this.scrumPokerService.stopEstimation();
  }

  acceptResult() {

  }
}
