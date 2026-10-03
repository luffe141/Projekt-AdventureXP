import { useEffect, useState } from "react";
import styles from "./BookingModal.module.css";

const activityOptions = ["Gokart", "Paintball", "Minigolf", "Sumobrydning"];

function getToday() {
  const today = new Date();
  const localDate = new Date(
    today.getTime() - today.getTimezoneOffset() * 60_000,
  );
  return localDate.toISOString().slice(0, 10);
}

function BookingModal({ activity, onClose }) {
  const [selectedActivity, setSelectedActivity] = useState(activity);
  const [submitted, setSubmitted] = useState(false);

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

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
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
              <button className={styles.submitButton} type="submit">
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
