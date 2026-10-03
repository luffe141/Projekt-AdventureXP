import ActivityCard from "./ActivityCard";

function Gokart({ onBook }) {
  return (
    <ActivityCard
      number="01"
      category="FART"
      title="Gokart"
      description="Giv den gas på banen"
      variant="kart"
      onBook={onBook}
    />
  );
}

export default Gokart;
