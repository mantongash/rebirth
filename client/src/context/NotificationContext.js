import React, { createContext, useContext, useState, useCallback } from 'react';
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
  z-index: 9999;
  max-width: 400px;
  width: 100%;
  pointer-events: none;
`;

const NotificationCard = styled(motion.div)`
  background: ${props => {
    switch(props.type) {
      case 'success': return 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)';
      case 'error': return 'linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%)';
      case 'warning': return 'linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%)';
      case 'info': return 'linear-gradient(135deg, #d1ecf1 0%, #bee5eb 100%)';
      default: return 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)';
    }
  }};
  color: ${props => {
    switch(props.type) {
      case 'success': return '#155724';
      case 'error': return '#721c24';
      case 'warning': return '#856404';
      case 'info': return '#0c5460';
      default: return '#1565c0';
    }
  }};
  padding: 1.5rem 2rem;
  border-radius: 16px;
  border: 1px solid ${props => {
    switch(props.type) {
      case 'success': return '#c3e6cb';
      case 'error': return '#f5c6cb';
      case 'warning': return '#ffeaa7';
      case 'info': return '#bee5eb';
      default: return '#90caf9';
    }
  }};
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  margin-bottom: 1rem;
  pointer-events: auto;
  cursor: pointer;

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
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  backdrop-filter: blur(5px);
  flex-shrink: 0;
`;

const NotificationContent = styled.div`
  flex: 1;
  min-width: 0;
`;

const NotificationTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.2;
`;

const NotificationMessage = styled.p`
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
  line-height: 1.4;
  word-wrap: break-word;
`;

const CloseButton = styled(motion.button)`
  background: none;
  border: none;
  color: inherit;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.25rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  flex-shrink: 0;
  opacity: 0.7;
  transition: all 0.2s ease;

  &:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ProgressBar = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: ${props => {
    switch(props.type) {
      case 'success': return '#28a745';
      case 'error': return '#dc3545';
      case 'warning': return '#ffc107';
      case 'info': return '#17a2b8';
      default: return '#2196f3';
    }
  }};
  border-radius: 0 0 16px 16px;
`;

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const addNotification = useCallback((type, title, message, duration = 5000) => {
    const id = Date.now() + Math.random();
    const notification = { id, type, title, message, duration };
    
    setNotifications(prev => [...prev, notification]);
    
    // Auto remove after duration
    if (duration > 0) {
      setTimeout(() => {
        setNotifications(prev => prev.filter(notif => notif.id !== id));
      }, duration);
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
              initial={{ opacity: 0, x: 400, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 400, scale: 0.8 }}
              transition={{ 
                duration: 0.5,
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
              onClick={() => removeNotification(notification.id)}
            >
              <NotificationIcon
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                {getIcon(notification.type)}
              </NotificationIcon>
              
              <NotificationContent>
                <NotificationTitle>{notification.title}</NotificationTitle>
                <NotificationMessage>{notification.message}</NotificationMessage>
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
                  transition={{ duration: notification.duration / 1000, ease: "linear" }}
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