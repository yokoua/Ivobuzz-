import { FormEvent, useEffect, useMemo, useState } from 'react';
import { Bell, Compass, Heart, Home, MapPin, MessageCircle, Plus, Search, Send, UserRound } from 'lucide-react';

type View = 'feed' | 'explore' | 'messages' | 'profile';
type Post = { id: number; author: string; username: string; location: string; content: string; likes: number; comments: number };

const starterPosts: Post[] = [
  { id: 1, author: 'Yoman Kouadio', username: 'yomankouadio', location: "Abidjan, Côte d’Ivoire", content: 'Bienvenue sur Ivobuzz. Ici, chaque idée mérite d’être partagée et chaque communauté peut grandir.', likes: 342, comments: 28 },
  { id: 2, author: 'Amina Traoré', username: 'amina_africatech', location: 'Dakar & Abidjan', content: 'Les entrepreneurs africains construisent des solutions ambitieuses, utiles et profondément locales.', likes: 189, comments: 16 },
  { id: 3, author: 'Kofi Mensah', username: 'kofi_beats', location: 'Abidjan / Accra', content: 'Nouveau rythme en préparation. La culture nous relie, peu importe la distance.', likes: 512, comments: 42 },
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

  const nav = [{ id: 'feed' as View, label: 'Accueil', icon: Home }, { id: 'explore' as View, label: 'Explorer', icon: Compass }, { id: 'messages' as View, label: 'Messages', icon: MessageCircle }, { id: 'profile' as View, label: 'Profil', icon: UserRound }];

  return <div className="app-shell">
    <header className="topbar">
      <div className="brand"><span className="brand-mark">i</span><span>ivobuzz</span></div>
      <label className="search"><Search size={17} /><input aria-label="Rechercher" placeholder="Rechercher dans Ivobuzz" value={query} onChange={event => setQuery(event.target.value)} /></label>
      <button className="icon-button" aria-label="Notifications"><Bell size={19} /></button>
    </header>
    <main className="layout">
      <aside className="sidebar">
        <div className="profile-mini"><div className="avatar">KC</div><div><strong>Kouamé Cedric</strong><span>@kouame_cedric</span><small><MapPin size={13} /> Abidjan / Paris</small></div></div>
        <nav className="nav-list">{nav.map(item => { const Icon = item.icon; return <button key={item.id} className={view === item.id ? 'nav-item active' : 'nav-item'} onClick={() => setView(item.id)}><Icon size={19} /><span>{item.label}</span></button>; })}</nav>
        <button className="publish-button" onClick={() => setComposerOpen(true)}><Plus size={18} /> Publier un buzz</button>
      </aside>
      <section className="content">
        <div className="section-heading"><div><p className="eyebrow">Communauté ivoirienne et africaine</p><h1>{view === 'feed' ? 'Le buzz du jour' : nav.find(item => item.id === view)?.label}</h1></div><button className="mobile-publish" aria-label="Publier un buzz" onClick={() => setComposerOpen(true)}><Plus size={20} /></button></div>
        {view === 'messages' ? <div className="empty-state"><MessageCircle size={34} /><h2>Vos conversations</h2><p>La messagerie est prête à accueillir vos échanges.</p></div> : view === 'profile' ? <div className="profile-panel"><div className="avatar large">KC</div><h2>Kouamé Cedric</h2><p>@kouame_cedric</p><p className="location"><MapPin size={16} /> Abidjan / Paris</p></div> : <div className="post-list">{filteredPosts.length ? filteredPosts.map(post => <article className="post" key={post.id}><div className="post-head"><div className="avatar">{post.author.split(' ').map(name => name[0]).join('')}</div><div><strong>{post.author}</strong><span>@{post.username} · {post.location}</span></div></div><p className="post-location"><MapPin size={15} /> {post.location}</p><p className="post-content">{post.content}</p><div className="post-actions"><button><Heart size={17} /> {post.likes}</button><button><MessageCircle size={17} /> {post.comments}</button><button><Send size={17} /> Partager</button></div></article>) : <div className="empty-state"><Search size={34} /><h2>Aucun résultat</h2><p>Essayez une autre recherche.</p></div>}</div>}
      </section>
      <aside className="right-panel"><div className="panel-title"><h2>Lieux populaires</h2><Compass size={18} /></div>{['Abidjan, Côte d’Ivoire', 'Dakar & Abidjan', 'Yamoussoukro / Paris'].map(location => <div className="location-row" key={location}><MapPin size={17} /><span>{location}</span></div>)}<div className="panel-note">Les adresses sont affichées en entier pour rester faciles à lire.</div></aside>
    </main>
    {composerOpen && <div className="modal-backdrop" onClick={() => setComposerOpen(false)}><form className="composer" onSubmit={publish} onClick={event => event.stopPropagation()}><div className="section-heading"><h2>Publier un buzz</h2><button type="button" className="close-button" onClick={() => setComposerOpen(false)}>×</button></div><textarea autoFocus value={draft} onChange={event => setDraft(event.target.value)} placeholder="Qu’avez-vous envie de partager ?" /><button className="publish-button" type="submit">Publier</button></form></div>}
  </div>;
}
