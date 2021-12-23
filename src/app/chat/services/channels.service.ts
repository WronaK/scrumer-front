import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MessageCommand} from "../../model/messageCommand";
import {Channel, CreateChannel} from "../model/chat.dto";

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {

  private url = 'api/channels/';

  constructor(private http: HttpClient) { }

  getChannels(): Observable<any> {
    return this.http.get<Channel[]>('api/users/' + "channels");
  }

  createNewChannel(createChannel : CreateChannel) {
    return this.http.post(this.url, createChannel);
  }

  getChatMessages(idChannel: number): Observable<any> {
    return this.http.get<MessageCommand[]>(this.url + idChannel + "/messages");
  }

  clearNotification(idChannel: number) {
    return this.http.post(this.url + idChannel + "/clear/notification", null).subscribe();
  }
}
