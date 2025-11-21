
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../store';
import { Category } from '../types';
import { MessageCircle, CheckCircle, Plus, Search } from 'lucide-react';

const QAList: React.FC = () => {
  const { questions, user, t, addQuestion, getCategoryLabel } = useApp();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState(Category.TECH);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    addQuestion(newTitle, newContent, newCategory);
    setIsModalOpen(false);
    setNewTitle('');
    setNewContent('');
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t.nav.qa}</h1>
          <p className="text-gray-500 mt-1">Ask questions, get answers from community and AI.</p>
        </div>
        {user && (
          <button 
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center shadow-sm transition"
          >
            <Plus size={18} className="mr-2" /> {t.common.askQuestion}
          </button>
        )}
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {questions.map(q => (
          <div key={q.id} className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 hover:border-blue-300 transition cursor-pointer group relative">
             <Link to={`/qa/${q.id}`} className="block">
                <div className="flex justify-between items-start">
                   <div className="flex-grow pr-4">
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 transition-colors mb-2">{q.title}</h3>
                      <p className="text-gray-600 text-sm line-clamp-2 mb-3">{q.content}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-500">
                         <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded">{getCategoryLabel(q.category)}</span>
                         <span>{new Date(q.createdAt).toLocaleDateString()}</span>
                         <span>{q.author}</span>
                      </div>
                   </div>
                   <div className="flex flex-col items-center space-y-2 min-w-[60px]">
                      <div className="flex flex-col items-center p-2 rounded-lg bg-blue-50 text-blue-700">
                         <span className="font-bold text-lg">{q.answers.length}</span>
                         <span className="text-xs">{t.common.answers}</span>
                      </div>
                      {q.solved && <CheckCircle size={20} className="text-green-500" />}
                   </div>
                </div>
             </Link>
          </div>
        ))}
      </div>

      {/* Ask Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-lg w-full shadow-2xl">
            <h2 className="text-2xl font-bold mb-6">{t.common.askQuestionModalTitle}</h2>
            <form onSubmit={handleCreate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.common.titleLabel}</label>
                <input 
                  required
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none bg-white text-gray-900"
                  placeholder="e.g. How to configure Webpack?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.common.categoryLabel}</label>
                <select 
                  value={newCategory}
                  onChange={e => setNewCategory(e.target.value as Category)}
                  className="w-full border border-gray-300 rounded-lg p-3 outline-none bg-white text-gray-900"
                >
                  {Object.values(Category).map(c => <option key={c} value={c}>{getCategoryLabel(c)}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">{t.common.detailsLabel}</label>
                <textarea 
                  required
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none h-32 resize-none bg-white text-gray-900"
                  placeholder={t.common.detailsPlaceholder}
                />
              </div>
              <div className="flex justify-end space-x-3 mt-6">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition"
                >
                  {t.common.cancel}
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition shadow-md"
                >
                  {t.common.submit}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default QAList;
