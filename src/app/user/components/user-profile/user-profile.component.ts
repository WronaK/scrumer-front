import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {AuthService} from "../../../login/services/auth.service";
import {UsersService} from "../../services/users.service";
import {HttpResponse} from "@angular/common/http";
import {LoginUser} from "../../../login/model/login.user";
import {UploadsService} from "../../../shared/services/uploads.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  imgUrl: any;

  name!: FormControl;
  surname!: FormControl;
  email!: FormControl;

  initial!: string;

  disabled = true;

  image!: File;
  user!: LoginUser;

  constructor(
    private authService: AuthService,
    private userService: UsersService,
    private uploadService: UploadsService,
  ) {
    this.initForm();
  }

  initForm() {
    this.name = new FormControl({ value: '', disabled: this.disabled});
    this.surname = new FormControl({ value: '', disabled: this.disabled});
    this.email = new FormControl({ value: '', disabled: this.disabled});
  }

  setData() {
    this.authService.getUserData().subscribe(user => {
      this.user = user;
      this.name.setValue(user.name);
      this.surname.setValue(user.surname);
      this.email.setValue(user.email);
      this.initial = user.name[0].toUpperCase() + ' ' + user.surname[0].toUpperCase()
    })
  }

  ngOnInit(): void {
    this.setData();

    this.uploadService.getProfileImage().subscribe(
      res => {
        this.createImage(res)
      });
  }

  selectImage(event: any): void {
    this.image = event.target.files[0];

    if (this.image) {
      this.userService.uploadImageProfile(this.image).subscribe(
        event => {
          if (event instanceof HttpResponse) {
            this.createImage(this.image)
          }
        }
      )
    }
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

}
