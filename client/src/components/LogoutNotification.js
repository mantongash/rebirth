import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';

const LogoutNotificationContainer = styled(motion.div)`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 9999;
  max-width: 400px;
  width: 100%;
`;

const LogoutCard = styled(motion.div)`
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
  color: #1565c0;
  padding: 1.5rem 2rem;
  border-radius: 16px;
  border: 1px solid #90caf9;
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 8px 32px rgba(21, 101, 192, 0.2);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: linear-gradient(180deg, #2196f3, #1976d2);
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
`;

const LogoutIcon = styled(motion.div)`
  font-size: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  backdrop-filter: blur(5px);
`;

const LogoutContent = styled.div`
  flex: 1;
`;

const LogoutTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  font-weight: 600;
  color: #1565c0;
`;

const LogoutMessage = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: #1565c0;
  opacity: 0.9;
  line-height: 1.4;
`;

const ProgressBar = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: linear-gradient(90deg, #2196f3, #1976d2);
  border-radius: 0 0 16px 16px;
`;

const LogoutNotification = ({ 
  isVisible, 
  title = "Logged Out", 
  message, 
  icon = "👋", 
  duration = 5000,
  onClose 
}) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <LogoutNotificationContainer
          initial={{ opacity: 0, x: 400, scale: 0.8 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 400, scale: 0.8 }}
          transition={{ 
            duration: 0.5,
            type: "spring",
            stiffness: 300,
            damping: 25
          }}
        >
          <LogoutCard
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <LogoutIcon
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              {icon}
            </LogoutIcon>
            
            <LogoutContent>
              <LogoutTitle>{title}</LogoutTitle>
              <LogoutMessage>{message}</LogoutMessage>
            </LogoutContent>

            <ProgressBar
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: duration / 1000, ease: "linear" }}
            />
          </LogoutCard>
        </LogoutNotificationContainer>
      )}
    </AnimatePresence>
  );
};

// Hook to automatically show logout notification
export const useLogoutNotification = () => {
  const [searchParams] = useSearchParams();
  const [showNotification, setShowNotification] = useState(false);
  const [notificationData, setNotificationData] = useState(null);

  useEffect(() => {
    const logoutParam = searchParams.get('logout');
    const logoutMessage = sessionStorage.getItem('userLogoutMessage');
    
    if (logoutParam === 'success' && logoutMessage) {
      setNotificationData({
        title: "Logged Out Successfully",
        message: logoutMessage,
        icon: "👋"
      });
      setShowNotification(true);
      
      // Clear the message from session storage
      sessionStorage.removeItem('userLogoutMessage');
      
      // Auto-hide after 5 seconds
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }
  }, [searchParams]);

  const hideNotification = () => {
    setShowNotification(false);
  };

  return {
    showNotification,
    notificationData,
    hideNotification
  };
};

export default LogoutNotification;
