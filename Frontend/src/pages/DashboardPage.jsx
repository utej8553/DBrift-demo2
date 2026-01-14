import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  LogOut,
  Settings,
  Plus,
  MoreVertical,
  Copy,
  Eye,
  EyeOff,
  Trash2,
  RotateCcw,
  X,
  AlertCircle,
} from 'lucide-react';
import TopNav from '../components/TopNav';
import CreateDatabasePanel from '../components/CreateDatabasePanel';
import CredentialsDisplay from '../components/CredentialsDisplay';
import DatabasesList from '../components/DatabasesList';
import DatabaseDetailDrawer from '../components/DatabaseDetailDrawer';
import { useAuth } from '../context/AuthContext';
import { databaseService } from '../services/api';
import '../styles/dashboard.css';

export default function DashboardPage({ onNavigate }) {
  const { user, logout } = useAuth();
  const [databases, setDatabases] = useState([]);
  const [isCreating, setIsCreating] = useState(false);
  const [isProvisioning, setIsProvisioning] = useState(false);
  const [credentials, setCredentials] = useState(null);
  const [selectedDatabase, setSelectedDatabase] = useState(null);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load databases on mount
  useEffect(() => {
    if (user) {
      fetchDatabases();
    }
  }, [user]);

  const fetchDatabases = async () => {
    try {
      setLoading(true);
      const data = await databaseService.getUserDatabases(user.id);
      setDatabases(data);
      setError('');
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch databases:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateDatabase = async (dbConfig) => {
    setIsProvisioning(true);
    try {
      const newDatabase = await databaseService.createDatabase(
        user.id,
        dbConfig.databaseName,
        dbConfig.type,
        dbConfig.version,
        dbConfig.description
      );

      setDatabases([...databases, newDatabase]);
      setCredentials(newDatabase);
      setIsCreating(false);
      setError('');
    } catch (err) {
      setError(err.message);
      console.error('Failed to create database:', err);
    } finally {
      setIsProvisioning(false);
    }
  };

  const handleDeleteDatabase = async (id) => {
    try {
      await databaseService.deleteDatabase(id);
      setDatabases(databases.filter((db) => db.id !== id));
      setSelectedDatabase(null);
      setShowDetailDrawer(false);
    } catch (err) {
      setError(err.message);
      console.error('Failed to delete database:', err);
    }
  };

  const handleSelectDatabase = (db) => {
    setSelectedDatabase(db);
    setShowDetailDrawer(true);
  };

  const handleLogout = () => {
    logout();
    onNavigate();
  };

  if (!user) {
    return null;
  }

  return (
    <div className="dashboard-page">
      <TopNav user={user} onLogout={handleLogout} />

      <div className="dashboard-container">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="dashboard-header"
        >
          <div className="header-content">
            <h1>Databases</h1>
            <p>Manage and create your database instances</p>
          </div>
          {!isCreating && !credentials && (
            <button
              className="btn-primary"
              onClick={() => setIsCreating(true)}
            >
              <Plus size={18} />
              Create Database
            </button>
          )}
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            className="error-banner"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <AlertCircle size={18} />
            <span>{error}</span>
            <button onClick={() => setError('')}>×</button>
          </motion.div>
        )}

        {/* Create Database Panel */}
        {isCreating && !credentials && (
          <CreateDatabasePanel
            onCreateDatabase={handleCreateDatabase}
            onCancel={() => {
              setIsCreating(false);
              setIsProvisioning(false);
            }}
            isProvisioning={isProvisioning}
          />
        )}

        {/* Credentials Display Modal */}
        {credentials && (
          <CredentialsDisplay
            credentials={credentials}
            onClose={() => {
              setCredentials(null);
            }}
          />
        )}

        {/* Databases List */}
        {!isCreating && !credentials && (
          <>
            {loading ? (
              <div className="loading-state">
                <div className="spinner"></div>
                <p>Loading databases...</p>
              </div>
            ) : databases.length === 0 ? (
              <div className="empty-state">
                <Plus size={48} />
                <h3>No databases yet</h3>
                <p>Create your first database to get started</p>
                <button
                  className="btn-primary"
                  onClick={() => setIsCreating(true)}
                >
                  Create Database
                </button>
              </div>
            ) : (
              <DatabasesList
                databases={databases}
                onSelectDatabase={handleSelectDatabase}
                onDeleteDatabase={handleDeleteDatabase}
              />
            )}
          </>
        )}
      </div>

      {/* Database Detail Drawer */}
      {showDetailDrawer && selectedDatabase && (
        <DatabaseDetailDrawer
          database={selectedDatabase}
          onClose={() => setShowDetailDrawer(false)}
          onDelete={handleDeleteDatabase}
        />
      )}
    </div>
  );
}
