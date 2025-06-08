import type {
  BookingRes,
  DeleteBookingRes,
  GetBookingsRes,
} from "./responseTypes";
import api from "./api";
import type { AxiosResponse } from "axios";
import type { CreateBookingReq, Times } from "./requestTypes";

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

export const getBookingRequests = (): Promise<
  AxiosResponse<GetBookingsRes>
> => {
  return api.get("/bookings/request");
};

export const deleteBooking = (
  bookingId: number
): Promise<AxiosResponse<DeleteBookingRes>> => {
  return api.delete(`/bookings/${bookingId}`);
};

export const updateBooking = (
  bookingId: number,
  desired_times: Times
): Promise<AxiosResponse<BookingRes>> => {
  return api.put(`/bookings/${bookingId}`, desired_times);
};

export const approveBookingRequest = (
  bookingId: number
): Promise<AxiosResponse<DeleteBookingRes>> => {
  return api.put(`/bookings/${bookingId}/approve`);
};

export const declineBookingRequest = (
  bookingId: number
): Promise<AxiosResponse<DeleteBookingRes>> => {
  return api.delete(`/bookings/${bookingId}/decline`);
};
