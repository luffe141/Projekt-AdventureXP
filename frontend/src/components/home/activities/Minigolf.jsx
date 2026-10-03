import ActivityCard from "./ActivityCard";

function Minigolf({ onBook }) {
  return (
    <ActivityCard
      number="03"
      category="HYGGE"
      title="Minigolf"
      description="Et sikkert hole-in-one?"
      variant="minigolf"
      onBook={onBook}
    />
  );
}

export default Minigolf;
