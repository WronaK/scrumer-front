import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {IssueCommand, NameColumnScrumBoard, PBICommand} from "../../model/task";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddIssueComponent} from "../../dialog/add-issue/add-issue.component";
import {tap} from "rxjs/operators";
import {TeamsDetailsService} from "../../services/teams-details.service";
import {TaskService} from "../../services/task.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-sprint-board-elements',
  templateUrl: './sprint-board-elements.component.html',
  styleUrls: ['./sprint-board-elements.component.scss']
})
export class SprintBoardElementsComponent implements OnInit {

  @Input() columnName!: string;
  @Input() issues!: IssueCommand[];
  @Input() userStorys!: PBICommand[];

  nameColumnScrumBoard = NameColumnScrumBoard;

  @ViewChild('truncator') truncator!: ElementRef<HTMLElement>;
  @ViewChild('bodyText') bodyText!: ElementRef<HTMLElement>;

  ngOnInit(): void {
    this.displayElement();
  }

  constructor(
    private tasksService: TaskService,
    private teamDetialsService: TeamsDetailsService,
    private dialog: MatDialog,
    private authService: AuthService,
    private renderer: Renderer2) {
  }

  displayElement() {
    if (this.bodyText != null && this.truncator != null) {
      let style = window.getComputedStyle(this.bodyText.nativeElement, null);
      let viewableHeight = parseInt(style.getPropertyValue("height"), 10);

      if (this.bodyText.nativeElement.scrollHeight > viewableHeight) {
        this.renderer.setStyle(this.truncator.nativeElement, 'display', 'block');
      } else {
        this.renderer.setStyle(this.truncator.nativeElement, 'display', 'none');
      }
    }
  }

  displayUserStory(id: number) {

  }

  addIssue(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      idUserStory: id,
      statusIssue: id<0? this.columnName : this.nameColumnScrumBoard.TO_DO,
      idTeam: this.teamDetialsService.idTeam
    };
    this.dialog.open(AddIssueComponent, dialogConfig)
      .afterClosed().pipe(
      tap(() => {
        this.teamDetialsService.loadsSprintBacklog()
      })
    ).subscribe();
  }

  closeUserStory(id: number) {

  }

  displayIssue(id: number) {

  }

  assignToYourself(id: number) {
    this.tasksService.addIssueToRealize(id, this.authService.loginUser.id).subscribe(() => {
      this.teamDetialsService.loadsSprintBacklog()
    })
  }

  assignToSomeone(id: number) {

  }

  moveIssue(id: number) {
    this.tasksService.changeStatusIssue(id).subscribe(
      () => this.teamDetialsService.loadsSprintBacklog()
    )
  }
}
