import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddUserStory} from "./dialog/add-user-story/add-user-story.component";
import {MoveUserStoryComponent} from "./dialog/move-user-story/move-user-story.component";
import {RemoveUserStoryComponent} from "./dialog/remove-user-story/remove-user-story.component";
import {ShowUserStoryInSprintBoardComponent} from "./dialog/show-user-story-in-sprint-board/show-user-story-in-sprint-board.component";
import {UpdateUserStoryComponent} from "./dialog/update-user-story/update-user-story.component";
import {TemplatesModule} from "../../templates/templates.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../material.module";

@NgModule({
  declarations: [
    AddUserStory,
    MoveUserStoryComponent,
    RemoveUserStoryComponent,
    ShowUserStoryInSprintBoardComponent,
    UpdateUserStoryComponent
  ],
  imports: [
    CommonModule,
    TemplatesModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    AddUserStory,
    MoveUserStoryComponent,
    RemoveUserStoryComponent,
    ShowUserStoryInSprintBoardComponent,
    UpdateUserStoryComponent
  ]
})
export class UserStoryModule { }
