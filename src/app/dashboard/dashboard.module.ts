import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from "./compontents/dashboard/dashboard.component";
import {DashboardElementComponent} from "./compontents/dashboard-element/dashboard-element.component";
import {MyTasksComponent} from "./compontents/my-tasks/my-tasks.component";
import {SharedModule} from "../shared/shared.module";
import {MaterialModule} from "../material.module";

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardElementComponent,
    MyTasksComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule
  ],
  exports: [
    DashboardComponent
  ]
})
export class DashboardModule { }
