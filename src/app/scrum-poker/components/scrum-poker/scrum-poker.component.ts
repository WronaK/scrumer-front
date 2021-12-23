import {Component, OnInit} from '@angular/core';
import {ScrumPoker} from "../../../model/scrum.poker.command";
import {ScrumPokerObservableService} from "../../services/scrum-poker-observable.service";

@Component({
  selector: 'app-scrum-poker',
  templateUrl: './scrum-poker.component.html',
  styleUrls: ['./scrum-poker.component.scss']
})
export class ScrumPokerComponent implements OnInit{

  scrumPoker!: ScrumPoker
  constructor(private observableScrumPokerService: ScrumPokerObservableService) {

  }

  ngOnInit() {
    this.scrumPoker = this.observableScrumPokerService.scrumPoker;
  }
}
