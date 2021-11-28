import {Injectable} from '@angular/core';
import {CreateMessageCommand} from "../model/createMessageCommand";

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {LoginUser} from "../model/login.user";
import {AuthService} from "./auth.service";
import {MessageCommand} from "../model/messageCommand";
import {ChannelsSubscribeService} from "./channels-subscribe.service";
import {tap} from "rxjs/operators";
import {ChannelsService} from "./channels.service";
import {MessageService} from "./message.service";
import {Channel} from "../model/chat.dto";

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
    private scrumPokerService: ScrumPokerService
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

      _this.stompClient.subscribe(`/api/topic/${this.user.id}/queue/scrum`, (message: any) => {
        const m = JSON.parse(message.body);
        this.scrumPokerService.notificationStartScrumPoker(m.id).afterClosed()
          .subscribe( result => {
            if (result) {
              this.joinUser(m.idTeam)
            }
          })
      });

      _this.stompClient.subscribe(`/api/topic/${this.user.id}/queue/join`, (message: any) => {
        const m = JSON.parse(message.body);
        this.scrumPokerService.addUser(message.id);
      });
    });

  }

  getChannels() {
    this.channelsSubscriberService.uploadChannels();
    this.channelsSubscriberService.getChannels().pipe(tap(channels => this.channels = channels)).subscribe();
  }

  disconnect() {
    if (this.stompClient != null) {
      // this.stompClient.unsubscribe()
      // this.stompClient.removeAllListeners();
      this.stompClient.disconnect();
    }

    if (!!this.webSocket) {
      // @ts-ignore
      // this.webSocket.removeAllListeners(`/api/topic/${this.user.id}/queue/join`);
      this.webSocket.close();
    }

    this.setConnected(false);
    console.log('Disconnected!');
  }

  public joinUser(idTeam: number) {
    console.log("join " + this.user.id);
    let command = new Command(this.user.id, idTeam);

    this.stompClient.send(
      '/api/app/join', {}, JSON.stringify(command)
    );
  }

  public sendMessage(message: CreateMessageCommand) {
    console.log("send");
    this.stompClient.send(
      '/api/app/chat', {}, JSON.stringify(message));
    this.chatMessages.push(message)
  }

  public initScrumPoker(idTeam: number) {
    console.log("init");
    console.log(idTeam)
    let scrumpoker = new ScrumPokerCommand(idTeam);
    this.stompClient.send(
      '/api/app/example', {}, JSON.stringify(scrumpoker)
    );
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
