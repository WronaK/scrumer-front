import { Component, OnInit } from '@angular/core';
import {ScrumPokerService} from "../services/scrum-poker.service";
import {ScrumPoker} from "../model/scrum.poker.command";
import {Observable} from "rxjs";

@Component({
  selector: 'app-scrum-poker',
  templateUrl: './scrum-poker.component.html',
  styleUrls: ['./scrum-poker.component.scss']
})
export class ScrumPokerComponent implements OnInit{

  scrumPoker!: ScrumPoker
  constructor(private scrumPokerService: ScrumPokerService) {

  }

  ngOnInit() {
    this.scrumPoker = this.scrumPokerService.scrumPoker;
  }
}
