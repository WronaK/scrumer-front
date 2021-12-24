import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TeamComponent} from "./components/team/team.component";
import {MyTeamsComponent} from "./components/my-teams/my-teams.component";
import {SharedModule} from "../shared/shared.module";
import {TemplatesModule} from "../templates/templates.module";
import {MaterialModule} from "../material.module";
import {SprintBoardModule} from "./sprint-board/sprint-board.module";
import {MembersTeamComponent} from "./components/members-team/members-team.component";
import {MenuTeamComponent} from "./components/menu-team/menu-team.component";
import {ProjectsComponent} from "./components/projects/projects.component";
import {IssueModule} from "./issue/issue.module";
import {AddTeamMemberComponent} from "./dialog/add-team-member/add-team-member.component";
import {CreateTeamComponent} from "./dialog/create-team/create-team.component";
import {JoinProjectToTeamComponent} from "./dialog/join-project-to-team/join-project-to-team.component";
import {JoinTheTeamComponent} from "./dialog/join-the-team/join-the-team.component";
import {UpdateTeamComponent} from "./dialog/update-team/update-team.component";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    TeamComponent,
    MyTeamsComponent,
    MembersTeamComponent,
    MenuTeamComponent,
    ProjectsComponent,
    AddTeamMemberComponent,
    CreateTeamComponent,
    JoinProjectToTeamComponent,
    JoinTheTeamComponent,
    UpdateTeamComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    TemplatesModule,
    MaterialModule,
    SprintBoardModule,
    IssueModule,
    ReactiveFormsModule
  ],
  exports: [
    TeamComponent,
    MyTeamsComponent
  ]
})
export class TeamModule { }
