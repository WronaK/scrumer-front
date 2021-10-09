import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormGroupErrorMatcher} from "../../form.group.error.matcher";
import {PasswordValidator} from "../../password.validator";
import {Router} from "@angular/router";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent {
  formRegistration!: FormGroup;
  emailFC!: FormControl;
  nameFC!: FormControl;
  surnameFC!: FormControl;
  passwordFC!: FormControl;
  repeatPasswordFC!: FormControl;

  error!: string;
  errorMatcher = new FormGroupErrorMatcher('incorrectPassword');

  constructor(
    private router: Router
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.emailFC = new FormControl('', [Validators.required, Validators.email]);
    this.nameFC = new FormControl('', Validators.required);
    this.surnameFC = new FormControl('', Validators.required);
    this.passwordFC = new FormControl('', Validators.required);
    this.repeatPasswordFC = new FormControl('', Validators.required);

    this.formRegistration = new FormGroup({
      emailFC: this.emailFC,
      nameFC: this.nameFC,
      surnameFC: this.surnameFC,
      passwordFC: this.passwordFC,
      repeatPasswordFC: this.repeatPasswordFC
    });

    this.formRegistration.setValidators([PasswordValidator.isEqual(
      this.passwordFC, this.repeatPasswordFC
    )])
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  signUp() {

  }
}
