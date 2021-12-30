import {Component} from '@angular/core';
import {ScrumPokerService} from "../../services/scrum-poker.service";
import {ScrumPokerObservableService} from "../../services/scrum-poker-observable.service";

@Component({
  selector: 'app-deck-of-cards',
  templateUrl: './deck-of-cards.component.html',
  styleUrls: ['./deck-of-cards.component.scss']
})
export class DeckOfCardsComponent {

  value: string[] = ['?', '0', '0.5', '1', '2', '3', '5', '8', '13', '20', '40', '100'];
  selectedValue!: string;

  isActive!: boolean
  constructor(
    private observableScrumPokerService: ScrumPokerObservableService,
    private scrumPokerService: ScrumPokerService) {
    this.observableScrumPokerService.startChange.subscribe((value) => {
      this.isActive = value;
    })
    this.observableScrumPokerService.selectedDeck.subscribe((value) => this.selectedValue=value)
  }

  vote(v: string) {
    if (this.isActive) {
      this.observableScrumPokerService.selectedDeck.next(v);
      this.scrumPokerService.vote(v).subscribe();
    }
  }
}
