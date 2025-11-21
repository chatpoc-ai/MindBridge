
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../store';
import { generateSummary } from '../services/geminiService';
import { ThumbsUp, MessageSquare, Share2, Sparkles, User } from 'lucide-react';

const ArticleDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { articles, t, user, toggleLikeArticle, addComment, getCategoryLabel } = useApp();
  const navigate = useNavigate();
  
  const article = articles.find(a => a.id === id);
  
  const [commentText, setCommentText] = useState('');
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isSummarizing, setIsSummarizing] = useState(false);

  if (!article) {
    return <div className="text-center py-20 text-gray-500">Article not found</div>;
  }

  const handleSummary = async () => {
    setIsSummarizing(true);
    const summary = await generateSummary(article.content + " " + article.summary);
    setAiSummary(summary);
    setIsSummarizing(false);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    addComment(article.id, commentText);
    setCommentText('');
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Hero Image */}
      <div className="relative h-64 md:h-96 w-full rounded-2xl overflow-hidden shadow-lg mb-8">
        <img src={article.coverImage} alt={article.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-8">
           <div>
             <span className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded mb-3 inline-block">{getCategoryLabel(article.category)}</span>
             <h1 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">{article.title}</h1>
             <div className="flex items-center text-gray-200 text-sm space-x-4">
               <span>By {article.author}</span>
               <span>•</span>
               <span>{new Date(article.createdAt).toDateString()}</span>
             </div>
           </div>
        </div>
      </div>

      {/* AI Action Bar */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={handleSummary}
          disabled={isSummarizing}
          className="flex items-center space-x-2 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-colors border border-indigo-200"
        >
          <Sparkles size={18} />
          <span>{isSummarizing ? t.common.loading : t.common.aiSummarize}</span>
        </button>
        <div className="flex space-x-3">
           <button 
            onClick={() => toggleLikeArticle(article.id)}
            className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 bg-white border border-gray-200 px-4 py-2 rounded-lg shadow-sm transition"
           >
             <ThumbsUp size={18} className={article.likes > 0 ? "text-blue-500" : ""} />
             <span>{article.likes}</span>
           </button>
        </div>
      </div>

      {/* AI Summary Result */}
      {aiSummary && (
        <div className="bg-indigo-50 border-l-4 border-indigo-500 p-6 rounded-r-lg mb-8 animate-fade-in">
          <h4 className="font-bold text-indigo-900 mb-2 flex items-center"><Sparkles size={16} className="mr-2"/> AI Summary</h4>
          <p className="text-indigo-800 leading-relaxed">{aiSummary}</p>
        </div>
      )}

      {/* Content */}
      <div className="prose prose-lg max-w-none text-gray-800 bg-white p-8 rounded-2xl shadow-sm mb-10 border border-gray-100">
         <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </div>

      {/* Comments Section */}
      <div className="bg-white p-6 md:p-8 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-2xl font-bold mb-6 flex items-center">
          <MessageSquare className="mr-2" /> {t.common.comments} ({article.comments.length})
        </h3>

        {/* Comment List */}
        <div className="space-y-6 mb-8">
          {article.comments.map(comment => (
            <div key={comment.id} className="flex space-x-4 pb-6 border-b border-gray-100 last:border-0">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 flex-shrink-0">
                <User size={20} />
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-1">
                  <span className="font-bold text-gray-900">{comment.username}</span>
                  <span className="text-xs text-gray-400">{new Date(comment.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-700">{comment.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Comment Form */}
        {user ? (
          <form onSubmit={handleSubmitComment} className="mt-4">
            <textarea
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Add a comment..."
              className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none transition bg-white text-gray-900"
              rows={3}
            />
            <div className="mt-3 flex justify-end">
              <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
                {t.common.submit}
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-gray-50 p-4 rounded-lg text-center text-gray-600">
            Please <span className="text-blue-600 cursor-pointer underline" onClick={() => navigate('/login')}>login</span> to comment.
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleDetail;
