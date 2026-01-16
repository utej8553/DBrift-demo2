import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import '../styles/auth.css';

export default function LoginForm({ onLoginSuccess, onToggleSignup }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
      setError('Please enter a valid email');
      return false;
    }
    if (!formData.password) {
      setError('Password is required');
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
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (response.ok) {
        const userData = await response.json();
        setSuccess(true);
        setTimeout(() => {
          onLoginSuccess(userData);
        }, 1000);
      } else {
        const data = await response.json();
        if (response.status === 401) {
          setError(data.message || 'Invalid email or password');
        } else {
          setError(data.message || 'Login failed. Please try again.');
        }
      }
    } catch (err) {
      setError('Connection error. Please check your network.');
      console.error('Login error:', err);
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
        <h2>Welcome Back</h2>
        <p className="auth-subtitle">Log in to manage your databases</p>

        <form onSubmit={handleSubmit} className="form-content">
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
              <span>Login successful! Redirecting...</span>
            </motion.div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn-submit"
            disabled={loading || success}
          >
            {loading ? 'Logging in...' : 'Log In'}
          </button>
        </form>

        {/* Toggle Signup */}
        <div className="auth-toggle">
          <span>Don't have an account?</span>
          <button
            type="button"
            className="toggle-link"
            onClick={onToggleSignup}
            disabled={loading}
          >
            Sign Up
          </button>
        </div>
      </div>
    </motion.div>
  );
}
