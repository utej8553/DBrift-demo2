import React from 'react';
import { motion } from 'framer-motion';
import { Trash2 } from 'lucide-react';
import '../styles/databases-list.css';

export default function DatabasesList({
  databases,
  onSelectDatabase,
  onDeleteDatabase,
}) {
  if (databases.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="empty-state"
      >
        <div className="empty-icon">◆</div>
        <h3>No databases yet</h3>
        <p>Create your first database to get started</p>
      </motion.div>
    );
  }

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 },
    },
  };

  return (
    <motion.div
      className="databases-list"
      variants={container}
      initial="hidden"
      animate="visible"
    >
      <div className="list-header">
        <div className="col-name">Name</div>
        <div className="col-type">Type</div>
        <div className="col-region">Region</div>
        <div className="col-status">Status</div>
        <div className="col-created">Created</div>
        <div className="col-actions">Actions</div>
      </div>

      {databases.map((db) => (
        <motion.div
          key={db.id}
          variants={item}
          className="list-row"
          whileHover={{ backgroundColor: 'rgba(99, 102, 241, 0.05)' }}
          onClick={() => onSelectDatabase(db)}
        >
          <div className="col-name">{db.name}</div>
          <div className="col-type">
            <span className="type-badge">{db.type}</span>
          </div>
          <div className="col-region">
            {db.region === 'us-east' && 'US - East'}
            {db.region === 'eu-west' && 'EU - West'}
            {db.region === 'asia-south' && 'Asia - South'}
          </div>
          <div className="col-status">
            <span className={`status-badge status-${db.status}`}>
              {db.status}
            </span>
          </div>
          <div className="col-created">
            {new Date(db.createdAt).toLocaleDateString()}
          </div>
          <div className="col-actions">
            <button
              className="btn-ghost btn-small btn-icon"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteDatabase(db.id);
              }}
              title="Delete database"
            >
              <Trash2 size={18} color="#ef4444" />
            </button>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
