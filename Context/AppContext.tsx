import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  User, 
  Post, 
  Story, 
  ChatGroup, 
  DirectChat, 
  NotificationItem, 
  FriendRequest, 
  Category, 
  ViewTab,
  Comment,
  Message
} from '../types';
import { 
  CURRENT_USER, 
  FOUNDER_USER, 
  SAMPLE_USERS, 
  INITIAL_POSTS, 
  INITIAL_STORIES, 
  INITIAL_GROUPS, 
  INITIAL_DIRECT_CHATS, 
  INITIAL_FRIEND_REQUESTS, 
  INITIAL_NOTIFICATIONS 
} from '../data/initialData';

interface AppContextType {
  currentUser: User;
  setCurrentUser: React.Dispatch<React.SetStateAction<User>>;
  users: User[];
  posts: Post[];
  stories: Story[];
  groups: ChatGroup[];
  directChats: DirectChat[];
  friendRequests: FriendRequest[];
  friends: User[];
  notifications: NotificationItem[];
  unreadNotifsCount: number;
  unreadMessagesCount: number;
  
  // Navigation & Filtering
  currentView: ViewTab;
  setCurrentView: (view: ViewTab) => void;
  selectedCategory: Category;
  setSelectedCategory: (cat: Category) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Modals & Active Items
  selectedUserProfile: User | null;
  setSelectedUserProfile: (user: User | null) => void;
  activeChatId: string | null;
  setActiveChatId: (id: string | null) => void;
  activeGroupId: string | null;
  setActiveGroupId: (id: string | null) => void;
  
  isCreatePostOpen: boolean;
  setIsCreatePostOpen: (open: boolean) => void;
  isFounderModalOpen: boolean;
  setIsFounderModalOpen: (open: boolean) => void;
  isShareModalOpen: boolean;
  setIsShareModalOpen: (open: boolean) => void;
  sharePostTarget: Post | null;
  setSharePostTarget: (post: Post | null) => void;
  activeStoryIndex: number | null;
  setActiveStoryIndex: (index: number | null) => void;

  // Post Actions
  addPost: (newPostData: {
    content: string;
    category: Category;
    mediaType?: 'image' | 'video' | 'audio' | 'none';
    mediaUrl?: string;
    mediaCaption?: string;
    tags?: string[];
    pollQuestion?: string;
    pollOptions?: string[];
  }) => void;
  toggleLikePost: (postId: string) => void;
  addComment: (postId: string, content: string) => void;
  toggleSavePost: (postId: string) => void;
  votePoll: (postId: string, optionId: string) => void;
  sharePost: (postId: string, note?: string) => void;
  deletePost: (postId: string) => void;

  // Friend Actions
  sendFriendRequest: (toUser: User) => void;
  acceptFriendRequest: (requestId: string) => void;
  declineFriendRequest: (requestId: string) => void;
  removeFriend: (userId: string) => void;
  isFriend: (userId: string) => boolean;
  hasSentRequest: (userId: string) => boolean;

  // Messaging Actions
  sendMessageToUser: (recipientId: string, text: string, mediaUrl?: string, mediaType?: 'image' | 'audio' | 'none') => void;
  sendMessageToGroup: (groupId: string, text: string, mediaUrl?: string, mediaType?: 'image' | 'audio' | 'none') => void;
  createGroup: (name: string, description: string, category: Category, avatar?: string) => void;
  startDirectChat: (user: User) => void;
  markChatAsRead: (chatId: string) => void;
  markGroupAsRead: (groupId: string) => void;

  // Story Actions
  addStory: (mediaUrl: string, caption: string, category: Category) => void;
  viewStory: (storyId: string) => void;

