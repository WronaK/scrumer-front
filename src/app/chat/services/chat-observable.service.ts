import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";
import {MessageCommand} from "../model/messageCommand";
import {Channel} from "../model/chat.dto";

@Injectable({
  providedIn: 'root'
})
export class ChatObservableService {

  channels: Channel[] = [];
  chatMessages: MessageCommand[] = [];
  activatedChannel: Subject<number> = new Subject<number>();
  activeChannelName: Subject<string> = new Subject<string>();

  constructor() { }

  setActivatedChannel(idChannel: number) {
    this.activatedChannel.next(idChannel);
  }

  setActiveChannelName(channel: string) {
    this.activeChannelName.next(channel);
  }
}
