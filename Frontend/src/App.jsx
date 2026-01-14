import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import './styles/global.css';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('landing');
  const { user } = useAuth();

  const handleGetStarted = () => {
    // If user is logged in, go to dashboard, otherwise go to auth
    if (user) {
      setCurrentPage('dashboard');
    } else {
      setCurrentPage('auth');
    }
  };

  const handleAuthSuccess = () => {
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentPage('landing');
  };

  return (
    <motion.div
      key={currentPage}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      {currentPage === 'landing' && (
        <LandingPage onNavigate={handleGetStarted} />
      )}
      {currentPage === 'auth' && (
        <AuthPage onAuthSuccess={handleAuthSuccess} />
      )}
      {currentPage === 'dashboard' && (
        <DashboardPage onNavigate={handleLogout} />
      )}
    </motion.div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
