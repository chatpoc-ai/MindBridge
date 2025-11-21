
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../store';
import { Mail, Lock, ArrowRight } from 'lucide-react';

const Login: React.FC = () => {
  const { login, t } = useApp();
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate auth
    if(email && password) {
        login(email);
        navigate('/');
    }
  };

  const handleSocialLogin = (provider: string) => {
    let mockEmail = '';
    switch(provider) {
        case 'google': mockEmail = 'user@gmail.com'; break;
        case 'apple': mockEmail = 'user@icloud.com'; break;
        case 'microsoft': mockEmail = 'user@outlook.com'; break;
        default: mockEmail = 'user@example.com';
    }
    login(mockEmail);
    navigate('/');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-gray-100">
        <div className="text-center mb-8">
           <h2 className="text-3xl font-bold text-gray-900 mb-2">{isRegister ? t.auth.registerBtn : t.auth.welcome}</h2>
           <p className="text-gray-500">{t.auth.signInDesc}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white text-gray-900"
                placeholder={t.auth.emailPlaceholder}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition bg-white text-gray-900"
                placeholder={t.auth.passwordPlaceholder}
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition"
          >
            {isRegister ? t.auth.registerBtn : t.auth.loginBtn} <ArrowRight size={16} className="ml-2"/>
          </button>
        </form>

        {/* Social Login Divider */}
        <div className="mt-6">
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">{t.auth.orDivider}</span>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-3 gap-3">
            {/* Google */}
            <button 
              onClick={() => handleSocialLogin('google')}
              className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition"
              aria-label={t.auth.googleLogin}
              title={t.auth.googleLogin}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
            </button>

            {/* Apple */}
            <button 
              onClick={() => handleSocialLogin('apple')}
              className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-black hover:bg-gray-800 transition"
              aria-label={t.auth.appleLogin}
              title={t.auth.appleLogin}
            >
              <svg className="h-5 w-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-.96-.4-2.02-.38-3.05.38-1.01.77-2.1.72-3.06-.34-2.1-2.3-2.87-6.75-.31-8.96C8.79 10.79 10.1 10.8 11 12.09c.9-1.26 2.39-1.29 3.68-.39.11.08.21.17.3.26.07-.11.13-.23.19-.36.94-2.17-.51-3.76-.56-3.81 2.25.66 3.49 2.37 3.71 3.36.09.41.14.84.14 1.27 0 3.28-1.63 5.73-3.41 7.86zM12.03 7.25c-.15-2.23 1.65-4.09 3.75-4.25.27 2.51-2.14 4.38-3.75 4.25z"/>
              </svg>
            </button>

            {/* Microsoft */}
            <button 
              onClick={() => handleSocialLogin('microsoft')}
              className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white hover:bg-gray-50 transition"
              aria-label={t.auth.microsoftLogin}
              title={t.auth.microsoftLogin}
            >
              <svg className="h-5 w-5" viewBox="0 0 23 23">
                <path fill="#f25022" d="M1 1h10v10H1z"/>
                <path fill="#00a4ef" d="M1 12h10v10H1z"/>
                <path fill="#7fba00" d="M12 1h10v10H12z"/>
                <path fill="#ffb900" d="M12 12h10v10H12z"/>
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-6 text-center">
           <button 
             onClick={() => setIsRegister(!isRegister)}
             className="text-sm text-blue-600 hover:text-blue-800 font-medium transition"
           >
             {isRegister ? t.auth.switchLogin : t.auth.switchRegister}
           </button>
           <div className="mt-4 text-xs text-gray-400 bg-gray-50 p-2 rounded border border-gray-200">
             Hint: Use <b>admin@test.com</b> to access Admin Dashboard.
           </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
