import type { GetRoomsReq } from "./requestTypes";

export type SignInRes = {
  username: string;
  name: string;
  role_names: string[];
};

export type Message = {
  message: string;
};

export type RoomRes = {
  room_number: string;
  capacity: number;
  description: string;
  available: boolean;
  request_only: boolean;
  allowed_roles: string[];
  sufficient_roles: boolean;
};

export type GetRoomsRes = {
  rooms: RoomRes[];
  filters: GetRoomsReq;
};

export type BookingRes = {
  id: number;
  user_id: string;
  username: string;
  start_time: Date;
  end_time: Date;
  accepted: boolean;
  datetime_made: string;
  room_number: string;
};

export type DeleteBookingRes = {
  id: number;
  message: string;
};

export type Role = {
  role: string;
};

export type GetBookingsRes = BookingRes[];