  // Notification Actions
  markNotificationAsRead: (id: string) => void;
  markAllNotificationsAsRead: () => void;
  clearNotifications: () => void;
  
  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
  updateUserProfile: (updatedFields: Partial<User>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Current User & All Users
  const [currentUser, setCurrentUser] = useState<User>(() => {
    const saved = localStorage.getItem('ivobuzz_currentUser');
    return saved ? JSON.parse(saved) : CURRENT_USER;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('ivobuzz_users');
    return saved ? JSON.parse(saved) : SAMPLE_USERS;
  });

  // Posts
  const [posts, setPosts] = useState<Post[]>(() => {
    const saved = localStorage.getItem('ivobuzz_posts');
    return saved ? JSON.parse(saved) : INITIAL_POSTS;
  });

  // Stories
  const [stories, setStories] = useState<Story[]>(() => {
    const saved = localStorage.getItem('ivobuzz_stories');
    return saved ? JSON.parse(saved) : INITIAL_STORIES;
  });

  // Groups
  const [groups, setGroups] = useState<ChatGroup[]>(() => {
    const saved = localStorage.getItem('ivobuzz_groups');
    return saved ? JSON.parse(saved) : INITIAL_GROUPS;
  });

  // Direct Chats
  const [directChats, setDirectChats] = useState<DirectChat[]>(() => {
    const saved = localStorage.getItem('ivobuzz_directChats');
    return saved ? JSON.parse(saved) : INITIAL_DIRECT_CHATS;
  });

  // Friend Requests
  const [friendRequests, setFriendRequests] = useState<FriendRequest[]>(() => {
    const saved = localStorage.getItem('ivobuzz_friendRequests');
    return saved ? JSON.parse(saved) : INITIAL_FRIEND_REQUESTS;
  });

  // Friends list (initialized with Founder & Amina)
  const [friends, setFriends] = useState<User[]>(() => {
    const saved = localStorage.getItem('ivobuzz_friends');
    return saved ? JSON.parse(saved) : [FOUNDER_USER, SAMPLE_USERS[1], SAMPLE_USERS[2]];
  });

  // Notifications
  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem('ivobuzz_notifications');
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Navigation states
  const [currentView, setCurrentView] = useState<ViewTab>('feed');
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals & Selection
  const [selectedUserProfile, setSelectedUserProfile] = useState<User | null>(null);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [activeGroupId, setActiveGroupId] = useState<string | null>(null);
  const [isCreatePostOpen, setIsCreatePostOpen] = useState(false);
  const [isFounderModalOpen, setIsFounderModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [sharePostTarget, setSharePostTarget] = useState<Post | null>(null);
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('ivobuzz_currentUser', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('ivobuzz_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('ivobuzz_groups', JSON.stringify(groups));
  }, [groups]);

  useEffect(() => {
    localStorage.setItem('ivobuzz_directChats', JSON.stringify(directChats));
  }, [directChats]);

  useEffect(() => {
    localStorage.setItem('ivobuzz_notifications', JSON.stringify(notifications));
  }, [notifications]);

  useEffect(() => {
    localStorage.setItem('ivobuzz_friends', JSON.stringify(friends));
  }, [friends]);

  useEffect(() => {
    localStorage.setItem('ivobuzz_friendRequests', JSON.stringify(friendRequests));
  }, [friendRequests]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 3500);
  };

  const unreadNotifsCount = notifications.filter(n => !n.isRead).length;
  const unreadMessagesCount = 
    directChats.reduce((acc, c) => acc + (c.unreadCount || 0), 0) +
    groups.reduce((acc, g) => acc + (g.unreadCount || 0), 0);

  // Post creation
  const addPost = ({
    content,
    category,
    mediaType = 'none',
    mediaUrl,
    mediaCaption,
    tags = [],
    pollQuestion,
    pollOptions = []
  }: {
    content: string;
    category: Category;
    mediaType?: 'image' | 'video' | 'audio' | 'none';
    mediaUrl?: string;
    mediaCaption?: string;
    tags?: string[];
    pollQuestion?: string;
    pollOptions?: string[];
  }) => {
    const newPost: Post = {
      id: `post-${Date.now()}`,
      userId: currentUser.id,
      author: {
        name: currentUser.name,
        username: currentUser.username,
        avatar: currentUser.avatar,
        isVerified: currentUser.isVerified,
        isFounder: currentUser.isFounder,
        location: currentUser.location,
      },
      content,
      category,
      timestamp: 'Just now',
      mediaType,
      mediaUrl,
      mediaCaption,
      tags: tags.length > 0 ? tags : [`#${category}`, '#Ivobuzz'],
      likesCount: 1,
      hasLiked: true,
      commentsCount: 0,
      sharesCount: 0,
      comments: [],
      poll: pollQuestion && pollOptions.length >= 2 ? {
        question: pollQuestion,
        options: pollOptions.map((opt, i) => ({
          id: `opt-${Date.now()}-${i}`,
          text: opt,
          votes: 0,
          votedUserIds: []
        })),
        totalVotes: 0,
        hasVoted: false,
      } : undefined
    };

    setPosts(prev => [newPost, ...prev]);
    showToast('✨ Post published to Ivobuzz feed!');
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#FF6600', '#FFA500', '#FFFFFF', '#000000']
    });
  };

  const toggleLikePost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const willLike = !p.hasLiked;
      return {
        ...p,
        hasLiked: willLike,
        likesCount: willLike ? p.likesCount + 1 : Math.max(0, p.likesCount - 1),
      };
    }));
  };

  const addComment = (postId: string, content: string) => {
    if (!content.trim()) return;
    const newComment: Comment = {
      id: `comment-${Date.now()}`,
      userId: currentUser.id,
      user: {
        name: currentUser.name,
        username: currentUser.username,
        avatar: currentUser.avatar,
        isVerified: currentUser.isVerified,
      },
      content,
      timestamp: 'Just now',
      likes: 0,
      hasLiked: false,
    };

    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      return {
        ...p,
        commentsCount: p.commentsCount + 1,
        comments: [...p.comments, newComment]
      };
    }));
    showToast('💬 Comment added!');
  };

  const toggleSavePost = (postId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      const isSaved = !p.isSaved;
      showToast(isSaved ? '🔖 Post saved to your bookmarks!' : 'Removed from bookmarks');
      return { ...p, isSaved };
    }));
  };

  const votePoll = (postId: string, optionId: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId || !p.poll || p.poll.hasVoted) return p;
      const updatedOptions = p.poll.options.map(opt => {
        if (opt.id === optionId) {
          return {
            ...opt,
            votes: opt.votes + 1,
            votedUserIds: [...(opt.votedUserIds || []), currentUser.id]
          };
        }
        return opt;
      });
      return {
        ...p,
        poll: {
          ...p.poll,
          options: updatedOptions,
          totalVotes: p.poll.totalVotes + 1,
          hasVoted: true,
          selectedOptionId: optionId
        }
      };
    }));
    showToast('🗳️ Vote recorded!');
  };

  const sharePost = (postId: string, note?: string) => {
    setPosts(prev => prev.map(p => {
      if (p.id !== postId) return p;
      return {
        ...p,
        sharesCount: p.sharesCount + 1,
        hasShared: true,
      };
    }));
    showToast('🚀 Post shared with your network!');
  };

  const deletePost = (postId: string) => {
    setPosts(prev => prev.filter(p => p.id !== postId));
    showToast('Post deleted.');
  };

  // Friend actions
  const isFriend = (userId: string) => {
    return friends.some(f => f.id === userId);
  };

  const hasSentRequest = (userId: string) => {
    return friendRequests.some(r => r.toUserId === userId && r.status === 'pending');
  };

  const sendFriendRequest = (toUser: User) => {
    const newReq: FriendRequest = {
      id: `fr-${Date.now()}`,
      fromUser: currentUser,
      toUserId: toUser.id,
      status: 'pending',
      timestamp: 'Just now',
      mutualFriendsCount: 3,
    };
    setFriendRequests(prev => [newReq, ...prev]);
    showToast(`🤝 Friend request sent to ${toUser.name}!`);
  };

  const acceptFriendRequest = (requestId: string) => {
    const req = friendRequests.find(r => r.id === requestId);
    if (!req) return;
    
    // Add to friends
    if (!friends.some(f => f.id === req.fromUser.id)) {
      setFriends(prev => [...prev, req.fromUser]);
    }
    // Remove request
    setFriendRequests(prev => prev.filter(r => r.id !== requestId));
    showToast(`🎉 You and ${req.fromUser.name} are now friends on Ivobuzz!`);
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.7 }
    });
  };

  const declineFriendRequest = (requestId: string) => {
    setFriendRequests(prev => prev.filter(r => r.id !== requestId));
    showToast('Request declined.');
  };

  const removeFriend = (userId: string) => {
    setFriends(prev => prev.filter(f => f.id !== userId));
    showToast('Friend removed from your circle.');
  };

  // Messaging actions
  const sendMessageToUser = (
    recipientId: string, 
    text: string, 
    mediaUrl?: string, 
    mediaType?: 'image' | 'audio' | 'none'
  ) => {
    if (!text.trim() && !mediaUrl) return;
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      text,
      mediaUrl,
      mediaType,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isRead: true,
    };

    setDirectChats(prev => {
      const existing = prev.find(c => c.participant.id === recipientId);
      if (existing) {
        return prev.map(c => {
          if (c.participant.id !== recipientId) return c;
          return {
            ...c,
            messages: [...c.messages, newMsg],
            lastMessage: text || (mediaType === 'image' ? '📷 Photo' : '🎵 Audio'),
            lastMessageTime: 'Just now'
          };
        });
      } else {
        const recipientUser = users.find(u => u.id === recipientId) || FOUNDER_USER;
        const newChat: DirectChat = {
          id: `chat-${recipientId}`,
          participant: recipientUser,
          unreadCount: 0,
          lastMessage: text,
          lastMessageTime: 'Just now',
          messages: [newMsg]
        };
        return [newChat, ...prev];
      }
    });

    // Simulate response when messaging the founder
    if (recipientId === FOUNDER_USER.id) {
      setTimeout(() => {
        const replyMsg: Message = {
          id: `msg-${Date.now() + 1}`,
          senderId: FOUNDER_USER.id,
          senderName: FOUNDER_USER.name,
          senderAvatar: FOUNDER_USER.avatar,
          text: 'Merci Cedric! Let us continue building and sharing positive momentum across Ivobuzz! 🧡🇨🇮',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setDirectChats(current => current.map(c => {
          if (c.participant.id !== FOUNDER_USER.id) return c;
          return {
            ...c,
            messages: [...c.messages, replyMsg],
            lastMessage: replyMsg.text,
            lastMessageTime: 'Just now'
          };
        }));
        showToast('📩 New reply from Yoman Kouadio');
      }, 2500);
    }
  };

  const sendMessageToGroup = (
    groupId: string, 
    text: string, 
    mediaUrl?: string, 
    mediaType?: 'image' | 'audio' | 'none'
  ) => {
    if (!text.trim() && !mediaUrl) return;
    const newMsg: Message = {
      id: `gmsg-${Date.now()}`,
      senderId: currentUser.id,
      senderName: currentUser.name,
      senderAvatar: currentUser.avatar,
      text,
      mediaUrl,
      mediaType,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setGroups(prev => prev.map(g => {
      if (g.id !== groupId) return g;
      return {
        ...g,
        messages: [...g.messages, newMsg],
        lastMessage: `${currentUser.name}: ${text || 'Media'}`,
        lastMessageTime: 'Just now'
      };
    }));
  };

  const createGroup = (name: string, description: string, category: Category, avatar?: string) => {
    const newGrp: ChatGroup = {
      id: `group-${Date.now()}`,
      name,
      description,
      avatar: avatar || 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
      category,
      isEncrypted: true,
      membersCount: 1,
      members: [currentUser],
      messages: [
        {
          id: `msg-init-${Date.now()}`,
          senderId: currentUser.id,
          senderName: currentUser.name,
          senderAvatar: currentUser.avatar,
          text: `Welcome to ${name}! Group is end-to-end secured. 🔒`,
          timestamp: 'Just now',
        }
      ],
      lastMessage: `Group created by ${currentUser.name}`,
      lastMessageTime: 'Just now'
    };

    setGroups(prev => [newGrp, ...prev]);
    setActiveGroupId(newGrp.id);
    setCurrentView('groups');
    showToast(`🛡️ Secure Group "${name}" created!`);
  };

  const startDirectChat = (user: User) => {
    const existing = directChats.find(c => c.participant.id === user.id);
    if (!existing) {
      const newChat: DirectChat = {
        id: `chat-${user.id}`,
        participant: user,
        messages: [],
        unreadCount: 0,
        lastMessage: 'Say hello to start chatting',
        lastMessageTime: 'Now'
      };
      setDirectChats(prev => [newChat, ...prev]);
    }
    setActiveChatId(`chat-${user.id}`);
    setActiveGroupId(null);
    setCurrentView('messages');
  };

  const markChatAsRead = (chatId: string) => {
    setDirectChats(prev => prev.map(c => c.id === chatId ? { ...c, unreadCount: 0 } : c));
  };

  const markGroupAsRead = (groupId: string) => {
    setGroups(prev => prev.map(g => g.id === groupId ? { ...g, unreadCount: 0 } : g));
  };

  // Story actions
  const addStory = (mediaUrl: string, caption: string, category: Category) => {
    const newStory: Story = {
      id: `story-${Date.now()}`,
      userId: currentUser.id,
      user: {
        name: currentUser.name,
        username: currentUser.username,
        avatar: currentUser.avatar,
      },
      mediaUrl,
      caption,
      category,
      timestamp: 'Just now',
      viewsCount: 1,
    };
    setStories(prev => [newStory, ...prev]);
    showToast('📸 Story shared to your circle!');
  };

  const viewStory = (storyId: string) => {
    setStories(prev => prev.map(s => s.id === storyId ? { ...s, hasViewed: true } : s));
  };

  // Notifications
  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  const markAllNotificationsAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
    showToast('All notifications marked as read.');
  };

  const clearNotifications = () => {
    setNotifications([]);
    showToast('Notifications cleared.');
  };

  const updateUserProfile = (updatedFields: Partial<User>) => {
    setCurrentUser(prev => ({ ...prev, ...updatedFields }));
    showToast('Profile updated successfully!');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        users,
        posts,
        stories,
        groups,
        directChats,
        friendRequests,
        friends,
        notifications,
        unreadNotifsCount,
        unreadMessagesCount,
        currentView,
        setCurrentView,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        selectedUserProfile,
        setSelectedUserProfile,
        activeChatId,
        setActiveChatId,
        activeGroupId,
        setActiveGroupId,
        isCreatePostOpen,
        setIsCreatePostOpen,
        isFounderModalOpen,
        setIsFounderModalOpen,
        isShareModalOpen,
        setIsShareModalOpen,
        sharePostTarget,
        setSharePostTarget,
        activeStoryIndex,
        setActiveStoryIndex,
        addPost,
        toggleLikePost,
        addComment,
        toggleSavePost,
        votePoll,
        sharePost,
        deletePost,
        sendFriendRequest,
        acceptFriendRequest,
        declineFriendRequest,
        removeFriend,
        isFriend,
        hasSentRequest,
        sendMessageToUser,
        sendMessageToGroup,
        createGroup,
        startDirectChat,
        markChatAsRead,
        markGroupAsRead,
        addStory,
        viewStory,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        clearNotifications,
        toastMessage,
        showToast,
        updateUserProfile,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};