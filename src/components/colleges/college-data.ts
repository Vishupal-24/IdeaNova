export type College = {
  id: string;
  name: string;
  city: string;
  state: string;
  tags: string[];
  logo: string;
  dataAiHint: string;
  website: string;
  admissionExam: string;
  establishedYear: number;
  description: string;
};

export const collegeData: College[] = [
  {
    id: 'iit-bombay',
    name: 'IIT Bombay',
    city: 'Mumbai',
    state: 'Maharashtra',
    tags: ['CSE', 'Mechanical', 'Electrical', 'Civil', 'Aerospace'],
    logo: 'https://picsum.photos/seed/iitb/100',
    dataAiHint: 'modern campus building',
    website: 'https://www.iitb.ac.in',
    admissionExam: 'JEE Advanced',
    establishedYear: 1958,
    description: 'One of India\'s premier public technical universities, known for strong research programs across engineering, design, and the sciences, with a large residential campus in Powai, Mumbai.',
  },
  {
    id: 'iit-delhi',
    name: 'IIT Delhi',
    city: 'New Delhi',
    state: 'Delhi',
    tags: ['Computer Science', 'Biochemical', 'Textile', 'Chemical'],
    logo: 'https://picsum.photos/seed/iitd/100',
    dataAiHint: 'university main gate',
    website: 'https://home.iitd.ac.in',
    admissionExam: 'JEE Advanced',
    establishedYear: 1961,
    description: 'A leading engineering institute recognized for its computer science and interdisciplinary research programs, with strong industry and startup connections in the capital region.',
  },
  {
    id: 'bits-pilani',
    name: 'BITS Pilani',
    city: 'Pilani',
    state: 'Rajasthan',
    tags: ['Electronics', 'Mechanical', 'IT', 'Pharmacy'],
    logo: 'https://picsum.photos/seed/bitsp/100',
    dataAiHint: 'clock tower campus',
    website: 'https://www.bits-pilani.ac.in',
    admissionExam: 'BITSAT',
    establishedYear: 1964,
    description: 'A private deemed university known for its flexible dual-degree programs and practice-oriented curriculum, with additional campuses in Goa, Hyderabad, and Dubai.',
  },
  {
    id: 'nit-trichy',
    name: 'NIT Trichy',
    city: 'Tiruchirappalli',
    state: 'Tamil Nadu',
    tags: ['Production Engg', 'Instrumentation', 'Metallurgical'],
    logo: 'https://picsum.photos/seed/nitt/100',
    dataAiHint: 'abstract tech pattern',
    website: 'https://www.nitt.edu',
    admissionExam: 'JEE Main',
    establishedYear: 1964,
    description: 'One of India\'s top National Institutes of Technology, well regarded for its core engineering branches and consistently strong campus placement record.',
  },
  {
    id: 'vit-vellore',
    name: 'VIT Vellore',
    city: 'Vellore',
    state: 'Tamil Nadu',
    tags: ['Information Tech', 'Electronics', 'Bioinformatics'],
    logo: 'https://picsum.photos/seed/vit/100',
    dataAiHint: 'futuristic architecture',
    website: 'https://vit.ac.in',
    admissionExam: 'VITEEE',
    establishedYear: 1984,
    description: 'A large private university with a strong emphasis on IT and electronics programs, an internationally diverse student body, and an active on-campus recruitment season.',
  },
  {
    id: 'mnit-jaipur',
    name: 'Malaviya National Institute of Technology',
    city: 'Jaipur',
    state: 'Rajasthan',
    tags: ['MNIT', 'Civil', 'Architecture'],
    logo: 'https://picsum.photos/seed/mnit/100',
    dataAiHint: 'campus library building',
    website: 'https://www.mnit.ac.in',
    admissionExam: 'JEE Main',
    establishedYear: 1963,
    description: 'A National Institute of Technology with well-established Civil Engineering and Architecture departments, serving as a key technical education hub in Rajasthan.',
  },
];
