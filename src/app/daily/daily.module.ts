import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DailyComponent } from './componenents/daily/daily.component';
import { DailyElementComponent } from './componenents/daily-element/daily-element.component';
import {SharedModule} from "../shared/shared.module";
import {MaterialModule} from "../material.module";
import {ReactiveFormsModule} from "@angular/forms";
import { SelectTeamComponent } from './componenents/select-team/select-team.component';
import {PipesModule} from "../pipes/pipes.module";



@NgModule({
  declarations: [

    DailyComponent,
    DailyElementComponent,
    SelectTeamComponent
  ],
    imports: [
        CommonModule,
        SharedModule,
        MaterialModule,
        ReactiveFormsModule,
        PipesModule
    ],
  exports: [
    DailyComponent,
    SelectTeamComponent
  ]
})
export class DailyModule { }
