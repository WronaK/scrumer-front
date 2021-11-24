import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./views/login-page/login-page.component";
import {RegistrationPageComponent} from "./views/registration-page/registration-page.component";
import {MainLayoutComponent} from "./components/main-layout/main-layout.component";
import {DashboardComponent} from "./views/dashboard/dashboard.component";
import {AuthGuard} from "./services/auth.guard";
import {MyProjectsComponent} from "./views/my-projects/my-projects.component";
import {MyTeamsComponent} from "./views/my-teams/my-teams.component";
import {ProjectComponent} from "./views/project/project.component";
import {TeamComponent} from "./views/team/team.component";
import {ChatComponent} from "./views/chat/chat.component";
import {UserProfileComponent} from "./views/user-profile/user-profile.component";

const routes: Routes = [
  { path: '', component: MainLayoutComponent, children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
      { path: 'my-projects', component: MyProjectsComponent, canActivate: [AuthGuard] },
      { path: 'my-teams', component: MyTeamsComponent, canActivate: [AuthGuard] },
      { path: 'project/:id', component: ProjectComponent, canActivate: [AuthGuard] },
      { path: 'team/:id', component: TeamComponent, canActivate: [AuthGuard] },
      { path: 'chat', component: ChatComponent, canActivate: [AuthGuard]},
      { path: 'my-profile', component: UserProfileComponent, canActivate: [AuthGuard]}
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
