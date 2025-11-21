
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Article, Question, Role, Category, Language, Translation, Comment, Answer } from './types';

// --- Translations ---
const en: Translation = {
  nav: { home: 'Home', articles: 'Articles', qa: 'Q&A', admin: 'Admin', login: 'Login', logout: 'Logout', profile: 'Profile' },
  common: { 
    readMore: 'Read More', likes: 'Likes', views: 'Views', comments: 'Comments', answers: 'Answers', submit: 'Submit', cancel: 'Cancel', delete: 'Delete', edit: 'Edit', category: 'Category', searchPlaceholder: 'Search topics...', loading: 'Loading...', aiSummarize: 'AI Summary', aiAnswer: 'AI Answer',
    askQuestion: 'Ask Question', askQuestionModalTitle: 'Ask a Question', titleLabel: 'Title', categoryLabel: 'Category', detailsLabel: 'Details', detailsPlaceholder: 'Describe your problem...',
    live: 'LIVE', articleSubtitle: 'Real-time insights and latest updates.', qaSubtitle: 'Ask questions, get answers from community and AI.'
  },
  auth: { 
    welcome: 'Welcome Back', 
    signInDesc: 'Sign in to your account', 
    emailPlaceholder: 'Email address', 
    passwordPlaceholder: 'Password', 
    loginBtn: 'Sign In', 
    registerBtn: 'Register', 
    switchRegister: 'Need an account? Register', 
    switchLogin: 'Have an account? Login',
    orDivider: 'Or continue with',
    googleLogin: 'Google',
    appleLogin: 'Apple',
    microsoftLogin: 'Microsoft'
  },
  categories: {
    all: 'All',
    Technology: 'Technology',
    Lifestyle: 'Lifestyle',
    Science: 'Science',
    Finance: 'Finance'
  }
};

const zh: Translation = {
  nav: { home: '首页', articles: '文章', qa: '问答', admin: '管理后台', login: '登录', logout: '退出', profile: '个人中心' },
  common: { 
    readMore: '阅读更多', likes: '点赞', views: '浏览', comments: '评论', answers: '回答', submit: '提交', cancel: '取消', delete: '删除', edit: '编辑', category: '分类', searchPlaceholder: '搜索主题...', loading: '加载中...', aiSummarize: 'AI 摘要', aiAnswer: 'AI 回答',
    askQuestion: '提问', askQuestionModalTitle: '提出问题', titleLabel: '标题', categoryLabel: '分类', detailsLabel: '详情', detailsPlaceholder: '描述您的问题...',
    live: '实时', articleSubtitle: '实时见解和最新动态。', qaSubtitle: '提问并从社区和 AI 获得解答。'
  },
  auth: { 
    welcome: '欢迎回来', 
    signInDesc: '登录您的账户', 
    emailPlaceholder: '邮箱地址', 
    passwordPlaceholder: '密码', 
    loginBtn: '登录', 
    registerBtn: '注册', 
    switchRegister: '没有账号？去注册', 
    switchLogin: '已有账号？去登录',
    orDivider: '或使用',
    googleLogin: 'Google',
    appleLogin: 'Apple',
    microsoftLogin: 'Microsoft'
  },
  categories: {
    all: '全部',
    Technology: '科技',
    Lifestyle: '生活',
    Science: '科学',
    Finance: '金融'
  }
};

const fr: Translation = {
  nav: { home: 'Accueil', articles: 'Articles', qa: 'Q&A', admin: 'Admin', login: 'Connexion', logout: 'Déconnexion', profile: 'Profil' },
  common: { 
    readMore: 'Lire la suite', likes: 'J\'aime', views: 'Vues', comments: 'Commentaires', answers: 'Réponses', submit: 'Envoyer', cancel: 'Annuler', delete: 'Supprimer', edit: 'Modifier', category: 'Catégorie', searchPlaceholder: 'Rechercher...', loading: 'Chargement...', aiSummarize: 'Résumé AI', aiAnswer: 'Réponse AI',
    askQuestion: 'Poser une question', askQuestionModalTitle: 'Poser une question', titleLabel: 'Titre', categoryLabel: 'Catégorie', detailsLabel: 'Détails', detailsPlaceholder: 'Décrivez votre problème...',
    live: 'EN DIRECT', articleSubtitle: 'Informations en temps réel et dernières mises à jour.', qaSubtitle: 'Posez des questions, obtenez des réponses de la communauté et de l\'IA.'
  },
  auth: { 
    welcome: 'Bienvenue', 
    signInDesc: 'Connectez-vous à votre compte', 
    emailPlaceholder: 'Adresse e-mail', 
    passwordPlaceholder: 'Mot de passe', 
    loginBtn: 'Connexion', 
    registerBtn: 'S\'inscrire', 
    switchRegister: 'Pas de compte ? S\'inscrire', 
    switchLogin: 'Déjà un compte ? Se connecter',
    orDivider: 'Ou continuer avec',
    googleLogin: 'Google',
    appleLogin: 'Apple',
    microsoftLogin: 'Microsoft'
  },
  categories: {
    all: 'Tout',
    Technology: 'Technologie',
    Lifestyle: 'Style de vie',
    Science: 'Science',
    Finance: 'Finance'
  }
};

