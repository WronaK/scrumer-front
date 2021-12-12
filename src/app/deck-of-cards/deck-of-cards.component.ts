import {Component, Input, OnInit} from '@angular/core';
import {ScrumPokerService} from "../services/scrum-poker.service";

@Component({
  selector: 'app-deck-of-cards',
  templateUrl: './deck-of-cards.component.html',
  styleUrls: ['./deck-of-cards.component.scss']
})
export class DeckOfCardsComponent implements OnInit {

  value: string[] = ['?', '0', '0.5', '1', '2', '3', '5', '8', '13', '20', '40', '100'];
  selectedDeck!: string;

  disabled!: boolean
  constructor(private scrumPokerService: ScrumPokerService) {
    this.scrumPokerService.startChange.subscribe((value) => {
      this.disabled = value;
    })
  }

  ngOnInit(): void {
  }

  vote(v: string) {
    if (this.disabled) {
      this.selectedDeck = v;
      this.scrumPokerService.vote(v).subscribe();
    }
  }
}
