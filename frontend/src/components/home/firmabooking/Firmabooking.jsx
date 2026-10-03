import styles from "./Firmabooking.module.css";

const features = [
  {
    title: "Én samlet plan",
    description: "Aktiviteter og pauser koordineret for jer.",
    icon: (
      <>
        <rect x="5" y="7" width="12" height="14" rx="1" />
        <path d="M9 7V4h10v14h-2M9 11h4M9 15h4" />
      </>
    ),
  },
  {
    title: "Små og store hold",
    description: "For både afdelinger og hele virksomheden.",
    icon: (
      <>
        <circle cx="9" cy="8" r="3" />
        <path d="M3 20v-1a6 6 0 0 1 12 0v1M16 5.5a3 3 0 0 1 0 5.8M18 14a5 5 0 0 1 3 4.6V20" />
      </>
    ),
  },
  {
    title: "Enkel reservation",
    description: "Vi vender tilbage med et samlet forslag.",
    icon: (
      <>
        <rect x="4" y="6" width="16" height="15" rx="2" />
        <path d="M8 3v6M16 3v6M4 11h16M8 16l2 2 4-4" />
      </>
    ),
  },
];

function Firmabooking() {
  return (
    <section className={styles.firmabooking} id="firmabooking">
      <div className={`page-width ${styles.inner}`}>
        <div className={styles.mark} aria-hidden="true">
          XP
        </div>
        <div className={styles.content}>
          <p className="eyebrow">Firmaevents</p>
          <h2>
            Få holdet
            <br />
            ud af rutinen
          </h2>
          <p className={styles.intro}>
            Vi sammensætter en dag med flere aktiviteter, faste tider og plads
            til hele virksomheden.
          </p>
          <a className="button button--primary" href="#booking">
            Planlæg firmaevent <span>→</span>
          </a>
        </div>
        <div className={styles.features}>
          {features.map((feature) => (
            <article className={styles.feature} key={feature.title}>
              <svg
                className={styles.icon}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {feature.icon}
              </svg>
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Firmabooking;
