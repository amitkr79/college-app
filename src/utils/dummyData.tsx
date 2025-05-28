import { BannerItem } from "src/types/dummyData";

export const bannerData: BannerItem[] = [
  {
    id: 1,
    title: 'Annual College Fest',
    description:
      'Join us for the biggest event of the year with music, dance and cultural performances',
    imageUrl:
      'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&q=60',
    date: '2023-11-15',
    type: 'event',
  },
  {
    id: 2,
    title: 'Mid-Term Exam Schedule',
    description:
      'Important notice regarding changes in the mid-term examination schedule',
    imageUrl:
      'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=800&q=60',
    date: '2023-10-05',
    type: 'notice',
  },
  {
    id: 3,
    title: 'Sports Day Announcement',
    description:
      'Annual sports day will be held on November 20th. Register now!',
    imageUrl:
      'https://images.unsplash.com/photo-1599059811207-3d2d9f158b5f?auto=format&fit=crop&w=800&q=60',
    date: '2023-11-20',
    type: 'event',
  },
  {
    id: 4,
    title: 'Library Closure Notice',
    description:
      'The central library will remain closed on October 10th for maintenance',
    imageUrl:
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?auto=format&fit=crop&w=800&q=60',
    date: '2023-10-10',
    type: 'notice',
  },
];
