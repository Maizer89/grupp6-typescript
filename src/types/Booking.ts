export type TimeSlot =
  | "09:00-10:00"
  | "10:00-11:00"
  | "11:00-12:00"
  | "12:00-13:00"
  | "13:00-14:00";

export type BookingStatus = "confirmed" | "cancelled";

export interface Booking {
  id: number;
  roomId: number;
  date: string;
  timeSlot: TimeSlot;
  bookedBy: string;
}

export type NewBooking = Omit<Booking, "id">;
