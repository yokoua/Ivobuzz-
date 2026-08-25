
1. package.json (Configuration et Dépendances)
code
JSON
{
  "name": "react-example",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --port=3000 --host=0.0.0.0",
    "build": "vite build",
    "preview": "vite preview",
    "clean": "rm -rf dist server.js",
    "lint": "tsc --noEmit"
  },
  "dependencies": {
    "@google/genai": "^2.4.0",
    "@tailwindcss/vite": "^4.1.14",
    "@types/canvas-confetti": "^1.9.0",
    "@vitejs/plugin-react": "^5.0.4",
    "canvas-confetti": "^1.9.4",
    "dotenv": "^17.2.3",
    "express": "^4.21.2",
    "lucide-react": "^0.546.0",
    "motion": "^12.23.24",
    "react": "^19.0.1",
    "react-dom": "^19.0.1",
    "vite": "^6.2.3"
  },
  "devDependencies": {
    "@types/node": "^22.14.0",
    "autoprefixer": "^10.4.21",
    "esbuild": "^0.25.0",
    "tailwindcss": "^4.1.14",
    "tsx": "^4.21.0",
    "typescript": "~5.8.2",
    "vite": "^6.2.3",
    "@types/express": "^4.17.21"
  }
}
2. src/types.ts (Modèles de données & Typage TypeScript)
code
TypeScript
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
3. src/App.tsx (Composant Principal & Navigation)
code
Tsx
import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { SidebarLeft } from './components/SidebarLeft';
import { SidebarRight } from './components/SidebarRight';
import { StoryBar } from './components/StoryBar';
import { PostCard } from './components/PostCard';
import { CreatePostModal } from './components/CreatePostModal';
import { MessagingView } from './components/MessagingView';
import { ProfileView } from './components/ProfileView';
import { FriendsView } from './components/FriendsView';
import { NotificationsView } from './components/NotificationsView';
import { ExploreView } from './components/ExploreView';
import { FounderModal } from './components/FounderModal';
import { ShareModal } from './components/ShareModal';
import { 
  Home, 
  Compass, 
  MessageSquare, 
  Users, 
  Bell, 
  User as UserIcon, 
  Plus, 
  Sparkles, 
  Filter, 
  Image as ImageIcon,
  Video,
  BarChart2,
  Bookmark
} from 'lucide-react';

