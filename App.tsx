import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Bell, Compass, Heart, Home, MapPin, MessageCircle, Plus, Search, Send, UserRound } from 'lucide-react';

type View = 'feed' | 'explore' | 'messages' | 'profile';
type Post = { id: number; author: string; username: string; location: string; content: string; likes: number; comments: number };

const starterPosts: Post[] = [
  { id: 1, author: 'Yoman Kouadio', username: 'yomankouadio', location: "Abidjan, Côte d'Ivoire", content: 'Bienvenue sur Ivobuzz. Ici, chaque idée mérite d\'être partagée et chaque communauté africaine trouve sa voix.', likes: 1240, comments: 89 },
  { id: 2, author: 'Amina Traoré', username: 'amina_africatech', location: 'Dakar & Abidjan', content: 'Les entrepreneurs africains construisent des solutions ambitieuses, utiles et profondément ancrées dans la réalité du continent.', likes: 834, comments: 156 },
  { id: 3, author: 'Kofi Mensah', username: 'kofi_beats', location: 'Abidjan / Accra', content: 'Nouveau rythme en préparation. La culture nous relie, peu importe la distance.', likes: 512, comments: 67 },
];

const readPosts = (): Post[] => {
  try {
    const saved = localStorage.getItem('ivobuzz_posts');
    return saved ? JSON.parse(saved) : starterPosts;
  } catch { return starterPosts; }
};

export default function App() {
  const [view, setView] = useState<View>('feed');
  const [posts, setPosts] = useState<Post[]>(readPosts);
  const [query, setQuery] = useState('');
  const [composerOpen, setComposerOpen] = useState(false);
  const [draft, setDraft] = useState('');

  useEffect(() => localStorage.setItem('ivobuzz_posts', JSON.stringify(posts)), [posts]);

  const filteredPosts = useMemo(() => posts.filter(post =>
    `${post.author} ${post.location} ${post.content}`.toLowerCase().includes(query.toLowerCase())
  ), [posts, query]);

  const publish = (event: FormEvent) => {
    event.preventDefault();
    if (!draft.trim()) return;
    setPosts([{ id: Date.now(), author: 'Kouamé Cedric', username: 'kouame_cedric', location: 'Abidjan / Paris', content: draft.trim(), likes: 0, comments: 0 }, ...posts]);
    setDraft('');
    setComposerOpen(false);
  };

  const nav = [
    { id: 'feed' as View, label: 'Accueil', icon: Home },
    { id: 'explore' as View, label: 'Explorer', icon: Compass },
    { id: 'messages' as View, label: 'Messages', icon: MessageCircle },
    { id: 'profile' as View, label: 'Profil', icon: UserRound },
  ];

  return <div className="app-shell">
    <header className="topbar">
      <div className="brand"><span className="brand-mark">i</span><span>ivobuzz</span></div>
      <label className="search"><Search size={17} /><input aria-label="Rechercher" placeholder="Rechercher dans Ivobuzz" value={query} onChange={event => setQuery(event.target.value)} /></label>
      <button className="icon-button" aria-label="Notifications"><Bell size={19} /></button>
    </header>
    <main className="layout">
      <aside className="sidebar">
        <div className="profile-mini"><div className="avatar">KC</div><div><strong>Kouamé Cedric</strong><span>@kouame_cedric</span><small><MapPin size={13} /> Abidjan / Paris</small></div></div>
        <nav className="nav-list">{nav.map(item => { const Icon = item.icon; return <button key={item.id} className={view === item.id ? 'nav-item active' : 'nav-item'} onClick={() => setView(item.id)}><Icon size={18} /><span>{item.label}</span></button>; })}</nav>
        <button className="publish-button" onClick={() => setComposerOpen(true)}><Plus size={18} /> Publier un buzz</button>
      </aside>
      <section className="content">
        <div className="section-heading"><div><p className="eyebrow">Communauté ivoirienne et africaine</p><h1>{view === 'feed' ? 'Le buzz du jour' : nav.find(item => item.id === view)?.label}</h1></div></div>
        {view === 'feed' && <div className="posts-list">{filteredPosts.map(post => <article key={post.id} className="post"><div className="post-header"><div className="avatar">{post.username.slice(0, 2).toUpperCase()}</div><div><strong>{post.author}</strong><span>@{post.username}</span><small><MapPin size={12} /> {post.location}</small></div></div><p className="post-content">{post.content}</p><div className="post-actions"><button className="action-button"><Heart size={16} /> {post.likes}</button><button className="action-button"><MessageCircle size={16} /> {post.comments}</button><button className="action-button"><Send size={16} /></button></div></article>)}</div>}
        {view === 'explore' && <div className="empty-state"><Compass size={34} /><h2>Explorer</h2><p>Découvrez les tendances et les communautés du moment.</p></div>}
        {view === 'messages' && <div className="empty-state"><MessageCircle size={34} /><h2>Vos conversations</h2><p>La messagerie est prête à accueillir vos échanges.</p></div>}
        {view === 'profile' && <div className="empty-state"><UserRound size={34} /><h2>Votre profil</h2><p>Gérez votre profil et vos paramètres.</p></div>}
      </section>
      <aside className="right-panel"><div className="panel-title"><h2>Lieux populaires</h2><Compass size={18} /></div>{['Abidjan, Côte d\'Ivoire', 'Dakar & Abidjan', 'Yamoussoukro / Paris'].map((place, idx) => <div key={idx} className="location-card"><MapPin size={14} /><span>{place}</span></div>)}</aside>
    </main>
    {composerOpen && <div className="modal-backdrop" onClick={() => setComposerOpen(false)}><form className="composer" onSubmit={publish} onClick={event => event.stopPropagation()}><div className="composer-header"><h2>Composer un buzz</h2><button type="button" onClick={() => setComposerOpen(false)} aria-label="Fermer">×</button></div><textarea placeholder="Partagez votre idée avec la communauté..." value={draft} onChange={event => setDraft(event.target.value)} /><div className="composer-actions"><button type="submit" className="submit-button">Publier</button></div></form></div>}
  </div>;
}
