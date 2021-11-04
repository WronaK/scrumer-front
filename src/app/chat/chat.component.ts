import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebSocketService} from "../services/web-socket.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginUser} from "../model/login.user";
import {AuthService} from "../services/auth.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {NewConversationComponent} from "../new-conversation/new-conversation.component";
import {MessageDto} from "../model/message.dto";
import {Channel} from "../model/channel";
import {ChannelsSubscribeService} from "../services/channels-subscribe.service";
import {tap} from "rxjs/operators";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  user!: LoginUser;
  messageForm: FormGroup;
  messageInput: FormControl;
  channels: Channel[] = [];
  activeChannelName!: string;
  activeChannelId!: number;

  constructor(
    public webSocketService: WebSocketService,
    public authService: AuthService,
    private dialog: MatDialog,
    private channelsSubscribe: ChannelsSubscribeService
  ) {
    this.getUserData();
    this.getChannels();
    this.messageInput = new FormControl('', Validators.required);
    this.messageForm = new FormGroup({
      messageInput: this.messageInput
    })
  }

  getChannels() {
    this.channelsSubscribe.uploadChannels();
    this.channelsSubscribe.getChannels().pipe(tap(channels => this.channels = channels)).subscribe();
  }

  ngOnInit(): void {
    this.webSocketService.openWebSocket();
  }

  ngOnDestroy(): void {
    this.webSocketService.disconnect()
  }

  sendMessage() {
    console.log(this.activeChannelId)
    if (this.activeChannelId != null) {
      const messageDto = new MessageDto(this.activeChannelId, this.messageInput.value, this.user.id, this.user.name + " " + this.user.surname);
      this.webSocketService.sendMessage(messageDto);
      this.messageForm.reset();
    }
  }

  getUserData() {
    this.authService.getUserData().subscribe(user => {
      this.user = user;
    });
  }

  createNewConversation() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    this.dialog.open(NewConversationComponent, dialogConfig)
      .afterClosed()
      .pipe(
        tap(() => {
          this.channelsSubscribe.uploadChannels()
        })
      ).subscribe()
  }

  setActiveChannel(id: number, name: string) {
    this.activeChannelId = id;
    this.activeChannelName = name;
  }
}
