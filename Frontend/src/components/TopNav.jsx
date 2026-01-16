import React, { useState } from 'react';
import { User, LogOut, Settings, ChevronDown } from 'lucide-react';
import { motion } from 'framer-motion';
import '../styles/topnav.css';

export default function TopNav({ user, onLogout }) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    setShowUserMenu(false);
    onLogout();
  };

  const getUserInitials = (username) => {
    return username
      .split(' ')
      .map((part) => part[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <nav className="top-nav">
      <div className="nav-content">
        <div className="nav-brand">
          <div className="brand-icon">◆</div>
          <h2>DBrift</h2>
        </div>

        <div className="nav-links">
          <a href="#" className="nav-link active">
            Dashboard
          </a>
        </div>

        <div className="nav-actions">
          <button className="btn-ghost nav-btn">
            <Settings size={20} />
          </button>

          {/* User Menu */}
          <div className="user-menu-container">
            <button
              className="user-menu-btn"
              onClick={() => setShowUserMenu(!showUserMenu)}
            >
              <div className="user-avatar">{getUserInitials(user?.username || 'U')}</div>
              <span className="username">{user?.username}</span>
              <ChevronDown size={16} />
            </button>

            {/* Dropdown Menu */}
            {showUserMenu && (
              <motion.div
                className="user-dropdown"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="dropdown-item user-info">
                  <div className="avatar-large">
                    {getUserInitials(user?.username || 'U')}
                  </div>
                  <div>
                    <p className="username">{user?.username}</p>
                    <p className="email">{user?.email}</p>
                  </div>
                </div>
                <div className="dropdown-divider" />
                <button
                  className="dropdown-item logout-btn"
                  onClick={handleLogout}
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
