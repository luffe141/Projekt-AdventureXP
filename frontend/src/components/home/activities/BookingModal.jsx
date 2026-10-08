import { useEffect, useState } from "react";
import { API_URL } from "../../../utils/api";
import { alertBackendException } from "../../../utils/backendExceptionAlert";
import styles from "./BookingModal.module.css";

const activityOptions = ["Gokart", "Paintball", "Minigolf", "Sumobrydning"];

function normalizeActivityName(name) {
  return name
    .toLowerCase()
    .replace(/wrestling|brydning/g, "")
    .replace(/[^a-z]/g, "");
}

function getToday() {
  const today = new Date();
  const localDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60_000,
  );
  return localDate.toISOString().slice(0, 10);
}

function BookingModal({ activity, onClose }) {
  const [selectedActivity, setSelectedActivity] = useState(activity);
  const [activities, setActivities] = useState([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/api/activities`)
      .then(async (response) => {
        if (!response.ok) {
          await alertBackendException(response);
          throw new Error("Kunne ikke hente aktiviteter");
        }

        return response.json();
      })
      .then(setActivities)
      .catch(() => setActivities([]));
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.classList.add(styles.modalOpen);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.classList.remove(styles.modalOpen);
    };
  }, [onClose]);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const selected = activities.find(
      (option) =>
        normalizeActivityName(option.name) ===
        normalizeActivityName(selectedActivity),
    );

    try {
      const response = await fetch(`${API_URL}/api/reservations`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          phone: formData.get("phone"),
          activityId: selected.activityId,
          date: formData.get("date"),
          time: formData.get("time"),
          numberOfPeople: Number(formData.get("people")),
        }),
      });

      if (!response.ok) {
        await alertBackendException(response);
        return;
      }

      setSubmitted(true);
    } catch {
      // Network errors have no backend exception message to display.
    }
  }

  return (
    <div
      className={styles.backdrop}
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <section
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
      >
        <div className={styles.modalHeader}>
          <div>
            <p className={styles.eyebrow}>Book din oplevelse</p>
            <h2 id="booking-modal-title">Klar til action?</h2>
          </div>
          <button
            className={styles.closeButton}
            type="button"
            onClick={onClose}
            aria-label="Luk booking"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>

        {submitted ? (
          <div className={styles.confirmation} role="status">
            <span className={styles.checkmark} aria-hidden="true">
              ✓
            </span>
            <h3>Tak for din forespørgsel!</h3>
            <p>
              Vi vender tilbage hurtigst muligt for at bekræfte tidspunktet.
            </p>
            <button
              className={styles.submitButton}
              type="button"
              onClick={onClose}
            >
              Luk
            </button>
          </div>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <label className={styles.fullWidth}>
              <span>Navn</span>
              <input
                name="name"
                type="text"
                placeholder="Dit navn"
                autoFocus
                required
              />
            </label>

            <label className={styles.fullWidth}>
              <span>E-mail</span>
              <input
                name="email"
                type="email"
                placeholder="din@email.dk"
                autoComplete="email"
                required
              />
            </label>

            <label>
              <span>Oplevelse</span>
              <select
                name="activity"
                value={selectedActivity}
                onChange={(event) => setSelectedActivity(event.target.value)}
                disabled={!activities.length}
              >
                {activityOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>

            <label>
              <span>Antal personer</span>
              <input
                name="people"
                type="number"
                min="1"
                max="100"
                defaultValue="4"
                required
              />
            </label>

            <label>
              <span>Ønsket dato</span>
              <input name="date" type="date" min={getToday()} required />
            </label>

            <label>
              <span>Ønsket tidspunkt</span>
              <input name="time" type="time" required />
            </label>

            <label>
              <span>Telefon</span>
              <input
                name="phone"
                type="tel"
                placeholder="12 34 56 78"
                autoComplete="tel"
                required
              />
            </label>

            <p className={styles.note}>
              <span aria-hidden="true">✓</span>
              Vi bekræfter tidspunktet hurtigst muligt.
            </p>

            <div className={styles.actions}>
              <button
                className={styles.cancelButton}
                type="button"
                onClick={onClose}
              >
                Annuller
              </button>
              <button
                className={styles.submitButton}
                type="submit"
                disabled={!activities.length}
              >
                Send forespørgsel
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
}

export default BookingModal;
