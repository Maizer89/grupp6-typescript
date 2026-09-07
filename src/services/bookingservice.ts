import { get, post } from "./api";
import type { Booking, NewBooking } from "../types/Booking";

//Tar emot en ny bokning utan id
export function createBooking(booking: NewBooking): Promise<Booking> {
  //skickar bokning till JSON server på /bookings
  return post<Booking, NewBooking>("/bookings", booking);
}

//Hämtar alla bokningar
export function getBookings(): Promise<Booking[]> {
  return get<Booking[]>("/bookings");
}
