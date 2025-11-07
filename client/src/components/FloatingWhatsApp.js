import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWhatsapp, FaTimes, FaPaperPlane, FaCheckDouble, FaSpinner } from 'react-icons/fa';

const WhatsAppContainer = styled(motion.div)`
  position: fixed;
  bottom: 2rem;
  left: 2rem;
  z-index: 100000;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
  
  @media (max-width: 768px) {
    bottom: 1.5rem;
    left: 1.5rem;
  }
`;

const WhatsAppButton = styled(motion.button)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #25D366;
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.75rem;
  box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
  transition: all 0.3s ease;
  animation: pulse 2s infinite;
  
  &:hover {
    background: #128C7E;
    transform: scale(1.1);
    box-shadow: 0 6px 30px rgba(37, 211, 102, 0.5);
  }
  
  &:active {
    transform: scale(0.95);
  }

  @keyframes pulse {
    0% {
      box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
    }
    50% {
      box-shadow: 0 4px 30px rgba(37, 211, 102, 0.6);
    }
    100% {
      box-shadow: 0 4px 20px rgba(37, 211, 102, 0.4);
    }
  }
  
  @media (max-width: 768px) {
    width: 56px;
    height: 56px;
    font-size: 1.6rem;
  }
`;

const ChatModal = styled(motion.div)`
  position: fixed;
  bottom: 90px;
  left: 2rem;
  width: 380px;
  height: 400px;
  background: #f0f0f0;
  border-radius: 20px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 100001;
  
  @media (max-width: 768px) {
    width: calc(100vw - 3rem);
    max-width: 380px;
    height: 350px;
    bottom: 80px;
    left: 1.5rem;
  }
`;

const ChatHeader = styled.div`
  background: #075E54;
  color: white;
  padding: 1rem 1.25rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 20px 20px 0 0;
`;

const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #128C7E;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  flex-shrink: 0;
`;

const HeaderText = styled.div`
  flex: 1;
  min-width: 0;
`;

const HeaderTitle = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const HeaderStatus = styled.div`
  font-size: 0.75rem;
  opacity: 0.9;
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const CloseBtn = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 50%;
  transition: background 0.2s;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const MessagesArea = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  background: #E5DDD5;
  background-image: url('data:image/svg+xml;utf8,<svg width="100%25" height="100%25" xmlns="http://www.w3.org/2000/svg"><defs><pattern id="chat-bg" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="20" cy="20" r="1" fill="%23ffffff" fill-opacity="0.1"/></pattern></defs><rect width="100%25" height="100%25" fill="url(%23chat-bg)"/></svg>');
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
  }
`;

const MessageContainer = styled.div`
  display: flex;
  margin-bottom: 0.75rem;
  justify-content: ${({ isUser }) => isUser ? 'flex-end' : 'flex-start'};
`;

const MessageBubble = styled.div`
  max-width: 75%;
  padding: 0.7rem 0.9rem;
  border-radius: 7.5px;
  background: ${({ isUser }) => isUser ? '#DCF8C6' : 'white'};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  position: relative;
  word-wrap: break-word;
  
  ${({ isUser }) => isUser ? `
    border-bottom-right-radius: 2px;
  ` : `
    border-bottom-left-radius: 2px;
  `}
  
  ${({ isSending }) => isSending ? `
    opacity: 0.7;
  ` : ''}
`;

const MessageText = styled.p`
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.4;
  color: #303030;
  white-space: pre-wrap;
`;

const MessageFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ isUser }) => isUser ? 'flex-end' : 'flex-start'};
  gap: 0.25rem;
  margin-top: 0.25rem;
  font-size: 0.65rem;
  color: #667781;
`;

const InputArea = styled.div`
  background: #f0f0f0;
  padding: 0.75rem;
  border-top: 1px solid #ddd;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const MessageInput = styled.textarea`
  flex: 1;
  border: none;
  border-radius: 20px;
  padding: 0.7rem 1rem;
  font-size: 0.9rem;
  outline: none;
  background: white;
  resize: none;
  max-height: 100px;
  font-family: inherit;
  line-height: 1.4;
  
  &:focus {
    box-shadow: 0 0 0 2px #25D366;
  }
  
  &::placeholder {
    color: #999;
  }
`;

const SendButton = styled.button`
  background: #25D366;
  color: white;
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
  
  &:hover {
    background: #128C7E;
    transform: scale(1.1);
  }
  
  &:disabled {
    background: #ccc;
    cursor: not-allowed;
    transform: none;
  }
`;

const UserInfoForm = styled.div`
  padding: 1rem;
  background: white;
  border-radius: 10px;
  margin: 0.5rem 0;
`;

const FormInput = styled.input`
  width: 100%;
  padding: 0.7rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #25D366;
    box-shadow: 0 0 0 2px rgba(37, 211, 102, 0.1);
  }
  
  &::placeholder {
    color: #999;
  }
`;

const FormLabel = styled.label`
  display: block;
  font-size: 0.85rem;
  color: #667781;
  margin-bottom: 0.5rem;
  font-weight: 500;
