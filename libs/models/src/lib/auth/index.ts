export interface LoginInputs {
  username: string;
  mobileNumber: string;
  password: string;
}

export interface ForgotInput {
  username: string;
}

export interface AuthModel {
  api_token: string;
  refreshToken?: string;
}
