import bachelorPhoto from '../assets/bachelor-third-place.webp';
import marathonPhoto from '../assets/casablanca-marathon.webp';
import fabLabPhoto from '../assets/orange-fablab.webp';

interface Achievement {
  id: string;
  title: string;
  description: string;
  image: string;
  year?: number;
}

export const achievements: Achievement[] = [
  {
    id: 'bachelor-third-place',
    title: 'Third in My Bachelor’s Cohort',
    description: 'Placed third in my Cybersecurity and Cloud Technology bachelor’s cohort at ESTSB.',
    image: bachelorPhoto,
    year: 2026,
  },
  {
    id: 'casablanca-marathon',
    title: 'Casablanca Half Marathon Finisher',
    description: 'Finished the 21.1 km half marathon in Casablanca in 1 hour and 58 minutes.',
    image: marathonPhoto,
  },
  {
    id: 'orange-fablab',
    title: 'Orange FabLab Courses',
    description: 'Took part in practical courses at Orange FabLab.',
    image: fabLabPhoto,
  },
];

export const certificates = [
  { id: 'gsna', title: 'GSNA Solutions', description: 'Cybersecurity internship certificate', year: 2026 },
  { id: 'telc-b2', title: 'telc Deutsch B2', description: 'German language certificate', year: 2025 },
  { id: 'tryhackme', title: 'TryHackMe Pre Security', description: 'Pre Security learning path certificate', year: 2025 },
  { id: 'goethe-b1', title: 'Goethe-Zertifikat B1', description: 'German language certificate', year: 2021 },
];

export const certificateUrl = (id: string, thumbnail = false) =>
  `${import.meta.env.BASE_URL}images/certificates/${id}${thumbnail ? '-thumb' : ''}.webp`;
