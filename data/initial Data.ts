import { User, Post, Story, ChatGroup, DirectChat, NotificationItem, FriendRequest } from '../types';

export const FOUNDER_USER: User = {
  id: 'user-founder',
  name: 'Yoman Kouadio',
  username: 'yomankouadio',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  coverImage: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80',
  bio: 'Founder & Visionary of Ivobuzz 🇨🇮✨ | Teacher & Digital Entrepreneur | Dedicated to connecting African & global youth across culture, business, tech & innovation.',
  headline: 'Founder of Ivobuzz | Digital Entrepreneur & Educator',
  role: 'Founder & CEO',
  location: 'Abidjan, Côte d’Ivoire & Global',
  isVerified: true,
  isFounder: true,
  followersCount: 142500,
  followingCount: 340,
  friendsCount: 1280,
  interests: ['entrepreneurship', 'culture', 'education', 'business', 'news'],
  joinedDate: 'January 2024',
  website: 'https://ivobuzz.com',
};

export const CURRENT_USER: User = {
  id: 'user-current',
  name: 'Kouamé Cedric',
  username: 'kouame_cedric',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
  coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
  bio: 'Creative tech enthusiast, music producer & entrepreneur based in Abidjan. Sharing positive buzz every day! 🧡🌍',
  headline: 'Product Designer & Afrobeats Enthusiast',
  role: 'Member',
  location: 'Abidjan / Paris',
  isVerified: true,
  isFounder: false,
  followersCount: 1840,
  followingCount: 620,
  friendsCount: 412,
  interests: ['culture', 'music', 'entrepreneurship', 'sport'],
  joinedDate: 'March 2024',
  website: 'https://cedric-creative.dev',
};

export const SAMPLE_USERS: User[] = [
  FOUNDER_USER,
  {
    id: 'user-amina',
    name: 'Amina Traoré',
    username: 'amina_africatech',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80',
    bio: 'Fintech Founder & Angel Investor. Empowering female founders in West Africa 🚀💡',
    headline: 'CEO @ PayIvoire | Tech Speaker',
    location: 'Dakar & Abidjan',
    isVerified: true,
    followersCount: 28900,
    followingCount: 450,
    friendsCount: 680,
    interests: ['entrepreneurship', 'business', 'education'],
    joinedDate: 'February 2024',
  },
  {
    id: 'user-kofi',
    name: 'Kofi Mensah',
    username: 'kofi_beats',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80',
    bio: 'Music Producer, Sound Engineer & DJ. Coupé-Décalé & Afrobeats vibrations worldwide! 🎵🎛️',
    headline: 'Music Producer | Sound Architect',
    location: 'Abidjan / Accra',
    isVerified: true,
    followersCount: 54300,
    followingCount: 310,
    friendsCount: 890,
    interests: ['music', 'culture'],
    joinedDate: 'January 2024',
  },
  {
    id: 'user-fatou',
    name: 'Fatou Bamba',
    username: 'fatou_designs',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=1200&q=80',
    bio: 'Contemporary African Haute Couture & Textile Innovator. Celebrating traditional Kita & Baoulé fabrics with modern luxury.',
    headline: 'Fashion Designer & Creative Director',
    location: 'Yamoussoukro / Milan',
    isVerified: true,
    followersCount: 19800,
    followingCount: 520,
    friendsCount: 340,
    interests: ['culture', 'business'],
    joinedDate: 'April 2024',
  },
  {
    id: 'user-didier',
    name: 'Didier Konan',
    username: 'didier_sport225',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    bio: 'Sports journalist, Football analyst & youth athletics mentor. The pride of the Elephants! ⚽🇨🇮',
    headline: 'Sports Journalist & Match Commentator',
    location: 'Abidjan, Côte d’Ivoire',
    isVerified: false,
    followersCount: 12400,
    followingCount: 890,
    friendsCount: 950,
    interests: ['sport', 'news'],
    joinedDate: 'March 2024',
  },
  {
    id: 'user-pasteur',
    name: 'Pasteur Samuel Élie',
    username: 'pasteur_samuel',
    avatar: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=400&q=80',
    bio: 'Sharing messages of hope, spiritual growth, perseverance and brotherhood. Faith moves mountains! 🙏✨',
    headline: 'Spiritual Guide & Author',
    location: 'Abidjan / Montreal',
    isVerified: true,
    followersCount: 31200,
    followingCount: 120,
    friendsCount: 450,
    interests: ['religion', 'education', 'culture'],
    joinedDate: 'January 2024',
  },
  {
    id: 'user-claire',
    name: 'Prof. Claire Touré',
    username: 'prof_claire',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
    bio: 'Dean of STEM & AI Education in West Africa. Passionate about empowering the next generation of coders and scientists! 🎓🔬',
    headline: 'University Professor & EdTech Pioneer',
    location: 'Bouaké & London',
    isVerified: true,
    followersCount: 16500,
    followingCount: 290,
    friendsCount: 310,
    interests: ['education', 'entrepreneurship'],
    joinedDate: 'May 2024',
  }
];

