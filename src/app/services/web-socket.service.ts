import {Injectable} from '@angular/core';
import {CreateMessageCommand} from "../model/createMessageCommand";

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {LoginUser} from "../model/login.user";
import {AuthService} from "./auth.service";
import {MessageCommand} from "../model/messageCommand";
import {ChannelsSubscribeService} from "./channels-subscribe.service";
import {Channel} from "../model/channel";
import {tap} from "rxjs/operators";
import {ChannelsService} from "./channels.service";
import {MessageService} from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocket!: WebSocket;
  chatMessages: MessageCommand[] = [];
  stompClient: any
  disabled = true;
  user!: LoginUser;
  activeChannelId!: number;
  channels: Channel[] = [];

  constructor(
    private authService: AuthService,
    private channelService: ChannelsService,
    private messageService: MessageService,
    private channelsSubscriberService: ChannelsSubscribeService
  ) {
    this.authService.getUserData().subscribe(user => {
      this.user = user;
    });  }

  setConnected(connected: boolean) {
    this.disabled = !connected;
  }

  public openWebSocket() {
    this.chatMessages = [];
    this.webSocket =  new SockJS('/api/test')
    this.stompClient = Stomp.over(this.webSocket);
    const _this = this;

    this.getChannels();

    const headers = {
      Authorization: "Bearer " + this.authService.getToken()
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
      } )
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

    this.setConnected(false);
    console.log('Disconnected!');
  }

  public sendMessage(message: CreateMessageCommand) {
    console.log("send");
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
