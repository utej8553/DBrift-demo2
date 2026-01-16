import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Copy, Eye, EyeOff, X, AlertCircle } from 'lucide-react';
import '../styles/credentials.css';

export default function CredentialsPanel({ credentials, onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [revealOnce, setRevealOnce] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const handleCopyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleRevealPassword = () => {
    setRevealOnce(true);
    setShowPassword(true);
  };

  const credentialFields = [
    { label: 'Database Type', value: credentials.type, key: 'type' },
    { label: 'Region', value: credentials.region, key: 'region' },
    { label: 'Host', value: credentials.host, key: 'host' },
    { label: 'Port', value: credentials.port.toString(), key: 'port' },
    { label: 'Database Name', value: credentials.database, key: 'database' },
    { label: 'Username', value: credentials.username, key: 'username' },
    {
      label: 'Password',
      value: credentials.password,
      key: 'password',
      secret: true,
      masked: !showPassword,
    },
    { label: 'Schema', value: credentials.schema, key: 'schema' },
    {
      label: 'Connection URI',
      value: credentials.connectionUri,
      key: 'uri',
      mono: true,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="credentials-panel"
    >
      <div className="panel-header">
        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Database Credentials
        </motion.h2>
        <button className="btn-ghost close-btn" onClick={onClose}>
          <X size={20} />
        </button>
      </div>

      {/* Warning Banner */}
      <motion.div
        className="warning-banner"
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        transition={{ duration: 0.3, delay: 0.1 }}
      >
        <AlertCircle size={18} />
        <span>⚠ Save this password now. It will not be shown again.</span>
      </motion.div>

      {/* Credentials Grid */}
      <motion.div
        className="credentials-grid"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.05, delayChildren: 0.2 }}
      >
        {credentialFields.map((field, idx) => (
          <motion.div
            key={field.key}
            className={`credential-field ${field.secret ? 'secret-field' : ''}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <label>{field.label}</label>

            <div className="field-value-container">
              <div className={`field-value ${field.mono ? 'mono' : ''}`}>
                {field.secret && field.masked ? (
                  <span className="masked-text">{'•'.repeat(16)}</span>
                ) : (
                  <code>{field.value}</code>
                )}
              </div>

              {field.secret && !revealOnce ? (
                <button
                  className="btn-ghost btn-icon"
                  onClick={handleRevealPassword}
                  title="Reveal password once"
                >
                  <Eye size={18} />
                </button>
              ) : (
                <button
                  className="btn-ghost btn-icon"
                  onClick={() =>
                    handleCopyToClipboard(
                      field.value,
                      field.key
                    )
                  }
                  title="Copy to clipboard"
                >
                  {copiedField === field.key ? (
                    <motion.span
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      className="copied-check"
                    >
                      ✓
                    </motion.span>
                  ) : (
                    <Copy size={18} />
                  )}
                </button>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Action Button */}
      <motion.div
        className="credentials-actions"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        <button className="btn-primary" onClick={onClose}>
          Done
        </button>
      </motion.div>
    </motion.div>
  );
}
