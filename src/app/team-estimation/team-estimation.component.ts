import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-estimation',
  templateUrl: './team-estimation.component.html',
  styleUrls: ['./team-estimation.component.scss']
})
export class TeamEstimationComponent implements OnInit {

  teamEstimate: string[] = ['?', '?', '?', '?', '?', '?', '?', '?', '?','?', '?', '?'];
  constructor() { }

  ngOnInit(): void {
  }

}
