import React, { createContext, useContext, useState, useCallback, useRef } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaCheck, FaExclamationTriangle, FaInfo, FaTimes } from 'react-icons/fa';

const NotificationContext = createContext();

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

// Professional Notification Components
const NotificationContainer = styled(motion.div)`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 100000;
  max-width: 400px;
  width: 100%;
  pointer-events: none;
`;

const NotificationCard = styled(motion.div)`
  background: ${props => {
    switch(props.type) {
      case 'success': return 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)';
      case 'error': return 'linear-gradient(135deg, #fef2f2 0%, #fee2e2 100%)';
      case 'warning': return 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 100%)';
      case 'info': return 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)';
      default: return 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)';
    }
  }};
  color: ${props => {
    switch(props.type) {
      case 'success': return '#065f46';
      case 'error': return '#991b1b';
      case 'warning': return '#92400e';
      case 'info': return '#1e40af';
      default: return '#374151';
    }
  }};
  padding: 1.25rem 1.5rem;
  border-radius: 12px;
  border: 1px solid ${props => {
    switch(props.type) {
      case 'success': return '#a7f3d0';
      case 'error': return '#fecaca';
      case 'warning': return '#fde68a';
      case 'info': return '#bfdbfe';
      default: return '#e5e7eb';
    }
  }};
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(8px);
  margin-bottom: 0.75rem;
  pointer-events: auto;
  cursor: pointer;
  min-height: 60px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: ${props => {
      switch(props.type) {
        case 'success': return '#28a745';
        case 'error': return '#dc3545';
        case 'warning': return '#ffc107';
        case 'info': return '#17a2b8';
        default: return '#2196f3';
      }
    }};
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4));
    animation: shimmer 3s infinite;
  }

  @keyframes shimmer {
    0% { width: 0; }
    50% { width: 100%; }
    100% { width: 0; }
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.2);
  }
`;

const NotificationIcon = styled(motion.div)`
  font-size: 1.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: ${props => {
    switch(props.type) {
      case 'success': return 'rgba(16, 185, 129, 0.1)';
      case 'error': return 'rgba(239, 68, 68, 0.1)';
      case 'warning': return 'rgba(245, 158, 11, 0.1)';
      case 'info': return 'rgba(59, 130, 246, 0.1)';
      default: return 'rgba(107, 114, 128, 0.1)';
    }
  }};
  border-radius: 8px;
  flex-shrink: 0;
  margin-top: 2px;
`;

const NotificationContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const NotificationTitle = styled.h4`
  margin: 0 0 0.25rem 0;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1.25;
  color: ${props => {
    switch(props.type) {
      case 'success': return '#047857';
      case 'error': return '#dc2626';
      case 'warning': return '#d97706';
      case 'info': return '#2563eb';
      default: return '#374151';
    }
  }};
`;

const NotificationMessage = styled.p`
  margin: 0;
  font-size: 0.8125rem;
  opacity: 0.8;
  line-height: 1.4;
  word-wrap: break-word;
  color: ${props => {
    switch(props.type) {
      case 'success': return '#065f46';
      case 'error': return '#991b1b';
      case 'warning': return '#92400e';
      case 'info': return '#1e40af';
      default: return '#6b7280';
    }
  }};
`;

const CloseButton = styled(motion.button)`
  background: none;
  border: none;
  color: #9ca3af;
  font-size: 1rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  opacity: 0.6;
  transition: all 0.2s ease;
  margin-top: 2px;

  &:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.05);
    color: #6b7280;
  }
`;

const ProgressBar = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 2px;
  background: ${props => {
    switch(props.type) {
      case 'success': return '#10b981';
      case 'error': return '#ef4444';
      case 'warning': return '#f59e0b';
      case 'info': return '#3b82f6';
      default: return '#6b7280';
    }
  }};
  border-radius: 0 0 12px 12px;
