export interface IUserDataComplete {
  id: string;
  name: string;
  email: string;
  password: string;
}

export interface IUserData {
  id: string;
  name: string;
  email: string;
}

export interface IUser {
  name: string;
  email: string;
  password: string;
}

export interface ILogin {
  email: string;
  password: string;
}

export interface ApiResponse<T> {
  message: string;
  data: T | null;
  error: any;
}

export interface ILoginData {
  id: any;
}
