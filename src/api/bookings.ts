import type {
  BookingRes,
  DeleteBookingRes,
  GetBookingsRes,
} from "./responseTypes";
import api from "./api";
import type { AxiosResponse } from "axios";
import type { CreateBookingReq } from "./requestTypes";

export const getBookings = (): Promise<AxiosResponse<GetBookingsRes>> => {
  return api.get("/bookings");
};

export const makeBooking = (
  booking: CreateBookingReq
): Promise<AxiosResponse<BookingRes>> => {
  return api.post("/bookings", booking);
};

export const makeBookingRequest = (
  booking: CreateBookingReq
): Promise<AxiosResponse<BookingRes>> => {
  return api.post("/bookings/request", booking);
};

export const deleteBooking = (
  bookingId: number
): Promise<AxiosResponse<DeleteBookingRes>> => {
  return api.delete(`/bookings/${bookingId}`);
};
