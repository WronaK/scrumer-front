import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./login/components/login-page/login-page.component";
import {RegistrationPageComponent} from "./login/components/registration-page/registration-page.component";
import {MainLayoutComponent} from "./templates/compontents/main-layout/main-layout.component";
import {DashboardComponent} from "./dashboard/compontents/dashboard/dashboard.component";
import {AuthGuard} from "./login/services/auth.guard";
import {UserProfileComponent} from "./user/components/user-profile/user-profile.component";
import {ScrumPokerComponent} from "./scrum-poker/components/scrum-poker/scrum-poker.component";
import {MyProjectsComponent} from "./project/compontents/my-projects/my-projects.component";
import {MyTeamsComponent} from "./team/components/my-teams/my-teams.component";
import {ProjectComponent} from "./project/compontents/project/project.component";
import {TeamComponent} from "./team/components/team/team.component";
import {ChatComponent} from "./chat/components/chat/chat.component";
import {DailyComponent} from "./daily/componenents/daily/daily.component";
import {SelectTeamComponent} from "./daily/componenents/select-team/select-team.component";

const routes: Routes = [
  { path: '', component: MainLayoutComponent, children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
      { path: 'my-projects', component: MyProjectsComponent, canActivate: [AuthGuard] },
      { path: 'my-teams', component: MyTeamsComponent, canActivate: [AuthGuard] },
      { path: 'project/:id', component: ProjectComponent, canActivate: [AuthGuard] },
      { path: 'team/:id', component: TeamComponent, canActivate: [AuthGuard] },
      { path: 'scrum-poker/:id', component: ScrumPokerComponent, canActivate: [AuthGuard]},
      { path: 'chat', component: ChatComponent, canActivate: [AuthGuard]},
      { path: 'my-profile', component: UserProfileComponent, canActivate: [AuthGuard]},
      { path: "selected-team", component: SelectTeamComponent, canActivate: [AuthGuard]},
      { path: "daily/:id", component: DailyComponent, canActivate: [AuthGuard]}
    ]
  },
  { path: 'login', component: LoginPageComponent},
  { path: 'registration', component: RegistrationPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
