import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import BlogPage from './pages/BlogPage';
import ResearchPage from './pages/ResearchPage';
import BanditPlayground from './pages/BanditPlayground';
import Footer from './components/Footer';
import CursorFollower from './components/CursorFollower';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedMode !== null) {
      setDarkMode(savedMode === 'true');
    } else if (prefersDark) {
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode.toString());
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
        <CursorFollower />
        <div className="fixed inset-0 bg-pattern pointer-events-none"></div>
        <div className="fixed inset-0 bg-grid pointer-events-none"></div>
        <div className="relative">
          <NavBar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/project/:id" element={<ProjectDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/research" element={<ResearchPage />} />
            <Route path="/bandit-playground" element={<BanditPlayground />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;