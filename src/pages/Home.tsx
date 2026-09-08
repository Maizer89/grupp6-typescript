import { useEffect, useState } from "react";
import type { GroupRoom } from "../types/GroupRoom";
import { getRooms } from "../services/roomService";
import RoomCard from "../components/RoomCard";

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
    <main className="home-page">
      <div className="home-header">
        <h1>Tillgängliga rum</h1>
        <p>Välj ett rum för att se information och boka en ledig tid.</p>
      </div>
      <div className="room-grid">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </main>
  );
}
