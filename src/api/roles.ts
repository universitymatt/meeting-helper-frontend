import type { AxiosResponse } from "axios";
import api from "./api";
import type { Role } from "./responseTypes";

export const getAllRoles = (): Promise<AxiosResponse<Role[]>> => {
  return api.get("/roles");
};
