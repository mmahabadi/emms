export interface LoginInputs {
  username: string;
  password: string;
}

export interface ForgotInput {
  username: string;
}

export interface AuthModel extends UserModel{
  api_token: string;
  refreshToken?: string;
}

export interface UserModel {
  id: string;
  username: string;
  mobileNumber: string;
  password: string | undefined;
  email: string;
  name: string;
  lastname: string;
  orgs?: any[];
  extendedData?: string;
}
