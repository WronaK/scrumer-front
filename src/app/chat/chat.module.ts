import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatComponent} from "./components/chat/chat.component";
import {NewConversationComponent} from "./components/new-conversation/new-conversation.component";
import {MaterialModule} from "../material.module";
import {TemplatesModule} from "../templates/templates.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    ChatComponent,
    NewConversationComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TemplatesModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ChatComponent
  ]
})
export class ChatModule { }
