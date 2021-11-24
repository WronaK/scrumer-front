import {Component, OnInit} from '@angular/core';
import {FormControl} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

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

  constructor(
    private authService: AuthService
  ) {
    this.initForm();
    this.setData();
  }

  initForm() {
    this.name = new FormControl({ value: '', disabled: this.disabled});
    this.surname = new FormControl({ value: '', disabled: this.disabled});
    this.email = new FormControl({ value: '', disabled: this.disabled});
  }

  setData() {
    this.authService.getUserData().subscribe(user => {
      this.name.setValue(user.name);
      this.surname.setValue(user.surname);
      this.email.setValue(user.email);
      this.initial = user.name[0].toUpperCase() + ' ' + user.surname[0].toUpperCase()
    })
  }


  ngOnInit(): void {
  }

  selectImage($event: Event) {

  }
}
