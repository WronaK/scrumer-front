import {Component, Inject, OnInit} from '@angular/core';
import {TeamsService} from "../../services/teams.service";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {ImportResult} from "../../model/importResult";

@Component({
  selector: 'app-import-issue-from-csv',
  templateUrl: './import-issue-from-csv.component.html',
  styleUrls: ['./import-issue-from-csv.component.scss']
})
export class ImportIssueFromCsvComponent implements OnInit {


  file!: File;
  idTeam!: number;
  result!: ImportResult;
  fields!: string[];
  keys!: string[];

  constructor(
    private teamService: TeamsService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.idTeam = data.idTeam;
  }

  ngOnInit(): void {
  }

  importIssue() {
  }

  selectFile(event: any): void {
    this.file = event.target.files[0];

    this.teamService.importCsv(this.idTeam, this.file).subscribe(
      data => {
        // this.result = data
        this.result = data;
        // this.keys = Object.keys(this.result.data);
      }
    )
  }
}
