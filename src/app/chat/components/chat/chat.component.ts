import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebSocketService} from "../../../services/web-socket.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginUser} from "../../../login/model/login.user";
import {AuthService} from "../../../login/services/auth.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {NewConversationComponent} from "../new-conversation/new-conversation.component";
import {CreateMessageCommand} from "../../model/createMessageCommand";
import {ChannelsSubscribeService} from "../../services/channels-subscribe.service";
import {tap} from "rxjs/operators";
import {ChannelsService} from "../../services/channels.service";
import {ChatEventService} from "../../services/chat-event.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  activeChannelName!: string;
  activeChannelId!: number;

  constructor(
    public webSocketService: WebSocketService,
    public authService: AuthService,
    private dialog: MatDialog,
    private channelsSubscribe: ChannelsSubscribeService,
    private channelService: ChannelsService,
    private chatEventService: ChatEventService
  ) {}

  ngOnInit(): void {
    this.chatEventService.getChannels()
  }

  ngOnDestroy(): void {
    this.webSocketService.disconnect()
  }
}
