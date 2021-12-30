import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AddIssueComponent} from "./dialog/add-issue/add-issue.component";
import {AssigmToYourselfComponent} from "./dialog/assigm-to-yourself/assigm-to-yourself.component";
import {ShowIssueComponent} from "./dialog/show-issue/show-issue.component";
import {TemplatesModule} from "../../templates/templates.module";
import {MaterialModule} from "../../material.module";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AddIssueComponent,
    AssigmToYourselfComponent,
    ShowIssueComponent
  ],
  imports: [
    CommonModule,
    TemplatesModule,
    MaterialModule,
    ReactiveFormsModule,

  ],
  exports: [
    AddIssueComponent,
    AssigmToYourselfComponent,
    ShowIssueComponent
  ]
})
export class IssueModule { }
