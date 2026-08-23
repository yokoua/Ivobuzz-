export type Category = 
  | 'all'
  | 'culture'
  | 'entrepreneurship'
  | 'business'
  | 'education'
  | 'religion'
  | 'sport'
  | 'music'
  | 'news';

export interface User {
  id: string;
  name: string;
  username: string;
  avatar: string;
  coverImage?: string;
  bio: string;
  headline?: string;
  role?: string;
  location: string;
  isVerified?: boolean;
  isFounder?: boolean;
  followersCount: number;
  followingCount: number;
  friendsCount: number;
  interests: Category[];
  joinedDate: string;
  website?: string;
}

export interface PollOption {
  id: string;
  text: string;
  votes: number;
  votedUserIds?: string[];
}

export interface Comment {
  id: string;
  userId: string;
  user: {
    name: string;
    username: string;
    avatar: string;
    isVerified?: boolean;
  };
  content: string;
  timestamp: string;
  likes: number;
  hasLiked?: boolean;
  replies?: Comment[];
}

export interface Post {
  id: string;
  userId: string;
  author: {
    name: string;
    username: string;
    avatar: string;
    isVerified?: boolean;
    isFounder?: boolean;
    location?: string;
  };
  content: string;
  category: Category;
  timestamp: string;
  mediaType?: 'image' | 'video' | 'audio' | 'none';
  mediaUrl?: string;
  mediaCaption?: string;
  audioDuration?: string;
  tags?: string[];
  likesCount: number;
  hasLiked?: boolean;
  commentsCount: number;
  sharesCount: number;
  hasShared?: boolean;
  isSaved?: boolean;
  poll?: {
    question: string;
    options: PollOption[];
    totalVotes: number;
    hasVoted?: boolean;
    selectedOptionId?: string;
  };
  comments: Comment[];
}

export interface Story {
  id: string;
  userId: string;
  user: {
    name: string;
    username: string;
    avatar: string;
  };
  mediaUrl: string;
  caption: string;
  timestamp: string;
  category: Category;
  viewsCount: number;
  hasViewed?: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'audio' | 'none';
  audioDuration?: string;
  timestamp: string;
  isRead?: boolean;
}

export interface ChatGroup {
  id: string;
  name: string;
  description: string;
  avatar: string;
  category: Category;
  isEncrypted: boolean;
  membersCount: number;
  members: User[];
  messages: Message[];
  unreadCount?: number;
  lastMessage?: string;
  lastMessageTime?: string;
}

export interface DirectChat {
  id: string;
  participant: User;
  messages: Message[];
  unreadCount: number;
  lastMessage?: string;
  lastMessageTime?: string;
}

export interface FriendRequest {
  id: string;
  fromUser: User;
  toUserId: string;
  status: 'pending' | 'accepted' | 'declined';
  timestamp: string;
  mutualFriendsCount: number;
}

export interface NotificationItem {
  id: string;
  type: 'like' | 'comment' | 'friend_request' | 'group_invite' | 'share' | 'mention';
  fromUser: {
    id: string;
    name: string;
    avatar: string;
    username: string;
  };
  postId?: string;
  groupId?: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export type ViewTab = 'feed' | 'explore' | 'messages' | 'groups' | 'friends' | 'notifications' | 'profile' | 'saved';