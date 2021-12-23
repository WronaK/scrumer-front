export interface User {
  name: string;
  surname: string;
  email: string;
  idProfileImage: number;
}

export interface SuggestedUser {
  id: number;
  email: string;
  username: string;
}

export interface UserInitialAndIdImage {
  idImage: number;
  initial: string;
}
