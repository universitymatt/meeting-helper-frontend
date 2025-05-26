import api from "./api";
import type { AxiosResponse } from "axios";
import type { SignInRes } from "./responseTypes";
import type { SignInReq, SignUpReq } from "./requestTypes";

export const signIn = (
  signIn: SignInReq
): Promise<AxiosResponse<SignInRes>> => {
  return api.post("/token", signIn, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
};

export const signUp = (
  signUp: SignUpReq
): Promise<AxiosResponse<SignInRes>> => {
  return api.post("/users", signUp);
};
