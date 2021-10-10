import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/auth.service";
import {LoginUser} from "../model/login.user";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user!: LoginUser;
  isAdmin = false;
  constructor(private router: Router,
              private authService: AuthService) { }

  ngOnInit(): void {
    this.getUserData();
  }

  goHome() {
    this.router.navigate(['dashboard']);
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  getUserData() {
    this.authService.getUserData().subscribe(user => {
      this.user = user;
      this.isAdmin = user.roles.includes("ROLE_ADMIN");
      console.log(user)});
  }

  toProjects() {
    this.router.navigate(['projects']);
  }

  toTeams() {
    this.router.navigate(['teams']);
  }

  toYourTeams() {
    this.router.navigate(['my-teams']);
  }

  toYourProjects() {
    this.router.navigate(['my-projects']);
  }

  toChat() {
    this.router.navigate(['chat']);
  }

}
