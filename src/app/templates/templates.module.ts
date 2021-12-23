import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DialogTemplateComponent} from "./dialog-template/dialog-template.component";
import {MaterialModule} from "../material.module";
import {PictureUserComponent} from "./picture-user/picture-user.component";



@NgModule({
  declarations: [
    DialogTemplateComponent,
    PictureUserComponent
  ],
  imports: [
    CommonModule,
    MaterialModule
  ],
  exports: [
    DialogTemplateComponent,
    PictureUserComponent
  ]
})
export class TemplatesModule { }
