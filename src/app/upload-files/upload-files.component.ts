import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {UploadsService} from "../services/uploads.service";
import {HttpEventType, HttpResponse} from "@angular/common/http";

@Component({
  selector: 'app-upload-files',
  templateUrl: './upload-files.component.html',
  styleUrls: ['./upload-files.component.scss']
})
export class UploadFilesComponent implements OnInit {

  files: File[] = [];
  progressInfos: any[] = [];
  message: string[] = [];

  fileInfos?: Observable<any>;

  constructor(private uploadService: UploadsService) { }

  ngOnInit(): void {
  }

  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    for (let i = 0; i< event.target.files.length; i++) {
      this.files.push(event.target.files[i])
    }
  }

  uploadFiles(): void {
    this.message = [];

    if (this.files) {
      for (let i = 0; i < this.files.length; i++) {
        this.upload(i, this.files[i]);
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name};

    if (file) {
      this.uploadService.upload(1, file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
          } else if (event instanceof HttpResponse) {
            this.message.push('Uploaded the file succesfully: ' + file.name);
            this.fileInfos = this.uploadService.getFiles();
          }
        },
    (err: any) => {
      this.progressInfos[idx].value = 0;
      this.message.push("Could not upload the file: " + file.name);
      this.fileInfos = this.uploadService.getFiles();
      });
    }
  }

}
