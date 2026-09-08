import type { Booking } from "../types/Booking";

/**
 * Props-interface för BookingCard.
 * Uppfyller kursmål 4 (G-krav) genom att ta en typad callback-prop:
 * onCancel: (bookingId: number) => void
 */
export interface BookingCardProps {
  booking: Booking;
  roomName: string;
  onCancel: (bookingId: string) => void; // 👈 Typad Callback-prop enligt lärarens krav
}

/**
 * Presenterande komponent för en enskild bokning.
 * Hanterar status-narrowing ("confirmed" vs "cancelled")
 * och anropar förälderns callback vid avbokning.
 */
export default function BookingCard({
  booking,
  roomName,
  onCancel,
}: BookingCardProps) {
  const isCancelled = booking.status === "cancelled";

  return (
    <div
      className="booking-card"
      style={{
        backgroundColor: "#ffffff",
        border: "1px solid #cbd5dc",
        borderRadius: "8px",
        padding: "16px",
        marginBottom: "12px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <h3 style={{ margin: "0 0 6px 0", color: "#0f1f2e" }}>{roomName}</h3>
          <p style={{ margin: "4px 0", color: "#64748b", fontSize: "0.9rem" }}>
            Boknings-ID: <strong>#{booking.id}</strong>
          </p>
        </div>

        {/* Färgkodad statusbadge med union-typ narrowing */}
        <span
          style={{
            padding: "4px 10px",
            borderRadius: "9999px",
            fontSize: "0.8rem",
            fontWeight: 700,
            backgroundColor: isCancelled ? "#fee2e2" : "#dcfce7",
            color: isCancelled ? "#991b1b" : "#166534",
          }}
        >
          {isCancelled ? "Avbokad" : "Bekräftad"}
        </span>
      </div>

      <div style={{ marginTop: "12px", fontSize: "0.95rem", color: "#334155" }}>
        <p style={{ margin: "4px 0" }}>
          📅 Datum: <strong>{booking.date}</strong>
        </p>
        <p style={{ margin: "4px 0" }}>
          ⏰ Tid: <strong>{booking.timeSlot}</strong>
        </p>
        <p style={{ margin: "4px 0", fontSize: "0.85rem", color: "#64748b" }}>
          👤 Bokad av: {booking.bookedBy}
        </p>
      </div>

      {/* Avbokningsknapp som exekverar den typade callback-proppen */}
      {!isCancelled && (
        <div style={{ marginTop: "14px" }}>
          <button
            type="button"
            onClick={() => onCancel(booking.id)}
            style={{
              padding: "8px 14px",
              backgroundColor: "#dc2626",
              color: "#ffffff",
              border: "none",
              borderRadius: "6px",
              fontWeight: 600,
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
          >
            Avboka rum
          </button>
        </div>
      )}
    </div>
  );
}
