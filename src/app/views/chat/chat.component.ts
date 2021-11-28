import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebSocketService} from "../../services/web-socket.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginUser} from "../../model/login.user";
import {AuthService} from "../../services/auth.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {NewConversationComponent} from "../../dialog/new-conversation/new-conversation.component";
import {CreateMessageCommand} from "../../model/createMessageCommand";
import {ChannelsSubscribeService} from "../../services/channels-subscribe.service";
import {tap} from "rxjs/operators";
import {ChannelsService} from "../../services/channels.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  user!: LoginUser;
  messageForm: FormGroup;
  messageInput: FormControl;
  activeChannelName!: string;
  activeChannelId!: number;

  constructor(
    public webSocketService: WebSocketService,
    public authService: AuthService,
    private dialog: MatDialog,
    private channelsSubscribe: ChannelsSubscribeService,
    private channelService: ChannelsService
  ) {
    this.getUserData();
    this.messageInput = new FormControl('', Validators.required);
    this.messageForm = new FormGroup({
      messageInput: this.messageInput
    })

  }

  ngOnInit(): void {
    this.webSocketService.getChannels();
  }

  ngOnDestroy(): void {
    this.webSocketService.disconnect()
  }

  sendMessage() {
    console.log(this.activeChannelId)
    if (this.activeChannelId != null) {
      const messageDto = new CreateMessageCommand(this.activeChannelId, this.messageInput.value, this.user.id, this.user.name + " " + this.user.surname);
      this.webSocketService.setLastMessage(messageDto.content);
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

    this.webSocketService.activeChannelId = id;
    this.webSocketService.clearNotificationNumberNewMessage();
    this.webSocketService.loadsMessageActiveChannel();
    this.channelService.clearNotification(id);

  }
}