export const INITIAL_POSTS: Post[] = [
  {
    id: 'post-1',
    userId: FOUNDER_USER.id,
    author: {
      name: FOUNDER_USER.name,
      username: FOUNDER_USER.username,
      avatar: FOUNDER_USER.avatar,
      isVerified: true,
      isFounder: true,
      location: 'Abidjan, Côte d’Ivoire',
    },
    category: 'entrepreneurship',
    content: `Welcome to IVOBUZZ! 🌟 As a teacher and digital entrepreneur, my lifelong mission has been to give our communities worldwide a dedicated home where culture, innovation, business, and education thrive hand in hand.

Whether you are building a startup, celebrating traditional art, sharing the newest music rhythms, or seeking spiritual inspiration—Ivobuzz is your canvas. Let us connect the world with positive energy! 🇨🇮🚀

What inspires you most to create today? Drop your thoughts below!`,
    timestamp: '20m ago',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80',
    mediaCaption: 'Connecting brilliant minds across Africa and the global diaspora at the Ivobuzz Tech & Culture Summit.',
    tags: ['#Ivobuzz', '#YouthEmpowerment', '#DigitalAfrica', '#Innovation'],
    likesCount: 342,
    hasLiked: true,
    commentsCount: 28,
    sharesCount: 54,
    hasShared: false,
    isSaved: true,
    comments: [
      {
        id: 'c-1',
        userId: 'user-amina',
        user: {
          name: 'Amina Traoré',
          username: 'amina_africatech',
          avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80',
          isVerified: true,
        },
        content: 'Félicitations Yoman! Ivobuzz is already changing how entrepreneurs connect across our borders. Proud of this milestone!',
        timestamp: '15m ago',
        likes: 45,
        hasLiked: true,
      },
      {
        id: 'c-2',
        userId: 'user-kofi',
        user: {
          name: 'Kofi Mensah',
          username: 'kofi_beats',
          avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
          isVerified: true,
        },
        content: 'Huge respect for the vision. The music and cultural rooms are on fire today! 🔥🎶',
        timestamp: '10m ago',
        likes: 19,
      }
    ],
  },
  {
    id: 'post-2',
    userId: 'user-kofi',
    author: {
      name: 'Kofi Mensah',
      username: 'kofi_beats',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
      isVerified: true,
      location: 'Abidjan / Lagos',
    },
    category: 'music',
    content: `New Afro-fusion rhythm preview direct from the studio in Plateau! 🎧 Synthesizing classic Balafon percussion with modern 808s and energetic brass. Which vibe should we drop this weekend? Vote in the poll below! 🔥🎵`,
    timestamp: '1h ago',
    mediaType: 'video',
    mediaUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
    mediaCaption: 'Live studio session clip — capturing the electric energy of Abidjan night sessions.',
    tags: ['#Afrobeats', '#CoupéDécalé', '#IvobuzzMusic', '#SoundDesign'],
    likesCount: 512,
    hasLiked: false,
    commentsCount: 42,
    sharesCount: 88,
    isSaved: false,
    poll: {
      question: 'Which track tempo should lead the EP release?',
      options: [
        { id: 'opt-1', text: '🔥 High Energy Coupé-Décalé (128 BPM)', votes: 245 },
        { id: 'opt-2', text: '🌊 Smooth Afro-Soul Lounge (102 BPM)', votes: 180 },
        { id: 'opt-3', text: '⚡ Amapiano Log-Drum Fusion (115 BPM)', votes: 310 }
      ],
      totalVotes: 735,
      hasVoted: false,
    },
    comments: [
      {
        id: 'c-3',
        userId: 'user-current',
        user: {
          name: 'Kouamé Cedric',
          username: 'kouame_cedric',
          avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
          isVerified: true,
        },
        content: 'That bassline is unreal! Voted for the Amapiano Log-Drum fusion. Can’t wait for the release!',
        timestamp: '45m ago',
        likes: 12,
      }
    ]
  },
  {
    id: 'post-3',
    userId: 'user-fatou',
    author: {
      name: 'Fatou Bamba',
      username: 'fatou_designs',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      isVerified: true,
      location: 'Yamoussoukro / Paris',
    },
    category: 'culture',
    content: `Celebrating the timeless heritage of traditional African textiles! ✨ Each handwoven pattern in our new collection honors the artisans of Côte d’Ivoire, weaving together stories of royalty, community unity, and elegance. Culture is our superpower. 👑🌿`,
    timestamp: '3h ago',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80',
    mediaCaption: 'Autumn runway preview featuring handmade Baoulé fabric with gold thread embroidery.',
    tags: ['#AfricanFashion', '#Culture225', '#HandmadeLuxury', '#IvobuzzArt'],
    likesCount: 420,
    hasLiked: true,
    commentsCount: 31,
    sharesCount: 65,
    isSaved: false,
    comments: []
  },
  {
    id: 'post-4',
    userId: 'user-amina',
    author: {
      name: 'Amina Traoré',
      username: 'amina_africatech',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80',
      isVerified: true,
      location: 'Dakar & Abidjan',
    },
    category: 'business',
    content: `Exciting announcement: We have successfully closed our $2.5M Seed round to expand solar-powered micro-grid financial payments across agricultural hubs in West Africa! ☀️💰

Gratitude to our investors, our hardworking engineering team, and mentors like Yoman Kouadio who believed in our mission from day one. To all young builders: keep building solutions for real everyday challenges!`,
    timestamp: '5h ago',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80',
    mediaCaption: 'Signing the seed partnership in Abidjan fintech hub.',
    tags: ['#Fintech', '#AgriTech', '#AfricanStartups', '#FundingAlert'],
    likesCount: 689,
    hasLiked: false,
    commentsCount: 56,
    sharesCount: 112,
    isSaved: true,
    comments: []
  },
  {
    id: 'post-5',
    userId: 'user-didier',
    author: {
      name: 'Didier Konan',
      username: 'didier_sport225',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
      location: 'Abidjan',
    },
    category: 'sport',
    content: `What a thrilling derby match at the Stade Olympique d’Ébimpé! 🏟️⚽ 60,000 passionate supporters singing in unison. The discipline, tactical coordination, and raw spirit on the pitch was pure world-class.

Drop your player of the match in the comments! 🇨🇮⚽`,
    timestamp: '7h ago',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=1200&q=80',
    mediaCaption: 'The roaring orange wave of fans bringing the stadium alive!',
    tags: ['#Football', '#ElephantsDeCI', '#Sport225', '#EbimpeStadium'],
    likesCount: 820,
    hasLiked: true,
    commentsCount: 94,
    sharesCount: 140,
    isSaved: false,
    comments: []
  },
  {
    id: 'post-6',
    userId: 'user-claire',
    author: {
      name: 'Prof. Claire Touré',
      username: 'prof_claire',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=400&q=80',
      isVerified: true,
      location: 'Bouaké',
    },
    category: 'education',
    content: `Announcing the 2026 Free Pan-African AI & Data Science Fellowship! 🎓🤖

Over 500 scholarships available for passionate students in robotics, generative tech, and software craftsmanship. Application is completely free. Education is the greatest equalizer of all. Link in bio & in our Ivory Education Group!`,
    timestamp: '9h ago',
    mediaType: 'image',
    mediaUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    tags: ['#EducationForAll', '#AIFellowship', '#IvobuzzLearn', '#STEM'],
    likesCount: 610,
    hasLiked: false,
    commentsCount: 67,
    sharesCount: 195,
    isSaved: true,
    comments: []
  },
  {
    id: 'post-7',
    userId: 'user-pasteur',
    author: {
      name: 'Pasteur Samuel Élie',
      username: 'pasteur_samuel',
      avatar: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=400&q=80',
      isVerified: true,
      location: 'Abidjan',
    },
    category: 'religion',
    content: `Daily Reflection 🙏: "Do not grow weary in doing good, for at the proper time we will reap a harvest if we do not give up."

Whatever storm or hesitation you face today in your business, studies, or family—stand firm with faith and gratitude. Have a blessed and fruitful week everyone! ✨🕊️`,
    timestamp: '12h ago',
    tags: ['#Faith', '#Wisdom', '#MorningMotivation', '#Gratitude'],
    likesCount: 540,
    hasLiked: true,
    commentsCount: 48,
    sharesCount: 82,
    isSaved: false,
    comments: []
  }
];

