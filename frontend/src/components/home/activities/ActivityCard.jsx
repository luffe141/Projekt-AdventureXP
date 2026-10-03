import styles from "./Activities.module.css";

function ActivityCard({
  number,
  category,
  title,
  description,
  variant,
  onBook,
}) {
  return (
    <button
      className={`${styles.activityCard} ${styles[variant]}`}
      type="button"
      onClick={() => onBook(title)}
      aria-label={`Book ${title}`}
    >
      <div className={styles.activityTop}>
        <span>
          {number} / {category}
        </span>
        <span className={styles.activityArrow} aria-hidden="true">
          ↗
        </span>
      </div>
      <div>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </button>
  );
}

export default ActivityCard;
