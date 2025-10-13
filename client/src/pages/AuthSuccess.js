import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheck, FaSpinner, FaUser, FaEnvelope, FaShieldAlt } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const AuthSuccessContainer = styled.div`
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

const AuthSuccessCard = styled(motion.div)`
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
    background: linear-gradient(90deg, #27ae60, #2ecc71);
  }
`;

const SuccessIcon = styled.div`
  width: 80px;
  height: 80px;
  background: linear-gradient(135deg, #27ae60, #2ecc71);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 2rem;
  font-size: 2rem;
  color: white;
  animation: pulse 2s infinite;
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

const UserInfo = styled.div`
  background: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  text-align: left;
`;

const UserInfoItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  color: #2c3e50;

  &:last-child {
    margin-bottom: 0;
  }

  svg {
    color: #667eea;
    font-size: 1.1rem;
  }
`;

const LoadingSpinner = styled(FaSpinner)`
  animation: spin 1s linear infinite;
  font-size: 2rem;
  color: #667eea;
  margin-bottom: 1rem;

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const AuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = searchParams.get('token');
    const userParam = searchParams.get('user');

    if (token && userParam) {
      try {
        const userData = JSON.parse(decodeURIComponent(userParam));
        
        // Store token in localStorage
        localStorage.setItem('token', token);
        
        // Set user data
        setUser(userData);
        
        // Update auth context
        login(userData, token);
        
        setLoading(false);
        
        // Redirect to dashboard after 3 seconds
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
        
      } catch (error) {
        console.error('Error parsing user data:', error);
        navigate('/login?error=invalid_data');
      }
    } else {
      navigate('/login?error=missing_data');
    }
  }, [searchParams, navigate, login]);

  if (loading) {
    return (
      <AuthSuccessContainer>
        <AuthSuccessCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LoadingSpinner />
          <Title>Authenticating...</Title>
          <Subtitle>Please wait while we complete your login</Subtitle>
        </AuthSuccessCard>
      </AuthSuccessContainer>
    );
  }

  return (
    <AuthSuccessContainer>
      <AuthSuccessCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SuccessIcon>
          <FaCheck />
        </SuccessIcon>
        
        <Title>Welcome Back!</Title>
        <Subtitle>You have successfully logged in with Google</Subtitle>
        
        {user && (
          <UserInfo>
            <UserInfoItem>
              <FaUser />
              <span><strong>Name:</strong> {user.firstName} {user.lastName}</span>
            </UserInfoItem>
            <UserInfoItem>
              <FaEnvelope />
              <span><strong>Email:</strong> {user.email}</span>
            </UserInfoItem>
            <UserInfoItem>
              <FaShieldAlt />
              <span><strong>Role:</strong> {user.role}</span>
            </UserInfoItem>
          </UserInfo>
        )}
        
        <Subtitle>Redirecting to your dashboard...</Subtitle>
      </AuthSuccessCard>
    </AuthSuccessContainer>
  );
};

export default AuthSuccess;
