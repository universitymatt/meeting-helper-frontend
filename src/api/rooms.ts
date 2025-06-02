import api from "./api";
import type { AxiosResponse } from "axios";
import type { GetRoomsRes, RoomRes } from "./responseTypes";
import type { CreateRoomReq, GetRoomsReq } from "./requestTypes";

export const getRooms = (
  filters: GetRoomsReq
): Promise<AxiosResponse<GetRoomsRes>> => {
  return api.get("/rooms", {
    params: filters,
  });
};

export const createRoom = (
  new_room: CreateRoomReq
): Promise<AxiosResponse<RoomRes>> => {
  return api.post("/rooms", new_room);
};
