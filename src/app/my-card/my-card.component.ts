import {Component, Input, OnInit} from '@angular/core';
import {ScrumPokerService} from "../services/scrum-poker.service";

@Component({
  selector: 'app-my-card',
  templateUrl: './my-card.component.html',
  styleUrls: ['./my-card.component.scss']
})
export class MyCardComponent implements OnInit {

  @Input()
  value: any;

  @Input()
  my!: boolean;

  @Input()
  disabled: boolean = false;

  @Input()
  slectDeck!: string;

  constructor() {

  }

  ngOnInit(): void {
  }

}
