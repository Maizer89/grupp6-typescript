import { Outlet } from "react-router";
import Navbar from "./Navbar";

// Gemensam Layout-komponent som omsluter alla undersidor med Navbar och brödsmulor
export default function Layout() {
  return (
    <div className="app-layout">
      <Navbar />
      <main className="app-main">
        <Outlet />
      </main>
    </div>
  );
}
