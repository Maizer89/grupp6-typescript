import { useParams } from "react-router";
import BookingForm from "../components/BookingForm";

export default function RoomDetails() {
  const { id } = useParams();

  if (!id) {
    return <p>Rummet kunde inte hittas, var god försök igen!</p>;
  }

  const roomId = Number(id);

  return (
    <main>
      <h1>Rum detaljer</h1>

      <BookingForm roomId={roomId} />
    </main>
  );
}