// --- Dynamic Mock Data Generators ---

const generateArticles = (lang: Language): Article[] => {
  const templates = {
    en: [
      { t: "Breaking: AI Model Achieves Consciousness?", s: "Researchers are baffled by the latest outputs from the Gemini-4 prototype.", c: Category.TECH },
      { t: "Market Watch: Tech Stocks Rally", s: "Global indices hit record highs as tech sector surges.", c: Category.FINANCE },
      { t: "New Mars Rover Sends First Images", s: "Stunning high-res panoramas from the red planet's equator.", c: Category.SCIENCE },
      { t: "Minimalist Living: A 2024 Guide", s: "How to declutter your mind and home in the digital age.", c: Category.LIFESTYLE },
      { t: "WebAssembly: The Next Big Thing?", s: "Why browser performance is about to skyrocket.", c: Category.TECH },
      { t: "Crypto Regulation Talks Heat Up", s: "Governments worldwide are gathering to discuss decentralized finance.", c: Category.FINANCE },
    ],
    zh: [
      { t: "突发新闻：AI 模型产生自我意识？", s: "研究人员对 Gemini-4 原型机的最新输出感到困惑。", c: Category.TECH },
      { t: "市场观察：科技股全面反弹", s: "随着科技板块飙升，全球指数创下历史新高。", c: Category.FINANCE },
      { t: "新火星探测器传回首批图像", s: "来自红色星球赤道的惊人高分辨率全景图。", c: Category.SCIENCE },
      { t: "极简生活：2024 年指南", s: "如何在数字时代清理你的思想和家园。", c: Category.LIFESTYLE },
      { t: "WebAssembly：下一个大事件？", s: "为什么浏览器性能即将飙升。", c: Category.TECH },
      { t: "加密货币监管谈判升温", s: "各国政府正聚集讨论去中心化金融。", c: Category.FINANCE },
    ],
    fr: [
      { t: "Dernière heure : L'IA devient consciente ?", s: "Les chercheurs sont perplexes face aux dernières données du prototype Gemini-4.", c: Category.TECH },
      { t: "Marchés : Rebond des valeurs tech", s: "Les indices mondiaux atteignent des records alors que le secteur technologique s'envole.", c: Category.FINANCE },
      { t: "Le nouveau rover martien envoie des images", s: "Des panoramas haute résolution époustouflants de l'équateur de la planète rouge.", c: Category.SCIENCE },
      { t: "Vie minimaliste : Le guide 2024", s: "Comment désencombrer votre esprit et votre maison à l'ère numérique.", c: Category.LIFESTYLE },
      { t: "WebAssembly : La prochaine révolution ?", s: "Pourquoi les performances des navigateurs vont monter en flèche.", c: Category.TECH },
      { t: "Régulation des cryptos : Les débats s'intensifient", s: "Les gouvernements du monde entier se réunissent pour discuter de la finance décentralisée.", c: Category.FINANCE },
    ]
  };

  const langTemplates = templates[lang];

  return Array.from({ length: 12 }).map((_, i) => {
    const template = langTemplates[i % langTemplates.length];
    const date = new Date();
    // Generate staggered recent times: 10 mins ago, 1 hour ago, 3 hours ago...
    date.setMinutes(date.getMinutes() - (i * 45 + 5)); 
    
    return {
      id: `art-${i}`,
      title: i > 5 ? `${template.t} (Analysis)` : template.t, // Add variety
      summary: template.s,
      content: `<p>${template.s}</p><br/><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>`,
      author: i % 2 === 0 ? 'NewsDesk_Bot' : 'Tech_Reporter',
      category: template.c,
      coverImage: `https://picsum.photos/800/600?random=${i + 200}`,
      likes: Math.floor(Math.random() * 500) + 50,
      views: Math.floor(Math.random() * 5000) + 500,
      createdAt: date.toISOString(),
      comments: []
    };
  });
};

