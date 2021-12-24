import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ResourceHashComponent} from "./components/resource-hash/resource-hash.component";
import {HeaderComponent} from "./components/header/header.component";
import {PictureUserComponent} from "./components/picture-user/picture-user.component";



@NgModule({
  declarations: [
    ResourceHashComponent,
    HeaderComponent,
    PictureUserComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ResourceHashComponent,
    HeaderComponent,
    PictureUserComponent
  ]
})
export class SharedModule { }
