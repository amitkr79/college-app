export type EventStatus = 'upcoming' | 'ongoing' | 'completed';

export type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  imageUrl: string;
  category: string;
  organizer: string;
  price: string;
  tags: string[];
  status: string;
  attendingCount: number;
};

export type EventCategory = 
  | 'featured' 
  | 'academic' 
  | 'cultural' 
  | 'sports' 
  | 'workshops';