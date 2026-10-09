import { useEffect, useMemo, useState } from "react";
import { API_URL } from "../../../../utils/api";
import { alertBackendException } from "../../../../utils/backendExceptionAlert";
import styles from "./BookingPanels.module.css";

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

const editActivityOptions = [
  "Gokart",
  "Minigolf",
  "Paintball",
  "Sumobrydning",
];

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
  const [deletingReservationId, setDeletingReservationId] = useState(null);
  const [deleteConfirmationId, setDeleteConfirmationId] = useState(null);
  const [editingReservationId, setEditingReservationId] = useState(null);
  const [editingDraft, setEditingDraft] = useState(null);

  async function deleteReservation(reservationId) {
    setDeletingReservationId(reservationId);
    try {
      const response = await fetch(
        `${API_URL}/api/reservations/${reservationId}`,
        { method: "DELETE" },
      );

      if (!response.ok) {
        await alertBackendException(response);
        return;
      }

      setReservations((current) =>
        current.filter(
          (reservation) => reservation.reservationId !== reservationId,
        ),
      );
    } catch {
      // A network failure has no backend exception response to display.
    } finally {
      setDeletingReservationId(null);
      setDeleteConfirmationId(null);
    }
  }

  function requestDeleteReservation(reservationId) {
    setDeleteConfirmationId(reservationId);
  }

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
      .then(async (response) => {
        if (!response.ok) {
          await alertBackendException(response);
          throw new Error("Kunne ikke hente aktiviteter");
        }

        return response.json();
      })
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
    const list = activities.length
      ? activities
      : [
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
        .reduce(
          (sum, reservation) => sum + Number(reservation.numberOfPeople || 0),
          0,
        );

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

  function openEditReservation(booking) {
    const reservation = reservations.find((item) => item.reservationId === booking.id);
    if (!reservation) return;

    setEditingReservationId(booking.id);
    setEditingDraft({
      name: reservation.customer?.name || "",
      email: reservation.customer?.email || "",
      phone: reservation.customer?.phone || "",
      activity: formatActivityName(reservation.activity?.name || booking.activityName),
      people: String(reservation.numberOfPeople || booking.people),
      date: reservation.date || "",
      time: formatTime(reservation.startTime || booking.time || "00:00"),
    });
  }

  function updateDraftField(field, value) {
    setEditingDraft((current) => ({ ...current, [field]: value }));
  }

  function saveEditedReservation(event) {
    event.preventDefault();
    if (!editingReservationId || !editingDraft) return;

    setReservations((current) =>
      current.map((reservation) => {
        if (reservation.reservationId !== editingReservationId) {
          return reservation;
        }

        const nextActivityName = editingDraft.activity;
        const selectedActivity = activities.find(
          (activity) =>
            normalizeActivityName(activity.name) ===
            normalizeActivityName(nextActivityName),
        );

        return {
          ...reservation,
          customer: {
            ...reservation.customer,
            name: editingDraft.name,
            email: editingDraft.email,
            phone: editingDraft.phone,
          },
          activity: {
            ...reservation.activity,
            name: nextActivityName,
            activityId:
              selectedActivity?.activityId ?? reservation.activity?.activityId,
          },
          numberOfPeople: Number(editingDraft.people || 0),
          date: editingDraft.date,
          startTime: editingDraft.time,
        };
      }),
    );

    setEditingReservationId(null);
    setEditingDraft(null);
  }

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
                <div
                  className={styles.bookingTime}
                  style={{ color: booking.color }}
                >
                  {booking.time}
                </div>
                <div className={styles.bookingContent}>
                  <p className={styles.bookingName}>
                    {booking.activityName} · {booking.people} pers.
                  </p>
                  <p className={styles.bookingMeta}>{booking.customerName}</p>
                </div>
                <div className={styles.bookingActions}>
                  <button
                    className={styles.editBookingButton}
                    type="button"
                    onClick={() => openEditReservation(booking)}
                    aria-label={`Rediger booking: ${booking.activityName} med ${booking.customerName}`}
                    title="Rediger booking"
                  >
                    Rediger
                  </button>
                  <button
                    className={styles.deleteBookingButton}
                    type="button"
                    onClick={() => requestDeleteReservation(booking.id)}
                    disabled={deletingReservationId === booking.id}
                    aria-label={`Slet booking: ${booking.activityName} med ${booking.customerName}`}
                    title="Slet booking"
                  >
                    <svg aria-hidden="true" viewBox="0 0 16 16" focusable="false">
                      <path d="M5.5 2.5h5m-7 2h9m-8 0 .5 8h5l.5-8M6.5 6.5v4m3-4v4M6 2.5l.5-1h3l.5 1" />
                    </svg>
                  </button>
                </div>
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

      {deleteConfirmationId !== null && (
        <div
          className={styles.modalBackdrop}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setDeleteConfirmationId(null);
            }
          }}
        >
          <section className={styles.confirmModal} role="dialog" aria-modal="true">
            <h3>Bekræft sletning</h3>
            <p>Er du sikker på, at du vil slette denne booking?</p>
            <div className={styles.editActions}>
              <button
                type="button"
                className={styles.cancelButton}
                onClick={() => setDeleteConfirmationId(null)}
              >
                Annuller
              </button>
              <button
                type="button"
                className={styles.deleteConfirmButton}
                onClick={() => deleteReservation(deleteConfirmationId)}
              >
                Slet booking
              </button>
            </div>
          </section>
        </div>
      )}

      {editingDraft && (
        <div
          className={styles.modalBackdrop}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setEditingReservationId(null);
              setEditingDraft(null);
            }
          }}
        >
          <section className={styles.editModal} role="dialog" aria-modal="true">
            <div className={styles.editModalHeader}>
              <div>
                <p className={styles.editEyebrow}>Rediger reservation</p>
                <h3>Rediger kunde / ordre</h3>
              </div>
              <button
                type="button"
                className={styles.closeButton}
                onClick={() => {
                  setEditingReservationId(null);
                  setEditingDraft(null);
                }}
                aria-label="Luk redigering"
              >
                ×
              </button>
            </div>

            <form className={styles.editForm} onSubmit={saveEditedReservation}>
              <label className={styles.editField}>
                <span>Navn</span>
                <input
                  value={editingDraft.name}
                  onChange={(event) => updateDraftField("name", event.target.value)}
                  required
                />
              </label>

              <label className={styles.editField}>
                <span>E-mail</span>
                <input
                  type="email"
                  value={editingDraft.email}
                  onChange={(event) => updateDraftField("email", event.target.value)}
                  required
                />
              </label>

              <label className={styles.editField}>
                <span>Telefon</span>
                <input
                  type="tel"
                  value={editingDraft.phone}
                  onChange={(event) => updateDraftField("phone", event.target.value)}
                  required
                />
              </label>

              <label className={styles.editField}>
                <span>Oplevelse</span>
                <select
                  value={editingDraft.activity}
                  onChange={(event) => updateDraftField("activity", event.target.value)}
                >
                  {editActivityOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </label>

              <label className={styles.editField}>
                <span>Antal personer</span>
                <input
                  type="number"
                  min="1"
                  max="100"
                  value={editingDraft.people}
                  onChange={(event) => updateDraftField("people", event.target.value)}
                  required
                />
              </label>

              <label className={styles.editField}>
                <span>Dato</span>
                <input
                  type="date"
                  value={editingDraft.date}
                  onChange={(event) => updateDraftField("date", event.target.value)}
                  required
                />
              </label>

              <label className={styles.editField}>
                <span>Tidspunkt</span>
                <input
                  type="time"
                  value={editingDraft.time}
                  onChange={(event) => updateDraftField("time", event.target.value)}
                  required
                />
              </label>

              <div className={styles.editActions}>
                <button
                  type="button"
                  className={styles.cancelButton}
                  onClick={() => {
                    setEditingReservationId(null);
                    setEditingDraft(null);
                  }}
                >
                  Annuller
                </button>
                <button type="submit" className={styles.submitButton}>
                  Gem ændringer
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

export default BookingPanels;
