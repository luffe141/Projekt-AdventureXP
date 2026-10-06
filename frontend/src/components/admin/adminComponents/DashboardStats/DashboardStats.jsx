import styles from "./DashboardStats.module.css";

function DashboardStats() {
  return (
    <section className={styles.statsGrid} aria-label="Nøgletal">
      {Array.from({ length: 4 }, (_, index) => (
        <article className={styles.statCard} key={index} />
      ))}
    </section>
  );
}

export default DashboardStats;
