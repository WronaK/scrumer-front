import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Channel} from "../model/channel";

@Injectable({
  providedIn: 'root'
})
export class ChannelsService {

  private url = 'api/users/';

  constructor(private http: HttpClient) { }

  getChannels(): Observable<any> {
    return this.http.get<Channel[]>(this.url + "channels");
  }
}
