import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormLoginTemplateComponent} from "./components/form-login-template/form-login-template.component";
import {LoginPageComponent} from "./components/login-page/login-page.component";
import {RegistrationPageComponent} from "./components/registration-page/registration-page.component";
import {TemplatesModule} from "../templates/templates.module";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../material.module";

@NgModule({
  declarations: [
    FormLoginTemplateComponent,
    LoginPageComponent,
    RegistrationPageComponent
  ],
  imports: [
    CommonModule,
    TemplatesModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    LoginPageComponent,
    RegistrationPageComponent
  ]
})
export class LoginModule { }
