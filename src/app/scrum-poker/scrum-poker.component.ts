import { Component, OnInit } from '@angular/core';
import {ScrumPokerService} from "../services/scrum-poker.service";

@Component({
  selector: 'app-scrum-poker',
  templateUrl: './scrum-poker.component.html',
  styleUrls: ['./scrum-poker.component.scss']
})
export class ScrumPokerComponent implements OnInit {

  userId: number[] = [];
  constructor(private scrumPokerService: ScrumPokerService) { }

  ngOnInit(): void {
    this.userId = this.scrumPokerService.userId;
  }

}
