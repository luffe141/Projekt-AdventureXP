import { useEffect, useMemo, useState } from "react";
import styles from "./BookingPanels.module.css";

const API_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://adventurexp-dyg7gcfbbackhphq.spaincentral-01.azurewebsites.net/";

const activityColors = {
  gokart: { color: "#ff5a3c", tint: "#fde5df" },
  minigolf: { color: "#1ab4a5", tint: "#dff6f3" },
  paintball: { color: "#f39b4d", tint: "#fdf0df" },
  sumo: { color: "#e96d6d", tint: "#fbe6e6" },
};

function normalizeActivityName(name = "") {
  return name
    .toLowerCase()
    .replace(/wrestling|brydning/g, "")
    .replace(/[^a-z]/g, "");
}

function formatTime(time) {
  if (!time) return "00:00";

  const value = String(time).trim();
  const match = value.match(/^(\d{1,2}):(\d{2})(?::\d{2})?/);

  if (match) {
    return `${String(match[1]).padStart(2, "0")}:${match[2]}`;
  }

  const digits = value.replace(/[^\d]/g, "");
  if (digits.length >= 4) {
    return `${digits.slice(0, -2).padStart(2, "0")}:${digits.slice(-2)}`;
  }

  return value;
}

function formatDateLabel(dateString) {
  if (!dateString) return "--/--";

  const date = new Date(`${dateString}T00:00:00`);
  return date.toLocaleDateString("da-DK", {
    day: "2-digit",
    month: "2-digit",
  });
}

function makeBookingColor(activityName) {
  const normalized = normalizeActivityName(activityName);
  return activityColors[normalized] || { color: "#ff5a3c", tint: "#fde5df" };
}

function BookingPanels() {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/reservations`)
      .then((response) => response.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          setReservations([]);
          return;
        }

        const now = new Date();
        const future = data
          .filter((reservation) => {
            if (!reservation?.date) return false;
            const reservationDate = new Date(`${reservation.date}T00:00:00`);
            return reservationDate >= new Date(now.toDateString());
          })
          .sort((a, b) => new Date(a.date) - new Date(b.date));

        setReservations(future);
      })
      .catch(() => setReservations([]));
  }, []);

  const upcomingBookings = useMemo(() => {
    return reservations.slice(0, 5).map((reservation) => {
      const activityName = reservation.activity?.name || "Ukendt aktivitet";
      const palette = makeBookingColor(activityName);

      return {
        id: reservation.reservationId,
        activityName,
        customerName: reservation.customer?.name || "Kunde",
        date: reservation.date,
        time: formatTime(reservation.startTime),
        people: reservation.numberOfPeople,
        color: palette.color,
      };
    });
  }, [reservations]);

  return (
    <div className={styles.sidePanels}>
      <section className={`${styles.panel} ${styles.smallPanel}`}>
        <h3 className={styles.smallPanelTitle}>Kommende bookinger</h3>

        {upcomingBookings.length === 0 ? (
          <p className={styles.emptyState}>Ingen kommende bookinger.</p>
        ) : (
          <div className={styles.bookingList}>
            {upcomingBookings.map((booking) => (
              <div key={booking.id} className={styles.bookingRow}>
                <div className={styles.bookingTime} style={{ color: booking.color }}>
                  {booking.time}
                </div>
                <div className={styles.bookingContent}>
                  <p className={styles.bookingName}>
                    {booking.activityName} · {booking.people} pers.
                  </p>
                  <p className={styles.bookingMeta}>{booking.customerName}</p>
                </div>
                <span
                  className={styles.bookingDot}
                  style={{ background: booking.color }}
                  aria-label={booking.activityName}
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <section className={`${styles.panel} ${styles.smallPanel}`}>
        <h3 className={styles.smallPanelTitle}>Fremtidige datoer</h3>

        <div className={styles.dateList}>
          {upcomingBookings.length === 0 ? (
            <p className={styles.emptyState}>Ingen datoer i fremtiden.</p>
          ) : (
            upcomingBookings.map((booking) => (
              <div key={`date-${booking.id}`} className={styles.dateRow}>
                <span className={styles.dateName}>{booking.activityName}</span>
                <span
                  className={styles.dateBadge}
                  style={{
                    background: `${booking.color}22`,
                    color: booking.color,
                    borderColor: `${booking.color}66`,
                  }}
                >
                  {formatDateLabel(booking.date)}
                </span>
              </div>
            ))
          )}
        </div>
      </section>
    </div>
  );
}

export default BookingPanels;
