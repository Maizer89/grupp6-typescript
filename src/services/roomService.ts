import { get } from "./api";
import type { GroupRoom } from "../types/GroupRoom";

// Hämtar alla rum från JSON Server
export function getRooms(): Promise<GroupRoom[]> {
  // Returnerar en array med GroupRoom-objekt
  return get<GroupRoom[]>("/rooms");
}

// Hämtar ett specifikt rum med hjälp av dess id
export function getRoomById(id: string): Promise<GroupRoom> {
  return get<GroupRoom>(`/rooms/${id}`);
}