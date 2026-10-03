import Gokart from "./Gokart";
import Paintball from "./Paintball";
import Minigolf from "./Minigolf";
import SumoWrestling from "./SumoWrestling";
import { useState } from "react";
import BookingModal from "./BookingModal";
import styles from "./Activities.module.css";

function Activities() {
  const [selectedActivity, setSelectedActivity] = useState(null);

  return (
    <section
      className={`${styles.activities} ${styles.sectionPad}`}
      id="aktiviteter"
    >
      <div className={`page-width ${styles.sectionHeading}`}>
        <div>
          <p className="eyebrow eyebrow--orange">Vælg din udfordring</p>
          <h2>
            Noget for
            <br />
            hele holdet
          </h2>
        </div>
        <p className={styles.headingCopy}>
          Fra høj fart til skarp taktik. Vælg en aktivitet, eller sammensæt
          flere til en dag, I sent glemmer.
        </p>
      </div>

      <div className={`page-width ${styles.activityGrid}`}>
        <Gokart onBook={setSelectedActivity} />
        <Paintball onBook={setSelectedActivity} />
        <Minigolf onBook={setSelectedActivity} />
        <SumoWrestling onBook={setSelectedActivity} />
      </div>
      {selectedActivity && (
        <BookingModal
          activity={selectedActivity}
          onClose={() => setSelectedActivity(null)}
        />
      )}
    </section>
  );
}

export default Activities;
