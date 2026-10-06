import { useEffect, useState } from "react";
import styles from "./DashboardStats.module.css";

const API_URL = import.meta.env.VITE_API_BASE_URL;

function DashboardStats() {
  const [dashboard, setDashboard] = useState(null);

  useEffect(() => {
    fetch(`${API_URL}/api/reservations`)
      .then((response) => response.json())
      .then((reservations) => setDashboard(reservations));
  }, []);

  const difference = dashboard?.bookingDifference ?? 0;
  const differenceLabel = `${difference > 0 ? "+" : ""}${difference} vs. i går`;
  const upcomingBooking = dashboard?.nextBooking;

  return (
    <section className={styles.statsGrid} aria-label="Nøgletal">
      <article className={styles.statCard}>
        <h2 className={styles.statTitle}>Bookinger i dag</h2>
        <p className={styles.statValue} aria-live="polite">
          {dashboard ? dashboard.todayCount : "—"}
        </p>
        <p className={`${styles.statNote} ${styles.positiveNote}`}>
          {dashboard ? differenceLabel : "Henter data…"}
        </p>
      </article>

      <article className={styles.statCard}>
        <h2 className={styles.statTitle}>Kapacitet</h2>
        <p className={styles.statValue}>—</p>
        <p className={styles.statNote}>Ikke tilgængelig</p>
      </article>

      <article className={styles.statCard}>
        <h2 className={styles.statTitle}>Aktive spor</h2>
        <p className={styles.statValue}>—</p>
        <p className={styles.statNote}>Sporstatus ikke tilgængelig</p>
      </article>

      <article className={styles.statCard}>
        <h2 className={styles.statTitle}>Næste booking</h2>
        <p className={styles.statValue} aria-live="polite">
          {upcomingBooking ? upcomingBooking.startTime : "—"}
        </p>
        <p className={styles.statNote}>
          {upcomingBooking
            ? `${upcomingBooking.activity?.name || "Booking"} · ${upcomingBooking.numberOfPeople} personer`
            : dashboard
              ? "Ingen kommende booking"
              : "Henter data…"}
        </p>
      </article>
    </section>
  );
}

export default DashboardStats;
