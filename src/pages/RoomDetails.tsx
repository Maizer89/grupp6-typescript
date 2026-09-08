import { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import type { GroupRoom } from "../types/GroupRoom";
import { getRoom } from "../services/roomService";
import BookingForm from "../components/BookingForm";

export default function RoomDetails() {
  const { id } = useParams();
  const [room, setRoom] = useState<GroupRoom | null>(null);

  useEffect(() => {
    if (id === undefined) {
      return;
    }

    getRoom(id)
      .then((data) => setRoom(data))
      .catch((error) => console.error(error));
  }, [id]);

  if (!id) {
    return <p>Rummet hittades inte! Var god försök igen</p>;
  }

  if (!room) {
    return <p>Laddar rum...</p>;
  }

  return (
    <>
      <header>
        <h2>Room Booking</h2>

        <nav>
          <Link to="/">Rum</Link>
          <Link to="/my-bookings">Mina bokningar</Link>
        </nav>
      </header>

      <main>
        <Link to="/">← Tillbaka till rum</Link>

        <section>
          <div>
            <img src={room.image} alt={room.name} />

            <h1>{room.name}</h1>

            <p>{room.capacity} platser</p>

            <div>
              {room.equipment.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>

            <h2>Beskrivning</h2>

            <p>{room.description}</p>
          </div>
          <div>
            <h2>Boka detta rum</h2>
            <p>Fyll i uppgifterna för att boka en tid</p>

            <BookingForm roomId={room.id} />
          </div>
        </section>
      </main>
    </>
  );
}
