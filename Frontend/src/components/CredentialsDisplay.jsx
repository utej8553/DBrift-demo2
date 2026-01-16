import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Eye, EyeOff, CheckCircle } from 'lucide-react';
import '../styles/credentials.css';

export default function CredentialsDisplay({ credentials, onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const generateConnectionString = () => {
    const { username, password, port, dbName } = credentials;
    const host = window.location.hostname || 'localhost';
    return `postgresql://${username}:${password}@${host}:${port}/${dbName}`;
  };

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const connectionString = generateConnectionString();

  return (
    <motion.div
      className="credentials-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className="credentials-modal"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="credentials-header">
          <div className="credentials-header-content">
            <CheckCircle className="success-icon" size={28} />
            <div>
              <h2>Database Created Successfully</h2>
              <p>Your {credentials.dbType} database is ready to use</p>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
        </div>

        {/* Credentials List */}
        <div className="credentials-list">
          {/* Database Name */}
          <div className="credential-item">
            <label>Database Name</label>
            <div className="credential-display">
              <span>{credentials.dbName}</span>
              <button
                className="copy-btn"
                onClick={() => handleCopy(credentials.dbName, 'dbName')}
              >
                <Copy size={16} />
                {copiedField === 'dbName' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Host */}
          <div className="credential-item">
            <label>Host</label>
            <div className="credential-display">
              <span>{window.location.hostname || 'localhost'}</span>
              <button
                className="copy-btn"
                onClick={() =>
                  handleCopy(window.location.hostname || 'localhost', 'host')
                }
              >
                <Copy size={16} />
                {copiedField === 'host' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Port */}
          <div className="credential-item">
            <label>Port</label>
            <div className="credential-display">
              <span>{credentials.port}</span>
              <button
                className="copy-btn"
                onClick={() => handleCopy(credentials.port, 'port')}
              >
                <Copy size={16} />
                {copiedField === 'port' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Username */}
          <div className="credential-item">
            <label>Username</label>
            <div className="credential-display">
              <span>{credentials.username}</span>
              <button
                className="copy-btn"
                onClick={() => handleCopy(credentials.username, 'username')}
              >
                <Copy size={16} />
                {copiedField === 'username' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Password */}
          <div className="credential-item">
            <label>Password</label>
            <div className="credential-display">
              <span>{showPassword ? credentials.password : '••••••••'}</span>
              <button
                className="visibility-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
              <button
                className="copy-btn"
                onClick={() => handleCopy(credentials.password, 'password')}
              >
                <Copy size={16} />
                {copiedField === 'password' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>

          {/* Connection String */}
          <div className="credential-item full-width">
            <label>Connection String</label>
            <div className="credential-display">
              <span className="connection-string">{connectionString}</span>
              <button
                className="copy-btn"
                onClick={() => handleCopy(connectionString, 'connString')}
              >
                <Copy size={16} />
                {copiedField === 'connString' ? 'Copied!' : 'Copy'}
              </button>
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="credentials-info">
          <p>
            💡 Save these credentials in a secure location. You won't see the
            password again. Use the connection string in your application to
            connect to the database.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="credentials-actions">
          <button className="btn-secondary" onClick={onClose}>
            Done
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
