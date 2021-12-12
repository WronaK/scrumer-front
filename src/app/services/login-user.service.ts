import { Injectable } from '@angular/core';
import {LoginUser} from "../model/login.user";

@Injectable({
  providedIn: 'root'
})
export class LoginUserService {

  loginUser!: LoginUser;

  constructor() { }
}
