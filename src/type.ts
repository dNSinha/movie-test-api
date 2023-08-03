export interface RegisterResponse {
  id: string;
  username: string;
  token: string;
}

export interface LoginResponse {
  token: string;
}

export interface UserInfo {
  id: string;
  username: string;
}

export interface Context {
  userInfo: UserInfo;
}