export const INITIAL_STORIES: Story[] = [
  {
    id: 'story-1',
    userId: FOUNDER_USER.id,
    user: {
      name: FOUNDER_USER.name,
      username: FOUNDER_USER.username,
      avatar: FOUNDER_USER.avatar,
    },
    mediaUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    caption: 'Welcome to Ivobuzz! Connecting brilliant minds worldwide 🧡🚀',
    timestamp: '1h ago',
    category: 'entrepreneurship',
    viewsCount: 1250,
  },
  {
    id: 'story-2',
    userId: 'user-kofi',
    user: {
      name: 'Kofi Mensah',
      username: 'kofi_beats',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    },
    mediaUrl: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
    caption: 'Late night master track rendering 🎚️🎶 Pure vibes!',
    timestamp: '2h ago',
    category: 'music',
    viewsCount: 890,
  },
  {
    id: 'story-3',
    userId: 'user-fatou',
    user: {
      name: 'Fatou Bamba',
      username: 'fatou_designs',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    },
    mediaUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=800&q=80',
    caption: 'Fitting room sneak peek for the grand gala ✨👗',
    timestamp: '4h ago',
    category: 'culture',
    viewsCount: 670,
  },
  {
    id: 'story-4',
    userId: 'user-amina',
    user: {
      name: 'Amina Traoré',
      username: 'amina_africatech',
      avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80',
    },
    mediaUrl: 'https://images.unsplash.com/photo-1577962917302-cd874c4e31d2?auto=format&fit=crop&w=800&q=80',
    caption: 'Keynote speech at the West Africa Tech Forum 💡🌍',
    timestamp: '5h ago',
    category: 'business',
    viewsCount: 1100,
  },
  {
    id: 'story-5',
    userId: 'user-didier',
    user: {
      name: 'Didier Konan',
      username: 'didier_sport225',
      avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
    },
    mediaUrl: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80',
    caption: 'Pre-match warmups pitchside! Stadium is vibrating ⚽🔥',
    timestamp: '6h ago',
    category: 'sport',
    viewsCount: 940,
  }
];

