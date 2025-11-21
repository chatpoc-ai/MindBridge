
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../store';
import { Category } from '../types';
import { Clock, Eye, ThumbsUp, Filter, ChevronRight, Zap } from 'lucide-react';

const ArticleList: React.FC = () => {
  const { articles, t, getCategoryLabel, lang } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const categories = ['All', ...Object.values(Category)];

  const filteredArticles = selectedCategory === 'All' 
    ? articles 
    : articles.filter(a => a.category === selectedCategory);

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const currentArticles = filteredArticles.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));

    if (diffMins < 60) {
      return lang === 'zh' ? `${diffMins} 分钟前` : (lang === 'fr' ? `il y a ${diffMins} min` : `${diffMins} mins ago`);
    }
    if (diffHrs < 24) {
      return lang === 'zh' ? `${diffHrs} 小时前` : (lang === 'fr' ? `il y a ${diffHrs} h` : `${diffHrs} hours ago`);
    }
    return date.toLocaleDateString();
  };

  const isNew = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    // Consider "New" if within 3 hours
    return (now.getTime() - date.getTime()) < (1000 * 60 * 60 * 3);
  };

  return (
    <div className="space-y-8">
      {/* Header & Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight flex items-center">
            {t.nav.articles}
            <span className="ml-3 px-2 py-1 bg-red-500 text-white text-xs font-bold rounded-md animate-pulse flex items-center">
              <Zap size={12} className="mr-1" /> LIVE
            </span>
          </h1>
          <p className="text-gray-500 mt-1">Real-time insights and latest updates.</p>
        </div>
        
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 hide-scrollbar">
          <Filter size={20} className="text-gray-400 flex-shrink-0" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { setSelectedCategory(cat); setCurrentPage(1); }}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === cat 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {getCategoryLabel(cat)}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {currentArticles.map(article => (
          <div key={article.id} className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col overflow-hidden relative">
            
            {/* New Badge */}
            {isNew(article.createdAt) && (
              <div className="absolute top-4 right-4 z-10 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded shadow-sm animate-bounce">
                NEW
              </div>
            )}

            <div className="relative h-48 overflow-hidden">
               <img 
                 src={article.coverImage} 
                 alt={article.title} 
                 className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" 
               />
               <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-blue-600 shadow-sm uppercase tracking-wide">
                 {getCategoryLabel(article.category)}
               </div>
            </div>
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex items-center text-gray-400 text-xs mb-3 space-x-4">
                <span className={`flex items-center font-medium ${isNew(article.createdAt) ? 'text-green-600' : ''}`}>
                  <Clock size={14} className="mr-1"/> {formatTimeAgo(article.createdAt)}
                </span>
                <span className="flex items-center"><Eye size={14} className="mr-1"/> {article.views}</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                <Link to={`/articles/${article.id}`}>{article.title}</Link>
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                {article.summary}
              </p>
              
              <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                   <ThumbsUp size={16} className="text-blue-500" />
                   <span>{article.likes}</span>
                </div>
                <Link 
                  to={`/articles/${article.id}`}
                  className="flex items-center text-blue-600 font-semibold text-sm hover:text-blue-800 transition"
                >
                  {t.common.readMore} <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-12">
          <nav className="flex items-center space-x-2">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx + 1)}
                className={`w-10 h-10 flex items-center justify-center rounded-lg font-medium transition-colors ${
                  currentPage === idx + 1
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
};

export default ArticleList;
