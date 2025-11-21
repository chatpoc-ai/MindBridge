
export enum Role {
  USER = 'user',
  ADMIN = 'admin'
}

export enum Category {
  TECH = 'Technology',
  LIFESTYLE = 'Lifestyle',
  SCIENCE = 'Science',
  FINANCE = 'Finance'
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
  avatar: string;
}

export interface Comment {
  id: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
}

export interface Article {
  id: string;
  title: string;
  summary: string;
  content: string; // HTML or Markdown string
  author: string;
  category: Category;
  coverImage: string;
  likes: number;
  views: number;
  createdAt: string;
  comments: Comment[];
}

export interface Answer {
  id: string;
  userId: string;
  username: string;
  content: string;
  likes: number;
  createdAt: string;
  isAiGenerated?: boolean;
}

export interface Question {
  id: string;
  title: string;
  content: string;
  author: string;
  category: Category;
  answers: Answer[];
  views: number;
  createdAt: string;
  solved: boolean;
}

export type Language = 'zh' | 'en' | 'fr';

export interface Translation {
  nav: {
    home: string;
    articles: string;
    qa: string;
    admin: string;
    login: string;
    logout: string;
    profile: string;
  };
  common: {
    readMore: string;
    likes: string;
    views: string;
    comments: string;
    answers: string;
    submit: string;
    cancel: string;
    delete: string;
    edit: string;
    category: string;
    searchPlaceholder: string;
    loading: string;
    aiSummarize: string;
    aiAnswer: string;
    askQuestion: string;
    askQuestionModalTitle: string;
    titleLabel: string;
    categoryLabel: string;
    detailsLabel: string;
    detailsPlaceholder: string;
  };
  auth: {
    welcome: string;
    signInDesc: string;
    emailPlaceholder: string;
    passwordPlaceholder: string;
    loginBtn: string;
    registerBtn: string;
    switchRegister: string;
    switchLogin: string;
    orDivider: string;
    googleLogin: string;
    appleLogin: string;
    microsoftLogin: string;
  };
  categories: {
    all: string;
    Technology: string;
    Lifestyle: string;
    Science: string;
    Finance: string;
  };
}
