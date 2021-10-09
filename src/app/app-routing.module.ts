import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginPageComponent} from "./login-page/login-page.component";
import {RegistrationPageComponent} from "./registration-page/registration-page.component";
import {MainLayoutComponent} from "./main-layout/main-layout.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "./services/auth.guard";

const routes: Routes = [
  { path: '', component: MainLayoutComponent, children: [
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]}
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
