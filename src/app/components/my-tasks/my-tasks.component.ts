import {Component, ElementRef, OnInit, Renderer2, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {Task} from "../../model/task";
import {Observable} from "rxjs";
import {tap} from "rxjs/operators";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-my-tasks',
  templateUrl: './my-tasks.component.html',
  styleUrls: ['./my-tasks.component.scss']
})
export class MyTasksComponent implements OnInit {

  tasks: Task[] = []

  @ViewChild('truncator') truncator!: ElementRef<HTMLElement>;
  @ViewChild('bodyText') bodyText!: ElementRef<HTMLElement>;

  constructor(private router: Router,
              private renderer: Renderer2,
              private tasksService: TaskService) { }

  ngOnInit(): void {
    this.getSubtasks().subscribe();
    this.displayElement();
  }


  getSubtasks(): Observable<Task[]> {
    return this.tasksService.getSubtasks().pipe(
      tap(subtasks => {
        this.tasks = subtasks;
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
