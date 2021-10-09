import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  formLogin!: FormGroup;

  emailFC!: FormControl;
  passwordFC!: FormControl;

  constructor() {
    this.initForm();
  }

  private initForm(): void {
    this.emailFC = new FormControl('', [Validators.email, Validators.required]);
    this.passwordFC = new FormControl('', Validators.required);

    this.formLogin = new FormGroup({
      emailFC: this.emailFC,
      passwordFC: this.passwordFC
    })
  }

  singIn() {

  }

  goToRegistration() {

  }
}
