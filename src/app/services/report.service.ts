import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private url = 'api/report/';
  constructor(
    private http: HttpClient
  ) { }

  getProductBacklogReport(idProject: number) {
    return this.http.get(this.url + "productBacklog/" + idProject, {responseType: 'blob'});
  }
}
