import React from 'react';
import { motion } from 'framer-motion';
import { Database, Zap, Shield } from 'lucide-react';
import AnimatedBackground from '../components/AnimatedBackground';
import DatabaseGrid from '../components/DatabaseGrid';
import '../styles/landing.css';

export default function LandingPage({ onNavigate }) {
  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  };

  return (
    <div className="landing-page">
      <AnimatedBackground />

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <motion.div
            className="hero-content"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.h1 variants={item} className="hero-title">
              Instant Databases for Developers
            </motion.h1>

            <motion.p variants={item} className="hero-subtitle">
              Provision production-ready databases in seconds. No setup. No
              backend required.
            </motion.p>

            <motion.div variants={item} className="hero-buttons">
              <button
                className="btn-primary"
                onClick={() => onNavigate('dashboard')}
              >
                Get Started
              </button>
              <button className="btn-secondary">Live Demo</button>
            </motion.div>
          </motion.div>

          {/* Features Grid */}
          <motion.div
            className="features-grid"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={item} className="feature-card">
              <div className="feature-icon">
                <Zap size={24} />
              </div>
              <h4>Lightning Fast</h4>
              <p>Deploy databases in under 10 seconds with zero configuration</p>
            </motion.div>

            <motion.div variants={item} className="feature-card">
              <div className="feature-icon">
                <Shield size={24} />
              </div>
              <h4>Enterprise Ready</h4>
              <p>Built with production-grade security and reliability</p>
            </motion.div>

            <motion.div variants={item} className="feature-card">
              <div className="feature-icon">
                <Database size={24} />
              </div>
              <h4>Multiple Engines</h4>
              <p>Choose from PostgreSQL, MongoDB, Redis, and more</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Supported Databases Section */}
      <section className="databases-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, margin: '-100px' }}
            className="section-header"
          >
            <h2>Supported Databases</h2>
            <p>Choose from our extensive collection of database engines</p>
          </motion.div>

          <DatabaseGrid />
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="cta-content"
          >
            <h2>Ready to get started?</h2>
            <p>
              Create your first database in seconds and experience instant
              provisioning
            </p>
            <button
              className="btn-primary"
              onClick={() => onNavigate('dashboard')}
            >
              Launch Dashboard
            </button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
