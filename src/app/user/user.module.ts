import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserProfileComponent} from "./components/user-profile/user-profile.component";
import {MaterialModule} from "../material.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    UserProfileComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    UserProfileComponent
  ]
})
export class UserModule { }
