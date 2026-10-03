import styles from "./Hero.module.css";

function Hero() {
  return (
    <section className={styles.hero} id="top">
      <div className={styles.backdrop} aria-hidden="true" />
      <div className={`page-width ${styles.content}`}>
        <p className="eyebrow">
          <span /> Action. Sammen.
        </p>
        <h1>
          Oplev mere.
          <br />
          <em>Mærk farten.</em>
        </h1>
        <p className={styles.intro}>
          Gokart, paintball, minigolf og meget mere — samlet ét sted for venner,
          familier og kolleger.
        </p>
        <div className={styles.actions}>
          <a className="button button--primary" href="#aktiviteter">
            Find din oplevelse <span>→</span>
          </a>
          <a className="button button--text" href="#aktiviteter">
            Se aktiviteter
          </a>
        </div>
      </div>
      <div className={styles.stats} aria-label="AdventureXP i tal">
        <div>
          <strong>4+</strong>
          <span>Aktiviteter</span>
        </div>
        <div>
          <strong>8</strong>
          <span>Instruktører</span>
        </div>
        <div>
          <strong>100%</strong>
          <span>Klar til action</span>
        </div>
      </div>
      <a
        className={styles.scrollCue}
        href="#aktiviteter"
        aria-label="Scroll til aktiviteter"
      >
        ↓
      </a>
    </section>
  );
}

export default Hero;
