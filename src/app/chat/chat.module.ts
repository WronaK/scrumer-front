import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ChatComponent} from "./components/chat/chat.component";
import {NewConversationComponent} from "./components/new-conversation/new-conversation.component";
import {MaterialModule} from "../material.module";
import {TemplatesModule} from "../templates/templates.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SidePanelComponent } from './components/side-panel/side-panel.component';
import { MessagePanelComponent } from './components/message-panel/message-panel.component';
import { ChannelComponent } from './components/channel/channel.component';
import {SharedModule} from "../shared/shared.module";
import {PipesModule} from "../pipes/pipes.module";

@NgModule({
  declarations: [
    ChatComponent,
    NewConversationComponent,
    SidePanelComponent,
    MessagePanelComponent,
    ChannelComponent
  ],
    imports: [
        CommonModule,
        MaterialModule,
        TemplatesModule,
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        PipesModule
    ],
  exports: [
    ChatComponent
  ]
})
export class ChatModule { }
