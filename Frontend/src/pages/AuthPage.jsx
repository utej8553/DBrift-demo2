import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SignupForm from '../components/SignupForm';
import LoginForm from '../components/LoginForm';
import AnimatedBackground from '../components/AnimatedBackground';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/api';
import '../styles/auth.css';

export default function AuthPage({ onAuthSuccess }) {
  const [isLogin, setIsLogin] = useState(false);
  const { login } = useAuth();

  const handleSignupSuccess = async (userData) => {
    login(userData);
    onAuthSuccess(userData);
  };

  const handleLoginSuccess = async (userData) => {
    login(userData);
    onAuthSuccess(userData);
  };

  return (
    <div className="auth-page">
      <AnimatedBackground />
      <motion.div
        className="auth-container"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {isLogin ? (
          <LoginForm
            onLoginSuccess={handleLoginSuccess}
            onToggleSignup={() => setIsLogin(false)}
          />
        ) : (
          <SignupForm
            onSignupSuccess={handleSignupSuccess}
            onToggleLogin={() => setIsLogin(true)}
          />
        )}
      </motion.div>
    </div>
  );
}
