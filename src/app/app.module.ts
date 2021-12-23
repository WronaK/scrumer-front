import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {AuthInterceptor} from "./login/services/auth.interceptor";
import {MainLayoutComponent} from './components/main-layout/main-layout.component';
import {HeaderComponent} from './components/header/header.component';
import {DashboardComponent} from './views/dashboard/dashboard.component';
import {MyTasksComponent} from './components/my-tasks/my-tasks.component';
import {MyProjectsComponent} from './views/my-projects/my-projects.component';
import {MyTeamsComponent} from './views/my-teams/my-teams.component';
import {ProjectComponent} from './views/project/project.component';
import {ProductBacklogComponent} from './components/product-backlog/product-backlog.component';
import {MenuTasksComponent} from './components/menu-tasks/menu-tasks.component';
import {ShowTaskFromProductBacklogComponent} from './components/show-task-from-product-backlog/show-task-from-product-backlog.component';
import {TeamsComponent} from './components/teams/teams.component';
import {MenuProjectComponent} from './components/menu-project/menu-project.component';
import {AddUserStory} from './dialog/add-user-story/add-user-story.component';
import {RemoveUserStoryComponent} from './dialog/remove-user-story/remove-user-story.component';
import {MoveUserStoryComponent} from './dialog/move-user-story/move-user-story.component';
import {PipesModule} from "./pipes/pipes.module";
import {TeamComponent} from './views/team/team.component';
import {SprintBacklogComponent} from './components/sprint-backlog/sprint-backlog.component';
import {ProjectsComponent} from './components/projects/projects.component';
import {MembersTeamComponent} from './components/members-team/members-team.component';
import {DragDropModule} from "@angular/cdk/drag-drop";
import {ResourceHashComponent} from './component-elements/resource-hash/resource-hash.component';
import {ResourceDescriptionComponent} from './component-elements/resource-description/resource-description.component';
import {BaseViewTemplateComponent} from './templates/base-view-template/base-view-template.component';
import {CreateProjectComponent} from './dialog/create-project/create-project.component';
import {CreateTeamComponent} from './dialog/create-team/create-team.component';
import {MaterialModule} from "./material.module";
import {AddTeamMemberComponent} from './dialog/add-team-member/add-team-member.component';
import {DashboardElementComponent} from './component-elements/dashboard-element/dashboard-element.component';
import {InformationCardComponent} from './component-elements/information-card/information-card.component';
import {JoinTeamToProjectComponent} from './dialog/join-team-to-project/join-team-to-project.component';
import {JoinTheTeamComponent} from './dialog/join-the-team/join-the-team.component';
import {JoinProjectToTeamComponent} from './dialog/join-project-to-team/join-project-to-team.component';
import {UpdateProjectComponent} from './dialog/update-project/update-project.component';
import {UpdateTeamComponent} from './dialog/update-team/update-team.component';
import {UserProfileComponent} from './views/user-profile/user-profile.component';
import {UpdateUserStoryComponent} from './dialog/update-user-story/update-user-story.component';
import {SprintBoardElementsComponent} from './component-elements/sprint-board-elements/sprint-board-elements.component';
import {AddIssueComponent} from './dialog/add-issue/add-issue.component';
import {ShowUserStoryInSprintBoardComponent} from './dialog/show-user-story-in-sprint-board/show-user-story-in-sprint-board.component';
import {AssigmToYourselfComponent} from './dialog/assigm-to-yourself/assigm-to-yourself.component';
import {ShowIssueComponent} from './dialog/show-issue/show-issue.component';
import {AttachmentsElementComponent} from './component-elements/attachments-element/attachments-element.component';
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MenuTeamComponent} from "./components/menu-team/menu-team.component";
import {TemplatesModule} from "./templates/templates.module";
import {ScrumPokerModule} from "./scrum-poker/scrum-poker.module";
import {LoginModule} from "./login/login.module";
import {ChatModule} from "./chat/chat.module";

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    HeaderComponent,
    DashboardComponent,
    MyTasksComponent,
    MyProjectsComponent,
    MyTeamsComponent,
    ProjectComponent,
    ProductBacklogComponent,
    MenuTasksComponent,
    ShowTaskFromProductBacklogComponent,
    TeamsComponent,
    MenuProjectComponent,
    AddUserStory,
    RemoveUserStoryComponent,
    MoveUserStoryComponent,
    TeamComponent,
    SprintBacklogComponent,
    MenuTeamComponent,
    ProjectsComponent,
    MembersTeamComponent,
    ResourceHashComponent,
    ResourceDescriptionComponent,
    BaseViewTemplateComponent,
    CreateProjectComponent,
    CreateTeamComponent,
    AddTeamMemberComponent,
    DashboardElementComponent,
    InformationCardComponent,
    JoinTeamToProjectComponent,
    JoinTheTeamComponent,
    JoinProjectToTeamComponent,
    UpdateProjectComponent,
    UpdateTeamComponent,
    UserProfileComponent,
    UpdateUserStoryComponent,
    SprintBoardElementsComponent,
    AddIssueComponent,
    ShowUserStoryInSprintBoardComponent,
    AssigmToYourselfComponent,
    ShowIssueComponent,
    AttachmentsElementComponent
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
    ChatModule
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
