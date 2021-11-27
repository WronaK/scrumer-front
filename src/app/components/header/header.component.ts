import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {LoginUser} from "../../model/login.user";
import {UploadsService} from "../../services/uploads.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user!: LoginUser;
  isAdmin = false;
  imgUrl: any;
  constructor(private router: Router,
              private authService: AuthService,
              private uploadService: UploadsService) {
  }

  ngOnInit(): void {
    this.getUserData()

    this.uploadService.getProfileImage().subscribe(
      res => {
        this.createImage(res)
      });
  }

  createImage(image: Blob) {
    if (image && image.size > 0) {
      let reader = new FileReader();

      reader.addEventListener("load", () => {
        this.imgUrl = reader.result;
      }, false);

      reader.readAsDataURL(image);
    }
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

  toYourProfile() {
    this.router.navigate(['my-profile'])
  }

}
