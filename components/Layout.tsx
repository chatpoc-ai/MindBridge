import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../store';
import { Menu, X, Globe, User as UserIcon, LogOut } from 'lucide-react';

const Navbar: React.FC = () => {
  const { t, user, logout, lang, setLang } = useApp();
  const [isOpen, setIsOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? "text-blue-600 font-semibold" : "text-gray-600 hover:text-blue-600";

  const toggleLanguage = () => {
    if (lang === 'zh') setLang('en');
    else if (lang === 'en') setLang('fr');
    else setLang('zh');
  };

  const getNextLangLabel = () => {
    if (lang === 'zh') return 'English';
    if (lang === 'en') return 'Français';
    return '中文';
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center cursor-pointer">
            <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              MindBridge
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link to="/" className={isActive('/')}>{t.nav.home}</Link>
            <Link to="/articles" className={isActive('/articles')}>{t.nav.articles}</Link>
            <Link to="/qa" className={isActive('/qa')}>{t.nav.qa}</Link>
            {user?.role === 'admin' && (
              <Link to="/admin" className={isActive('/admin')}>{t.nav.admin}</Link>
            )}
          </div>

          {/* Right Side Controls */}
          <div className="hidden md:flex items-center space-x-4">
            <button 
              onClick={toggleLanguage}
              className="p-2 text-gray-500 hover:bg-gray-100 rounded-full transition"
              title="Switch Language"
            >
              <div className="flex items-center text-sm font-medium">
                <Globe size={18} className="mr-1" /> {lang.toUpperCase()}
              </div>
            </button>

            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full" />
                  <span className="text-sm font-medium text-gray-700">{user.username}</span>
                </div>
                <button onClick={logout} className="text-gray-500 hover:text-red-600 transition">
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <Link to="/login" className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition shadow-md hover:shadow-lg">
                {t.nav.login}
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-500 hover:text-gray-700">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-gray-200">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">{t.nav.home}</Link>
            <Link to="/articles" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">{t.nav.articles}</Link>
            <Link to="/qa" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">{t.nav.qa}</Link>
            {user?.role === 'admin' && (
               <Link to="/admin" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-50">{t.nav.admin}</Link>
            )}
            <div className="border-t border-gray-200 pt-4 pb-3">
              <div className="flex items-center px-5">
                 <button onClick={toggleLanguage} className="flex items-center text-gray-600">
                   <Globe size={18} className="mr-2"/> {getNextLangLabel()}
                 </button>
              </div>
              <div className="mt-3 px-2">
                {user ? (
                  <button onClick={logout} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-50">{t.nav.logout}</button>
                ) : (
                  <Link to="/login" className="block w-full text-center px-3 py-2 rounded-md text-base font-medium bg-blue-600 text-white">{t.nav.login}</Link>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm">
            &copy; 2024 MindBridge. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-400 hover:text-gray-500">Privacy Policy</a>
            <a href="#" className="text-gray-400 hover:text-gray-500">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};