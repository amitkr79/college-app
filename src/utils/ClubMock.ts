import {User} from 'src/types/socialTypes';
import {Club, ClubDetail, ClubMember} from '../types/clubTypes';

export const mockClubs: Club[] = [
  {
    id: 'club1',
    name: 'Robotics Club',
    description:
      'We build robots and compete in national competitions. Join us to learn about robotics, AI, and automation.',
    category: 'technology',
    logoUrl: 'https://example.com/robotics-logo.jpg',
    coverImageUrl: 'https://example.com/robotics-cover.jpg',
    advisors: ['faculty1'],
    admins: ['user2'],
    members: ['user1', 'user2', 'user3', 'user4'],
    createdAt: new Date('2022-01-15'),
    isOfficial: true,
    socialLinks: {
      website: 'robotics.uni.edu',
      instagram: '@unirobotics',
    },
  },
  {
    id: 'club2',
    name: 'Debate Society',
    description:
      'Developing critical thinking and public speaking skills through competitive debate.',
    category: 'academic',
    logoUrl: 'https://example.com/debate-logo.jpg',
    coverImageUrl: 'https://example.com/debate-cover.jpg',
    advisors: ['faculty2'],
    admins: ['user5'],
    members: ['user5', 'user6', 'user7'],
    createdAt: new Date('2021-09-01'),
    isOfficial: true,
    socialLinks: {
      instagram: '@unidebate',
    },
  },
  // Add more clubs...
];

export const mockClubDetails: Record<string, ClubDetail> = {
  club1: {
    ...mockClubs[0],
    upcomingEvents: [
      {
        id: 'event1',
        title: 'Robotics Workshop',
        date: '2023-12-20',
        location: 'Engineering Building, Room 305',
        description:
          'Hands-on session for beginners to build their first robot',
        category: 'workshop',
        organizer: 'Robotics Club',
        price: '0',
        tags: ['robotics', 'workshop'],
        status: 'upcoming',
        attendingCount: 24,
      },
    ],
    recentPosts: [
      {
        id: 'post1',
        authorId: 'club1',
        content:
          'Our team won first place at the regional robotics competition! 🎉',
        type: 'image',
        mediaUrls: ['https://example.com/competition-win.jpg'],
        createdAt: new Date('2023-12-10'),
        likes: ['user1', 'user2', 'user3'],
        comments: [],
        shares: 8,
      },
    ],
    members: [
      {userId: 'user1', role: 'member', joinedAt: new Date('2023-02-01')},
      {userId: 'user2', role: 'admin', joinedAt: new Date('2022-03-15')},
      {userId: 'user3', role: 'member', joinedAt: new Date('2023-09-10')},
      {userId: 'user4', role: 'member', joinedAt: new Date('2023-11-05')},
    ],
  },
  club2: {
    ...mockClubs[1],
    upcomingEvents: [],
    recentPosts: [
      {
        id: 'post2',
        authorId: 'club2',
        content: 'Join our debate tournament next month! Sign up now.',
        type: 'text',
        createdAt: new Date('2023-12-05'),
        likes: ['user5', 'user6'],
        comments: [],
        shares: 3,
      },
    ],
    members: [
      {userId: 'user5', role: 'admin', joinedAt: new Date('2021-09-15')},
      {userId: 'user6', role: 'member', joinedAt: new Date('2022-01-20')},
      {userId: 'user7', role: 'member', joinedAt: new Date('2023-03-10')},
    ],
  },
};

export const mockUsers: Record<string, User> = {
  user1: {
    id: 'user1',
    name: 'Alex Johnson',
    avatarUrl: 'https://example.com/avatar1.jpg',
  },
  user2: {
    id: 'user2',
    name: 'Taylor Swift',
    avatarUrl: 'https://example.com/avatar2.jpg',
  },
  // Add other users...
};
