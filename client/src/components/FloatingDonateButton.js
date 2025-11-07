import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaDonate, FaHeart, FaTimes } from 'react-icons/fa';

const FloatingButton = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 10px;
  
  @media (max-width: 768px) {
    bottom: 15px;
    right: 15px;
  }
`;

const DonateButton = styled(Link)`
  background: linear-gradient(135deg, #e74c3c 0%, #c0392b 100%);
  color: white;
  text-decoration: none;
  padding: 12px 20px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(231, 76, 60, 0.4);
  border: 2px solid rgba(255, 255, 255, 0.2);
  animation: float 3s ease-in-out infinite;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.6s;
  }

  &:hover {
    background: linear-gradient(135deg, #c0392b 0%, #a93226 100%);
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 30px rgba(231, 76, 60, 0.6);
    
    &::before {
      left: 100%;
    }
  }

  &:active {
    transform: translateY(-1px) scale(1.02);
  }

  svg {
    font-size: 16px;
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-5px);
    }
  }

  @media (max-width: 768px) {
    padding: 10px 16px;
    font-size: 13px;
    gap: 6px;
    
    svg {
      font-size: 14px;
    }
  }
`;

const QuickDonateButton = styled.button`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 50px;
  font-weight: 600;
  font-size: 12px;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  white-space: nowrap;
  position: relative;
  overflow: hidden;
  box-shadow: 0 3px 15px rgba(102, 126, 234, 0.3);
  border: 2px solid rgba(255, 255, 255, 0.2);

  &:hover {
    background: linear-gradient(135deg, #5a6fd8 0%, #6a4c93 100%);
    transform: translateY(-2px) scale(1.05);
    box-shadow: 0 6px 25px rgba(102, 126, 234, 0.5);
  }

  svg {
    font-size: 14px;
  }

  @media (max-width: 768px) {
    padding: 8px 12px;
    font-size: 11px;
    gap: 4px;
    
    svg {
      font-size: 12px;
    }
  }
`;

const CloseButton = styled.button`
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 12px;

  &:hover {
    background: rgba(0, 0, 0, 0.9);
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    width: 25px;
    height: 25px;
    font-size: 10px;
  }
`;

const FloatingDonateButton = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [showQuickDonate, setShowQuickDonate] = useState(false);

  useEffect(() => {
    // Check if user has previously dismissed the button
    const dismissed = localStorage.getItem('floatingDonateDismissed');
    if (dismissed === 'true') {
      setIsVisible(false);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('floatingDonateDismissed', 'true');
  };

  const handleQuickDonate = () => {
    setShowQuickDonate(!showQuickDonate);
  };

  if (!isVisible) return null;

  return (
    <FloatingButton>
      {showQuickDonate && (
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          gap: '8px',
          marginBottom: '10px'
        }}>
          <QuickDonateButton onClick={() => window.open('/donate?amount=10', '_blank')}>
            <FaHeart /> $10
          </QuickDonateButton>
          <QuickDonateButton onClick={() => window.open('/donate?amount=25', '_blank')}>
            <FaHeart /> $25
          </QuickDonateButton>
          <QuickDonateButton onClick={() => window.open('/donate?amount=50', '_blank')}>
            <FaHeart /> $50
          </QuickDonateButton>
        </div>
      )}
      
      <DonateButton to="/donate">
        <FaDonate />
        Donate Now
      </DonateButton>
      
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <QuickDonateButton onClick={handleQuickDonate}>
          <FaHeart />
          Quick
        </QuickDonateButton>
        <CloseButton onClick={handleDismiss} title="Dismiss">
          <FaTimes />
        </CloseButton>
      </div>
    </FloatingButton>
  );
};

export default FloatingDonateButton;
