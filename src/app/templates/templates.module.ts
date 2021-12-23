import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogTemplateComponent} from "./dialog-template/dialog-template.component";
import {MaterialModule} from "../material.module";



@NgModule({
  declarations: [
    DialogTemplateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    DialogTemplateComponent
  ]
})
export class TemplatesModule { }
