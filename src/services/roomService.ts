import { get } from "./api";
import type { GroupRoom } from "../types/GroupRoom";

// Hämtar alla rum från JSON Server
export function getRooms(): Promise<GroupRoom[]> {
  // Returnerar en array med GroupRoom-objekt
  return get<GroupRoom[]>("/rooms");
}

//Hämtar 1 rum
export function getRoom(id: number): Promise<GroupRoom> {
  return get<GroupRoom>(`/rooms/${id}`);
}
