import {Component} from '@angular/core';
import {ImportDataService} from "../../services/import-data.service";
import {
  HeaderCommand,
  ImportOption,
  MapValue,
  ResultTest,
  SelectedHeader,
  Uniq,
  Val,
  Value
} from "../../model/importCsv";
import {SuggestedTeam} from "../../model/team";
import {FormControl, Validators} from "@angular/forms";
import {TeamsService} from "../../services/teams.service";
import {SuggestedUser} from "../../model/user";
import {UsersService} from "../../services/users.service";
import {SuggestedProject} from "../../model/project";
import {ProjectsService} from "../../services/projects.service";
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-import-from-csv-file',
  templateUrl: './import-from-csv-file.component.html',
  styleUrls: ['./import-from-csv-file.component.scss']
})
export class ImportFromCsvFileComponent {

  file!: File;
  info: string = "No file selected";
  select!: string;
  importOption!: ImportOption;
  step: number = 1;
  headers!: HeaderCommand[];
  idImportData!: string;
  displayedColumns: string[] = ["filed_name", "suggested_filed_name", "skip"];
  fields!: string[];

  selectedHeaders: SelectedHeader[] = [];
  displayedSelectedColumns: string[] = ["filed_name", "suggested_filed_name"];

  values: Value[] = [];
  displayedUniqueValue: string[] = ["uniqueValue", "matchValue"];

  filteredOption: SuggestedTeam[] = [];
  suggestedTeam: SuggestedTeam[] = [];

  filteredOptionUser: SuggestedUser[] = [];
  suggestedUser: SuggestedUser[] = [];

  myResult: ResultTest[] = [];

  projectName!: FormControl;

  filteredOptionProject: SuggestedProject[] = [];
  suggestedProject: SuggestedProject[] = [];
  teamName!: FormControl;


  constructor(
    private dialogRef: MatDialogRef<ImportFromCsvFileComponent>,
    private importService: ImportDataService,
    private teamService: TeamsService,
    private usersService: UsersService,
    private projectService: ProjectsService
  ) {
    this.projectName = new FormControl("", Validators.required);
    this.teamName = new FormControl("", Validators.required)
    this.filterProject();
    this.filterTeam();
  }

  private filter(): void {
    for(let r of this.myResult) {
      if (r.fields === "users") {
        r.uniqueValues.forEach(u => {
          u.match.valueChanges
            .subscribe(response => {
              if (response.length >= 3) {
                this.usersService.getSuggestedUser(response)
                  .subscribe(list => {
                      this.suggestedUser = list;
                      this.filteredOptionUser = list;
                    }
                  )
              }
              this.filterDataUser(response);
            })
        })
      } else if (r.fields === "team") {
        r.uniqueValues.forEach(u => {
          u.match.valueChanges
            .subscribe(response => {
              if (response.length >= 3) {
                this.teamService.getSuggestedTeam(response)
                  .subscribe(list => {
                    this.suggestedTeam = list;
                    this.filteredOption = list;
                  })
              }
              this.filterData(response);
            })
        })
      }
    }
  }

  private filterData(enteredData: String) {
    return this.filteredOption = this.suggestedTeam.filter(item => {
      item.name.toLowerCase().includes(enteredData.toString().toLowerCase());
    })
  }

  getName(option: SuggestedTeam) {
    return option.name;
  }

  private filterDataUser(enteredData: String) {
    this.filteredOptionUser = this.suggestedUser.filter(item => {
      return item.username.toLowerCase().indexOf(enteredData.toString().toLowerCase()) > -1;
    })
  }

  next() {

    if (this.step === 1) {
      this.importService.importCsv(this.importOption, this.file).subscribe(
        header => {
          this.step = 2
          this.headers = header.headers;
          this.idImportData = header.idImportedData;
          this.fields = header.availableFields;
        }
      );
    } else if (this.step === 2) {
      this.step=3

      this.headers.forEach(header =>  {
        if(!header.skipField) {
          this.selectedHeaders.push({suggestedField: header.suggestedField, readField: header.readField})
        }
      });

      console.log(this.selectedHeaders);
    } else if (this.step === 3) {
      this.step = 4;
      this.importService.selectedFields({idImportedData: this.idImportData, selectedHeaders: this.selectedHeaders}).subscribe(
        result => {
          this.values = result.values;

          for(let val of result.values) {
            let uniq: Uniq[] = [];

            for(let un of val.uniqueValues) {
              uniq.push({value: un, match: new FormControl("", Validators.required)});
            }

            let resultTest = {fields: val.fields, uniqueValues: uniq, availableValue: val.availableValue}

            this.myResult.push(resultTest);
          }

          this.filter();

        }
      );
    } else if (this.step === 4) {
      let values: MapValue[] = [];

      for(let r of this.myResult) {
        let v: Val[] = [];

        for(let vv of r.uniqueValues) {
          if (r.fields === "users" || r.fields === "team") {
            v.push({myValue: vv.value, matchValue: vv.match.value.id})
          } else {
            v.push({myValue: vv.value, matchValue: vv.match.value})
          }
        }
        values.push({fields: r.fields, values: v});
      }


      this.importService.matchFields({idImportedData: this.idImportData, mapValue: values}).subscribe();
      this.step=5


    } else if (this.step === 5) {
      if (this.select === 'option-1') {
        this.importService.select(this.idImportData, this.projectName.value.id).subscribe(() => this.dialogRef.close())
      } else {
        this.importService.select(this.idImportData, this.teamName.value.id).subscribe(() => this.dialogRef.close())
      }

    }
  }

  private filterProject(): void {
    this.projectName.valueChanges
      .subscribe(response => {
        if (response.length >= 3) {
          this.projectService.getSuggestedProject(response)
            .subscribe(list => {
              this.suggestedProject = list;
              this.filteredOptionProject = list;
            })
        }
        this.filterDataProject(response);
      })
  }

  private filterDataProject(enteredData: String) {
    return this.filteredOptionProject = this.suggestedProject.filter(item => {
      item.name.toLowerCase().includes(enteredData.toString().toLowerCase());
    })
  }

  private filterTeam(): void {
    this.teamName.valueChanges
      .subscribe(response => {
        if (response.length >= 3) {
          this.teamService.getSuggestedTeam(response)
            .subscribe(list => {
              this.suggestedTeam = list;
              this.filteredOption = list;
            })
        }
        this.filterData(response);
      })
  }

  selectFile(event: any): void {
    this.file = event.target.files[0];
    this.info = "Selected file " + this.file.name;
  }

  selectOption(option: string) {
    this.select = option;

    if (this.select === 'option-1') {
      this.importOption = ImportOption.USER_STORY_TO_PRODUCT_BACKLOG
    } else {
      this.importOption = ImportOption.ISSUE_TO_SPRINT_BOARD
    }
  }

  getUsername(option: SuggestedUser): string {
    return option.username;
  }
}
