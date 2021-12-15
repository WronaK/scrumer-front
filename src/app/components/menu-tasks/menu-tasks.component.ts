import {Component} from '@angular/core';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ProductBacklogService} from "../../services/product-backlog.service";
import {AddUserStory} from "../../dialog/add-user-story/add-user-story.component";
import {tap} from "rxjs/operators";
import {RemoveUserStoryComponent} from "../../dialog/remove-user-story/remove-user-story.component";
import {MoveUserStoryComponent} from "../../dialog/move-user-story/move-user-story.component";
import {UpdateUserStoryComponent} from "../../dialog/update-user-story/update-user-story.component";
import {ReportService} from "../../services/report.service";
import {saveAs} from "file-saver";

@Component({
  selector: 'app-menu-tasks',
  templateUrl: './menu-tasks.component.html',
  styleUrls: ['./menu-tasks.component.scss']
})
export class MenuTasksComponent {

  constructor(private dialog: MatDialog,
              private productBacklogService: ProductBacklogService,
              private reportService: ReportService) { }

  addUserStory(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: this.productBacklogService.idProject,
    };
    this.dialog.open(AddUserStory, dialogConfig)
      .afterClosed().pipe(
      tap(() => {
        this.productBacklogService.productBacklog();
      })
    ).subscribe();
  }

  updateUserStory(): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: this.productBacklogService.idSelectTask,
    };
    this.dialog.open(UpdateUserStoryComponent, dialogConfig)
      .afterClosed().pipe(
      tap(() => {
        this.productBacklogService.productBacklog();
        this.productBacklogService.selectedTask();
      })
    ).subscribe();
  }

  select() {
    return this.productBacklogService.idSelectTask != null;
  }

  deleteUserStory() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: this.productBacklogService.idSelectTask,
    };
    this.dialog.open(RemoveUserStoryComponent, dialogConfig)
      .afterClosed().pipe(
      tap(() => {
        this.productBacklogService.productBacklog();
        this.productBacklogService.setSelectTask(null);
      })
    ).subscribe();
  }

  moveUserStory() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      id: this.productBacklogService.idSelectTask,
    };
    this.dialog.open(MoveUserStoryComponent, dialogConfig)
      .afterClosed().pipe(
      tap(() => {
        this.productBacklogService.productBacklog();
        this.productBacklogService.selectedTask();
      })
    ).subscribe();
  }

  generateReport() {
    this.reportService.getProductBacklogReport(this.productBacklogService.idProject).subscribe(
      blob => {
        saveAs(blob, "productBacklogReport")
      }
      );
  }
}
