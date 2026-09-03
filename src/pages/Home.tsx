import { useEffect, useState } from "react";
import type { GroupRoom } from "../types/GroupRoom";
import { getRooms } from "../services/roomService";

export default function Home() {
  // Sparar alla hämtade rum
  const [rooms, setRooms] = useState<GroupRoom[]>([]);

  useEffect(() => {
    // Hämtar rummen när sidan laddas
    getRooms()
      .then((data) => setRooms(data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <main>
      <h1>Tillgängliga rum</h1>

      {rooms.map((room) => (
        <div key={room.id}>
          <h2>{room.name}</h2>
          <p>Kapacitet: {room.capacity} personer</p>
        </div>
      ))}
    </main>
  );
}