export const INITIAL_GROUPS: ChatGroup[] = [
  {
    id: 'group-founders',
    name: '🚀 African Tech & Founders Hub',
    description: 'Collaborative, secure network for entrepreneurs, tech innovators, founders and investors across Africa and the diaspora.',
    avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80',
    category: 'entrepreneurship',
    isEncrypted: true,
    membersCount: 1240,
    members: [FOUNDER_USER, SAMPLE_USERS[1], CURRENT_USER],
    lastMessage: 'Yoman Kouadio: Welcome all new founders! Remember our live Q&A this Thursday.',
    lastMessageTime: '12m ago',
    messages: [
      {
        id: 'gm-1',
        senderId: FOUNDER_USER.id,
        senderName: FOUNDER_USER.name,
        senderAvatar: FOUNDER_USER.avatar,
        text: 'Hello everyone! Excited to welcome all new builders to our secure founders lounge.',
        timestamp: '10:15 AM',
      },
      {
        id: 'gm-2',
        senderId: 'user-amina',
        senderName: 'Amina Traoré',
        senderAvatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=400&q=80',
        text: 'Glad to be here! Looking for feedback on cross-border payments in the agricultural sector.',
        timestamp: '10:22 AM',
      },
      {
        id: 'gm-3',
        senderId: FOUNDER_USER.id,
        senderName: FOUNDER_USER.name,
        senderAvatar: FOUNDER_USER.avatar,
        text: 'Welcome all new founders! Remember our live Q&A this Thursday.',
        timestamp: '10:30 AM',
      }
    ]
  },
  {
    id: 'group-music',
    name: '🎵 Afrobeats & Coupé-Décalé Beats',
    description: 'Music producers, composers, vocalists, and fans sharing original stems, beats, and industry news.',
    avatar: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
    category: 'music',
    isEncrypted: true,
    membersCount: 3820,
    members: [SAMPLE_USERS[2], CURRENT_USER],
    lastMessage: 'Kofi Mensah: Dropping new guitar loop stems today in the resource folder!',
    lastMessageTime: '35m ago',
    messages: [
      {
        id: 'gm-4',
        senderId: 'user-kofi',
        senderName: 'Kofi Mensah',
        senderAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
        text: 'Dropping new guitar loop stems today in the resource folder!',
        timestamp: '09:40 AM',
      }
    ]
  },
  {
    id: 'group-culture',
    name: '👑 Art, Fashion & Heritage 225',
    description: 'Promoting traditional textiles, contemporary fashion, African literature, and historical arts.',
    avatar: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=400&q=80',
    category: 'culture',
    isEncrypted: true,
    membersCount: 2150,
    members: [SAMPLE_USERS[3], CURRENT_USER],
    lastMessage: 'Fatou Bamba: Exhibition at the Palais de la Culture this weekend!',
    lastMessageTime: '2h ago',
    messages: [
      {
        id: 'gm-5',
        senderId: 'user-fatou',
        senderName: 'Fatou Bamba',
        senderAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
        text: 'Exhibition at the Palais de la Culture this weekend! Who is coming?',
        timestamp: '08:15 AM',
      }
    ]
  },
  {
    id: 'group-sport',
    name: '⚽ Global Football & Sports Arena',
    description: 'Match discussions, tactical analysis, AFCON highlights and youth league updates.',
    avatar: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=400&q=80',
    category: 'sport',
    isEncrypted: true,
    membersCount: 4500,
    members: [SAMPLE_USERS[4], CURRENT_USER],
    lastMessage: 'Didier Konan: Predictions for this weekend fixture?',
    lastMessageTime: '4h ago',
    messages: [
      {
        id: 'gm-6',
        senderId: 'user-didier',
        senderName: 'Didier Konan',
        senderAvatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
        text: 'Predictions for this weekend fixture?',
        timestamp: '06:30 AM',
      }
    ]
  }
];

