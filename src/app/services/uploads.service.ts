import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UploadsService {

  private baseUrl = "api/uploads";

  constructor(
    private httpClient: HttpClient
  ) { }

  getFile(id: number) {
    return this.httpClient.get(this.baseUrl + "/" + id + "/file", {responseType: 'blob'});
  }

  getImage(id: number): Observable<Blob> {
    return this.httpClient.get(`${this.baseUrl}/${id}/image`, {responseType: 'blob'});
  }

  getProfileImage(): Observable<Blob> {
    return this.httpClient.get(`${this.baseUrl}/profile`, {responseType: 'blob'});
  }
}
