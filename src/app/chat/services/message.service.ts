import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {MessageCommand} from "../model/messageCommand";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  private url = 'api/messages/';

  constructor(private http: HttpClient) {}

  getMessage(id: string) {
    return this.http.get<MessageCommand>(this.url + id);
  }
}
