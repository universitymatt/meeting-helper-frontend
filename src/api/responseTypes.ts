import type { GetRoomsReq } from "./requestTypes";

export type SignInRes = {
  username: string;
  name: string;
  roles: string[];
};

export type LogOutRes = {
  message: string;
};

export type RoomRes = {
  room_number: string;
  capacity: number;
  description: string;
  available: boolean;
  request_only: boolean;
};

export type GetRoomsRes = {
  rooms: RoomRes[];
  filters: GetRoomsReq;
};

export type BookingRes = {
  id: number;
  room_number: string;
  start_time: Date;
  end_time: Date;
};

export type DeleteBookingRes = {
  id: number;
  message: string;
};

export type GetBookingsRes = BookingRes[];
