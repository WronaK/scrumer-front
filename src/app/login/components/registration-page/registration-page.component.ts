import {Component} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {FormGroupErrorMatcher} from "../../../../form.group.error.matcher";
import {PasswordValidator} from "../../../../password.validator";
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {DataRegistration} from "../../model/data.registration";

@Component({
  selector: 'app-registration-page',
  templateUrl: './registration-page.component.html',
  styleUrls: ['./registration-page.component.scss']
})
export class RegistrationPageComponent {
  registrationFormGroup!: FormGroup;
  email!: FormControl;
  name!: FormControl;
  surname!: FormControl;
  password!: FormControl;
  repeatPassword!: FormControl;

  error!: string;
  errorMatcher = new FormGroupErrorMatcher('incorrectPassword');

  constructor(
    private router: Router,
    private authService: AuthService) {
    this.initForm();
  }

  private initForm(): void {
    this.email = new FormControl('', [Validators.required, Validators.email]);
    this.name = new FormControl('', Validators.required);
    this.surname = new FormControl('', Validators.required);
    this.password = new FormControl('', Validators.required);
    this.repeatPassword = new FormControl('', Validators.required);

    this.registrationFormGroup = new FormGroup({
      emailFC: this.email,
      nameFC: this.name,
      surnameFC: this.surname,
      passwordFC: this.password,
      repeatPasswordFC: this.repeatPassword
    });

    this.registrationFormGroup.setValidators([PasswordValidator.isEqual(
      this.password, this.repeatPassword
    )])
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  signUp() {
    this.authService.signUp({
      name: this.name.value,
      surname: this.surname.value,
      email: this.email.value,
      password: this.password.value,
    } as DataRegistration).subscribe(
      () => this.goToLogin(), (err) => {
        this.error = err.err;
        this.password.reset();
        this.repeatPassword.reset();
      }
    )
  }
}
