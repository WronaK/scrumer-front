import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-deck-of-cards',
  templateUrl: './deck-of-cards.component.html',
  styleUrls: ['./deck-of-cards.component.scss']
})
export class DeckOfCardsComponent implements OnInit {

  value: string[] = ['?', '0', '0.5', '1', '2', '3', '5', '8', '13', '20', '40', '100'];
  constructor() { }

  ngOnInit(): void {
  }

}
