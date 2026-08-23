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