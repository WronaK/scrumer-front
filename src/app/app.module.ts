import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./login/services/auth.interceptor";
import {PipesModule} from "./pipes/pipes.module";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MaterialModule} from "./material.module";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {TemplatesModule} from "./templates/templates.module";
import {ScrumPokerModule} from "./scrum-poker/scrum-poker.module";
import {LoginModule} from "./login/login.module";
import {ChatModule} from "./chat/chat.module";
import {SharedModule} from "./shared/shared.module";
import {DashboardModule} from "./dashboard/dashboard.module";
import {UserModule} from "./user/user.module";
import {TeamModule} from "./team/team.module";
import {ProjectModule} from "./project/project.module";
import {DailyModule} from "./daily/daily.module";
import { ImportFromCsvFileComponent } from './dialog/import-from-csv-file/import-from-csv-file.component';
import {MatCheckboxModule} from "@angular/material/checkbox";

@NgModule({
  declarations: [
    AppComponent,
    ImportIssueFromCsvComponent,
    ImportFromCsvFileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    PipesModule,
    DragDropModule,
    FormsModule,
    MaterialModule,
    MatSnackBarModule,
    ScrumPokerModule,
    TemplatesModule,
    LoginModule,
    ChatModule,
    SharedModule,
    DashboardModule,
    UserModule,
    TeamModule,
    ProjectModule,
    DailyModule
    MatSnackBarModule,
    MatCheckboxModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
