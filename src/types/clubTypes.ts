import { FeedPost, User } from './socialTypes';

export type ClubCategory = 
  | 'academic'
  | 'cultural'
  | 'sports'
  | 'arts'
  | 'community'
  | 'technology';

export type MemberRole = 'member' | 'admin' | 'advisor';

export interface Club {
  id: string;
  name: string;
  description: string;
  category: ClubCategory;
  logoUrl: string;
  coverImageUrl: string;
  advisors: string[];         // Faculty user IDs
  admins: string[];           // Student user IDs
  members: string[];          // All member IDs
  createdAt: Date;
  isOfficial: boolean;        // Verified by university
  socialLinks: {
    website?: string;
    instagram?: string;
    facebook?: string;
  };
}

// socialTypes.ts (add to existing)
export interface User {
  id: string;
  name: string;
  avatarUrl: string;
}

// clubTypes.ts
export interface ClubMember {
  userId: string;
  role: MemberRole;
  joinedAt: Date;
  user?: User; // Optional user object
}

export interface ClubDetail extends Club {
  upcomingEvents: Event[];
  recentPosts: FeedPost[];
  members: ClubMember[];
}