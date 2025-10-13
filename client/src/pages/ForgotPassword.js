import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaSpinner, FaCheck, FaArrowLeft, FaShieldAlt, FaPaperPlane, FaSms, FaUserSecret } from 'react-icons/fa';
import API_MAIN from '../services/api';

const ForgotPasswordContainer = styled.div`
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

const ForgotPasswordCard = styled(motion.div)`
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

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #667eea, #764ba2);
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;

const Subtitle = styled.p`
  color: #7f8c8d;
  font-size: 1rem;
  margin: 0;
`;

const BackLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  text-decoration: none;
  font-size: 0.9rem;
  margin-bottom: 1.5rem;
  transition: color 0.2s;

  &:hover {
    color: #5a6fd8;
  }
`;

const MethodSelector = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const MethodButton = styled.button`
  flex: 1;
  padding: 1rem;
  border: 2px solid ${props => props.active ? '#667eea' : '#e1e5e9'};
  border-radius: 12px;
  background: ${props => props.active ? '#f8f9ff' : 'white'};
  color: ${props => props.active ? '#667eea' : '#666'};
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover {
    border-color: #667eea;
    background: #f8f9ff;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const InputGroup = styled.div`
  position: relative;
`;

const Input = styled.input`
  width: 100%;
  padding: 1rem 1rem 1rem 3rem;
  border: 2px solid #e1e5e9;
  border-radius: 12px;
  font-size: 1rem;
  transition: all 0.3s ease;
  box-sizing: border-box;

  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }

  &::placeholder {
    color: #bdc3c7;
  }
`;

const InputIcon = styled.div`
  position: absolute;
  left: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: #bdc3c7;
  font-size: 1.1rem;
`;

const SubmitButton = styled.button`
  width: 100%;
  padding: 1rem;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const SuccessMessage = styled.div`
  background: #d4edda;
  border: 1px solid #c3e6cb;
  color: #155724;
  padding: 1rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const ErrorMessage = styled.div`
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  color: #721c24;
  padding: 1rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const InfoBox = styled.div`
  background: #e3f2fd;
  border: 1px solid #bbdefb;
  color: #1565c0;
  padding: 1rem;
  border-radius: 12px;
  font-size: 0.9rem;
  line-height: 1.5;
`;

const ForgotPassword = () => {
  const [method, setMethod] = useState('email'); // 'email' or 'sms'
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      if (method === 'email') {
        if (!email) {
          setError('Please enter your email address');
          setLoading(false);
          return;
        }

        const response = await API_MAIN.post('/auth/forgot-password', { email });
        
        if (response.data.success) {
          setSuccess(true);
        } else {
          setError(response.data.message || 'Failed to send reset email');
        }
      } else {
        if (!phone) {
          setError('Please enter your phone number');
          setLoading(false);
          return;
        }

        const response = await API_MAIN.post('/auth/forgot-password-sms', { phone });
        
        if (response.data.success) {
          setSuccess(true);
        } else {
          setError(response.data.message || 'Failed to send reset SMS');
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ForgotPasswordContainer>
      <ForgotPasswordCard
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Header>
          <BackLink to="/login">
            <FaArrowLeft />
            Back to Login
          </BackLink>
          <Title>
            <FaShieldAlt />
            Reset Password
          </Title>
          <Subtitle>
            Choose how you'd like to reset your password
          </Subtitle>
        </Header>

        <MethodSelector>
          <MethodButton
            type="button"
            active={method === 'email'}
            onClick={() => setMethod('email')}
          >
            <FaPaperPlane />
            Email
          </MethodButton>
          <MethodButton
            type="button"
            active={method === 'sms'}
            onClick={() => setMethod('sms')}
          >
            <FaSms />
            SMS
          </MethodButton>
        </MethodSelector>

        {success ? (
          <SuccessMessage>
            <FaCheck />
            {method === 'email' 
              ? 'Password reset email sent! Check your inbox and follow the instructions.'
              : 'Password reset SMS sent! Check your phone for the verification code.'
            }
          </SuccessMessage>
        ) : (
          <Form onSubmit={handleSubmit}>
            {error && (
              <ErrorMessage>
                <FaShieldAlt />
                {error}
              </ErrorMessage>
            )}

            <InputGroup>
              <InputIcon>
                {method === 'email' ? <FaEnvelope /> : <FaPhone />}
              </InputIcon>
              <Input
                type={method === 'email' ? 'email' : 'tel'}
                placeholder={method === 'email' ? 'Enter your email address' : 'Enter your phone number'}
                value={method === 'email' ? email : phone}
                onChange={(e) => method === 'email' ? setEmail(e.target.value) : setPhone(e.target.value)}
                required
              />
            </InputGroup>

            <SubmitButton type="submit" disabled={loading}>
              {loading ? (
                <>
                  <FaSpinner className="fa-spin" />
                  Sending...
                </>
              ) : (
                <>
                  {method === 'email' ? <FaPaperPlane /> : <FaSms />}
                  Send Reset {method === 'email' ? 'Email' : 'SMS'}
                </>
              )}
            </SubmitButton>
          </Form>
        )}

        <InfoBox>
          <strong>What happens next?</strong><br />
          {method === 'email' 
            ? 'We\'ll send you a secure link to reset your password. The link will expire in 10 minutes.'
            : 'We\'ll send you a 6-digit verification code via SMS. The code will expire in 10 minutes.'
          }
        </InfoBox>
      </ForgotPasswordCard>
    </ForgotPasswordContainer>
  );
};

export default ForgotPassword;
