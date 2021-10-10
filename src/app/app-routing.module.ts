import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegistrationPageComponent} from "./registration-page/registration-page.component";
import {MainLayoutComponent} from "./main-layout/main-layout.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "./services/auth.guard";
import {MyProjectsComponent} from "./my-projects/my-projects.component";
import {MyTeamsComponent} from "./my-teams/my-teams.component";

const routes: Routes = [
  { path: '', component: MainLayoutComponent, children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
      { path: 'my-projects', component: MyProjectsComponent, canActivate: [AuthGuard] },
      { path: 'my-teams', component: MyTeamsComponent, canActivate: [AuthGuard] }

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
