import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ImportOption, MapHeaderCommand, MyValue, ReadHeaders, Result} from "../model/importCsv";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ImportDataService {

  private url = '/api/csv/';
  constructor(private http: HttpClient) { }

  importCsv(option: ImportOption, file: File): Observable<ReadHeaders> {
    const formData: FormData = new FormData();

    formData.append('csv', file);

    return this.http.post<ReadHeaders>(this.url + option + "/import", formData);
  }

  selectedFields(selectedHeader: MapHeaderCommand) {
    return this.http.post<MyValue>(this.url + "selected/fields", selectedHeader);
  }

  matchFields(resultCommand: Result) {
    return this.http.post(this.url + "match", resultCommand);
  }

  select(idImport: string, id: number) {
    return this.http.post(this.url + idImport + "/select/" + id, null);
  }
}
