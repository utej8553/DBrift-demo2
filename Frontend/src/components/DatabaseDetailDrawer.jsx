import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Copy, RotateCcw, Trash2, Eye } from 'lucide-react';
import '../styles/detail-drawer.css';

export default function DatabaseDetailDrawer({ database, onClose, onDelete }) {
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const handleCopyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const credentials = {
    host: 'db.demo.app',
    port: 5432,
    username: `user_${Math.random().toString(36).slice(2, 7)}`,
    password: Math.random().toString(36).slice(-12),
    schema: `schema_${Math.random().toString(36).slice(2, 7)}`,
  };

  return (
    <>
      <motion.div
        className="drawer-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      />

      <motion.div
        className="detail-drawer"
        initial={{ x: 400, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: 400, opacity: 0 }}
        transition={{ duration: 0.3, ease: 'easeOut' }}
      >
        <div className="drawer-header">
          <h2>{database.name}</h2>
          <button className="btn-ghost close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Database Info Section */}
        <div className="drawer-section">
          <h3>Database Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Type</label>
              <p>{database.type}</p>
            </div>
            <div className="info-item">
              <label>Region</label>
              <p>
                {database.region === 'us-east' && 'US - East'}
                {database.region === 'eu-west' && 'EU - West'}
                {database.region === 'asia-south' && 'Asia - South'}
              </p>
            </div>
            <div className="info-item">
              <label>Plan</label>
              <p className="text-capitalize">
                {database.plan.charAt(0).toUpperCase() + database.plan.slice(1)}
              </p>
            </div>
            <div className="info-item">
              <label>Status</label>
              <p>
                <span className={`status-badge status-${database.status}`}>
                  {database.status}
                </span>
              </p>
            </div>
            <div className="info-item">
              <label>Created</label>
              <p>{new Date(database.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>

        {/* Connection Details Section */}
        <div className="drawer-section">
          <h3>Connection Details</h3>
          <div className="credentials-list">
            <div className="cred-field">
              <label>Host</label>
              <div className="field-row">
                <code>{credentials.host}</code>
                <button
                  className="btn-ghost btn-icon"
                  onClick={() =>
                    handleCopyToClipboard(credentials.host, 'host')
                  }
                >
                  {copiedField === 'host' ? '✓' : <Copy size={16} />}
                </button>
              </div>
            </div>

            <div className="cred-field">
              <label>Port</label>
              <div className="field-row">
                <code>{credentials.port}</code>
                <button
                  className="btn-ghost btn-icon"
                  onClick={() =>
                    handleCopyToClipboard(credentials.port.toString(), 'port')
                  }
                >
                  {copiedField === 'port' ? '✓' : <Copy size={16} />}
                </button>
              </div>
            </div>

            <div className="cred-field">
              <label>Username</label>
              <div className="field-row">
                <code>{credentials.username}</code>
                <button
                  className="btn-ghost btn-icon"
                  onClick={() =>
                    handleCopyToClipboard(credentials.username, 'username')
                  }
                >
                  {copiedField === 'username' ? '✓' : <Copy size={16} />}
                </button>
              </div>
            </div>

            <div className="cred-field">
              <label>Password</label>
              <div className="field-row">
                <code>
                  {showPassword
                    ? credentials.password
                    : '•'.repeat(16)}
                </code>
                <button
                  className="btn-ghost btn-icon"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <Eye size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Actions Section */}
        <div className="drawer-section drawer-actions">
          <button className="btn-secondary btn-small" disabled>
            <RotateCcw size={16} />
            Rotate Password (coming soon)
          </button>
          <button
            className="btn-secondary btn-small btn-danger"
            onClick={() => {
              onDelete(database.id);
              onClose();
            }}
          >
            <Trash2 size={16} />
            Delete Database
          </button>
        </div>
      </motion.div>
    </>
  );
}
