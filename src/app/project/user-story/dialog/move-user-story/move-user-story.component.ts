import {Component, Inject, OnInit} from '@angular/core';
import {Team} from "../../../../team/model/team";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProjectsService} from "../../../services/projects.service";
import {ProjectDetailsService} from "../../../services/project-details.service";
import {IssueService} from "../../../../team/issue/services/issue.service";

@Component({
  selector: 'app-move-task',
  templateUrl: './move-user-story.component.html',
  styleUrls: ['./move-user-story.component.scss']
})
export class MoveUserStoryComponent implements OnInit {

  idTask: number;
  teams: Team[] =[];
  selected!: number;

  constructor(
    private dialogRef: MatDialogRef<MoveUserStoryComponent>,
    private projectService: ProjectsService,
    private projectDetailsService: ProjectDetailsService,
    private issueService: IssueService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.idTask = data.id;
    projectDetailsService.getTeams().subscribe(teams => this.teams = teams);
  }

  ngOnInit(): void {
  }

  save() {
    this.issueService.moveUserStoryToTeam(
      this.selected,
      this.idTask
    ).subscribe(() => this.dialogRef.close());
  }

}
