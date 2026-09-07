import { useState } from "react";

export default function BookingForm() {
  const [date, setDate] = useState("");

  return (
    <form>
      <label htmlFor="date">Datum</label>

      <input
        id="date"
        type="date"
        value={date}
        onChange={(event) => setDate(event.target.value)}
      />
    </form>
  );
}
