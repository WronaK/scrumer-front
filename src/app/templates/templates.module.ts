import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogTemplateComponent} from "./compontents/dialog-template/dialog-template.component";
import {MaterialModule} from "../material.module";
import {MainLayoutComponent} from "./compontents/main-layout/main-layout.component";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";


@NgModule({
  declarations: [
    DialogTemplateComponent,
    MainLayoutComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    DialogTemplateComponent,
    MainLayoutComponent
  ]
})
export class TemplatesModule { }
