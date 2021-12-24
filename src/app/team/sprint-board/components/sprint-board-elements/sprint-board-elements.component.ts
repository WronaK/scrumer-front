import {Component, ElementRef, Input, OnInit, Renderer2, ViewChild} from '@angular/core';
import {IssueCommand, NameColumnScrumBoard, PBICommand} from "../../../../project/user-story/model/task";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {AddIssueComponent} from "../../../issue/dialog/add-issue/add-issue.component";
import {tap} from "rxjs/operators";
import {TeamsDetailsService} from "../../../services/teams-details.service";
import {IssueService} from "../../../issue/services/issue.service";
import {AuthService} from "../../../../login/services/auth.service";
import {AssigmToYourselfComponent} from "../../../issue/dialog/assigm-to-yourself/assigm-to-yourself.component";
import {ShowIssueComponent} from "../../../issue/dialog/show-issue/show-issue.component";
import {ShowUserStoryInSprintBoardComponent} from "../../../../project/user-story/dialog/show-user-story-in-sprint-board/show-user-story-in-sprint-board.component";

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
  imgUrls: any[] = [];

  ngOnInit(): void {
    this.displayElement();
  }

  constructor(
    private issueService: IssueService,
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
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      idUserStory: id,
    };
    this.dialog.open(ShowUserStoryInSprintBoardComponent, dialogConfig);
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
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      idIssue: id,
    };
    this.dialog.open(ShowIssueComponent, dialogConfig);
  }

  assignToYourself(id: number) {
    this.issueService.addIssueToRealizeMe(id).subscribe(() => {
      this.teamDetialsService.loadsSprintBacklog()
    })
  }

  assignToSomeone(id: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      idIssue: id,
    };
    this.dialog.open(AssigmToYourselfComponent, dialogConfig)
      .afterClosed().pipe(
      tap(() => {
        this.teamDetialsService.loadsSprintBacklog()
      })
    ).subscribe();
  }

  moveIssue(id: number) {
    this.issueService.changeStatusIssue(id).subscribe(
      () => this.teamDetialsService.loadsSprintBacklog()
    )
  }
}
