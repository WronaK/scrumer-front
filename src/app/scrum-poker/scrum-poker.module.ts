import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ScrumPokerComponent} from "./components/scrum-poker/scrum-poker.component";
import {DeckOfCardsComponent} from "./components/deck-of-cards/deck-of-cards.component";
import {MyCardComponent} from "./components/my-card/my-card.component";
import {NotificationStartScrumPokerComponent} from "./dialogs/notification-start-scrum-poker/notification-start-scrum-poker.component";
import {PlanComponent} from "./components/plan/plan.component";
import {TaskViewComponent} from "./components/task-view/task-view.component";
import {TeamEstimationComponent} from "./components/team-estimation/team-estimation.component";
import {CreateScrumPokerComponent} from "./dialogs/create-scrum-poker/create-scrum-poker.component";
import {AcceptEstimationComponent} from "./dialogs/accept-estimation/accept-estimation.component";
import {MaterialModule} from "../material.module";
import {ReactiveFormsModule} from "@angular/forms";
import {TemplatesModule} from "../templates/templates.module";

@NgModule({
  declarations: [
    ScrumPokerComponent,
    DeckOfCardsComponent,
    MyCardComponent,
    NotificationStartScrumPokerComponent,
    PlanComponent,
    TaskViewComponent,
    TeamEstimationComponent,
    CreateScrumPokerComponent,
    AcceptEstimationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    TemplatesModule
  ],
  exports: [
    ScrumPokerComponent
  ]
})
export class ScrumPokerModule { }
