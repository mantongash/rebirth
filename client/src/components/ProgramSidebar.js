import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link, useLocation } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

const SidebarContainer = styled.aside`
  position: fixed;
  right: 2rem;
  top: 50%;
  transform: translateY(-50%);
  z-index: 100;
  background: white;
  border-radius: 16px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.15);
  padding: 1.5rem;
  min-width: 240px;
  max-height: 80vh;
  overflow-y: auto;
  
  @media (max-width: 1024px) {
    display: none;
  }
  
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 3px;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #667eea;
    border-radius: 3px;
  }
`;

const SidebarTitle = styled.h3`
  font-size: 1rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 1rem;
  padding-bottom: 0.75rem;
  border-bottom: 2px solid #eef2f7;
`;

const ProgramList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ProgramItem = styled.li`
  margin-bottom: 0.5rem;
`;

const ProgramLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  color: ${props => props.active ? '#667eea' : '#6b7280'};
  text-decoration: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: ${props => props.active ? '600' : '400'};
  background: ${props => props.active ? '#f0f4ff' : 'transparent'};
  transition: all 0.2s ease;
  
  &:hover {
    background: #f0f4ff;
    color: #667eea;
    transform: translateX(-4px);
  }
`;

const ProgramSidebar = () => {
  const location = useLocation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsVisible(scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const programs = [
    { label: 'The Rebirth Susan Village', to: '/programs/susan-village' },
    { label: 'The Rebirth Elimisha Program', to: '/programs/elimisha' },
    { label: 'Raising Authentic Voices', to: '/programs/authentic-voices' },
    { label: 'Vocational Training Program', to: '/programs/vocational-training' },
    { label: 'Volunteer Program', to: '/programs/volunteer' },
  ];

  if (!isVisible) return null;

  return (
    <SidebarContainer>
      <SidebarTitle>Our Programs</SidebarTitle>
      <ProgramList>
        {programs.map((program) => (
          <ProgramItem key={program.to}>
            <ProgramLink 
              to={program.to} 
              active={location.pathname === program.to ? 1 : 0}
            >
              <span>{program.label}</span>
              <FaChevronRight size={12} />
            </ProgramLink>
          </ProgramItem>
        ))}
      </ProgramList>
    </SidebarContainer>
  );
};

export default ProgramSidebar;