export const INITIAL_DIRECT_CHATS: DirectChat[] = [
  {
    id: 'chat-founder',
    participant: FOUNDER_USER,
    unreadCount: 1,
    lastMessage: 'Thank you for being part of the early Ivobuzz community! Let’s keep buzzing.',
    lastMessageTime: '15m ago',
    messages: [
      {
        id: 'dm-1',
        senderId: FOUNDER_USER.id,
        senderName: FOUNDER_USER.name,
        senderAvatar: FOUNDER_USER.avatar,
        text: 'Hi Cedric! I saw your thoughtful comments on the new entrepreneurship initiative.',
        timestamp: '11:00 AM',
      },
      {
        id: 'dm-2',
        senderId: CURRENT_USER.id,
        senderName: CURRENT_USER.name,
        senderAvatar: CURRENT_USER.avatar,
        text: 'Bonjour Monsieur Kouadio! Big congratulations on Ivobuzz. The platform feels so fresh and vibrant.',
        timestamp: '11:05 AM',
      },
      {
        id: 'dm-3',
        senderId: FOUNDER_USER.id,
        senderName: FOUNDER_USER.name,
        senderAvatar: FOUNDER_USER.avatar,
        text: 'Thank you for being part of the early Ivobuzz community! Let’s keep buzzing. 🧡🚀',
        timestamp: '11:08 AM',
        isRead: false,
      }
    ]
  },
  {
    id: 'chat-amina',
    participant: SAMPLE_USERS[1],
    unreadCount: 0,
    lastMessage: 'Let’s review the product wireframes tomorrow afternoon.',
    lastMessageTime: '2h ago',
    messages: [
      {
        id: 'dm-4',
        senderId: 'user-amina',
        senderName: 'Amina Traoré',
        senderAvatar: SAMPLE_USERS[1].avatar,
        text: 'Hello Cedric! Are you free for a quick sync on our payment gateway UX?',
        timestamp: '09:00 AM',
      },
      {
        id: 'dm-5',
        senderId: CURRENT_USER.id,
        senderName: CURRENT_USER.name,
        senderAvatar: CURRENT_USER.avatar,
        text: 'Yes definitely! I have the responsive prototypes ready.',
        timestamp: '09:12 AM',
      },
      {
        id: 'dm-6',
        senderId: 'user-amina',
        senderName: 'Amina Traoré',
        senderAvatar: SAMPLE_USERS[1].avatar,
        text: 'Let’s review the product wireframes tomorrow afternoon.',
        timestamp: '09:20 AM',
        isRead: true,
      }
    ]
  },
  {
    id: 'chat-kofi',
    participant: SAMPLE_USERS[2],
    unreadCount: 0,
    lastMessage: 'Sending over the drum sample stems in a second!',
    lastMessageTime: 'Yesterday',
    messages: [
      {
        id: 'dm-7',
        senderId: 'user-kofi',
        senderName: 'Kofi Mensah',
        senderAvatar: SAMPLE_USERS[2].avatar,
        text: 'Bro, that sample you sent with the acoustic kora is magic!',
        timestamp: 'Yesterday',
      },
      {
        id: 'dm-8',
        senderId: CURRENT_USER.id,
        senderName: CURRENT_USER.name,
        senderAvatar: CURRENT_USER.avatar,
        text: 'Glad you loved it! Add some Afro-house swing on it.',
        timestamp: 'Yesterday',
      }
    ]
  }
];

