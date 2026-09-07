import { useState } from "react";
import type { TimeSlot } from "../types/Booking";
import { createBooking } from "../services/bookingservice";

interface BookingFormProps {
  roomId: number;
}

export default function BookingForm({ roomId }: BookingFormProps) {
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState<TimeSlot | "">("");
  const [email, setEmail] = useState("");

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault(); //stoppar formuläret från att ladda om hela sidan när man klickar på Boka knappen

    if (!date || !timeSlot || !email) {
      return;
    }

    await createBooking({
      roomId: roomId,
      date,
      timeSlot,
      bookedBy: email,
      status: "confirmed",
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="date">Datum</label>

      <input
        id="date"
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />

      <label htmlFor="timeSlot">Tidsblock</label>

      <select
        id="timeSlot"
        value={timeSlot}
        onChange={(event) => setTimeSlot(event.target.value as TimeSlot)}
      >
        <option value="">Välj tid</option>
        <option value="09:00-10:00">09:00-10:00</option>
        <option value="10:00-11:00">10:00-11:00</option>
        <option value="11:00-12:00">11:00-12:00</option>
        <option value="12:00-13:00">12:00-13:00</option>
        <option value="13:00-14:00">13:00-14:00</option>
      </select>

      <label htmlFor="email">E-post</label>

      <input
        id="email"
        type="email"
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="namn@email.se"
      />

      <button type="submit">Boka</button>
    </form>
  );
}
