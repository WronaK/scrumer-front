import {User} from "../../model/user";

export interface LoginUser extends User {
  roles: string
  id: number
}