export const INITIAL_FRIEND_REQUESTS: FriendRequest[] = [
  {
    id: 'fr-1',
    fromUser: SAMPLE_USERS[5], // Prof Claire
    toUserId: CURRENT_USER.id,
    status: 'pending',
    timestamp: '2h ago',
    mutualFriendsCount: 14,
  },
  {
    id: 'fr-2',
    fromUser: SAMPLE_USERS[4], // Pasteur Samuel
    toUserId: CURRENT_USER.id,
    status: 'pending',
    timestamp: '1d ago',
    mutualFriendsCount: 8,
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    type: 'like',
    fromUser: {
      id: FOUNDER_USER.id,
      name: FOUNDER_USER.name,
      username: FOUNDER_USER.username,
      avatar: FOUNDER_USER.avatar,
    },
    postId: 'post-2',
    text: 'liked your comment on Kofi Mensah’s studio preview.',
    timestamp: '10m ago',
    isRead: false,
  },
  {
    id: 'notif-2',
    type: 'friend_request',
    fromUser: {
      id: SAMPLE_USERS[5].id,
      name: SAMPLE_USERS[5].name,
      username: SAMPLE_USERS[5].username,
      avatar: SAMPLE_USERS[5].avatar,
    },
    text: 'sent you a friend request to connect on Ivobuzz.',
    timestamp: '2h ago',
    isRead: false,
  },
  {
    id: 'notif-3',
    type: 'group_invite',
    fromUser: {
      id: SAMPLE_USERS[1].id,
      name: SAMPLE_USERS[1].name,
      username: SAMPLE_USERS[1].username,
      avatar: SAMPLE_USERS[1].avatar,
    },
    groupId: 'group-founders',
    text: 'invited you to join African Tech & Founders Hub.',
    timestamp: '4h ago',
    isRead: true,
  },
  {
    id: 'notif-4',
    type: 'comment',
    fromUser: {
      id: SAMPLE_USERS[2].id,
      name: SAMPLE_USERS[2].name,
      username: SAMPLE_USERS[2].username,
      avatar: SAMPLE_USERS[2].avatar,
    },
    postId: 'post-2',
    text: 'replied: "Thank you brother! Full track dropping this Friday!"',
    timestamp: '6h ago',
    isRead: true,
  }
];