`;

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const lastShownRef = useRef({}); // key -> timestamp
  const lastTypeTimestampRef = useRef({}); // type -> timestamp

  const DEDUP_WINDOW_MS = 2500; // ignore identical messages shown in the last 2.5s
  const TYPE_THROTTLE_MS = 1200; // at most one per type every 1.2s

  const addNotification = useCallback((type, title, message, duration = 3000) => {
    const now = Date.now();

    // Normalize content for dedup
    const normTitle = (title || '').trim();
    const normMessage = (message || '').trim();
    const key = `${type}|${normTitle}|${normMessage}`;

    // Type throttling (e.g., too many success toasts back-to-back)
    const lastTypeTs = lastTypeTimestampRef.current[type] || 0;
    if (now - lastTypeTs < TYPE_THROTTLE_MS) {
      return; // drop
    }

    // De-duplicate identical notifications within a short window
    const lastTs = lastShownRef.current[key] || 0;
    if (now - lastTs < DEDUP_WINDOW_MS) {
      return; // drop duplicate
    }

    // If an identical notification is currently visible, drop it
    let shouldDrop = false;
    setNotifications(prev => {
      if (prev.some(n => n.type === type && n.title === normTitle && n.message === normMessage)) {
        shouldDrop = true;
        return prev;
      }
      const id = now + Math.random();
      const notification = { id, type, title: normTitle, message: normMessage, duration };
      const newNotifications = [...prev, notification];
      lastShownRef.current[key] = now;
      lastTypeTimestampRef.current[type] = now;
      return newNotifications.length > 3 ? newNotifications.slice(-3) : newNotifications;
    });

    if (shouldDrop) return;

    // Auto remove after duration
    if (duration > 0) {
      const removeAt = setTimeout(() => {
        setNotifications(prev => prev.filter(notif => {
          return !(notif.type === type && notif.title === normTitle && notif.message === normMessage);
        }));
      }, duration);
      // No need to track timer id; auto GC is fine here
    }
  }, []);

  const removeNotification = useCallback((id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  }, []);

  const clearAllNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  // Convenience methods
  const showSuccess = useCallback((title, message, duration) => {
    addNotification('success', title, message, duration);
  }, [addNotification]);

  const showError = useCallback((title, message, duration) => {
    addNotification('error', title, message, duration);
  }, [addNotification]);

  const showWarning = useCallback((title, message, duration) => {
    addNotification('warning', title, message, duration);
  }, [addNotification]);

  const showInfo = useCallback((title, message, duration) => {
    addNotification('info', title, message, duration);
  }, [addNotification]);

  const getIcon = (type) => {
    switch(type) {
      case 'success': return <FaCheck />;
      case 'error': return <FaExclamationTriangle />;
      case 'warning': return <FaExclamationTriangle />;
      case 'info': return <FaInfo />;
      default: return <FaInfo />;
    }
  };

  const value = {
    notifications,
    addNotification,
    removeNotification,
    clearAllNotifications,
    showSuccess,
    showError,
    showWarning,
    showInfo
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      
      {/* Global Notification Display */}
      <NotificationContainer>
        <AnimatePresence>
      {notifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          type={notification.type}
          initial={{ opacity: 0, x: 300, scale: 0.95 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 300, scale: 0.95 }}
          transition={{ 
            duration: 0.4,
            type: "spring",
            stiffness: 400,
            damping: 30
          }}
          onClick={() => removeNotification(notification.id)}
        >
              <NotificationIcon
                type={notification.type}
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, duration: 0.3, type: "spring", stiffness: 500 }}
              >
                {getIcon(notification.type)}
              </NotificationIcon>
              
              <NotificationContent>
                <NotificationTitle type={notification.type}>{notification.title}</NotificationTitle>
                <NotificationMessage type={notification.type}>{notification.message}</NotificationMessage>
              </NotificationContent>

              <CloseButton
                onClick={(e) => {
                  e.stopPropagation();
                  removeNotification(notification.id);
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <FaTimes />
              </CloseButton>

              {notification.duration > 0 && (
              <ProgressBar
                type={notification.type}
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: notification.duration / 1000, ease: "easeOut" }}
              />
              )}
            </NotificationCard>
          ))}
        </AnimatePresence>
      </NotificationContainer>
    </NotificationContext.Provider>
  );
};

// Named export only - no default export needed