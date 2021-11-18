import {Component, Inject, OnInit} from '@angular/core';
import {Team} from "../../model/team";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProjectsService} from "../../services/projects.service";
import {ProjectDetailsService} from "../../services/project-details.service";
import {TaskService} from "../../services/task.service";

@Component({
  selector: 'app-move-task',
  templateUrl: './move-task.component.html',
  styleUrls: ['./move-task.component.scss']
})
export class MoveTaskComponent implements OnInit {

  idTask: number;
  teams: Team[] =[];
  selected!: number;

  constructor(
    private dialogRef: MatDialogRef<MoveTaskComponent>,
    private projectService: ProjectsService,
    private projectDetailsService: ProjectDetailsService,
    private tasksService: TaskService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.idTask = data.id;
    projectDetailsService.getTeams().subscribe(teams => this.teams = teams);
  }

  ngOnInit(): void {
  }

  save() {
    this.tasksService.addTaskToTeam(
      this.selected,
      this.idTask
    ).subscribe(() => this.dialogRef.close());
  }

}
