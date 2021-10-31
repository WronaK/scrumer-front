import {Injectable} from '@angular/core';
import {MessageDto} from "../model/message.dto";

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {LoginUser} from "../model/login.user";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocket!: WebSocket;
  chatMessages: MessageDto[] = [];
  stompClient: any
  disabled = true;
  user!: LoginUser;

  constructor(
    private authService: AuthService
  ) {
    this.authService.getUserData().subscribe(user => {
      this.user = user;
    });  }

  setConnected(connected: boolean) {
    this.disabled = !connected;
  }

  public openWebSocket() {
    this.webSocket =  new SockJS('/api/test')
    this.stompClient = Stomp.over(this.webSocket);
    const _this = this;


    this.stompClient.connect({}, (frame: any) => {
      _this.setConnected(true);
      console.log('Connected: ' + frame);

      _this.stompClient.subscribe(`/api/topic/${this.user.id}/queue/messages`, (message: any) => {
        const notification = JSON.parse(message.body);
        console.log("Receiving the message")
      } )
    });
  }

  disconnect() {
    if (this.stompClient != null) {
      this.stompClient.disconnect();
    }

    this.setConnected(false);
    console.log('Disconnected!');
  }

  public sendMessage(message: MessageDto) {
    this.stompClient.send(
      '/api/app/chat', {}, JSON.stringify(message));
    this.chatMessages.push(message)
  }
}
