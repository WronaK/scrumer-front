import { Injectable } from '@angular/core';
import {ChatMessageDto} from "../model/ChatMessageDto";

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  webSocket!: WebSocket;
  chatMessages: ChatMessageDto[] = [];

  constructor() { }

  public openWebSocket() {
    this.webSocket = new WebSocket('ws://localhost:8080/api/test-chat');

    this.webSocket.onopen = (event) => {
      console.log('Open: ', event);
    };

    this.webSocket.onmessage = (event) => {
      const chatMessageDto = JSON.parse(event.data);
      this.chatMessages.push(chatMessageDto);
    };

    this.webSocket.onclose = (event) => {
      console.log('Close: ', event);
    };
  }

  public sendMessage(message: ChatMessageDto) {
    this.webSocket.send(JSON.stringify(message));
    console.log(message);
  }

  public closeWebSocket() {
    this.webSocket.close();
  }
}
