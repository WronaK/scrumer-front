import {User} from "../../user/model/user";

export interface LoginUser extends User {
  roles: string
  id: number
}
