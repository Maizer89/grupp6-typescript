import { Link, NavLink } from "react-router";

// Minimal och tydlig Navbar för hela applikationen
export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-container container">
        <div className="navbar-brand-container">
          <Link to="/" className="navbar-brand">
            📚 Biblioteket <span>Grupprum</span>
          </Link>
        </div>

        {/* Huvudnavigering */}
        <nav className="navbar-links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
          >
            Alla Rum
          </NavLink>
          <NavLink
            to="/my-bookings"
            className={({ isActive }) =>
              isActive ? "navbar-link active" : "navbar-link"
            }
          >
            Mina Bokningar
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
