import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CreateChannel} from "../model/createChannel";

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private url = '/api/channels';
  constructor(private http: HttpClient) { }

  createNewChannel(createChannel : CreateChannel) {
    return this.http.post(this.url, createChannel);
  }
}
