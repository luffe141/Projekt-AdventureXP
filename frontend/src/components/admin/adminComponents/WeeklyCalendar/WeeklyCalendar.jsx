import { useEffect, useMemo, useState } from "react";
import { API_URL } from "../../../../utils/api";
import { alertBackendException } from "../../../../utils/backendExceptionAlert";
import styles from "./WeeklyCalendar.module.css";

const activityColors = {
  gokart: { color: "#ff5a3c", tint: "#fde5df" },
  minigolf: { color: "#1ab4a5", tint: "#dff6f3" },
  paintball: { color: "#f39b4d", tint: "#fdf0df" },
  sumo: { color: "#b39ddb", tint: "#efe7ff" },
};

function normalizeActivityName(name = "") {
  return name
    .toLowerCase()
    .replace(/wrestling|brydning/g, "")
    .replace(/[^a-z]/g, "");
}

function toLocalDateString(date) {
  const localDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60_000,
  );
  return localDate.toISOString().slice(0, 10);
}

function getWeekStart(date = new Date()) {
  const start = new Date(date);
  const day = (start.getDay() + 6) % 7;
  start.setHours(0, 0, 0, 0);
  start.setDate(start.getDate() - day);
  return start;
}

function addDays(date, days) {
  const next = new Date(date);
  next.setDate(next.getDate() + days);
  return next;
}

function getWeekNumber(date = new Date()) {
  const tempDate = new Date(
    Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()),
  );
  const day = tempDate.getUTCDay() || 7;
  tempDate.setUTCDate(tempDate.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(tempDate.getUTCFullYear(), 0, 1));
  return Math.ceil(
    ((tempDate.getTime() - yearStart.getTime()) / 86400000 + 1) / 7,
  );
}

function getWeekDays() {
  const startOfWeek = getWeekStart();

  return Array.from({ length: 7 }, (_, index) => {
    const date = addDays(startOfWeek, index);

    return {
      label: ["MAN", "TIR", "ONS", "TOR", "FRE", "LØR", "SØN"][index],
      number: date.getDate(),
      date: toLocalDateString(date),
    };
  });
}

function mapReservationToEvent(reservation) {
  const activityName = reservation.activity?.name || "Ukendt";
  const normalized = normalizeActivityName(activityName);
  const palette = activityColors[normalized] || {
    color: "#ff5a3c",
    tint: "#fde5df",
  };

  const time = String(reservation.startTime || "00:00").replace(/:00$/, "");

  return {
    id:
      reservation.reservationId ??
      `${reservation.date}-${reservation.startTime}`,
    name: activityName,
    detail: `${time} - ${reservation.numberOfPeople || 0} pers.`,
    ...palette,
  };
}

function WeeklyCalendar() {
  const [reservations, setReservations] = useState([]);
  const weekDays = useMemo(() => getWeekDays(), []);
  const weekNumber = getWeekNumber(new Date());

  useEffect(() => {
    fetch(`${API_URL}/api/reservations`)
      .then(async (response) => {
        if (!response.ok) {
          await alertBackendException(response);
          throw new Error("Kunne ikke hente reservationer");
        }

        return response.json();
      })
      .then((data) => {
        if (!Array.isArray(data)) {
          setReservations([]);
          return;
        }

        const thisWeek = new Set(weekDays.map((day) => day.date));
        const filtered = data.filter((reservation) => {
          if (!reservation?.date) return false;
          return thisWeek.has(reservation.date);
        });

        setReservations(filtered);
      })
      .catch(() => setReservations([]));
  }, [weekDays]);

  const todayKey = toLocalDateString(new Date());
  const todayIndex = weekDays.findIndex((day) => day.date === todayKey);

  return (
    <section
      className={`${styles.panel} ${styles.calendarPanel}`}
      aria-label="Ugekalender"
    >
      <header className={styles.panelHeader}>
        <h2 className={styles.panelTitle}>
          Ugekalender
          <span className={styles.weekLabel}>UGE {weekNumber}</span>
        </h2>

        <div className={styles.calendarTools}>
          <div className={styles.legend} aria-label="Aktiviteter">
            <span className={styles.legendItem}>
              <span
                className={styles.legendDot}
                style={{ backgroundColor: activityColors.gokart.color }}
              />
              Gokart
            </span>
            <span className={styles.legendItem}>
              <span
                className={styles.legendDot}
                style={{ backgroundColor: activityColors.minigolf.color }}
              />
              Minigolf
            </span>
            <span className={styles.legendItem}>
              <span
                className={styles.legendDot}
                style={{ backgroundColor: activityColors.paintball.color }}
              />
              Paintball
            </span>
            <span className={styles.legendItem}>
              <span
                className={styles.legendDot}
                style={{ backgroundColor: activityColors.sumo.color }}
              />
              Sumo
            </span>
          </div>

          <button
            className={styles.calendarButton}
            type="button"
            aria-label="Forrige uge"
          >
            ‹
          </button>
          <button
            className={styles.calendarButton}
            type="button"
            aria-label="Næste uge"
          >
            ›
          </button>
        </div>
      </header>

      <div className={styles.calendarDays}>
        {weekDays.map((day, index) => {
          const isToday = index === todayIndex;
          const dayEvents = reservations
            .filter((reservation) => reservation.date === day.date)
            .map(mapReservationToEvent);

          return (
            <article
              key={day.date}
              className={`${styles.dayColumn} ${isToday ? styles.dayColumnToday : ""}`}
            >
              <div className={styles.dayTopline}>
                <span>{day.label}</span>
                {isToday && <span className={styles.todayLabel}>I DAG</span>}
              </div>

              <div className={styles.dayNumber}>{day.number}</div>

              <div className={styles.eventList}>
                {dayEvents.map((event) => (
                  <div
                    key={event.id}
                    className={styles.event}
                    style={{
                      backgroundColor: event.tint,
                      borderLeft: `2px solid ${event.color}`,
                    }}
                  >
                    <span className={styles.eventName}>{event.name}</span>
                    <span className={styles.eventDetail}>{event.detail}</span>
                  </div>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default WeeklyCalendar;
