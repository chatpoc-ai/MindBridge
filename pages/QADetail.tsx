
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useApp } from '../store';
import { generateAnswer } from '../services/geminiService';
import { MessageCircle, User, Bot, Sparkles } from 'lucide-react';

const QADetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { questions, user, t, addAnswer, getCategoryLabel } = useApp();
  const navigate = useNavigate();
  const question = questions.find(q => q.id === id);
  
  const [answerText, setAnswerText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  if (!question) return <div>Not Found</div>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!answerText.trim()) return;
    addAnswer(question.id, answerText);
    setAnswerText('');
  };

  const handleAiAnswer = async () => {
    setIsGenerating(true);
    const text = await generateAnswer(question.title, question.content);
    addAnswer(question.id, text, true);
    setIsGenerating(false);
  };

  return (
    <div className="max-w-4xl mx-auto">
       {/* Question Card */}
       <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center space-x-2 mb-4">
             <span className="bg-blue-100 text-blue-800 text-xs font-bold px-2 py-1 rounded uppercase">{getCategoryLabel(question.category)}</span>
             <span className="text-gray-400 text-sm">• {new Date(question.createdAt).toLocaleDateString()}</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{question.title}</h1>
          <p className="text-gray-700 text-lg leading-relaxed">{question.content}</p>
          
          <div className="mt-6 pt-6 border-t border-gray-100 flex justify-between items-center">
             <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"><User size={16}/></div>
                <span className="font-medium text-gray-700">{question.author}</span>
             </div>
             {/* AI Button in Question Card */}
             <button 
               onClick={handleAiAnswer}
               disabled={isGenerating}
               className="flex items-center space-x-2 text-indigo-600 hover:bg-indigo-50 px-3 py-1.5 rounded-md transition"
             >
               <Sparkles size={16} />
               <span>{isGenerating ? t.common.loading : t.common.aiAnswer}</span>
             </button>
          </div>
       </div>

       {/* Answers */}
       <div className="space-y-6">
         <h2 className="text-xl font-bold text-gray-800 px-2">{question.answers.length} {t.common.answers}</h2>
         
         {question.answers.map(ans => (
           <div key={ans.id} className={`p-6 rounded-xl border shadow-sm ${ans.isAiGenerated ? 'bg-indigo-50 border-indigo-100' : 'bg-white border-gray-200'}`}>
             <div className="flex items-center justify-between mb-4">
               <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${ans.isAiGenerated ? 'bg-indigo-200 text-indigo-700' : 'bg-gray-200 text-gray-600'}`}>
                    {ans.isAiGenerated ? <Bot size={20}/> : <User size={20} />}
                  </div>
                  <div>
                    <span className={`font-bold ${ans.isAiGenerated ? 'text-indigo-900' : 'text-gray-900'}`}>{ans.username}</span>
                    <div className="text-xs text-gray-500">{new Date(ans.createdAt).toLocaleDateString()}</div>
                  </div>
               </div>
             </div>
             <div className={`prose max-w-none ${ans.isAiGenerated ? 'text-indigo-900' : 'text-gray-800'}`}>
               <p className="whitespace-pre-wrap">{ans.content}</p>
             </div>
           </div>
         ))}
       </div>

       {/* Answer Form */}
       <div className="mt-10 bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h3 className="text-lg font-bold mb-4">{t.common.answers}</h3>
          {user ? (
            <form onSubmit={handleSubmit}>
              <textarea 
                value={answerText}
                onChange={e => setAnswerText(e.target.value)}
                className="w-full border border-gray-300 rounded-xl p-4 focus:ring-2 focus:ring-blue-500 outline-none h-32 resize-none mb-4 bg-white text-gray-900"
                placeholder="Type your solution here..."
              />
              <div className="flex justify-end">
                <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-blue-700 shadow-md transition">{t.common.submit}</button>
              </div>
            </form>
          ) : (
            <p className="text-gray-500">Please <button onClick={() => navigate('/login')} className="text-blue-600 underline">login</button> to answer.</p>
          )}
       </div>
    </div>
  );
};

export default QADetail;
