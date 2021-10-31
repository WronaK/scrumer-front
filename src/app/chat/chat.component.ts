import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebSocketService} from "../services/web-socket.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {LoginUser} from "../model/login.user";
import {AuthService} from "../services/auth.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {NewConversationComponent} from "../new-conversation/new-conversation.component";
import {MessageDto} from "../model/message.dto";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  user!: LoginUser;
  messageForm: FormGroup;
  messageInput: FormControl;

  constructor(
    public webSocketService: WebSocketService,
    public authService: AuthService,
    private dialog: MatDialog
  ) {
    this.getUserData();

    this.messageInput = new FormControl('', Validators.required);
    this.messageForm = new FormGroup({
      messageInput: this.messageInput
    })
  }

  ngOnInit(): void {
    this.webSocketService.openWebSocket();
  }

  ngOnDestroy(): void {
    this.webSocketService.disconnect()
  }

  sendMessage() {
    const messageDto = new MessageDto(54, this.messageInput.value, this.user.email);
    this.webSocketService.sendMessage(messageDto);
    this.messageForm.reset();
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
    this.dialog.open(NewConversationComponent, dialogConfig);

    //to do update conversation
  }

}
