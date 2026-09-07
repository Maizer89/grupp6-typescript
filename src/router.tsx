import { createBrowserRouter } from "react-router";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import RoomDetails from "./pages/RoomDetails";
import MyBookings from "./pages/MyBookings";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "rooms/:id",
        element: <RoomDetails />,
      },
      {
        path: "my-bookings",
        element: <MyBookings />,
      },
    ],
  },
]);
