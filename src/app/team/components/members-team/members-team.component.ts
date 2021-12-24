import {Component, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {User} from "../../../model/user";
import {TeamsDetailsService} from "../../../services/teams-details.service";
import {MatPaginator} from "@angular/material/paginator";

@Component({
  selector: 'app-members-team',
  templateUrl: './members-team.component.html',
  styleUrls: ['./members-team.component.scss']
})
export class MembersTeamComponent implements OnInit {

  dataSource!: MatTableDataSource<User>;
  displayedColumns: string[] = ['name', 'surname', 'email', 'event'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  members: User[] = [];

  constructor(
    private teamsDetailsService: TeamsDetailsService
  ) {
    this.dataSource = new MatTableDataSource<User>();
    this.dataSource.data = this.members;
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit(): void {
    this.teamsDetailsService.loadsMembers();
    this.teamsDetailsService.getMembers().subscribe(
      members => {
        this.members= members;
        this.dataSource.data = members
      }
    )
  }

  remove(email: string) {
    //todo
  }
}
