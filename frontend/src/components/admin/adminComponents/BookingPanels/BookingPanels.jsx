import { useEffect, useMemo, useState } from "react";
import styles from "./BookingPanels.module.css";

const API_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://adventurexp-dyg7gcfbbackhphq.spaincentral-01.azurewebsites.net/";

const activityColors = {
  gokart: { color: "#ff5a3c", tint: "#fde5df" },
  minigolf: { color: "#1ab4a5", tint: "#dff6f3" },
  paintball: { color: "#f39b4d", tint: "#fdf0df" },
  sumo: { color: "#b39ddb", tint: "#efe7ff" },
};

const defaultCapacityByActivity = {
  gokart: 12,
  minigolf: 18,
  paintball: 14,
  sumo: 4,
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

function formatActivityName(activityName) {
  const normalized = normalizeActivityName(activityName);

  if (normalized === "gokart") return "Gokart";
  if (normalized === "minigolf") return "Minigolf";
  if (normalized === "paintball") return "Paintball";
  if (normalized === "sumo") return "Sumobrydning";

  return activityName || "Ukendt";
}

function makeBookingColor(activityName) {
  const normalized = normalizeActivityName(activityName);
  return activityColors[normalized] || { color: "#ff5a3c", tint: "#fde5df" };
}

function BookingPanels() {
  const [reservations, setReservations] = useState([]);
  const [activities, setActivities] = useState([]);

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

  useEffect(() => {
    fetch(`${API_URL}/api/activities`)
      .then((response) => response.json())
      .then((data) => {
        setActivities(Array.isArray(data) ? data : []);
      })
      .catch(() => setActivities([]));
  }, []);

  const upcomingBookings = useMemo(() => {
    return reservations.slice(0, 5).map((reservation) => {
      const activityName = reservation.activity?.name || "Ukendt aktivitet";
      const palette = makeBookingColor(activityName);

      return {
        id: reservation.reservationId,
        activityName,
        customerName: reservation.customer?.name || "Kunde",
        time: formatTime(reservation.startTime),
        people: reservation.numberOfPeople,
        color: palette.color,
      };
    });
  }, [reservations]);

  const equipmentStatus = useMemo(() => {
    const list = activities.length ? activities : [
      { name: "GoKart" },
      { name: "Paintball" },
      { name: "Sumo Wrestling" },
      { name: "Minigolf" },
    ];

    return list.map((activity) => {
      const activityName = activity.name || "Ukendt";
      const displayName = formatActivityName(activityName);
      const normalized = normalizeActivityName(activityName);
      const capacity = defaultCapacityByActivity[normalized] || 12;
      const booked = reservations
        .filter((reservation) => {
          const reservationName = reservation.activity?.name || "";
          return normalizeActivityName(reservationName) === normalized;
        })
        .reduce((sum, reservation) => sum + Number(reservation.numberOfPeople || 0), 0);

      const isReady = booked >= capacity;

      return {
        id: activity.activityId || activityName,
        name: displayName,
        booked,
        capacity,
        status: isReady ? "Klar" : "Ledig",
        color: makeBookingColor(activityName).color,
        tint: makeBookingColor(activityName).tint,
      };
    });
  }, [activities, reservations]);

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
        <h3 className={styles.smallPanelTitle}>Udstyrsstatus</h3>

        <div className={styles.statusList}>
          {equipmentStatus.map((item) => (
            <div key={item.id} className={styles.statusRow}>
              <span className={styles.statusName}>{item.name}</span>
              <span
                className={styles.statusBadge}
                style={{
                  background: item.tint,
                  color: item.color,
                  borderColor: `${item.color}66`,
                }}
              >
                {item.booked}/{item.capacity} {item.status}
              </span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default BookingPanels;
