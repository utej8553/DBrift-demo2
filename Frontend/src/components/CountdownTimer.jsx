import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import '../styles/countdown-timer.css';

const TimeUnit = React.memo(({ value, label }) => (
  <div className="time-unit">
    <div className="time-value">
      {String(value).padStart(2, '0')}
    </div>
    <div className="time-label">{label}</div>
  </div>
));

TimeUnit.displayName = 'TimeUnit';

const TimerSeparator = React.memo(() => (
  <div className="timer-separator">:</div>
));

TimerSeparator.displayName = 'TimerSeparator';

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      // Target date: January 9, 2026, 00:00:00
      const targetDate = new Date(2026, 0, 9, 0, 0, 0).getTime();
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div
      className="countdown-timer"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="timer-content">
        <motion.div
          className="timer-headline"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <h3>Project Launch in</h3>
          <p>DBrift Enterprise Edition Unveiling</p>
        </motion.div>

        <div className="timer-display">
          <TimeUnit value={timeLeft.days} label="Days" />
          <TimerSeparator />
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <TimerSeparator />
          <TimeUnit value={timeLeft.minutes} label="Minutes" />
          <TimerSeparator />
          <TimeUnit value={timeLeft.seconds} label="Seconds" />
        </div>

        <motion.p
          className="timer-message"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          ✨ Exclusive features and enhanced dashboard launching soon ✨
        </motion.p>
      </div>

      <motion.div
        className="timer-progress"
        animate={{
          scaleX: [0, 1],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </motion.div>
  );
}
