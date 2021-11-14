import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-team-estimation',
  templateUrl: './team-estimation.component.html',
  styleUrls: ['./team-estimation.component.scss']
})
export class TeamEstimationComponent implements OnInit {

  @Input()
  usersId!: number[];
  // teamEstimate: string[] = ['?', '?', '?', '?', '?', '?', '?', '?', '?','?', '?', '?'];
  constructor() { }

  ngOnInit(): void {
    console.log(this.usersId);
  }

}
