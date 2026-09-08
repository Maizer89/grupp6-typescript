import { Link } from "react-router";
import type { GroupRoom } from "../types/GroupRoom";

interface RoomCardProps {
  room: GroupRoom;
}

// Visar information om ett enskilt rum
export default function RoomCard({ room }: RoomCardProps) {
  return (
    <div className="room-card">
      <img className="room-card-image" src={room.image} alt={room.name} />
      <div className="room-card-content">
        <h2>{room.name}</h2>
        <div className="room-card-info">
          <span>👥 {room.capacity} personer</span>
          {room.equipment.length > 0 && <span> ▣ {room.equipment[0]}</span>}
        </div>

        <Link className="room-card-link" to={`/rooms/${room.id}`}>
          Visa rum
        </Link>
      </div>
    </div>
  );
}
