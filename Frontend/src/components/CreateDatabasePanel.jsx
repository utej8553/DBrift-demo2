import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { X, Loader, AlertCircle } from 'lucide-react';
import '../styles/create-database.css';

const databaseTypes = ['POSTGRES'];
const databaseVersions = ['16'];

export default function CreateDatabasePanel({
  onCreateDatabase,
  onCancel,
  isProvisioning,
}) {
  const [formData, setFormData] = useState({
    databaseName: '',
    type: databaseTypes[0],
    version: databaseVersions[0],
    description: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData.databaseName.trim()) {
      setError('Database name is required');
      return false;
    }
    if (formData.databaseName.length < 3) {
      setError('Database name must be at least 3 characters');
      return false;
    }
    if (!/^[a-zA-Z0-9_-]+$/.test(formData.databaseName)) {
      setError('Database name can only contain letters, numbers, hyphens, and underscores');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    onCreateDatabase(formData);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="create-database-panel"
    >
      <div className="panel-header">
        <h2>Create Database</h2>
        {!isProvisioning && (
          <button
            className="btn-ghost close-btn"
            onClick={onCancel}
            aria-label="Close"
            type="button"
          >
            <X size={20} />
          </button>
        )}
      </div>

      {!isProvisioning ? (
        <form onSubmit={handleSubmit} className="create-form">
          {/* Database Name */}
          <div className="form-group">
            <label htmlFor="databaseName">
              Database Name <span className="required">*</span>
            </label>
            <input
              id="databaseName"
              name="databaseName"
              type="text"
              placeholder="my_app_db"
              value={formData.databaseName}
              onChange={handleChange}
              disabled={isProvisioning}
              required
            />
            <p className="field-hint">
              3-63 characters, letters, numbers, hyphens, underscores only
            </p>
          </div>

          {/* Database Type */}
          <div className="form-group">
            <label htmlFor="type">
              Database Type <span className="required">*</span>
            </label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
              disabled={isProvisioning}
            >
              {databaseTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Database Version */}
          <div className="form-group">
            <label htmlFor="version">
              Database Version <span className="required">*</span>
            </label>
            <select
              id="version"
              name="version"
              value={formData.version}
              onChange={handleChange}
              disabled={isProvisioning}
            >
              {databaseVersions.map((version) => (
                <option key={version} value={version}>
                  {version}
                </option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div className="form-group">
            <label htmlFor="description">Description (Optional)</label>
            <textarea
              id="description"
              name="description"
              placeholder="Database for my application..."
              value={formData.description}
              onChange={handleChange}
              disabled={isProvisioning}
              rows="3"
            />
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

          {/* Buttons */}
          <div className="form-actions">
            <button
              type="button"
              className="btn-secondary"
              onClick={onCancel}
              disabled={isProvisioning}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
              disabled={isProvisioning}
            >
              Create Database
            </button>
          </div>
        </form>
      ) : (
        <div className="provisioning-state">
          <motion.div
            className="spinner"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          >
            <Loader size={40} />
          </motion.div>
          <h3>Creating your database...</h3>
          <p>Setting up PostgreSQL container and configuring network...</p>
        </div>
      )}
    </motion.div>
  );
}
