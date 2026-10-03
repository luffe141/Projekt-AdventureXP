import ActivityCard from "./ActivityCard";

function SumoWrestling({ onBook }) {
  return (
    <ActivityCard
      number="04"
      category="BALANCE"
      title="Sumobrydning"
      description="Tag sumodragten på, og dyst mod vennerne"
      variant="sumo"
      onBook={onBook}
    />
  );
}

export default SumoWrestling;
