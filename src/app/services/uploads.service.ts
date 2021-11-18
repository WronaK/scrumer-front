import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadsService {

  private baseUrl = "api/uploads";

  constructor(
    private httpClient: HttpClient
  ) { }

  upload(id: number, file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();

    formData.append('file', file);

    const req = new HttpRequest('POST', "/api/projects/"+id+"/cover", formData, {
      reportProgress: true,
      responseType: 'json'
    });

    return this.httpClient.request(req);
  }

  getFiles(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/files`);
  }

  getProjectCover(id: number): Observable<Blob> {
    return this.httpClient.get(`${this.baseUrl}/${id}/project/cover`, {responseType: 'blob'});
  }
}
