import {Injectable} from '@angular/core';
import {CreateMessageCommand} from "../model/createMessageCommand";

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {LoginUser} from "../model/login.user";
import {MessageCommand} from "../model/messageCommand";
import {ChannelsSubscribeService} from "./channels-subscribe.service";
import {tap} from "rxjs/operators";
import {ChannelsService} from "./channels.service";
import {MessageService} from "./message.service";
import {Channel} from "../model/chat.dto";
import {ScrumPokerService} from "./scrum-poker.service";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";
import {ScrumPokerCommand} from "../model/scrum.poker.command";

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
  horizontalPosition: MatSnackBarHorizontalPosition = "center";
  verticalPosition: MatSnackBarVerticalPosition = "bottom";

  constructor(
    private channelService: ChannelsService,
    private messageService: MessageService,
    private channelsSubscriberService: ChannelsSubscribeService,
    private scrumPokerService: ScrumPokerService,
    private _snackBar: MatSnackBar
  ) {}

  openSnackBar(message: string) {
    this._snackBar.open(message, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

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
        console.log("Scrum ppoker is: " + m );
        this.scrumPokerService.notificationStartScrumPoker(m.idScrumPoker);
      });

      _this.stompClient.subscribe(`/api/topic/${this.user.id}/queue/join`, (message: any) => {
        console.log("MMM: ", message)
        this.scrumPokerService.setScrumPoker(JSON.parse(message.body));
        // this.scrumPokerService.addUser(message.id);
      });

      _this.stompClient.subscribe(`/api/topic/${this.user.id}/queue/start`,(message: any) => {
        const result = JSON.parse(message.body);
        this.scrumPokerService.resultChange.next("???");
        this.scrumPokerService.setScrumPoker(result);
        this.openSnackBar("Start estimating for the task number " + result.currentTask);
        this.scrumPokerService.setStartEstimation(true);
        this.scrumPokerService.selectedDeck.next("");
        this.scrumPokerService.setCurrentTask(this.scrumPokerService.scrumPoker.currentTask)
      } );

      _this.stompClient.subscribe(`/api/topic/${this.user.id}/queue/vote`,(message: any) => {
        const result = JSON.parse(message.body);
        this.scrumPokerService.newVote(result.idUser);
      } );

      _this.stompClient.subscribe(`/api/topic/${this.user.id}/queue/st`,(message: any) => {
        const result = JSON.parse(message.body);
        this.scrumPokerService.setResult(result);
        this.openSnackBar("Stop estimating for the task number " + result.idTask);
        this.scrumPokerService.setStartEstimation(false);
      } );

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
