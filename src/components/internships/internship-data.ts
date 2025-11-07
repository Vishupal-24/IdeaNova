export type Internship = {
  title: string;
  company: string;
  location: string;
  type: 'On-site' | 'Remote';
  stipend: string;
  duration: string;
  requiredSkills: string[];
  eligibility: string;
  logo: string;
  dataAiHint: string;
};

export const internshipData: Internship[] = [
  {
    title: 'Software Development Intern',
    company: 'TATA CONSULTANCY SERVICES LIMITED',
    location: 'Pune, Maharashtra',
    type: 'On-site',
    stipend: '₹25,000 /month',
    duration: '6 Months',
    requiredSkills: ['Java', 'Spring Boot', 'SQL'],
    eligibility: 'Final Year Engineering Students',
    logo: 'https://picsum.photos/seed/tcs/100',
    dataAiHint: 'modern office building',
  },
  {
    title: 'Data Science Intern',
    company: 'RELIANCE JIO INFOCOMM LIMITED',
    location: 'Remote',
    type: 'Remote',
    stipend: '₹30,000 /month',
    duration: '3 Months',
    requiredSkills: ['Python', 'Machine Learning', 'Pandas'],
    eligibility: 'B.Tech/M.Tech Students',
    logo: 'https://picsum.photos/seed/jio/100',
    dataAiHint: 'abstract data network',
  },
  {
    title: 'Mechanical Engineer Intern',
    company: 'TATA STEEL LIMITED',
    location: 'Jamshedpur, Jharkhand',
    type: 'On-site',
    stipend: '₹22,000 /month',
    duration: '6 Months',
    requiredSkills: ['AutoCAD', 'SolidWorks', 'Thermodynamics'],
    eligibility: '3rd & 4th Year Mechanical Engg.',
    logo: 'https://picsum.photos/seed/tatasteel/100',
    dataAiHint: 'steel factory molten',
  },
  {
    title: 'Web Development Intern',
    company: 'WIPRO LIMITED',
    location: 'Bengaluru, Karnataka',
    type: 'On-site',
    stipend: '₹20,000 /month',
    duration: '4 Months',
    requiredSkills: ['HTML', 'CSS', 'JavaScript', 'React'],
    eligibility: 'Any student with relevant skills',
    logo: 'https://picsum.photos/seed/wipro/100',
    dataAiHint: 'colorful abstract pattern',
  },
  {
    title: 'AI/ML Intern',
    company: 'INFOSYS LIMITED',
    location: 'Remote',
    type: 'Remote',
    stipend: '₹28,000 /month',
    duration: '6 Months',
    requiredSkills: ['Python', 'TensorFlow', 'PyTorch'],
    eligibility: 'Final Year CS/IT Students',
    logo: 'https://picsum.photos/seed/infosys/100',
    dataAiHint: 'blue geometric architecture',
  },
  {
    title: 'Finance Intern',
    company: 'HDFC BANK LIMITED',
    location: 'Mumbai, Maharashtra',
    type: 'On-site',
    stipend: '₹18,000 /month',
    duration: '3 Months',
    requiredSkills: ['MS Excel', 'Financial Modeling', 'Accounting'],
    eligibility: 'Commerce/MBA Students',
    logo: 'https://picsum.photos/seed/hdfc/100',
    dataAiHint: 'bank building facade',
  },
   {
    title: 'Cloud Computing Intern',
    company: 'LARSEN AND TOUBRO LIMITED',
    location: 'Chennai, Tamil Nadu',
    type: 'On-site',
    stipend: '₹25,000 /month',
    duration: '6 Months',
    requiredSkills: ['AWS', 'Azure', 'Docker'],
    eligibility: '3rd & 4th Year Engg. Students',
    logo: 'https://picsum.photos/seed/lnt/100',
    dataAiHint: 'large industrial construction',
  },
  {
    title: 'Product Management Intern',
    company: 'TECH MAHINDRA LIMITED',
    location: 'Remote',
    type: 'Remote',
    stipend: '₹22,000 /month',
    duration: '4 Months',
    requiredSkills: ['Product Roadmap', 'Market Research', 'Agile'],
    eligibility: 'MBA or Final Year Engg. Students',
    logo: 'https://picsum.photos/seed/techm/100',
    dataAiHint: 'futuristic technology interface',
  },
];
