import { Outlet } from "react-router";
import Navbar from "./Navbar";

// Gemensam Layout-komponent som omsluter alla undersidor med Navbar och brödsmulor
export default function Layout() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Navbar />
      <main style={{ maxWidth: "1000px", width: "100%", margin: "0 auto", padding: "20px", flex: 1, boxSizing: "border-box" }}>
        <Outlet />
      </main>
    </div>
  );
}
