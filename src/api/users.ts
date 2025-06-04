import api from "./api";
import type { AxiosResponse } from "axios";
import type { Message, SignInRes } from "./responseTypes";
import type { SignInReq, SignUpReq } from "./requestTypes";

export const signIn = (
  signIn: SignInReq
): Promise<AxiosResponse<SignInRes>> => {
  return api.post("/users/token", signIn, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
};

export const getMe = (): Promise<AxiosResponse<SignInRes>> => {
  return api.get("/users/me");
};

export const signUp = (
  signUp: SignUpReq
): Promise<AxiosResponse<SignInRes>> => {
  return api.post("/users", signUp);
};

export const logOut = (): Promise<AxiosResponse<SignInRes>> => {
  return api.post("/users/logout", signUp);
};

export const getAllUsers = (): Promise<AxiosResponse<SignInRes[]>> => {
  return api.get("/users/all");
};

export const putUsersRoles = (
  roles: string[],
  username: string
): Promise<AxiosResponse<Message>> => {
  return api.put("/users/roles", { username: username, roles: roles });
};
