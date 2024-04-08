export interface LoginData {
  email: string;
  password: string;
}
export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface EmailInterface {
  email: string | undefined;
}
export interface CheckOTPInterface {
  newPassword: string;
  email?: string;
  token: string;
}
