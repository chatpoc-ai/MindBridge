import React, { useState } from 'react';
import { useApp } from '../store';
import { Role } from '../types';
import { Trash2, FileText, MessageCircle } from 'lucide-react';

const AdminDashboard: React.FC = () => {
  const { user, articles, questions, deleteArticle, deleteQuestion } = useApp();
  const [activeTab, setActiveTab] = useState<'articles' | 'questions'>('articles');

  if (!user || user.role !== Role.ADMIN) {
    return <div className="text-center py-20 text-red-500 font-bold text-xl">Access Denied: Admins Only</div>;
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
        <p className="text-gray-500">Manage platform content.</p>
      </div>

      <div className="bg-white rounded-2xl shadow border border-gray-200 overflow-hidden min-h-[500px]">
        <div className="flex border-b border-gray-200">
           <button 
             onClick={() => setActiveTab('articles')}
             className={`flex-1 py-4 text-center font-medium transition ${activeTab === 'articles' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
           >
             <div className="flex items-center justify-center gap-2"><FileText size={18}/> Articles ({articles.length})</div>
           </button>
           <button 
             onClick={() => setActiveTab('questions')}
             className={`flex-1 py-4 text-center font-medium transition ${activeTab === 'questions' ? 'bg-blue-50 text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:bg-gray-50'}`}
           >
              <div className="flex items-center justify-center gap-2"><MessageCircle size={18}/> Questions ({questions.length})</div>
           </button>
        </div>

        <div className="p-6">
          {activeTab === 'articles' ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="p-4">Title</th>
                    <th className="p-4">Author</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Date</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {articles.map(art => (
                    <tr key={art.id} className="hover:bg-gray-50 transition">
                      <td className="p-4 font-medium text-gray-900">{art.title}</td>
                      <td className="p-4 text-gray-600">{art.author}</td>
                      <td className="p-4"><span className="bg-gray-100 px-2 py-1 rounded text-xs">{art.category}</span></td>
                      <td className="p-4 text-gray-500 text-sm">{new Date(art.createdAt).toLocaleDateString()}</td>
                      <td className="p-4 text-right">
                        <button onClick={() => deleteArticle(art.id)} className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-600 uppercase text-xs tracking-wider">
                  <tr>
                    <th className="p-4">Title</th>
                    <th className="p-4">Author</th>
                    <th className="p-4">Status</th>
                    <th className="p-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {questions.map(q => (
                    <tr key={q.id} className="hover:bg-gray-50 transition">
                      <td className="p-4 font-medium text-gray-900 max-w-md truncate">{q.title}</td>
                      <td className="p-4 text-gray-600">{q.author}</td>
                      <td className="p-4">
                        <span className={`px-2 py-1 rounded text-xs ${q.solved ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                          {q.solved ? 'Solved' : 'Open'}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <button onClick={() => deleteQuestion(q.id)} className="text-red-500 hover:text-red-700 p-2 rounded-full hover:bg-red-50 transition">
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;