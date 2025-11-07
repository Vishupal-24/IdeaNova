
import { CollegeCard } from "./college-card";

const colleges = [
  {
    name: 'IIT Bombay',
    city: 'Mumbai',
    state: 'Maharashtra',
    tags: ['CSE', 'Mechanical', 'Electrical', 'Civil', 'Aerospace'],
    logo: 'https://picsum.photos/seed/iitb/100',
    dataAiHint: 'modern campus building'
  },
  {
    name: 'IIT Delhi',
    city: 'New Delhi',
    state: 'Delhi',
    tags: ['Computer Science', 'Biochemical', 'Textile', 'Chemical'],
    logo: 'https://picsum.photos/seed/iitd/100',
    dataAiHint: 'university main gate'
  },
  {
    name: 'BITS Pilani',
    city: 'Pilani',
    state: 'Rajasthan',
    tags: ['Electronics', 'Mechanical', 'IT', 'Pharmacy'],
    logo: 'https://picsum.photos/seed/bitsp/100',
    dataAiHint: 'clock tower campus'
  },
  {
    name: 'NIT Trichy',
    city: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    tags: ['Production Engg', 'Instrumentation', 'Metallurgical'],
    logo: 'https://picsum.photos/seed/nitt/100',
    dataAiHint: 'abstract tech pattern'
  },
    {
    name: 'VIT Vellore',
    city: 'Vellore',
    state: 'Tamil Nadu',
    tags: ['Information Tech', 'Electronics', 'Bioinformatics'],
    logo: 'https://picsum.photos/seed/vit/100',
    dataAiHint: 'futuristic architecture'
  },
    {
    name: 'Malaviya National Institute of Technology',
    city: 'Jaipur',
    state: 'Rajasthan',
    tags: ['MNIT', 'Civil', 'Architecture'],
    logo: 'https://picsum.photos/seed/mnit/100',
    dataAiHint: 'campus library building'
  },
];

type CollegeBoardProps = {
  minimal?: boolean;
}

export function CollegeBoard({ minimal = false }: CollegeBoardProps) {
  const displayColleges = minimal ? colleges.slice(0, 3) : colleges;
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {displayColleges.map((college, index) => (
        <CollegeCard key={index} {...college} />
      ))}
    </div>
  );
}
