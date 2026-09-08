import { useEffect, useState } from "react";
import { Link } from "react-router";
import type { Booking } from "../types/Booking";
import type { GroupRoom } from "../types/GroupRoom";
import {
  getBookingsByEmail,
  cancelBooking,
  deleteBooking,
} from "../services/bookingservice";
import { getRooms } from "../services/roomService";
import BookingCard from "../components/BookingCard";

/**
 * Sida för att söka och hantera användarens bokningar.
 * Implementerar Card 5 (Sök bokningar) och Card 6 (Avboka rum).
 *
 * Arkitektur & Logikflöde:
 * - Card 5: Användaren anger sin e-postadress. Vi validerar formatet och
 *   anropar getBookingsByEmail() som hämtar och filtrerar bokningarna.
 * - Card 6: Användaren kan avboka en bekräftad bokning. Efter en bekräftelsefråga
 *   skickas en PATCH-förfrågan som ändrar status till "cancelled".
 * - Reaktiv/Optimistisk uppdatering: Det lokala React-tillståndet (bookings)
 *   uppdateras direkt i komponenten så att användaren omedelbart ser att
 *   bokningen avbokats utan att hela sidan behöver laddas om.
 */
export default function MyBookings() {
  // 1. State-variabler:
  // Texten som användaren skriver in i sökfältet
  const [emailInput, setEmailInput] = useState<string>("");

  // E-postadressen som sökningen genomfördes för (visas i resultatrubriken)
  const [searchedEmail, setSearchedEmail] = useState<string>("");

  // Listan med användarens bokningar hämtade från backend
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Rumslista hämtad från roomService för att slå upp rumsnamn utifrån roomId
  const [rooms, setRooms] = useState<GroupRoom[]>([]);

  // Laddningsstatus under asynkrona anrop (inaktiverar knapp för att undvika dubbelklick)
  const [loading, setLoading] = useState<boolean>(false);

  // Feedback-meddelande till användaren (bekräftelse eller fel)
  const [message, setMessage] = useState<string>("");

  // 2. Effekt: Hämtar rummen vid sidladdning för att kunna visa rumsnamn
  // (t.ex. "Konferensrum A") istället för bara ett anonymt siffer-ID
  useEffect(() => {
    getRooms()
      .then((data) => setRooms(data))
      .catch((error) => console.error("Kunde inte hämta rum:", error));
  }, []);

  // Hjälpfunktion: Hämtar rumsnamn baserat på ett rums numeriska id
  function getRoomName(roomId: number): string {
    const room = rooms.find((r) => Number(r.id) === Number(roomId));
    return room ? room.name : `Rum #${roomId}`;
  }

  // 3. Card 5: Sök bokningar via e-postadress
  // Förhindrar formulärets omladdning, validerar formatet och anropar bokningsservicen
  function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setMessage("");

    // Enkel e-postvalidering
    if (!emailInput.trim() || !emailInput.includes("@")) {
      setMessage("Vänligen ange en giltig e-postadress.");
      return;
    }

    setLoading(true);
    setSearchedEmail(emailInput.trim());

    getBookingsByEmail(emailInput)
      .then((data) => {
        setBookings(data);
        if (data.length === 0) {
          setMessage("Inga bokningar hittades för denna e-postadress.");
        }
      })
      .catch(() => {
        setMessage("Kunde inte hämta bokningar. Kontrollera att servern körs.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  // 4. Card 6: Avboka ett rum
  // Frågar först användaren med confirm dialog för att förhindra misstag.
  // Ändrar därefter statusen på servern och uppdaterar det lokala tillståndet direkt.
  function handleCancel(bookingId: number) {
    const confirmCancel = window.confirm(
      "Är du säker på att du vill avboka detta rum?",
    );
    if (!confirmCancel) return;

    cancelBooking(bookingId)
      .then(() => {
        // Uppdaterar den lokala arrayen direkt så användaren ser statusändringen
        setBookings((prev) =>
          prev.map((b) =>
            b.id === bookingId ? { ...b, status: "cancelled" } : b,
          ),
        );
        setMessage(`Bokning #${bookingId} har avbokats.`);
      })
      .catch(() => {
        setMessage("Kunde inte avboka rummet. Försök igen senare.");
      });
  }

  function handleDelete(bookingId: number) {
    const confirmDelete = window.confirm(
      "Är du säger på att du vill ta bort bokningen permanent?",
    );

    if (!confirmDelete) {
      return;
    }

    deleteBooking(bookingId)
      .then(() => {
        setBookings((prev) =>
          prev.filter((booking) => booking.id !== bookingId),
        );

        setMessage(`Bokning #${bookingId} har tagits bort.`);
      })
      .catch(() => {
        setMessage("Kunde inte ta bort bokningen. Försök igen senare.");
      });
  }

  return (
    <>
      {/* Gemensam header enligt projektets design */}
      <header>
        <h2>Room Booking</h2>
        <nav>
          <Link to="/">Rum</Link>
          <Link to="/my-bookings">Mina bokningar</Link>
        </nav>
      </header>

      <main>
        <Link to="/">← Tillbaka till rum</Link>

        <h1>Mina Bokningar</h1>
        <p>
          Sök efter dina bokningar med din e-postadress för att se eller avboka
          rum.
        </p>

        {/* Card 5: Sökformulär */}
        <form onSubmit={handleSearch}>
          <label htmlFor="email">E-postadress</label>
          <input
            id="email"
            type="email"
            placeholder="namn@email.se"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? "Söker..." : "Sök bokningar"}
          </button>
          {message && <p className="booking-message">{message}</p>}
        </form>

        {/* Visar sökta bokningar */}
        {searchedEmail && bookings.length > 0 && (
          <section>
            <div>
              <h2>Bokningar för {searchedEmail}</h2>
              {bookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                  roomName={getRoomName(booking.roomId)}
                  onCancel={handleCancel}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
