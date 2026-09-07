import { Link, NavLink, useLocation } from "react-router";

// Genererar brödsmulor (breadcrumbs) dynamiskt baserat på aktuell URL
function Breadcrumbs() {
  const location = useLocation();
  const path = location.pathname;

  // Bygg upp brödsmulorna beroende på rutt
  let currentLabel: string | null = null;

  if (path.startsWith("/rooms/")) {
    const roomId = path.split("/")[2];
    currentLabel = `Rum ${roomId}`;
  } else if (path === "/my-bookings") {
    currentLabel = "Mina Bokningar";
  }

  // Om vi är på startsidan visas enbart "Hem"
  if (path === "/") {
    return (
      <nav aria-label="Brödsmulor" style={breadcrumbStyles.nav}>
        <span style={breadcrumbStyles.current}>Hem</span>
      </nav>
    );
  }

  return (
    <nav aria-label="Brödsmulor" style={breadcrumbStyles.nav}>
      <Link to="/" style={breadcrumbStyles.link}>Hem</Link>
      <span style={breadcrumbStyles.separator}>/</span>
      <span style={breadcrumbStyles.current}>{currentLabel}</span>
    </nav>
  );
}

// Minimal och tydlig Navbar för hela applikationen
export default function Navbar() {
  return (
    <header style={navbarStyles.header}>
      <div style={navbarStyles.container}>
        <div style={navbarStyles.brandContainer}>
          <Link to="/" style={navbarStyles.brand}>
            📚 Biblioteket <span style={navbarStyles.subBrand}>Grupprum</span>
          </Link>
        </div>

        {/* Huvudnavigering */}
        <nav style={navbarStyles.navLinks}>
          <NavLink
            to="/"
            end
            style={({ isActive }) => ({
              ...navbarStyles.link,
              ...(isActive ? navbarStyles.activeLink : {}),
            })}
          >
            Alla Rum
          </NavLink>
          <NavLink
            to="/my-bookings"
            style={({ isActive }) => ({
              ...navbarStyles.link,
              ...(isActive ? navbarStyles.activeLink : {}),
            })}
          >
            Mina Bokningar
          </NavLink>
        </nav>
      </div>

      {/* Brödsmulor direkt under navigeringsraden */}
      <div style={navbarStyles.breadcrumbContainer}>
        <Breadcrumbs />
      </div>
    </header>
  );
}

// Minimala och rena inline-stilar som fungerar utan externa CSS-beroenden
const navbarStyles: Record<string, React.CSSProperties> = {
  header: {
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e2e8f0",
    boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
    position: "sticky",
    top: 0,
    zIndex: 50,
  },
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "12px 20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  brandContainer: {
    display: "flex",
    alignItems: "center",
  },
  brand: {
    fontSize: "1.15rem",
    fontWeight: "700",
    color: "#1e293b",
    textDecoration: "none",
  },
  subBrand: {
    fontWeight: "400",
    color: "#64748b",
    marginLeft: "6px",
    fontSize: "0.95rem",
  },
  navLinks: {
    display: "flex",
    gap: "16px",
  },
  link: {
    fontSize: "0.95rem",
    fontWeight: "500",
    color: "#475569",
    textDecoration: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    transition: "background-color 0.15s ease",
  },
  activeLink: {
    color: "#0f172a",
    backgroundColor: "#f1f5f9",
    fontWeight: "700",
  },
  breadcrumbContainer: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "6px 20px 10px 20px",
    borderTop: "1px solid #f1f5f9",
  },
};

const breadcrumbStyles: Record<string, React.CSSProperties> = {
  nav: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "0.85rem",
    color: "#64748b",
  },
  link: {
    color: "#3b82f6",
    textDecoration: "none",
  },
  separator: {
    color: "#94a3b8",
  },
  current: {
    color: "#334155",
    fontWeight: "600",
  },
};