const MainContent: React.FC = () => {
  const {
    currentView,
    setCurrentView,
    posts,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
    setIsCreatePostOpen,
    selectedUserProfile,
    setSelectedUserProfile,
    currentUser,
    unreadMessagesCount,
    unreadNotifsCount,
    friendRequests,
    toastMessage
  } = useApp();

  const pendingRequestsCount = friendRequests.filter(r => r.status === 'pending').length;

  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.author.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags?.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCat = selectedCategory === 'all' || post.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

  const savedPosts = posts.filter(p => p.isSaved);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-orange-200 selection:text-orange-950 pb-20 lg:pb-8">
      
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900/95 backdrop-blur-md text-white px-4 py-2.5 rounded-2xl shadow-2xl border border-orange-500/40 text-xs sm:text-sm font-bold flex items-center gap-2 animate-in fade-in slide-in-from-top-4 duration-200">
          <Sparkles className="w-4 h-4 text-orange-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      <Header />

      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-4 sm:py-6 flex-1 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6">
          
          {/* Left Sidebar */}
          <div className="hidden lg:block lg:col-span-3 shrink-0">
            <div className="sticky top-28 space-y-4">
              <SidebarLeft />
            </div>
          </div>

          {/* Center Main Dynamic View */}
          <div className={`col-span-12 ${currentView === 'messages' ? 'lg:col-span-9' : 'lg:col-span-6'}`}>
            {currentView === 'feed' && (
              <div className="space-y-4">
                <StoryBar />

                <div 
                  onClick={() => setIsCreatePostOpen(true)}
                  className="bg-white rounded-2xl p-3.5 sm:p-4 border border-orange-100/90 shadow-xs cursor-pointer hover:border-orange-300 transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-10 h-10 rounded-full object-cover border border-orange-300 group-hover:scale-105 transition-transform shrink-0"
                    />
                    <div className="flex-1 bg-orange-50/60 group-hover:bg-orange-50 text-slate-400 group-hover:text-slate-600 text-xs sm:text-sm px-4 py-2.5 rounded-full border border-orange-100/80 transition-colors">
                      What's your positive buzz today, {currentUser.name.split(' ')[0]}? ✨
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-orange-100/60 px-1 text-xs font-semibold text-slate-600">
                    <button className="flex items-center gap-1.5 hover:text-orange-600">
                      <ImageIcon className="w-4 h-4 text-orange-500" />
                      <span>Photo</span>
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-orange-600">
                      <Video className="w-4 h-4 text-amber-500" />
                      <span>Video</span>
                    </button>
                    <button className="flex items-center gap-1.5 hover:text-orange-600">
                      <BarChart2 className="w-4 h-4 text-emerald-500" />
                      <span>Poll</span>
                    </button>
                    <span className="text-[11px] bg-orange-600 text-white font-bold px-2.5 py-1 rounded-full shadow-xs">
                      Buzz
                    </span>
                  </div>
                </div>

                {(searchQuery || selectedCategory !== 'all') && (
                  <div className="flex items-center justify-between p-3 bg-orange-100/60 rounded-2xl text-xs font-bold text-orange-950">
                    <div className="flex items-center gap-2">
                      <Filter className="w-4 h-4 text-orange-600" />
                      <span>
                        Showing: {selectedCategory !== 'all' ? selectedCategory.toUpperCase() : 'All'} {searchQuery && `• "${searchQuery}"`}
                      </span>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedCategory('all');
                        setSearchQuery('');
                      }}
                      className="text-xs text-orange-700 hover:text-orange-900 underline font-extrabold"
                    >
                      Clear Filter
                    </button>
                  </div>
                )}

                <div className="space-y-4">
                  {filteredPosts.length === 0 ? (
                    <div className="bg-white rounded-3xl p-10 text-center border border-orange-100 text-slate-400 space-y-2">
                      <Sparkles className="w-10 h-10 text-orange-300 mx-auto mb-2" />
                      <h3 className="text-sm font-bold text-slate-700">No buzz matches your selection</h3>
                      <p className="text-xs">Be the first to publish a post in this category!</p>
                      <button
                        onClick={() => setIsCreatePostOpen(true)}
                        className="mt-3 px-4 py-2 bg-gradient-to-r from-orange-600 to-amber-500 text-white text-xs font-bold rounded-xl shadow-xs"
                      >
                        Publish a Buzz
                      </button>
                    </div>
                  ) : (
                    filteredPosts.map(post => <PostCard key={post.id} post={post} />)
                  )}
                </div>
              </div>
            )}

            {currentView === 'explore' && <ExploreView />}
            {(currentView === 'messages' || currentView === 'groups') && <MessagingView />}
            {currentView === 'friends' && <FriendsView />}
            {currentView === 'notifications' && <NotificationsView />}
            {currentView === 'profile' && <ProfileView />}

            {currentView === 'saved' && (
              <div className="space-y-4">
                <div className="bg-white rounded-3xl p-5 border border-orange-100 shadow-sm flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center">
                      <Bookmark className="w-5 h-5" />
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-slate-900">Saved Bookmarks</h2>
                      <p className="text-xs text-slate-500">Your private collection of inspiring posts</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-orange-800 bg-orange-50 px-3 py-1 rounded-full">
                    {savedPosts.length} saved
                  </span>
                </div>

                <div className="space-y-4">
                  {savedPosts.length === 0 ? (
                    <div className="bg-white rounded-3xl p-10 text-center border border-orange-100 text-slate-400">
                      <Bookmark className="w-10 h-10 text-orange-300 mx-auto mb-2" />
                      <p className="text-sm font-semibold">No saved bookmarks yet.</p>
                      <p className="text-xs mt-1">Tap the bookmark icon on any post to save it here!</p>
                    </div>
                  ) : (
                    savedPosts.map(p => <PostCard key={p.id} post={p} />)
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar */}
          {currentView !== 'messages' && (
            <div className="hidden lg:block lg:col-span-3 shrink-0">
              <div className="sticky top-28 space-y-4">
                <SidebarRight />
              </div>
            </div>
          )}

        </div>
      </main>

      {/* Floating Action Button (Mobile) */}
      <button
        id="mobile-fab-create-post"
        onClick={() => setIsCreatePostOpen(true)}
        className="lg:hidden fixed right-4 bottom-20 z-40 w-14 h-14 rounded-full bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-500 text-white shadow-xl shadow-orange-500/35 flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
        aria-label="Create Post"
      >
        <Plus className="w-7 h-7" />
      </button>

      {/* Mobile Bottom Navigation */}
      <nav id="ivobuzz-mobile-bottom-nav" className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-orange-100 px-2 py-2 flex items-center justify-around shadow-lg">
        <button
          onClick={() => {
            setCurrentView('feed');
            setSelectedUserProfile(null);
          }}
          className={`flex flex-col items-center gap-0.5 p-1.5 transition-colors ${
            currentView === 'feed' ? 'text-orange-600 font-bold' : 'text-slate-500 hover:text-orange-600'
          }`}
        >
          <Home className="w-5 h-5" />
          <span className="text-[10px]">Feed</span>
        </button>

        <button
          onClick={() => {
            setCurrentView('explore');
            setSelectedUserProfile(null);
          }}
          className={`flex flex-col items-center gap-0.5 p-1.5 transition-colors ${
            currentView === 'explore' ? 'text-orange-600 font-bold' : 'text-slate-500 hover:text-orange-600'
          }`}
        >
          <Compass className="w-5 h-5" />
          <span className="text-[10px]">Explore</span>
        </button>

        <button
          onClick={() => {
            setCurrentView('messages');
            setSelectedUserProfile(null);
          }}
          className={`flex flex-col items-center gap-0.5 p-1.5 relative transition-colors ${
            currentView === 'messages' || currentView === 'groups' ? 'text-orange-600 font-bold' : 'text-slate-500 hover:text-orange-600'
          }`}
        >
          <MessageSquare className="w-5 h-5" />
          <span className="text-[10px]">Chats</span>
          {unreadMessagesCount > 0 && (
            <span className="w-4 h-4 rounded-full bg-orange-600 text-white text-[9px] font-bold flex items-center justify-center absolute top-0.5 right-1">
              {unreadMessagesCount}
            </span>
          )}
        </button>

        <button
          onClick={() => {
            setCurrentView('friends');
            setSelectedUserProfile(null);
          }}
          className={`flex flex-col items-center gap-0.5 p-1.5 relative transition-colors ${
            currentView === 'friends' ? 'text-orange-600 font-bold' : 'text-slate-500 hover:text-orange-600'
          }`}
        >
          <Users className="w-5 h-5" />
          <span className="text-[10px]">Network</span>
          {pendingRequestsCount > 0 && (
            <span className="w-3.5 h-3.5 rounded-full bg-amber-500 text-white text-[8px] font-bold flex items-center justify-center absolute top-0.5 right-1">
              {pendingRequestsCount}
            </span>
          )}
        </button>

        <button
          onClick={() => {
            setSelectedUserProfile(currentUser);
            setCurrentView('profile');
          }}
          className={`flex flex-col items-center gap-0.5 p-1.5 transition-colors ${
            currentView === 'profile' && !selectedUserProfile ? 'text-orange-600 font-bold' : 'text-slate-500 hover:text-orange-600'
          }`}
        >
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-5 h-5 rounded-full object-cover border border-orange-400"
          />
          <span className="text-[10px]">Profile</span>
        </button>
      </nav>

      {/* Global Modals */}
      <CreatePostModal />
      <FounderModal />
      <ShareModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
4. src/components/SidebarLeft.tsx (Menu & Catégories Thématiques)
code
Tsx
import React from 'react';
import { 
  Home, 
  Compass, 
  MessageSquare, 
  Users2, 
  UserCheck, 
  Bookmark, 
  Bell, 
  Award, 
  Sparkles,
  Palette,
  Rocket,
  Briefcase,
  GraduationCap,
  Sun,
  Trophy,
  Music,
  Newspaper,
  ShieldCheck,
  Globe2,
  MapPin
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Category, ViewTab } from '../types';
import { FOUNDER_USER } from '../data/initialData';

export const SidebarLeft: React.FC = () => {
  const {
    currentUser,
    currentView,
    setCurrentView,
    selectedCategory,
    setSelectedCategory,
    setSelectedUserProfile,
    unreadNotifsCount,
    unreadMessagesCount,
    friendRequests,
    setIsFounderModalOpen,
    friends
  } = useApp();

  const pendingCount = friendRequests.filter(r => r.status === 'pending').length;

  const navItems: { id: ViewTab; label: string; icon: React.ElementType; badge?: number }[] = [
    { id: 'feed', label: 'Buzz Feed', icon: Home },
    { id: 'explore', label: 'Explore & Trends', icon: Compass },
    { id: 'messages', label: 'Direct Messages', icon: MessageSquare, badge: unreadMessagesCount },
    { id: 'groups', label: 'Secure Community Groups', icon: Users2 },
    { id: 'friends', label: 'My Friends & Network', icon: UserCheck, badge: pendingCount },
    { id: 'notifications', label: 'Notifications', icon: Bell, badge: unreadNotifsCount },
    { id: 'saved', label: 'Saved Bookmarks', icon: Bookmark },
  ];

  const categoryItems: { id: Category; label: string; icon: React.ElementType; colorClass: string }[] = [
    { id: 'culture', label: 'Culture & Arts', icon: Palette, colorClass: 'text-amber-500' },
    { id: 'entrepreneurship', label: 'Entrepreneurship', icon: Rocket, colorClass: 'text-orange-500' },
    { id: 'business', label: 'Business & Trade', icon: Briefcase, colorClass: 'text-blue-500' },
    { id: 'education', label: 'Éducation & Skills', icon: GraduationCap, colorClass: 'text-emerald-500' },
    { id: 'religion', label: 'Religion & Faith', icon: Sun, colorClass: 'text-yellow-500' },
    { id: 'sport', label: 'Sport & AFCON', icon: Trophy, colorClass: 'text-green-500' },
    { id: 'music', label: 'Musique & Beats', icon: Music, colorClass: 'text-purple-500' },
    { id: 'news', label: 'News & Updates', icon: Newspaper, colorClass: 'text-rose-500' },
  ];

  return (
    <aside id="ivobuzz-sidebar-left" className="w-full space-y-4">
      {/* Current User Quick Identity Card */}
      <div className="bg-white rounded-2xl p-4 border border-orange-100/90 shadow-xs">
        <div 
          onClick={() => {
            setSelectedUserProfile(currentUser);
            setCurrentView('profile');
          }}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-12 h-12 rounded-full object-cover border-2 border-orange-500 group-hover:scale-105 transition-transform"
            />
            {currentUser.isVerified && (
              <span className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-orange-600 fill-orange-100" />
              </span>
            )}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="text-sm font-bold text-slate-900 truncate group-hover:text-orange-600 transition-colors">
              {currentUser.name}
            </h3>
            <p className="text-xs text-slate-500 truncate">@{currentUser.username}</p>
            <p className="flex items-start gap-1 text-[11px] leading-4 text-slate-700 mt-1">
              <MapPin className="w-3 h-3 mt-0.5 shrink-0 text-orange-500" aria-hidden="true" />
              <span className="line-clamp-2">{currentUser.location}</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-orange-100/60 text-center">
          <div>
            <span className="block text-xs font-black text-slate-900">{friends.length}</span>
            <span className="text-[10px] font-medium text-slate-500">Friends</span>
          </div>
          <div>
            <span className="block text-xs font-black text-slate-900">{currentUser.followersCount.toLocaleString()}</span>
            <span className="text-[10px] font-medium text-slate-500">Followers</span>
          </div>
          <div>
            <span className="block text-xs font-black text-slate-900">{currentUser.followingCount}</span>
            <span className="text-[10px] font-medium text-slate-500">Following</span>
          </div>
        </div>
      </div>

      {/* Main Navigation Menu */}
      <nav className="bg-white rounded-2xl p-2.5 border border-orange-100/90 shadow-xs space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              id={`nav-link-${item.id}`}
              onClick={() => {
                setCurrentView(item.id);
                setSelectedUserProfile(null);
              }}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-orange-600 to-amber-500 text-white shadow-xs shadow-orange-500/20'
                  : 'text-slate-700 hover:bg-orange-50 hover:text-orange-700'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-orange-600'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && item.badge > 0 ? (
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    isActive ? 'bg-white text-orange-600' : 'bg-orange-600 text-white'
                  }`}
                >
                  {item.badge}
                </span>
              ) : null}
            </button>
          );
        })}
      </nav>

      {/* Categories / Hubs */}
      <div className="bg-white rounded-2xl p-3 border border-orange-100/90 shadow-xs">
        <div className="flex items-center justify-between mb-2 px-1">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Community Hubs
          </span>
          <Sparkles className="w-3.5 h-3.5 text-orange-500" />
        </div>

        <div className="space-y-1">
          {categoryItems.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id && currentView === 'feed';
            return (
              <button
                key={cat.id}
                id={`sidebar-cat-${cat.id}`}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  setCurrentView('feed');
                  setSelectedUserProfile(null);
                }}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                  isSelected
                    ? 'bg-orange-100/80 text-orange-900 font-bold border border-orange-200'
                    : 'text-slate-700 hover:bg-orange-50/60 hover:text-orange-800'
                }`}
              >
                <Icon className={`w-4 h-4 ${cat.colorClass}`} />
                <span className="truncate">{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Founder Tribute Box */}
      <div className="bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 rounded-2xl p-4 text-white shadow-md shadow-orange-500/20 relative overflow-hidden">
        <div className="flex items-center gap-2 mb-2">
          <div className="p-1 bg-white/20 rounded-lg">
            <Award className="w-4 h-4 text-amber-200" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-orange-100">
            Founder & Visionary
          </span>
        </div>

        <div 
          onClick={() => {
            setSelectedUserProfile(FOUNDER_USER);
            setCurrentView('profile');
          }}
          className="flex items-center gap-2.5 my-2.5 p-2 bg-black/15 rounded-xl cursor-pointer hover:bg-black/25 transition-colors"
        >
          <img
            src={FOUNDER_USER.avatar}
            alt={FOUNDER_USER.name}
            className="w-10 h-10 rounded-full object-cover border-2 border-amber-300 shadow-xs"
          />
          <div className="min-w-0 flex-1">
            <h4 className="text-xs font-extrabold text-white truncate flex items-center gap-1">
              {FOUNDER_USER.name}
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" />
            </h4>
            <p className="text-[10px] text-orange-100 truncate">Teacher & Digital Entrepreneur</p>
          </div>
        </div>

        <button
          id="sidebar-founder-story-btn"
          onClick={() => setIsFounderModalOpen(true)}
          className="mt-3 w-full py-1.5 px-3 bg-white hover:bg-orange-50 text-orange-700 text-xs font-bold rounded-xl shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
        >
          <Globe2 className="w-3.5 h-3.5" />
          <span>Read Founder Vision</span>
        </button>
      </div>
    </aside>
  );