const generateQuestions = (lang: Language): Question[] => {
  const contents = {
    en: { title: 'How do I fix error', desc: 'I have been trying to debug this issue for hours.', ans: 'Check your configuration files.' },
    zh: { title: '如何解决错误', desc: '我花了好几个小时试图调试这个问题。', ans: '检查你的配置文件。' },
    fr: { title: 'Comment corriger l\'erreur', desc: 'J\'essaie de déboguer ce problème depuis des heures.', ans: 'Vérifiez vos fichiers de configuration.' }
  };
  
  const content = contents[lang];
  const catKeys = Object.values(Category);

  return Array.from({ length: 8 }).map((_, i) => {
    const date = new Date();
    date.setHours(date.getHours() - (i * 2 + 1));

    return {
      id: `q-${i}`,
      title: `${content.title} #${i + 100}?`,
      content: content.desc,
      author: 'User_' + i,
      category: catKeys[i % catKeys.length],
      answers: [
        {
          id: `ans-${i}-1`,
          userId: 'expert_1',
          username: 'CodeMaster',
          content: content.ans,
          likes: 5,
          createdAt: new Date().toISOString()
        }
      ],
      views: 45 + i,
      createdAt: date.toISOString(),
      solved: i % 3 === 0
    }
  });
};

// --- Context Definition ---
interface AppState {
  user: User | null;
  lang: Language;
  articles: Article[];
  questions: Question[];
  t: Translation;
}

interface AppContextType extends AppState {
  login: (email: string) => void;
  logout: () => void;
  setLang: (lang: Language) => void;
  toggleLikeArticle: (id: string) => void;
  addComment: (articleId: string, content: string) => void;
  addQuestion: (title: string, content: string, category: Category) => void;
  addAnswer: (questionId: string, content: string, isAi?: boolean) => void;
  deleteArticle: (id: string) => void;
  deleteQuestion: (id: string) => void;
  getCategoryLabel: (cat: Category | string) => string;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [lang, setLangState] = useState<Language>('zh');
  
  // Initialize with data based on default language
  const [articles, setArticles] = useState<Article[]>(generateArticles('zh'));
  const [questions, setQuestions] = useState<Question[]>(generateQuestions('zh'));

  const t = lang === 'en' ? en : (lang === 'fr' ? fr : zh);

  // Update data when language changes
  useEffect(() => {
    setArticles(generateArticles(lang));
    setQuestions(generateQuestions(lang));
  }, [lang]);

  const login = (email: string) => {
    const role = email.includes('admin') ? Role.ADMIN : Role.USER;
    setUser({
      id: 'u-current',
      username: email.split('@')[0],
      email,
      role,
      avatar: `https://ui-avatars.com/api/?name=${email}&background=0D8ABC&color=fff`
    });
  };

  const logout = () => setUser(null);
  const setLang = (l: Language) => setLangState(l);

  const toggleLikeArticle = (id: string) => {
    setArticles(prev => prev.map(a => a.id === id ? { ...a, likes: a.likes + 1 } : a));
  };

  const addComment = (articleId: string, content: string) => {
    if (!user) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      userId: user.id,
      username: user.username,
      content,
      createdAt: new Date().toISOString()
    };
    setArticles(prev => prev.map(a => a.id === articleId ? { ...a, comments: [...a.comments, newComment] } : a));
  };

  const addQuestion = (title: string, content: string, category: Category) => {
    if (!user) return;
    const newQ: Question = {
      id: Date.now().toString(),
      title,
      content,
      author: user.username,
      category,
      answers: [],
      views: 0,
      createdAt: new Date().toISOString(),
      solved: false
    };
    setQuestions([newQ, ...questions]);
  };

  const addAnswer = (questionId: string, content: string, isAi = false) => {
    const newAns: Answer = {
      id: Date.now().toString(),
      userId: isAi ? 'ai-bot' : (user?.id || 'anon'),
      username: isAi ? 'Gemini AI' : (user?.username || 'Guest'),
      content,
      likes: 0,
      createdAt: new Date().toISOString(),
      isAiGenerated: isAi
    };
    setQuestions(prev => prev.map(q => q.id === questionId ? { ...q, answers: [...q.answers, newAns] } : q));
  };

  const deleteArticle = (id: string) => setArticles(prev => prev.filter(a => a.id !== id));
  const deleteQuestion = (id: string) => setQuestions(prev => prev.filter(q => q.id !== id));

  const getCategoryLabel = (cat: Category | string): string => {
    if (cat === 'All') return t.categories.all;
    return t.categories[cat as keyof typeof t.categories] || cat;
  };

  return (
    <AppContext.Provider value={{ 
      user, lang, articles, questions, t,
      login, logout, setLang, toggleLikeArticle, addComment, addQuestion, addAnswer, deleteArticle, deleteQuestion, getCategoryLabel
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
