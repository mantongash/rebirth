import React from 'react';
import styled from 'styled-components';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaArrowLeft, FaHome } from 'react-icons/fa';

const AuthErrorContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
    background-size: 50px 50px;
    animation: float 20s infinite linear;
    z-index: 1;
  }

  @keyframes float {
    0% { transform: translate(0, 0) rotate(0deg); }
    100% { transform: translate(-50px, -50px) rotate(360deg); }
  }
`;

const AuthErrorCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  padding: 3rem;
  width: 100%;
  max-width: 500px;
  position: relative;
  overflow: hidden;
  z-index: 2;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  text-align: center;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #e74c3c, #c0392b);
  }
`;

const ErrorIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #e74c3c, #c0392b);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  font-size: 2rem;
  color: white;
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 1rem;
`;

const Subtitle = styled.p`
  color: #7f8c8d;
  font-size: 1rem;
  margin-bottom: 2rem;
`;

const ErrorMessage = styled.div`
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
  padding: 1rem;
  border-radius: 12px;
  margin-bottom: 2rem;
  font-size: 0.9rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const ActionButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.5rem;
  border-radius: 12px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &.primary {
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    
    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
    }
  }
  
  &.secondary {
    background: #f8f9fa;
    color: #6c757d;
    border: 1px solid #dee2e6;
    
    &:hover {
      background: #e9ecef;
      color: #495057;
    }
  }
`;

const AuthError = () => {
  const [searchParams] = useSearchParams();
  const message = searchParams.get('message') || 'Authentication failed';

  return (
    <AuthErrorContainer>
      <AuthErrorCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <ErrorIcon>
          <FaExclamationTriangle />
        </ErrorIcon>
        
        <Title>Authentication Failed</Title>
        <Subtitle>We encountered an issue while trying to log you in</Subtitle>
        
        <ErrorMessage>
          {message}
        </ErrorMessage>
        
        <ActionButtons>
          <ActionButton to="/login" className="primary">
            <FaArrowLeft />
            Try Again
          </ActionButton>
          <ActionButton to="/" className="secondary">
            <FaHome />
            Go Home
          </ActionButton>
        </ActionButtons>
      </AuthErrorCard>
    </AuthErrorContainer>
  );
};

export default AuthError;
