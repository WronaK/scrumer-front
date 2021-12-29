import { Injectable } from '@angular/core';
import {ChatObservableService} from "./chat-observable.service";
import {MessageService} from "./message.service";
import {tap} from "rxjs/operators";
import {ChannelsSubscribeService} from "./channels-subscribe.service";
import {ChannelsService} from "./channels.service";

@Injectable({
  providedIn: 'root'
})
export class ChatEventService {

  idActivated!: number;

  constructor(
    private observableCharService: ChatObservableService,
    private messageService: MessageService,
    private channelsSubscriberService: ChannelsSubscribeService,
    private channelsService: ChannelsService
  ) {
    this.observableCharService.activatedChannel.subscribe(id => this.idActivated = id);
  }

  executionEvent(response: any) {
    const notification = JSON.parse(response.body);
    if(this.idActivated== notification.channelId) {
      this.messageService.getMessage(notification.messageId)
        .subscribe(message => {
          this.observableCharService.chatMessages.push(message);
          this.setLastMessage(message.content)
        });
    } else {
      this.incrementNumbersNewMessages(notification.channelId);
    }
  }

  public setLastMessage(message: string) {
    this.observableCharService.channels.forEach(channel => {
      if (channel.idChannel == this.idActivated) {
        channel.lastMessage = message
      }
    });
  }

  public incrementNumbersNewMessages(idChannel: number) {
    this.observableCharService.channels.forEach(channel => {
      if (channel.idChannel == idChannel) {
        channel.numberNewMessage += 1;
      }
    })
  }

  getChannels() {
    this.channelsSubscriberService.uploadChannels();
    this.channelsSubscriberService.getChannels().pipe(tap(channels => this.observableCharService.channels = channels)).subscribe();
  }

  public loadsMessageActiveChannel() {
    if (this.idActivated != null) {
      this.channelsService.getChatMessages(this.idActivated).subscribe(messages =>
        this.observableCharService.chatMessages = messages);
    }
  }

  public clearNotificationNumberNewMessage() {
    this.observableCharService.channels.forEach(channel => {
      if (channel.idChannel == this.idActivated) {
        channel.numberNewMessage = 0;
      }
    })
  }
}
