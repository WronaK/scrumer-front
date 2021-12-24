import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ResourceHashComponent} from "./components/resource-hash/resource-hash.component";
import {HeaderComponent} from "./components/header/header.component";
import {PictureUserComponent} from "./components/picture-user/picture-user.component";
import {AttachmentsElementComponent} from "./components/attachments-element/attachments-element.component";
import {InformationCardComponent} from "./components/information-card/information-card.component";
import {ResourceDescriptionComponent} from "./components/resource-description/resource-description.component";
import {MaterialModule} from "../material.module";
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    ResourceHashComponent,
    HeaderComponent,
    PictureUserComponent,
    AttachmentsElementComponent,
    InformationCardComponent,
    ResourceDescriptionComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    ResourceHashComponent,
    HeaderComponent,
    PictureUserComponent,
    AttachmentsElementComponent,
    InformationCardComponent,
    ResourceDescriptionComponent
  ]
})
export class SharedModule { }
