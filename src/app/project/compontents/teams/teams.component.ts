import {Component, OnInit, ViewChild} from '@angular/core';
import {Team} from "../../../model/team";
import {MatTableDataSource} from "@angular/material/table";
import {MatPaginator} from "@angular/material/paginator";
import {ProjectDetailsService} from "../../../services/project-details.service";
import {ProjectsService} from "../../../services/projects.service";

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss']
})
export class TeamsComponent implements OnInit {

  dataSource!: MatTableDataSource<Team>;

  displayedColumns: string[] = ['id', 'name', 'event'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  team: Team[] = [];

  constructor(
    private projectDetailsService: ProjectDetailsService,
    private projectService: ProjectsService
  ) {
    this.dataSource = new MatTableDataSource<Team>();
    this.dataSource.data = this.team;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.projectDetailsService.uploadTeams();
    this.projectDetailsService.getTeams().subscribe(
      teams => {
        this.team = teams;
        this.dataSource.data = teams
      }
    )
  }

  remove(id: number) {
    this.projectService.removeTeamsWithProject(this.projectDetailsService.idProject, id)
      .subscribe(() => this.projectDetailsService.uploadTeams());
  }
}
