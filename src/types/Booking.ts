export type TimeSlot =
  | "09:00-10:00"
  | "10:00-11:00"
  | "11:00-12:00"
  | "12:00-13:00"
  | "13:00-14:00";

export type BookingStatus = "confirmed" | "cancelled";

export interface Booking {
  id: string;
  roomId: string;
  date: string;
  timeSlot: TimeSlot;
  bookedBy: string;
  status: BookingStatus;
}

export type NewBooking = Omit<Booking, "id">;
