import { JobNotification, JobListing } from '../types/jobType';

export const mockNotifications: JobNotification[] = [
  {
    id: 'notif1',
    title: 'Placement Drive - Tech Solutions Inc.',
    content: 'Tech Solutions Inc. will be conducting campus placements on 25th December 2023. All eligible students must register by 20th December.',
    date: new Date('2023-12-10'),
    isImportant: true,
    category: 'drive',
    attachments: ['drive-schedule.pdf', 'eligibility-criteria.pdf']
  },
  {
    id: 'notif2',
    title: 'Internship Opportunity - Data Analytics',
    content: 'Summer internship positions available in Data Analytics at AnalyticsPro. Apply through college portal before 15th January.',
    date: new Date('2023-12-05'),
    isImportant: false,
    category: 'announcement'
  },
  {
    id: 'notif3',
    title: 'Placement Training Session',
    content: 'Soft skills training session scheduled for 18th December in Auditorium Hall. Attendance is mandatory for all final year students.',
    date: new Date('2023-12-03'),
    isImportant: true,
    category: 'training'
  },
  {
    id: 'notif4',
    title: 'Placement Results - GlobalTech',
    content: 'Congratulations to all students selected in GlobalTech placements. Check the notice board for the final list.',
    date: new Date('2023-11-28'),
    isImportant: false,
    category: 'result'
  }
];

export const mockJobListings: JobListing[] = [
  {
    id: 'job1',
    company: {
      name: 'Tech Solutions Inc.',
      logoUrl: 'https://img.icons8.com/color/96/000000/company.png',
      rating: 4.5
    },
    position: 'Software Engineer',
    location: 'Bangalore',
    type: 'full-time',
    experience: 'entry',
    salary: '₹8-12 LPA',
    description: 'We are looking for a skilled software engineer to join our product development team. You will be responsible for building scalable web applications using modern technologies.',
    requirements: [
      'B.Tech in Computer Science or related field',
      'Strong knowledge of JavaScript and React',
      'Experience with Node.js and databases',
      'Good problem-solving skills'
    ],
    postedAt: new Date('2023-12-12'),
    applicationDeadline: new Date('2023-12-25'),
    tags: ['JavaScript', 'React', 'Node.js'],
    isFeatured: true
  },
  {
    id: 'job2',
    company: {
      name: 'Data Insights Ltd.',
      logoUrl: 'https://img.icons8.com/color/96/000000/data-configuration.png',
      rating: 4.2
    },
    position: 'Data Science Intern',
    location: 'Remote',
    type: 'internship',
    experience: 'entry',
    salary: '₹25,000/month',
    description: '6-month internship opportunity for aspiring data scientists. Work on real-world projects under expert guidance.',
    requirements: [
      'Currently pursuing B.Tech/M.Tech in CS/IT',
      'Knowledge of Python and ML libraries',
      'Familiarity with data visualization tools',
      'Strong analytical skills'
    ],
    postedAt: new Date('2023-12-10'),
    tags: ['Python', 'Machine Learning', 'Data Analysis'],
    isFeatured: false
  },
  {
    id: 'job3',
    company: {
      name: 'Cloud Innovations',
      logoUrl: 'https://img.icons8.com/color/96/000000/cloud.png',
      rating: 4.7
    },
    position: 'DevOps Engineer',
    location: 'Hyderabad',
    type: 'full-time',
    experience: 'mid',
    salary: '₹15-20 LPA',
    description: 'Join our cloud infrastructure team to design and implement CI/CD pipelines and manage cloud deployments.',
    requirements: [
      '3+ years of DevOps experience',
      'Expertise in AWS/GCP',
      'Knowledge of Docker and Kubernetes',
      'Experience with infrastructure as code'
    ],
    postedAt: new Date('2023-12-08'),
    tags: ['DevOps', 'AWS', 'Kubernetes'],
    isFeatured: true
  }
];