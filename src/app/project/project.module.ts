import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MyProjectsComponent} from "./compontents/my-projects/my-projects.component";
import {ProjectComponent} from "./compontents/project/project.component";
import {SharedModule} from "../shared/shared.module";
import {MaterialModule} from "../material.module";
import {TemplatesModule} from "../templates/templates.module";
import {MenuProjectComponent} from "./compontents/menu-project/menu-project.component";
import {MenuTasksComponent} from "./compontents/menu-tasks/menu-tasks.component";
import {ProductBacklogComponent} from "./compontents/product-backlog/product-backlog.component";
import {ShowTaskFromProductBacklogComponent} from "./compontents/show-task-from-product-backlog/show-task-from-product-backlog.component";
import {TeamsComponent} from "./compontents/teams/teams.component";
import {UpdateProjectComponent} from "./dialog/update-project/update-project.component";
import {JoinTeamToProjectComponent} from "./dialog/join-team-to-project/join-team-to-project.component";
import {UserStoryModule} from "./user-story/user-story.module";
import {CreateProjectComponent} from "./dialog/create-project/create-project.component";
import {ReactiveFormsModule} from "@angular/forms";
import {PipesModule} from "../pipes/pipes.module";

@NgModule({
  declarations: [
    MyProjectsComponent,
    ProjectComponent,
    MenuProjectComponent,
    MenuTasksComponent,
    ProductBacklogComponent,
    ShowTaskFromProductBacklogComponent,
    TeamsComponent,
    UpdateProjectComponent,
    JoinTeamToProjectComponent,
    CreateProjectComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    TemplatesModule,
    UserStoryModule,
    ReactiveFormsModule,
    PipesModule
  ],
  exports: [
    MyProjectsComponent,
    ProjectComponent,
    CreateProjectComponent
  ]
})
export class ProjectModule { }
