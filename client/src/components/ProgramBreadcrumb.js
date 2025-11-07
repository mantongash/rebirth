import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FaHome, FaChevronRight } from 'react-icons/fa';

const BreadcrumbContainer = styled.nav`
  padding: 1rem 2rem;
  background: rgba(255, 255, 255, 0.95);
  border-bottom: 1px solid #eef2f7;
  
  @media (max-width: 768px) {
    padding: 0.75rem 1rem;
  }
`;

const BreadcrumbList = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  color: #6b7280;
  flex-wrap: wrap;
`;

const BreadcrumbLink = styled(Link)`
  color: #667eea;
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  transition: color 0.2s ease;
  
  &:hover {
    color: #764ba2;
    text-decoration: underline;
  }
`;

const BreadcrumbItem = styled.span`
  color: ${props => props.active ? '#2c3e50' : '#6b7280'};
  font-weight: ${props => props.active ? '600' : '400'};
`;

const Separator = styled(FaChevronRight)`
  color: #9ca3af;
  font-size: 0.7rem;
`;

const ProgramBreadcrumb = ({ items }) => {
  return (
    <BreadcrumbContainer>
      <BreadcrumbList>
        <BreadcrumbLink to="/">
          <FaHome /> Home
        </BreadcrumbLink>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <Separator />
            {item.to ? (
              <BreadcrumbLink to={item.to}>{item.label}</BreadcrumbLink>
            ) : (
              <BreadcrumbItem active>{item.label}</BreadcrumbItem>
            )}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </BreadcrumbContainer>
  );
};

export default ProgramBreadcrumb;

