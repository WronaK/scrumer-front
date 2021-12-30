import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DialogTemplateComponent} from "./compontents/dialog-template/dialog-template.component";
import {MaterialModule} from "../material.module";
import {MainLayoutComponent} from "./compontents/main-layout/main-layout.component";
import {SharedModule} from "../shared/shared.module";
import {RouterModule} from "@angular/router";
import {BaseViewTemplateComponent} from "./compontents/base-view-template/base-view-template.component";


@NgModule({
  declarations: [
    DialogTemplateComponent,
    MainLayoutComponent,
    BaseViewTemplateComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule
  ],
  exports: [
    DialogTemplateComponent,
    MainLayoutComponent,
    BaseViewTemplateComponent
  ]
})
export class TemplatesModule { }
