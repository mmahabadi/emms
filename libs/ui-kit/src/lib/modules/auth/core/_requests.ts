import axios from 'axios'
import {AuthModel, LoginInputs, UserModel} from "@emms/models";

const {NX_REACT_APP_API_URL: API_URL} = process.env

export const GET_USER_BY_ACCESSTOKEN_URL = `${API_URL}/oper/verify_token`
export const LOGIN_URL = `${API_URL}/oper/login`
export const REGISTER_URL = `${API_URL}/register`
export const REQUEST_PASSWORD_URL = `${API_URL}/forgot_password`

// Server should return AuthModel
export function login(input: LoginInputs) {
  return axios.post<AuthModel>(LOGIN_URL, input);
}

// Server should return AuthModel
export function register(
  email: string,
  firstname: string,
  lastname: string,
  password: string,
  password_confirmation: string
) {
  return axios.post(REGISTER_URL, {
    email,
    first_name: firstname,
    last_name: lastname,
    password,
    password_confirmation,
  })
}

// Server should return object => { result: boolean } (Is Email in DB)
export function requestPassword(username: string) {
  return axios.post<{result: boolean}>(REQUEST_PASSWORD_URL, {
    username
  })
}

export function getUserByToken(token: string) {
  return axios.post<UserModel>(GET_USER_BY_ACCESSTOKEN_URL, {
    api_token: token,
  })
}
