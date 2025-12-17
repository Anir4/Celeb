export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  bio?: string;
  isCreator: boolean;
  createdAt: string;
}

export interface Creator {
  id: string;
  userId: string;
  displayName: string;
  username: string;
  avatar: string;
  banner?: string;
  bio: string;
  subscriptionPrice: number;
  subscriberCount: number;
  postCount: number;
  monthlyRevenue: number;
  isVerified: boolean;
}

export interface Post {
  id: string;
  creatorId: string;
  creator: Creator;
  mediaUrl: string;
  mediaType: 'image' | 'video';
  caption: string;
  likeCount: number;
  commentCount: number;
  isLocked: boolean;
  visibility: 'free' | 'subscribers';
  createdAt: string;
}

export interface Subscription {
  id: string;
  userId: string;
  creatorId: string;
  creator: Creator;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface Notification {
  id: string;
  type: 'like' | 'comment' | 'follow' | 'subscription' | 'message';
  message: string;
  read: boolean;
  createdAt: string;
  avatar?: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  content: string;
  createdAt: string;
  read: boolean;
}

export type UserRole = 'user' | 'creator';
