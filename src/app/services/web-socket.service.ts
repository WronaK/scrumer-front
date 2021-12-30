import {Injectable} from '@angular/core';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {LoginUser} from "../login/model/login.user";
import {MessageCommand} from "../chat/model/messageCommand";
import {ChannelsSubscribeService} from "../chat/services/channels-subscribe.service";
import {ChannelsService} from "../chat/services/channels.service";
import {MessageService} from "../chat/services/message.service";
import {ScrumPokerService} from "../scrum-poker/services/scrum-poker.service";
import {ScrumPokerNotificationService} from "../scrum-poker/services/scrum-poker-notification.service";
import {ChatEventService} from "../chat/services/chat-event.service";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocket!: WebSocket;
  chatMessages: MessageCommand[] = [];
  stompClient!: any;
  disabled = true;
  user!: LoginUser;
  activeChannelId!: number;

  constructor(
    private channelService: ChannelsService,
    private messageService: MessageService,
    private channelsSubscriberService: ChannelsSubscribeService,
    private scrumPokerService: ScrumPokerService,
    private scrumPokerEventService: ScrumPokerNotificationService,
    private channelEventService: ChatEventService
  ) {}

  setConnected(connected: boolean) {
    this.disabled = !connected;
  }

  public openWebSocket(token: string, user: LoginUser) {
    this.chatMessages = [];
    this.webSocket =  new SockJS('/api/ws')
    this.stompClient = Stomp.over(this.webSocket);
    const _this = this;

    this.user = user;
    console.log(user);
    const headers = {
      Authorization: "Bearer " + token
    };

    console.log(headers);

    this.stompClient.connect(headers, (frame: any) => {
      _this.setConnected(true);
      console.log('Connected: ' + frame);

      _this.stompClient.subscribe(`/api/topic/${this.user.id}/queue/chat`, (message: any) => {
        this.channelEventService.executionEvent(message);
      } );

      _this.stompClient.subscribe(`/api/topic/${this.user.id}/queue/scrum`, (response: any) => {
        this.scrumPokerEventService.executionEvent(JSON.parse(response.body));
      });
    });
  }


  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }

    if (!!this.webSocket) {
      this.webSocket.close();
    }

    this.setConnected(false);
  }
}
