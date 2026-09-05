import { useEffect, useState } from "react";
import { useParams } from "react-router";
import type { GroupRoom } from "../types/GroupRoom";
import { getRoomById } from "../services/roomService";

export default function RoomDetails() {
  // Hämtar id från URL:en, t.ex. /rooms/2
  const { id } = useParams();

   // Sparar rummet som hämtas från JSON Server
  const [room, setRoom] = useState<GroupRoom | null>(null);

useEffect(() => {
    // Avbryt om id saknas i URL:en
    if (!id) return;

    // Hämtar rätt rum med hjälp av id
    getRoomById(id)
      .then((data) => setRoom(data))
      .catch((error) => console.error(error));
  }, [id]);

  // Visas medan rummet hämtas
  if (!room) {
    return <p>Laddar rum...</p>;
  }

  return (
    <main>
      <h1>{room.name}</h1>
      <p>Kapacitet: {room.capacity} personer</p>
    </main>
  );
}