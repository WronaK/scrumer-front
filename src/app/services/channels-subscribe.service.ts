import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {ChannelsService} from "./channels.service";
import {tap} from "rxjs/operators";
import {Channel} from "../model/chat.dto";

@Injectable({
  providedIn: 'root'
})
export class ChannelsSubscribeService {

  private channels$: BehaviorSubject<Channel[]> = new BehaviorSubject<Channel[]>([]);

  constructor(private channelsService: ChannelsService) { }

  getChannels(): Observable<Channel[]> {
    return this.channels$.asObservable();
  }

  setChannel(channels: Channel[]) {
    this.channels$.next(channels);
  }

  uploadChannels() {
    this.channelsService.getChannels()
      .pipe(tap(channels => this.setChannel(channels))).subscribe();
  }
}