`;

const FloatingWhatsApp = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [showUserInfoForm, setShowUserInfoForm] = useState(true);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const phoneNumber = '+254 720 339 204';

  // No automatic messages - just a clean interface

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const handleUserInfoChange = (e) => {
    setUserInfo({
      ...userInfo,
      [e.target.name]: e.target.value
    });
  };

  const handleSend = () => {
    const messageText = inputMessage.trim();
    if (!messageText) return;

    // Check if user info is provided (only name needed for WhatsApp)
    if (showUserInfoForm && !userInfo.name) {
      alert('Please provide your name before sending a message.');
      return;
    }

    const userMessage = {
      id: Date.now(),
      text: messageText,
      isUser: true,
      timestamp: new Date(),
      status: 'sent'
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');

    // Hide user info form after first message
    if (showUserInfoForm) {
      setShowUserInfoForm(false);
    }

    // Format phone number for WhatsApp (remove + and spaces)
    const whatsappPhone = phoneNumber.replace(/[+\s]/g, '');
    
    // Create WhatsApp message with user info
    let whatsappMessage = messageText;
    if (userInfo.name) {
      whatsappMessage = `Hello! My name is ${userInfo.name}.\n\n${messageText}`;
    }
    if (userInfo.phone) {
      whatsappMessage += `\n\nMy contact: ${userInfo.phone}`;
    }
    if (userInfo.email) {
      whatsappMessage += `\nMy email: ${userInfo.email}`;
    }

    // Encode message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // Open WhatsApp with pre-filled message
    const whatsappUrl = `https://wa.me/${whatsappPhone}?text=${encodedMessage}`;
    
    // Open in new tab/window
    window.open(whatsappUrl, '_blank');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
    // Auto-resize textarea
    e.target.style.height = 'auto';
    e.target.style.height = `${Math.min(e.target.scrollHeight, 100)}px`;
  };

  return (
    <WhatsAppContainer>
      <AnimatePresence>
        {isOpen && (
          <ChatModal
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <ChatHeader>
              <HeaderInfo>
                <Avatar>
                  <FaWhatsapp />
                </Avatar>
                <HeaderText>
                  <HeaderTitle>Rebirth of a Queen</HeaderTitle>
                  <HeaderStatus>
                    <FaCheckDouble style={{ fontSize: '0.7rem' }} /> Online
                  </HeaderStatus>
                </HeaderText>
              </HeaderInfo>
              <CloseBtn onClick={() => setIsOpen(false)} aria-label="Close chat">
                <FaTimes />
              </CloseBtn>
            </ChatHeader>

            <MessagesArea>
              {showUserInfoForm && (
                <UserInfoForm>
                  <FormLabel>Your Name *</FormLabel>
                  <FormInput
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={userInfo.name}
                    onChange={handleUserInfoChange}
                  />
                  <FormLabel>Your Email (Optional)</FormLabel>
                  <FormInput
                    type="email"
                    name="email"
                    placeholder="Enter your email"
                    value={userInfo.email}
                    onChange={handleUserInfoChange}
                  />
                  <FormLabel>Your Phone (Optional)</FormLabel>
                  <FormInput
                    type="tel"
                    name="phone"
                    placeholder="Enter your phone number"
                    value={userInfo.phone}
                    onChange={handleUserInfoChange}
                  />
                </UserInfoForm>
              )}
              
              {messages.map((message) => (
                <MessageContainer key={message.id} isUser={message.isUser}>
                  <div style={{ maxWidth: '100%' }}>
                    <MessageBubble isUser={message.isUser} isSending={message.status === 'sending'}>
                      <MessageText>{message.text}</MessageText>
                    </MessageBubble>
                    <MessageFooter isUser={message.isUser}>
                      {formatTime(message.timestamp)}
                      {message.isUser && (
                        <>
                          {message.status === 'sending' && (
                            <FaSpinner style={{ fontSize: '0.65rem', animation: 'spin 1s linear infinite' }} />
                          )}
                          {message.status === 'sent' && (
                            <FaCheckDouble style={{ fontSize: '0.65rem', color: '#25D366' }} />
                          )}
                          {message.status === 'failed' && (
                            <span style={{ fontSize: '0.65rem', color: '#ef4444' }}>✕</span>
                          )}
                        </>
                      )}
                    </MessageFooter>
                  </div>
                </MessageContainer>
              ))}
              
              <div ref={messagesEndRef} />
            </MessagesArea>

            <InputArea>
              <MessageInput
                ref={inputRef}
                placeholder="Type a message..."
                value={inputMessage}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                rows={1}
              />
              <SendButton 
                onClick={handleSend}
                disabled={!inputMessage.trim()}
                aria-label="Send message"
              >
                <FaPaperPlane />
              </SendButton>
            </InputArea>
          </ChatModal>
        )}
      </AnimatePresence>

      <WhatsAppButton
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        aria-label={isOpen ? 'Close WhatsApp chat' : 'Open WhatsApp chat'}
      >
        {isOpen ? <FaTimes /> : <FaWhatsapp />}
      </WhatsAppButton>
    </WhatsAppContainer>
  );
};

export default FloatingWhatsApp;
