import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Database,
  Zap,
  Lock,
  TrendingUp,
  Cpu,
  Clock,
  Key,
  HardDrive,
  Gauge,
  Boxes,
} from 'lucide-react';

const databases = [
  // SQL
  {
    name: 'PostgreSQL',
    category: 'SQL',
    description: 'Reliable relational database for modern apps',
    icon: Database,
    color: '#336791',
  },
  {
    name: 'MySQL',
    category: 'SQL',
    description: 'Open-source relational database engine',
    icon: Database,
    color: '#00758F',
  },
  {
    name: 'MariaDB',
    category: 'SQL',
    description: 'MySQL fork with enhanced performance',
    icon: Database,
    color: '#003545',
  },
  {
    name: 'SQLite',
    category: 'SQL',
    description: 'Lightweight embedded relational database',
    icon: Database,
    color: '#003B57',
  },

  // NoSQL
  {
    name: 'MongoDB',
    category: 'NoSQL',
    description: 'Document-based NoSQL database',
    icon: Boxes,
    color: '#00ED64',
  },
  {
    name: 'Redis',
    category: 'NoSQL',
    description: 'In-memory data structure store',
    icon: Zap,
    color: '#DC382D',
  },
  {
    name: 'Cassandra',
    category: 'NoSQL',
    description: 'Distributed wide-column store',
    icon: HardDrive,
    color: '#1287EB',
  },
  {
    name: 'DynamoDB',
    category: 'NoSQL',
    description: 'Fully managed NoSQL database service',
    icon: Gauge,
    color: '#FF9900',
  },

  // Analytics
  {
    name: 'Elasticsearch',
    category: 'Analytics',
    description: 'Search and analytics engine',
    icon: TrendingUp,
    color: '#005571',
  },
  {
    name: 'ClickHouse',
    category: 'Analytics',
    description: 'Fast columnar OLAP database',
    icon: TrendingUp,
    color: '#FFCC00',
  },

  // Time-Series
  {
    name: 'InfluxDB',
    category: 'Time-Series',
    description: 'Time series database platform',
    icon: Clock,
    color: '#22ADF6',
  },
  {
    name: 'TimescaleDB',
    category: 'Time-Series',
    description: 'Time-series SQL database',
    icon: Clock,
    color: '#0D5A8F',
  },
];

const categories = [
  { name: 'SQL', color: '#6366f1' },
  { name: 'NoSQL', color: '#ec4899' },
  { name: 'Analytics', color: '#f59e0b' },
  { name: 'Time-Series', color: '#10b981' },
];

export default function DatabaseGrid() {
  const [selectedDb, setSelectedDb] = useState(null);

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  return (
    <div className="db-grid-section">
      <motion.div
        className="db-grid"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        {databases.map((db, idx) => (
          <motion.div
            key={idx}
            variants={item}
            className={`db-card ${selectedDb?.name === db.name ? 'selected' : ''}`}
            onClick={() => setSelectedDb(db)}
            whileHover={{ y: -8, boxShadow: '0 20px 25px -5px rgba(99, 102, 241, 0.2)' }}
            transition={{ duration: 0.2 }}
          >
            {/* Category Badge */}
            <div className="db-category-badge">
              {db.category}
            </div>

            {/* Icon */}
            <div className="db-icon">
              <db.icon size={28} color={db.color} />
            </div>

            {/* Content */}
            <h3 className="db-name">{db.name}</h3>
            <p className="db-description">{db.description}</p>

            {/* Footer indicator */}
            <div className="db-footer">
              {selectedDb?.name === db.name && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  className="selected-indicator"
                >
                  ✓ Selected
                </motion.div>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Category Legend */}
      <motion.div
        className="category-legend"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        viewport={{ once: true }}
      >
        {categories.map((cat, idx) => (
          <div key={idx} className="legend-item">
            <div className="legend-dot" style={{ backgroundColor: cat.color }} />
            <span>{cat.name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
