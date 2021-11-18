import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginPageComponent} from './views/login-page/login-page.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RegistrationPageComponent} from './views/registration-page/registration-page.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./services/auth.interceptor";
import {MainLayoutComponent} from './components/main-layout/main-layout.component';
import {HeaderComponent} from './components/header/header.component';
import {DashboardComponent} from './views/dashboard/dashboard.component';
import {MyTasksComponent} from './components/my-tasks/my-tasks.component';
import {MyProjectsComponent} from './views/my-projects/my-projects.component';
import {MyTeamsComponent} from './views/my-teams/my-teams.component';
import {JoinTeamComponent} from './dialog/join-team/join-team.component';
import {ProjectComponent} from './views/project/project.component';
import {ProductBacklogComponent} from './components/product-backlog/product-backlog.component';
import {MenuTasksComponent} from './components/menu-tasks/menu-tasks.component';
import {ShowTaskFromProductBacklogComponent} from './dialog/show-task-from-product-backlog/show-task-from-product-backlog.component';
import {TeamsComponent} from './components/teams/teams.component';
import {MenuProjectComponent} from './components/menu-project/menu-project.component';
import {AddTaskToProductBacklogComponent} from './dialog/add-task-to-product-backlog/add-task-to-product-backlog.component';
import {RemoveTaskComponent} from './dialog/remove-task/remove-task.component';
import {MoveTaskComponent} from './dialog/move-task/move-task.component';
import {PipesModule} from "./pipes/pipes.module";
import {TeamComponent} from './views/team/team.component';
import {SprintBacklogComponent} from './components/sprint-backlog/sprint-backlog.component';
import {MenuTeamComponent} from './components/menu-team/menu-team.component';
import {ProjectsComponent} from './components/projects/projects.component';
import {MembersTeamComponent} from './components/members-team/members-team.component';
import {TaskStatesComponent} from './task-states/task-states.component';
import {ShowTaskFromSprintBacklogComponent} from './dialog/show-task-from-sprint-backlog/show-task-from-sprint-backlog.component';
import {JoinProjectComponent} from './dialog/join-project/join-project.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ChatComponent} from './views/chat/chat.component';
import {NewConversationComponent} from './dialog/new-conversation/new-conversation.component';
import {UploadFilesComponent} from './upload-files/upload-files.component';
import {ResourceHashComponent} from './component-elements/resource-hash/resource-hash.component';
import {ResourceDescriptionComponent} from './component-elements/resource-description/resource-description.component';
import {BaseViewTemplateComponent} from './templates/base-view-template/base-view-template.component';
import {DialogTemplateComponent} from './templates/dialog-template/dialog-template.component';
import {CreateProjectComponent} from './dialog/create-project/create-project.component';
import {CreateTeamComponent} from './dialog/create-team/create-team.component';
import {MaterialModule} from "./material.module";
import { AddTeamMemberComponent } from './dialog/add-team-member/add-team-member.component';
import { DashboardElementComponent } from './component-elements/dashboard-element/dashboard-element.component';
import { FormLoginTemplateComponent } from './templates/form-login-template/form-login-template.component';
import { InformationCardComponent } from './component-elements/information-card/information-card.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    RegistrationPageComponent,
    MainLayoutComponent,
    HeaderComponent,
    DashboardComponent,
    MyTasksComponent,
    MyProjectsComponent,
    MyTeamsComponent,
    JoinTeamComponent,
    ProjectComponent,
    ProductBacklogComponent,
    MenuTasksComponent,
    ShowTaskFromProductBacklogComponent,
    TeamsComponent,
    MenuProjectComponent,
    AddTaskToProductBacklogComponent,
    RemoveTaskComponent,
    MoveTaskComponent,
    TeamComponent,
    SprintBacklogComponent,
    MenuTeamComponent,
    ProjectsComponent,
    MembersTeamComponent,
    TaskStatesComponent,
    ShowTaskFromSprintBacklogComponent,
    JoinProjectComponent,
    ChatComponent,
    NewConversationComponent,
    UploadFilesComponent,
    ResourceHashComponent,
    ResourceDescriptionComponent,
    BaseViewTemplateComponent,
    DialogTemplateComponent,
    CreateProjectComponent,
    CreateTeamComponent,
    AddTeamMemberComponent,
    DashboardElementComponent,
    FormLoginTemplateComponent,
    InformationCardComponent
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
    MaterialModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
