import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  loginFormGroup!: FormGroup;

  email!: FormControl;
  password!: FormControl;

  constructor(
    private authService: AuthService) {
    this.initForm();
  }

  private initForm(): void {
    this.email = new FormControl('', [Validators.email, Validators.required]);
    this.password = new FormControl('', Validators.required);

    this.loginFormGroup = new FormGroup({
      emailFC: this.email,
      passwordFC: this.password
    })
  }

  singIn() {
    this.authService.signIn({
      email: this.email.value,
      password: this.password.value
    })
  }
}
