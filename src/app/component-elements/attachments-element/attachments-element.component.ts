import {Component, Input} from '@angular/core';
import {Attachment} from "../../model/resource";
import {saveAs} from "file-saver";
import {UploadsService} from "../../services/uploads.service";
import {ProjectsService} from "../../services/projects.service";
import {TeamsService} from "../../services/teams.service";
import {IssueService} from "../../services/issue.service";
import {UserStoryService} from "../../services/user-story.service";
import {HttpResponse} from "@angular/common/http";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Component({
  selector: 'app-attachments-element',
  templateUrl: './attachments-element.component.html',
  styleUrls: ['./attachments-element.component.scss']
})
export class AttachmentsElementComponent {
  horizontalPosition: MatSnackBarHorizontalPosition = 'start';
  verticalPosition: MatSnackBarVerticalPosition = 'bottom';

  @Input()
  attachments!: Attachment[];

  @Input()
  idResource!: number;

  @Input()
  resourceName!: string;

  files: File[] = [];

  constructor(
    private uploadService: UploadsService,
    private projectsService: ProjectsService,
    private teamsService: TeamsService,
    private issueService: IssueService,
    private userStoryService: UserStoryService,
    private _snackBar: MatSnackBar
  ) { }

  selectFiles(event: any): void {
    for (let i = 0; i< event.target.files.length; i++) {
      this.files.push(event.target.files[i])
    }
  }


  uploadFiles(): void {
    if (this.files) {
      for (let i = 0; i < this.files.length; i++) {
        this.addAttachment(this.files[i]);
      }
    }
    this.files = [];
  }

  addAttachment(file: File) {
    if (this.resourceName === 'project') {
      this.uploadAttachmentToProject(file)
    } else if (this.resourceName == 'team') {
      this.uploadAttachmentToTeam(file);
    } else if(this.resourceName == "issue") {
      this.uploadAttachmentToIssue(file)
    } else if(this.resourceName == "user-story") {
      this.uploadAttachmentToUserStory(file)
    }
  }

  uploadAttachmentToProject(file: File): void {
    this.projectsService.uploadAttachment(this.idResource, file)
      .subscribe(
        (event: any) => {
          if (event instanceof  HttpResponse) {
            const msg = 'Upload the file successfully!!! ';
            this.openSnackBar(msg, file.name)
          }
        },
        (err: any) => {
          const msg = 'Could not upload the file!!!';
          this.openSnackBar(msg, file.name)
        }
      );
  }

  uploadAttachmentToTeam(file: File): void {
    this.teamsService.uploadAttachment(this.idResource, file)
      .subscribe(
        (event: any) => {
          if (event instanceof  HttpResponse) {
            const msg = 'Upload the file successfully!!! ';
            this.openSnackBar(msg, file.name)
          }
        },
        (err: any) => {
          const msg = 'Could not upload the file!!!';
          this.openSnackBar(msg, file.name)
        }
      );
  }

  uploadAttachmentToIssue(file: File): void {
    this.issueService.uploadAttachment(this.idResource, file)
      .subscribe(
        (event: any) => {
          if (event instanceof  HttpResponse) {
            const msg = 'Upload the file successfully!!! ';
            this.openSnackBar(msg, file.name)
          }
        },
        (err: any) => {
          const msg = 'Could not upload the file!!!';
          this.openSnackBar(msg, file.name)
        }
      );
  }

  uploadAttachmentToUserStory(file: File): void {
    this.userStoryService.uploadAttachment(this.idResource, file)
      .subscribe(
        (event: any) => {
          if (event instanceof  HttpResponse) {
            const msg = 'Upload the file successfully!!! ';
            this.openSnackBar(msg, file.name)
          }
        },
        (err: any) => {
          const msg = 'Could not upload the file!!!';
          this.openSnackBar(msg, file.name)
        }
      );
  }

  downloadFile(file: any) {
    this.uploadService.getFile(file.id).subscribe(
      blob => {
        saveAs(blob, file.name)
      }
    );
  }

  private openSnackBar(message: string, action: string): void {
    this._snackBar.open(message, action, {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition
    })
  }
}
