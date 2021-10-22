import {Component, OnDestroy, OnInit} from '@angular/core';
import {WebSocketService} from "../services/web-socket.service";
import {FormControl, FormGroup, NgForm, Validators} from "@angular/forms";
import {ChatMessageDto} from "../model/ChatMessageDto";
import {HeaderComponent} from "../header/header.component";
import {User} from "../model/user";
import {LoginUser} from "../model/login.user";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit, OnDestroy {

  user!: LoginUser;
  messageForm: FormGroup;
  messageInput: FormControl;

  constructor(public webSocketService: WebSocketService, public authService: AuthService) {
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
    this.webSocketService.closeWebSocket();
  }

  sendMessage() {
    const chatMessageDto = new ChatMessageDto(this.user.email, this.messageInput.value);
    this.webSocketService.sendMessage(chatMessageDto);
    this.messageForm.reset();
    // sendForm.controls.message.reset();
  }

  getUserData() {
    this.authService.getUserData().subscribe(user => {
      this.user = user;
    });
  }

}
