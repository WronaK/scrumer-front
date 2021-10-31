import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginPageComponent} from './login-page/login-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {ReactiveFormsModule} from "@angular/forms";
import {RegistrationPageComponent} from './registration-page/registration-page.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./services/auth.interceptor";
import {MainLayoutComponent} from './main-layout/main-layout.component';
import {HeaderComponent} from './header/header.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {AllProjectsComponent} from './all-projects/all-projects.component';
import {MatIconModule} from "@angular/material/icon";
import {MatExpansionModule} from "@angular/material/expansion";
import {AllTeamsComponent} from './all-teams/all-teams.component';
import {MyTasksComponent} from './my-tasks/my-tasks.component';
import {MyProjectsComponent} from './my-projects/my-projects.component';
import {MyTeamsComponent} from './my-teams/my-teams.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {AddProjectComponent} from './add-project/add-project.component';
import {MatStepperModule} from "@angular/material/stepper";
import {MatSelectModule} from "@angular/material/select";
import {MatOptionModule} from "@angular/material/core";
import {SimpleDialogComponent} from './simple-dialog/simple-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {AddTeamComponent} from './add-team/add-team.component';
import {JoinTeamComponent} from './join-team/join-team.component';
import {MatListModule} from "@angular/material/list";
import {DialogComponent} from './dialog/dialog.component';
import {ProjectComponent} from './project/project.component';
import {MatTabsModule} from "@angular/material/tabs";
import {ProductBacklogComponent} from './product-backlog/product-backlog.component';
import {MenuTasksComponent} from './menu-tasks/menu-tasks.component';
import {ShowTaskFromProductBacklogComponent} from './show-task-from-product-backlog/show-task-from-product-backlog.component';
import {InformationProjectComponent} from './information-project/information-project.component';
import {TeamsComponent} from './teams/teams.component';
import {MenuProjectComponent} from './menu-project/menu-project.component';
import {AddTeamsComponent} from './add-teams/add-teams.component';
import {AddTaskToProductBacklogComponent} from './add-task-to-product-backlog/add-task-to-product-backlog.component';
import {RemoveTaskComponent} from './remove-task/remove-task.component';
import {MoveTaskComponent} from './move-task/move-task.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatTableModule} from "@angular/material/table";
import {PipesModule} from "./pipes/pipes.module";
import {TeamComponent} from './team/team.component';
import {SprintBacklogComponent} from './sprint-backlog/sprint-backlog.component';
import {MenuTeamComponent} from './menu-team/menu-team.component';
import {ProjectsComponent} from './projects/projects.component';
import {InformationTeamComponent} from './information-team/information-team.component';
import {MembersTeamComponent} from './members-team/members-team.component';
import {TaskStatesComponent} from './task-states/task-states.component';
import {DividedIntoTasksComponent} from './divided-into-tasks/divided-into-tasks.component';
import {ShowTaskFromSprintBacklogComponent} from './show-task-from-sprint-backlog/show-task-from-sprint-backlog.component';
import {JoinProjectComponent} from './join-project/join-project.component';
import {AddMembersComponent} from './add-members/add-members.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {MatMenuModule} from "@angular/material/menu";
import {ChatComponent} from './chat/chat.component';
import {NewConversationComponent} from './new-conversation/new-conversation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    MainLayoutComponent,
    HeaderComponent,
    DashboardComponent,
    AllProjectsComponent,
    AllTeamsComponent,
    MyTasksComponent,
    MyProjectsComponent,
    MyTeamsComponent,
    AddProjectComponent,
    SimpleDialogComponent,
    AddTeamComponent,
    JoinTeamComponent,
    DialogComponent,
    ProjectComponent,
    ProductBacklogComponent,
    MenuTasksComponent,
    ShowTaskFromProductBacklogComponent,
    InformationProjectComponent,
    TeamsComponent,
    MenuProjectComponent,
    AddTeamsComponent,
    AddTaskToProductBacklogComponent,
    RemoveTaskComponent,
    MoveTaskComponent,
    TeamComponent,
    SprintBacklogComponent,
    MenuTeamComponent,
    ProjectsComponent,
    InformationTeamComponent,
    MembersTeamComponent,
    TaskStatesComponent,
    DividedIntoTasksComponent,
    ShowTaskFromSprintBacklogComponent,
    JoinProjectComponent,
    AddMembersComponent,
    ChatComponent,
    NewConversationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatGridListModule,
    MatIconModule,
    MatExpansionModule,
    MatToolbarModule,
    MatStepperModule,
    MatSelectModule,
    MatOptionModule,
    MatDialogModule,
    MatListModule,
    MatTabsModule,
    MatPaginatorModule,
    MatTableModule,
    PipesModule,
    DragDropModule,
    MatMenuModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
