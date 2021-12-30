import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {ChannelsSubscribeService} from "../../services/channels-subscribe.service";
import {ChannelsService} from "../../services/channels.service";
import {ChatEventService} from "../../services/chat-event.service";
import {ChatObservableService} from "../../services/chat-observable.service";
import {Channel} from "../../model/chat.dto";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{

  channel!: Channel
  idActivatedCHannel!: number
  constructor(
    private dialog: MatDialog,
    private channelsSubscribe: ChannelsSubscribeService,
    private channelService: ChannelsService,
    private chatEventService: ChatEventService,
    private observableService: ChatObservableService
  ) {
    this.observableService.activatedChannel.subscribe(id => this.idActivatedCHannel = id);
  }

  ngOnInit(): void {
    this.chatEventService.getChannels();
    if (this.observableService.channels.length >= 0 ) {
      this.channel = this.observableService.channels[0];
      this.observableService.setActiveChannelName(this.channel.channelName);
      this.observableService.setActivatedChannel(this.channel.idChannel);

      this.chatEventService.clearNotificationNumberNewMessage();
      this.chatEventService.loadsMessageActiveChannel();
      this.channelService.clearNotification(this.channel.idChannel)
    }
  }
}
