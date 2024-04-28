interface IRole {
  id: number;
  name: string;
}

interface IUser {
  id: number;
  username: string;
  password: string;
  role_id: IRole;
  refresh_token?:string;
}