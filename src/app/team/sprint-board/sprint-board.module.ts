import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {SprintBoardElementsComponent} from "./components/sprint-board-elements/sprint-board-elements.component";
import {SprintBacklogComponent} from "./components/sprint-backlog/sprint-backlog.component";
import {MaterialModule} from "../../material.module";
import {SharedModule} from "../../shared/shared.module";



@NgModule({
  declarations: [
    SprintBoardElementsComponent,
    SprintBacklogComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule
  ],
  exports: [
    SprintBoardElementsComponent,
    SprintBacklogComponent
  ]
})
export class SprintBoardModule { }
