import ActivityCard from "./ActivityCard";

function Paintball({ onBook }) {
  return (
    <ActivityCard
      number="02"
      category="TAKTIK"
      title="Paintball"
      description="Saml holdet. Læg en plan."
      variant="paintball"
      onBook={onBook}
    />
  );
}

export default Paintball;
