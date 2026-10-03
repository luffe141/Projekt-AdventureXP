import styles from "./BookingBanner.module.css";

function BookingBanner() {
  return (
    <section className={styles.bookingBanner} id="booking">
      <div className={`page-width ${styles.inner}`}>
        <div>
          <p className="eyebrow">Din næste oplevelse starter her</p>
          <h2>
            Skal vi sætte
            <br />
            noget i gang?
          </h2>
        </div>
        <a className="button button--primary" href="mailto:info@adventurexp.dk">
          Book en oplevelse <span>→</span>
        </a>
      </div>
    </section>
  );
}

export default BookingBanner;
