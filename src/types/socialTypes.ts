export type UserType = 'student' | 'faculty' | 'alumni' | 'admin';
export type PostType = 'text' | 'image' | 'event' | 'job' | 'poll';
export type ConnectionStatus = 'connected' | 'pending' | 'not-connected';
export type ClubRole = 'member' | 'admin' | 'moderator';

export interface User {
  id: string;
  name: string;
  avatarUrl: string;
  headline: string;
  type: UserType;
  connections: string[];
  pendingConnections: string[];
  joinedClubs: {
    clubId: string;
    role: ClubRole;
  }[];
  skills?: string[];
  department?: string;
  email?: string;
}

export interface Club {
  id: string;
  name: string;
  logoUrl: string;
  bannerUrl?: string;
  description: string;
  adminIds: string[];
  memberCount: number;
  upcomingEvent?: string;
  tags?: string[];
  createdAt: Date;
  socialLinks?: {
    website?: string;
    instagram?: string;
    discord?: string;
  };
}

export interface Comment {
  id: string;
  userId: string;
  text: string;
  createdAt: Date;
  likes: string[];
  replies?: Comment[];
}

export interface FeedPost {
  id: string;
  authorId: string;
  content: string;
  type: PostType;
  mediaUrls?: string[];
  eventDetails?: {
    date: Date;
    location: string;
  };
  clubId?: string;
  pollOptions?: { 
    id: string; 
    text: string; 
    votes: number;
    voters: string[];
  }[];
  createdAt: Date;
  likes: string[];
  comments: Comment[];
  shares: number;
  isPinned?: boolean;
}

export interface FeedState {
  posts: FeedPost[];
  users: Record<string, User>;
  clubs: Record<string, Club>;
  currentUserId: string;
}