import styles from "./BookingPanels.module.css";

function BookingPanels() {
  return (
    <div className={styles.sidePanels}>
      <section className={`${styles.panel} ${styles.smallPanel}`} />
      <section className={`${styles.panel} ${styles.smallPanel}`} />
    </div>
  );
}

export default BookingPanels;
