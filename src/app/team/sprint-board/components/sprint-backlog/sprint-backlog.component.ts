import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {TeamsDetailsService} from "../../../services/teams-details.service";
import {IssueCommand, NameColumnScrumBoard, PBICommand} from "../../../../project/user-story/model/task";

@Component({
  selector: 'app-sprint-backlog',
  templateUrl: './sprint-backlog.component.html',
  styleUrls: ['./sprint-backlog.component.scss']
})
export class SprintBacklogComponent implements OnInit {

  tasksPBI: PBICommand[]  = [];
  tasksTasks: IssueCommand[] = [];
  tasksInProgress: IssueCommand[]  = [];
  tasksMergeRequest: IssueCommand[]  = [];
  tasksDone: IssueCommand[] = [];

  columnName = NameColumnScrumBoard;

  // pbi = 'PBI';
  // tasks = 'TASKS';
  // inProgress = 'IN-PROGRESS';
  // mergeRequest = 'MERGE REQUEST';
  // done = 'DONE';

  constructor(
    private route: ActivatedRoute,
    private teamsDetailsService: TeamsDetailsService
  ) {}

  ngOnInit(): void {
    this.teamsDetailsService.loadsSprintBacklog();
    this.teamsDetailsService.getSprintBacklog().subscribe(
      sprintBacklog => {
        if (sprintBacklog != null) {
          this.tasksPBI = sprintBacklog.tasksPBI;
          this.tasksTasks = sprintBacklog.tasksToDo;
          this.tasksInProgress = sprintBacklog.tasksInProgress;
          this.tasksMergeRequest = sprintBacklog.tasksMergeRequest;
          this.tasksDone = sprintBacklog.tasksDone
        }
      }
    )
  }
}
