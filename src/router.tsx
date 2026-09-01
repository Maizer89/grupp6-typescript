import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import RoomDetails from "./pages/RoomDetails";
import MyBookings from "./pages/MyBookings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/rooms/:id",
    element: <RoomDetails />,
  },
  {
    path: "/my-bookings",
    element: <MyBookings />,
  },
]);
