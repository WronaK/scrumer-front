import {Component, Inject} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SuggestedUser} from "../../model/user";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UsersService} from "../../services/users.service";
import {IssueService} from "../../services/issue.service";

@Component({
  selector: 'app-assigm-to-yourself',
  templateUrl: './assigm-to-yourself.component.html',
  styleUrls: ['./assigm-to-yourself.component.scss']
})
export class AssigmToYourselfComponent {
  formGroup!: FormGroup;
  member!: FormControl;

  filteredOption: SuggestedUser[] = [];
  suggestedUser: SuggestedUser[] = [];

  idIssue!: number;

  constructor(
    private dialogRef: MatDialogRef<AssigmToYourselfComponent>,
    private issueService: IssueService,
    private usersService: UsersService,
    @Inject(MAT_DIALOG_DATA) data: any
  ) {
    this.idIssue = data.idIssue;
    this.initForm();
  }

  private initForm(): void {
    this.member = new FormControl('', Validators.required);

    this.formGroup = new FormGroup({
      member: this.member
    })

    this.filterTeamMember();
  }

  private filterTeamMember(): void {
    this.member.valueChanges
      .subscribe(response => {
        if (response.length >= 3) {
          this.usersService.getSuggestedUser(response)
            .subscribe(list => {
                this.suggestedUser = list;
                this.filteredOption = list;
              }
            )
        }
        this.filterData(response);
      })
  }

  private filterData(enteredData: String) {
    this.filteredOption = this.suggestedUser.filter(item => {
      return item.username.toLowerCase().indexOf(enteredData.toString().toLowerCase()) > -1;
    })
  }

  public assign(): void {
    this.issueService.addIssueToRealize(this.idIssue, this.member.value.id)
      .subscribe(() => this.dialogRef.close());
  }

  getUsername(option: SuggestedUser): string {
    return option.username;
  }
}
