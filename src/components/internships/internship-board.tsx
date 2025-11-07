import { InternshipCard } from "./internship-card";
import { internshipData } from "./internship-data";

type InternshipBoardProps = {
  minimal?: boolean;
}

export function InternshipBoard({ minimal = false }: InternshipBoardProps) {
  const displayInternships = minimal ? internshipData.slice(0, 3) : internshipData;
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {displayInternships.map((internship, index) => (
        <InternshipCard key={index} internship={internship} />
      ))}
    </div>
  );
}
