import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './store';
import { Layout } from './components/Layout';
import ArticleList from './pages/ArticleList';
import ArticleDetail from './pages/ArticleDetail';
import QAList from './pages/QAList';
import QADetail from './pages/QADetail';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';

// Simple Landing Page redirects to Articles for this SPA structure
const Home = () => <Navigate to="/articles" replace />;

const App: React.FC = () => {
  return (
    <AppProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/articles" element={<ArticleList />} />
            <Route path="/articles/:id" element={<ArticleDetail />} />
            <Route path="/qa" element={<QAList />} />
            <Route path="/qa/:id" element={<QADetail />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AppProvider>
  );
};

export default App;