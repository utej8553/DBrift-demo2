import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, AlertCircle, CheckCircle } from 'lucide-react';
import '../styles/auth.css';

export default function SignupForm({ onSignupSuccess, onToggleLogin }) {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError('Username is required');
      return false;
    }
    if (formData.username.length < 3) {
      setError('Username must be at least 3 characters');
      return false;
    }
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email');
      return false;
    }
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password,
          creationDate: new Date().toISOString(),
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        setSuccess(true);
        setTimeout(() => {
          onSignupSuccess(userData);
        }, 1500);
      } else {
        const data = await response.json();
        setError(data.message || 'Signup failed. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please check your network.');
      console.error('Signup error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="auth-form-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="auth-form">
        <h2>Create Account</h2>
        <p className="auth-subtitle">Join DBrift and start provisioning databases instantly</p>

        <form onSubmit={handleSubmit} className="form-content">
          {/* Username */}
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <div className="input-wrapper">
              <User size={18} />
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="your_username"
                disabled={loading}
              />
            </div>
          </div>

          {/* Email */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <div className="input-wrapper">
              <Mail size={18} />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="you@example.com"
                disabled={loading}
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-wrapper">
              <Lock size={18} />
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••"
                disabled={loading}
              />
            </div>
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className="input-wrapper">
              <Lock size={18} />
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="••••••"
                disabled={loading}
              />
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              className="alert alert-error"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <AlertCircle size={18} />
              <span>{error}</span>
            </motion.div>
          )}

          {/* Success Message */}
          {success && (
            <motion.div
              className="alert alert-success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <CheckCircle size={18} />
              <span>Account created! Redirecting...</span>
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-submit"
            disabled={loading || success}
          >
            {loading ? 'Creating account...' : 'Sign Up'}
          </button>
        </form>

        {/* Toggle Login */}
        <div className="auth-toggle">
          <span>Already have an account?</span>
          <button
            type="button"
            className="toggle-link"
            onClick={onToggleLogin}
            disabled={loading}
          >
            Log In
          </button>
        </div>
      </div>
    </motion.div>
  );
}