export const CATEGORIES_CONFIG = [
  { id: 'all' as const, label: 'All Buzz', icon: 'Sparkles', color: 'text-orange-600', bg: 'bg-orange-50' },
  { id: 'culture' as const, label: 'Culture & Arts', icon: 'Palette', color: 'text-amber-600', bg: 'bg-amber-50' },
  { id: 'entrepreneurship' as const, label: 'Entrepreneurship', icon: 'Rocket', color: 'text-orange-600', bg: 'bg-orange-50' },
  { id: 'business' as const, label: 'Business & Trade', icon: 'Briefcase', color: 'text-blue-600', bg: 'bg-blue-50' },
  { id: 'education' as const, label: 'Éducation', icon: 'GraduationCap', color: 'text-emerald-600', bg: 'bg-emerald-50' },
  { id: 'religion' as const, label: 'Religion & Faith', icon: 'Sun', color: 'text-yellow-600', bg: 'bg-yellow-50' },
  { id: 'sport' as const, label: 'Sport & AFCON', icon: 'Trophy', color: 'text-green-600', bg: 'bg-green-50' },
  { id: 'music' as const, label: 'Musique', icon: 'Music', color: 'text-purple-600', bg: 'bg-purple-50' },
  { id: 'news' as const, label: 'News & Headlines', icon: 'Newspaper', color: 'text-red-600', bg: 'bg-red-50' },
];

export const TRENDING_TOPICS = [
  { tag: '#IvobuzzLaunch', category: 'entrepreneurship', postsCount: '14.2k' },
  { tag: '#AbidjanTechSummit', category: 'business', postsCount: '8.7k' },
  { tag: '#Afrobeats2026', category: 'music', postsCount: '22.4k' },
  { tag: '#CultureIvoirienne', category: 'culture', postsCount: '11.8k' },
  { tag: '#ElephantsDeCI', category: 'sport', postsCount: '19.5k' },
  { tag: '#PanAfricanYouth', category: 'education', postsCount: '6.3k' },
];