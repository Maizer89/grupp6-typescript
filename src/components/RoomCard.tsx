import type { GroupRoom } from "../types/GroupRoom";

interface RoomCardProps {
  room: GroupRoom;
}

// Visar information om ett enskilt rum
export default function RoomCard({ room }: RoomCardProps) {
  return (
    <div>
      <h2>{room.name}</h2>
      <p>Kapacitet: {room.capacity} personer</p>
    </div>
  );
}