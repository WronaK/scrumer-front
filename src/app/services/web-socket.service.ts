import {Injectable} from '@angular/core';
import {CreateMessageCommand} from "../chat/model/createMessageCommand";

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {LoginUser} from "../login/model/login.user";
import {MessageCommand} from "../model/messageCommand";
import {ChannelsSubscribeService} from "../chat/services/channels-subscribe.service";
import {tap} from "rxjs/operators";
import {ChannelsService} from "../chat/services/channels.service";
import {MessageService} from "./message.service";
import {Channel} from "../chat/model/chat.dto";
import {ScrumPokerService} from "../scrum-poker/services/scrum-poker.service";
import {ScrumPokerNotificationService} from "../scrum-poker/services/scrum-poker-notification.service";

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
  channels: Channel[] = [];

  constructor(
    private channelService: ChannelsService,
    private messageService: MessageService,
    private channelsSubscriberService: ChannelsSubscribeService,
    private scrumPokerService: ScrumPokerService,
    private scrumPokerEventService: ScrumPokerNotificationService
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

      _this.stompClient.subscribe(`/api/topic/${this.user.id}/queue/messages`, (message: any) => {
        const notification = JSON.parse(message.body);
        if(this.activeChannelId == notification.channelId) {
          this.messageService.getMessage(notification.messageId)
            .subscribe(message => {
              this.chatMessages.push(message);
              this.setLastMessage(message.content)
            });
        } else {
          this.incrementNumbersNewMessages(notification.channelId);
        }
      } );

      _this.stompClient.subscribe(`/api/topic/${this.user.id}/queue/scrum`, (response: any) => {
        this.scrumPokerEventService.executionEvent(JSON.parse(response.body));
      });
    });
  }

  getChannels() {
    this.channelsSubscriberService.uploadChannels();
    this.channelsSubscriberService.getChannels().pipe(tap(channels => this.channels = channels)).subscribe();
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

  public sendMessage(message: CreateMessageCommand) {
    this.stompClient.send(
      '/api/app/chat', {}, JSON.stringify(message));
    this.chatMessages.push(message)
  }

  public loadsMessageActiveChannel() {
    if (this.activeChannelId != null) {
      this.channelService.getChatMessages(this.activeChannelId).subscribe(messages =>
        this.chatMessages = messages);
    }
  }

  public setLastMessage(message: string) {
    this.channels.forEach(channel => {
      if (channel.idChannel == this.activeChannelId) {
        channel.lastMessage = message
      }
    });
  }

  public clearNotificationNumberNewMessage() {
    this.channels.forEach(channel => {
      if (channel.idChannel == this.activeChannelId) {
        channel.numberNewMessage = 0;
      }
    })
  }

  public incrementNumbersNewMessages(idChannel: number) {
    this.channels.forEach(channel => {
      if (channel.idChannel == idChannel) {
        channel.numberNewMessage += 1;
      }
    })
  }
}
