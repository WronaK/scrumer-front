import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {IssueCommand} from "../../../model/task";
import {tap} from "rxjs/operators";
import {IssueService} from "../../../services/issue.service";

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss']
})
export class MyTasksComponent implements OnInit {

  issues: IssueCommand[] = []

  @ViewChild('truncator') truncator!: ElementRef<HTMLElement>;
  @ViewChild('bodyText') bodyText!: ElementRef<HTMLElement>;

  constructor(private router: Router,
              private renderer: Renderer2,
              private issueService: IssueService) { }

  ngOnInit(): void {
    this.getMyIssue().subscribe();
    this.displayElement();
  }

  getMyIssue() {
    return this.issueService.getMyIssue().pipe(
      tap(issues => {
        this.issues = issues;
      })
    )
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
}
