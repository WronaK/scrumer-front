import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CreateChannels} from "../model/create.channels";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = '/api/channels/';
  constructor(private http: HttpClient) { }

  createNewConversation(email: String) {
    return this.http.post(this.url, email);
  }

  createNewChannel(createChannel : CreateChannels) {
    return this.http.post(this.url, createChannel);
  }
}
