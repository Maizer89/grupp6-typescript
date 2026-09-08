import { get, patch, post, remove } from "./api";
import type { Booking, NewBooking } from "../types/Booking";

/**
 * Hämtar alla bokningar från backend (JSON Server).
 * Används som grundfunktion för att läsa bokningsdata.
 */
export function getBookings(): Promise<Booking[]> {
  return get<Booking[]>("/bookings");
}

/**
 * Skapar och sparar en ny bokning i databasen.
 * (Kompatibel med gruppens bokningsformulär).
 */
export function createBooking(booking: NewBooking): Promise<Booking> {
  return post<Booking, NewBooking>("/bookings", booking);
}

/**
 * Card 5: Sök bokningar via e-postadress.
 * Hämtar samtliga bokningar och filtrerar fram de som tillhör användaren.
 *
 * Logik & Motivering:
 * 1. .trim() rensar oavsiktliga blanksteg före och efter inmatningen.
 * 2. .toLowerCase() gör sökningen skiftlägesokänslig så att t.ex.
 *    "Student@Kth.se" matchar "student@kth.se".
 */
export async function getBookingsByEmail(email: string): Promise<Booking[]> {
  const allBookings = await getBookings();
  const normalizedEmail = email.trim().toLowerCase();

  return allBookings.filter(
    (booking) =>
      booking.bookedBy &&
      booking.bookedBy.trim().toLowerCase() === normalizedEmail,
  );
}

/**
 * Card 6: Avboka en befintlig bokning.
 * Uppdaterar bokningens status till "cancelled" via PATCH till JSON Server.
 *
 * Varför PATCH istället för DELETE?:
 * - DELETE raderar posten permanent, vilket gör att man tappar historik.
 * - PATCH bevarar bokningsposten i databasen men markerar den som avbokad,
 *   vilket tillåter systemet att veta vem som bokat tiden samtidigt som rummet
 *   blir ledigt igen för andra användare.
 */
export function cancelBooking(bookingId: string): Promise<Booking> {
  return patch<Booking, { status: "cancelled" }>(`/bookings/${bookingId}`, {
    status: "cancelled",
  });
}

export function deleteBooking(bookingId: string): Promise<void> {
  return remove(`/bookings/${bookingId}`);
}
