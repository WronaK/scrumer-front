import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-form-login-template',
  templateUrl: './form-login-template.component.html',
  styleUrls: ['./form-login-template.component.scss']
})
export class FormLoginTemplateComponent implements OnInit {

  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  goToRegistration() {
    this.router.navigate(['registration']);
  }

  goToLogin() {
    this.router.navigate(['login']);
  }
}
