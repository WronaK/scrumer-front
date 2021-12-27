import { Injectable } from '@angular/core';
import {CreateTask, Daily} from "../model/createTask";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DailyService {

  private url = 'api/daily';

  constructor(
    private http: HttpClient
  ) { }

  savedNewTask(task: CreateTask) {
    return this.http.post(this.url, task);
  }

  getDaily(idTeam: number) {
    return this.http.get<Daily>(this.url + "/" + idTeam);
  }
}
