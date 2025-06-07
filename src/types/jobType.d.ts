export type JobType = 'full-time' | 'internship' | 'contract' | 'part-time';
export type ExperienceLevel = 'entry' | 'mid' | 'senior' | 'executive';

export interface JobNotification {
  id: string;
  title: string;
  content: string;
  date: Date;
  isImportant: boolean;
  category: 'drive' | 'announcement' | 'result' | 'training';
  attachments?: string[];
}

export interface JobListing {
  id: string;
  company: {
    name: string;
    logoUrl: string;
    rating?: number;
  };
  position: string;
  location: string;
  type: JobType;
  experience: ExperienceLevel;
  salary?: string;
  description: string;
  requirements: string[];
  postedAt: Date;
  applicationDeadline?: Date;
  applicationLink?: string;
  tags: string[];
  isFeatured: boolean;
}