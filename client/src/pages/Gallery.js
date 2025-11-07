import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand, FaHeart, FaShare, FaSearch, FaFilter, FaCalendarAlt, FaSpinner, FaMapMarkerAlt, FaClock, FaTh, FaList, FaThLarge, FaCalendarWeek, FaCalendarCheck } from 'react-icons/fa';
import api from '../services/api';

// Main Container
const GalleryContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0 0 2rem 0;
  width: 100%;
  overflow-x: hidden;
`;

const HeroSection = styled.div`
  position: relative;
  width: 100%;
  height: 60vh;
  min-height: 400px;
  overflow: hidden;
  margin-bottom: 2rem;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const HeroCarousel = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const CarouselSlide = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
`;

const SlideImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url(${props => props.bgImage});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
`;

const SlideOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.6) 0%, rgba(118, 75, 162, 0.6) 100%);
  z-index: 1;
`;

const SlideContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  max-width: 1200px;
  padding: 3rem 2rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
`;

const SlideTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 900;
  margin-bottom: 1rem;
  text-shadow: 0 6px 12px rgba(0, 0, 0, 0.7), 0 3px 6px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 0, 0, 0.3);
  line-height: 1.2;
  color: #ffffff;
  letter-spacing: -0.5px;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
  padding: 0 1rem;

  @media (max-width: 768px) {
    font-size: 2.25rem;
    margin-bottom: 0.75rem;
    padding: 0 0.5rem;
  }
`;

const SlideSubtitle = styled.p`
  font-size: 1.15rem;
  opacity: 1;
  margin-bottom: 1.5rem;
  line-height: 1.7;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.4), 0 1px 2px rgba(0, 0, 0, 0.3);
  color: #ffffff;
  max-width: 700px;
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1rem;
    margin-bottom: 1.25rem;
  }
`;

const SlideYear = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.95);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 0.9rem;
  font-weight: 600;
  backdrop-filter: blur(10px);
  border: 2px solid rgba(255, 255, 255, 0.5);
  margin-bottom: 1.5rem;
  color: #2c3e50;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

const SlideActions = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const CTAButton = styled(motion.button)`
  background: ${props => props.primary 
    ? 'linear-gradient(135deg, #ff6b6b, #ee5a24)' 
    : 'rgba(255, 255, 255, 0.2)'};
  color: white;
  border: ${props => props.primary ? 'none' : '2px solid rgba(255, 255, 255, 0.3)'};
  padding: 0.6rem 1.2rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    background: ${props => props.primary 
      ? 'linear-gradient(135deg, #ee5a24, #ff6b6b)' 
      : 'rgba(255, 255, 255, 0.3)'};
  }

  &:active {
    transform: translateY(-1px);
  }
`;

const HeroStats = styled.div`
  display: flex;
  gap: 2.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  justify-content: center;
  padding: 1.25rem 1.5rem;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  max-width: 600px;
  width: 100%;
`;

const StatItem = styled.div`
  text-align: center;
  color: white;
  opacity: 1;
  min-width: 80px;
`;

const CarouselControls = styled.div`
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  display: flex;
  justify-content: space-between;
  padding: 0 1rem;
  z-index: 4;
  pointer-events: none;
`;

const CarouselButton = styled.button`
  background: rgba(255, 255, 255, 0.25);
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: white;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  font-size: 0.9rem;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: auto;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);

  &:hover {
    background: rgba(255, 255, 255, 0.4);
    transform: scale(1.1);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }

  &:active {
    transform: scale(0.95);
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    width: 32px;
    height: 32px;
    font-size: 0.8rem;
    padding: 0.4rem;
  }
`;

const CarouselDots = styled.div`
  position: absolute;
  bottom: 1.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 4;
  padding: 0.5rem 1rem;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border-radius: 20px;
`;

const Dot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: none;
  background: ${props => props.active ? 'white' : 'rgba(255, 255, 255, 0.5)'};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background: white;
    transform: scale(1.2);
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 3rem;
  margin-top: 2rem;
  color: white;
  padding: 0 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 1rem;
  text-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  color: #ffffff;
  letter-spacing: -0.5px;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  opacity: 1;
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.95);
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  font-weight: 400;

  @media (max-width: 768px) {
    font-size: 1rem;
    padding: 0 1rem;
  }
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.75rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;
  align-items: center;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
  padding: 0 2rem;
`;

const ViewModeToggle = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 0.25rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ViewModeButton = styled.button`
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.25)' : 'transparent'};
  border: none;
  color: white;
  padding: 0.5rem 0.875rem;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.85rem;
  font-weight: 500;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
  }
`;

const FilterBar = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
  padding: 1rem 2rem;
  flex-wrap: wrap;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const FilterTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const FilterTab = styled.button`
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.25)' : 'rgba(255, 255, 255, 0.1)'};
  border: 1px solid ${props => props.active ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.2)'};
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 500;
  font-size: 0.85rem;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }
`;

const StatsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-bottom: 2rem;
  padding: 1rem 2rem;
  flex-wrap: wrap;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const StatCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  color: white;
  padding: 0.5rem 1rem;
  min-width: 80px;
`;

const StatNumber = styled.div`
  font-size: 1.75rem;
  font-weight: 800;
  color: #ffffff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  line-height: 1;
`;

const StatLabel = styled.div`
  font-size: 0.7rem;
  opacity: 0.9;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const HeroStatNumber = styled.div`
  font-size: 2rem;
  font-weight: 800;
  margin-bottom: 0.5rem;
  color: #ffffff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const HeroStatLabel = styled.div`
  font-size: 0.85rem;
  opacity: 0.95;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const EventCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;
  border: 1px solid rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 35px rgba(0, 0, 0, 0.25);
    border-color: rgba(102, 126, 234, 0.3);
  }
`;

const EventBadge = styled.div`
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  background: ${props => {
    switch(props.frequency) {
      case 'annual': return 'linear-gradient(135deg, #ff6b6b, #ee5a24)';
      case 'monthly': return 'linear-gradient(135deg, #4ecdc4, #44a08d)';
      case 'weekly': return 'linear-gradient(135deg, #45b7d1, #96c93d)';
      default: return 'linear-gradient(135deg, #667eea, #764ba2)';
    }
  }};
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.65rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.3px;
  z-index: 2;
`;

const EventTypeBadge = styled.div`
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.2rem 0.5rem;
  border-radius: 12px;
  font-size: 0.65rem;
  font-weight: 500;
  z-index: 2;
`;

const EventInfo = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  min-height: 180px;
`;

const EventTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  line-height: 1.4;
  min-height: 2.8em;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const EventMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
  font-size: 0.8rem;
  color: #5a6c7d;
  font-weight: 500;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const EventDescription = styled.p`
  color: #5a6c7d;
  line-height: 1.6;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
`;

const EventStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 0.75rem;
  border-top: 1px solid #ecf0f1;
`;

const ImageCount = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: #667eea;
  font-weight: 500;
  font-size: 0.75rem;
`;

const EventActions = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const ActionButton = styled.button`
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  color: #6c757d;
  padding: 0.4rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  font-size: 0.75rem;

  &:hover {
    background: #667eea;
    color: white;
    transform: translateY(-2px);
  }
`;

const TimelineView = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 0 2rem;
`;

const TimelineItem = styled(motion.div)`
  position: relative;
  margin-bottom: 3rem;
  padding-left: 3rem;

  &::before {
    content: '';
    position: absolute;
    left: 1rem;
    top: 0;
    bottom: -3rem;
    width: 2px;
    background: linear-gradient(to bottom, #667eea, #764ba2);
  }

  &::after {
    content: '';
    position: absolute;
    left: 0.5rem;
    top: 1rem;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    background: #667eea;
    border: 3px solid white;
    box-shadow: 0 0 0 3px #667eea;
  }
`;

const TimelineYear = styled.div`
  position: absolute;
  left: -4rem;
  top: 0.5rem;
  background: rgba(255, 255, 255, 0.9);
  color: #2c3e50;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.9rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 0.65rem 1rem 0.65rem 2.75rem;
  border: none;
  border-radius: 20px;
  font-size: 0.9rem;
  width: 280px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:focus {
    outline: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 1);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 280px;
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 1rem;
  color: #7f8c8d;
  z-index: 1;
`;

const FilterSelect = styled.select`
  padding: 0.65rem 1.25rem;
  border: none;
  border-radius: 20px;
  font-size: 0.9rem;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  min-width: 140px;

  &:focus {
    outline: none;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    transform: translateY(-1px);
    background: rgba(255, 255, 255, 1);
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1rem;
  padding: 0 1.5rem;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    gap: 0.75rem;
  }
`;

const CardImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform 0.3s ease;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  
  &:hover {
    transform: scale(1.05);
  }
`;


const ImageViewerOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.95);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100000;
  padding: 2rem;
`;

const ImageViewerContent = styled(motion.div)`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const CloseButton = styled.button`
  position: fixed;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.98);
  border: 3px solid rgba(255, 255, 255, 0.5);
  color: #2c3e50;
  font-size: 1rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 
    0 10px 40px rgba(0, 0, 0, 0.5),
    0 0 0 3px rgba(255, 107, 107, 0.3);
  z-index: 100001;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-weight: 700;

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.2) rotate(90deg);
    box-shadow: 
      0 15px 50px rgba(0, 0, 0, 0.6),
      0 0 0 4px rgba(255, 107, 107, 0.5);
    color: #ff6b6b;
    border-color: rgba(255, 107, 107, 0.5);
  }

  &:active {
    transform: scale(1.1) rotate(90deg);
  }

  @media (max-width: 768px) {
    top: 20px;
    right: 20px;
    width: 60px;
    height: 60px;
    font-size: 1.75rem;
    padding: 0.875rem;
  }
`;

const NavButton = styled.button`
  position: fixed;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.98);
  border: 3px solid rgba(255, 255, 255, 0.5);
  color: #2c3e50;
  font-size: 1rem;
  padding: 1rem 1rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 
    0 12px 45px rgba(0, 0, 0, 0.5),
    0 0 0 3px rgba(102, 126, 234, 0.3);
  z-index: 100001;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  font-weight: 700;

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-50%) scale(1.2);
    box-shadow: 
      0 18px 60px rgba(0, 0, 0, 0.6),
      0 0 0 4px rgba(102, 126, 234, 0.5);
    color: #667eea;
    border-color: rgba(102, 126, 234, 0.5);
  }

  &:active {
    transform: translateY(-50%) scale(1.1);
  }

  &.prev {
    left: 30px;
    
    @media (max-width: 768px) {
      left: 15px;
      width: 70px;
      height: 70px;
      font-size: 2.5rem;
      padding: 1.25rem 1.5rem;
    }
  }

  &.next {
    right: 30px;
    
    @media (max-width: 768px) {
      right: 15px;
      width: 70px;
      height: 70px;
      font-size: 2.5rem;
      padding: 1.25rem 1.5rem;
    }
  }
`;

const ViewerImage = styled.img`
  max-width: 85vw;
  max-height: 75vh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 16px;
  box-shadow: 
    0 5px 8px rgba(0, 0, 0, 0.6),
    0 0 0 4px rgba(255, 255, 255, 0.1),
    0 0 0 8px rgba(0, 0, 0, 0.3);
  border: 3px solid rgba(255, 255, 255, 0.15);
  background: rgba(0, 0, 0, 0.3);
  padding: 8px;
`;

const ImageCaption = styled.div`
  color: white;
  text-align: center;
  margin-top: 2rem;
  max-width: 700px;
  padding: 1.5rem;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const ImageTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const ImageDescription = styled.p`
  font-size: 1rem;
  opacity: 0.8;
  line-height: 1.5;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
  color: white;
  font-size: 1.2rem;
`;

const EmptyState = styled.div`
  text-align: center;
  color: white;
  padding: 4rem 2rem;
`;

const EmptyIcon = styled.div`
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.7;
`;

const EmptyTitle = styled.h3`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

const EmptyText = styled.p`
  font-size: 1.1rem;
  opacity: 0.8;
`;

const Gallery = () => {
  const [galleries, setGalleries] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [filteredGalleries, setFilteredGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [yearFilter, setYearFilter] = useState('');
  const [frequencyFilter, setFrequencyFilter] = useState('all');
  const [viewMode, setViewMode] = useState('grid'); // grid, list, timeline
  const [selectedGallery, setSelectedGallery] = useState(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showViewer, setShowViewer] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    fetchGalleries();
  }, []);

  useEffect(() => {
    filterGalleries();
  }, [galleries, searchTerm, yearFilter, frequencyFilter]); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-play carousel
  useEffect(() => {
    if (!isAutoPlaying || filteredGalleries.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % filteredGalleries.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, filteredGalleries.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % filteredGalleries.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + filteredGalleries.length) % filteredGalleries.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const fetchGalleries = async () => {
    try {
      setLoading(true);
      const response = await api.get('/gallery');
      if (response.data.success) {
        const items = response.data.data || [];
        setGalleries(items);
        setFeatured(items.filter(i => i.isFeatured));
      }
    } catch (error) {
      console.error('Error fetching galleries:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterGalleries = () => {
    let filtered = galleries;

    if (searchTerm) {
      filtered = filtered.filter(gallery =>
        gallery.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gallery.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        gallery.eventLocation?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (yearFilter) {
      filtered = filtered.filter(gallery =>
        gallery.customFields?.year?.toString() === yearFilter
      );
    }

    if (frequencyFilter !== 'all') {
      filtered = filtered.filter(gallery =>
        gallery.eventFrequency === frequencyFilter
      );
    }

    setFilteredGalleries(filtered);
  };

  const openImageViewer = (gallery, imageIndex = 0) => {
    setSelectedGallery(gallery);
    setSelectedImageIndex(imageIndex);
    setShowViewer(true);
  };

  const closeImageViewer = () => {
    setShowViewer(false);
    setSelectedGallery(null);
    setSelectedImageIndex(0);
  };

  const navigateImage = (direction) => {
    if (!selectedGallery || !selectedGallery.images) return;

    const totalImages = selectedGallery.images.length;
    let newIndex = selectedImageIndex + direction;

    if (newIndex < 0) newIndex = totalImages - 1;
    if (newIndex >= totalImages) newIndex = 0;

    setSelectedImageIndex(newIndex);
  };

  useEffect(() => {
    if (!showViewer) return;
    
    const handleKeyDown = (e) => {
      switch (e.key) {
        case 'Escape':
          closeImageViewer();
          break;
        case 'ArrowLeft':
          navigateImage(-1);
          break;
        case 'ArrowRight':
          navigateImage(1);
          break;
        default:
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [showViewer, selectedImageIndex, selectedGallery]); // eslint-disable-line react-hooks/exhaustive-deps

  const years = [...new Set(galleries.map(g => g.customFields?.year).filter(Boolean))].sort((a, b) => b - a);
  const groupedByYear = years.map(yr => ({
    year: yr,
    items: filteredGalleries.filter(g => (g.customFields?.year) === yr)
  }));

  // Calculate statistics
  const stats = {
    totalEvents: galleries.length,
    totalImages: galleries.reduce((sum, g) => sum + (g.images?.length || 0), 0),
    annualEvents: galleries.filter(g => g.eventFrequency === 'annual').length,
    monthlyEvents: galleries.filter(g => g.eventFrequency === 'monthly').length,
    weeklyEvents: galleries.filter(g => g.eventFrequency === 'weekly').length,
    featuredEvents: galleries.filter(g => g.isFeatured).length
  };

  const renderEventCard = (gallery) => (
    <EventCard
      key={gallery._id}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onClick={() => openImageViewer(gallery)}
    >
      {gallery.images && gallery.images.length > 0 && (
        <CardImage
          src={gallery.images[0].url}
          alt={gallery.images[0].alt || gallery.title}
        />
      )}
      <EventBadge frequency={gallery.eventFrequency}>
        {gallery.eventFrequency === 'annual' && <FaCalendarCheck />}
        {gallery.eventFrequency === 'monthly' && <FaCalendarAlt />}
        {gallery.eventFrequency === 'weekly' && <FaCalendarWeek />}
        {gallery.eventFrequency || 'one-time'}
      </EventBadge>
      {gallery.eventType && (
        <EventTypeBadge>{gallery.eventType}</EventTypeBadge>
      )}
      <EventInfo>
        <EventTitle>{gallery.title}</EventTitle>
        <EventMeta>
          <MetaItem>
            <FaCalendarAlt /> {gallery.customFields?.year || 'No year'}
          </MetaItem>
          {gallery.eventDate && (
            <MetaItem>
              <FaClock /> {new Date(gallery.eventDate).toLocaleDateString()}
            </MetaItem>
          )}
          {gallery.eventLocation && (
            <MetaItem>
              <FaMapMarkerAlt /> {gallery.eventLocation}
            </MetaItem>
          )}
        </EventMeta>
        <EventDescription>{gallery.content}</EventDescription>
        <EventStats>
          <ImageCount>
            <FaExpand /> {gallery.images?.length || 0} images
          </ImageCount>
          <EventActions>
            <ActionButton onClick={(e) => { e.stopPropagation(); openImageViewer(gallery); }}>
              <FaExpand />
            </ActionButton>
            <ActionButton onClick={(e) => { e.stopPropagation(); }}>
              <FaHeart />
            </ActionButton>
            <ActionButton onClick={(e) => { e.stopPropagation(); }}>
              <FaShare />
            </ActionButton>
          </EventActions>
        </EventStats>
      </EventInfo>
    </EventCard>
  );

  if (loading) {
    return (
      <GalleryContainer>
        <LoadingContainer>
          <FaSpinner className="fa-spin" style={{ marginRight: '1rem' }} />
          Loading gallery...
        </LoadingContainer>
      </GalleryContainer>
    );
  }

  return (
    <GalleryContainer>
      <HeroSection>
        <HeroCarousel>
          {featured.length > 0 ? (
            <>
              {featured.map((gallery, index) => (
                <CarouselSlide
                  key={gallery._id}
                  initial={{ opacity: 0 }}
                  animate={{ 
                    opacity: index === currentSlide ? 1 : 0,
                    scale: index === currentSlide ? 1 : 1.1
                  }}
                  transition={{ duration: 0.5 }}
                  style={{ zIndex: index === currentSlide ? 1 : 0 }}
                >
                  {gallery.images && gallery.images.length > 0 && (
                    <SlideImage bgImage={gallery.images[0].url} />
                  )}
                  <SlideOverlay />
                  <SlideContent>
                    <SlideTitle>{gallery.title}</SlideTitle>
                    <SlideSubtitle>{gallery.content}</SlideSubtitle>
                    <SlideYear>
                      <FaCalendarAlt /> {gallery.customFields?.year || 'No year'}
                    </SlideYear>
                    
                    <SlideActions>
                      <CTAButton
                        primary
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => openImageViewer(gallery)}
                      >
                        <FaExpand /> View Gallery
                      </CTAButton>
                      <CTAButton
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                          document.querySelector('.gallery-section')?.scrollIntoView({ 
                            behavior: 'smooth' 
                          });
                        }}
                      >
                        <FaTh /> Browse All
                      </CTAButton>
                    </SlideActions>

                    <HeroStats>
                      <StatItem>
                        <HeroStatNumber>{gallery.images?.length || 0}</HeroStatNumber>
                        <HeroStatLabel>Photos</HeroStatLabel>
                      </StatItem>
                      <StatItem>
                        <HeroStatNumber>{gallery.customFields?.year || 'N/A'}</HeroStatNumber>
                        <HeroStatLabel>Year</HeroStatLabel>
                      </StatItem>
                      <StatItem>
                        <HeroStatNumber>{gallery.eventFrequency || 'One-time'}</HeroStatNumber>
                        <HeroStatLabel>Event Type</HeroStatLabel>
                      </StatItem>
                    </HeroStats>
                  </SlideContent>
                </CarouselSlide>
              ))}
              
              {featured.length > 1 && (
                <>
                  <CarouselControls>
                    <CarouselButton onClick={prevSlide}>
                      <FaChevronLeft />
                    </CarouselButton>
                    <CarouselButton onClick={nextSlide}>
                      <FaChevronRight />
                    </CarouselButton>
                  </CarouselControls>
                  
                  <CarouselDots>
                    {featured.map((_, index) => (
                      <Dot
                        key={index}
                        active={index === currentSlide}
                        onClick={() => goToSlide(index)}
                      />
                    ))}
                  </CarouselDots>
                </>
              )}
            </>
          ) : (
            <CarouselSlide
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
                <SlideOverlay />
                <SlideContent>
                  <SlideTitle>Welcome to Our Gallery</SlideTitle>
                  <SlideSubtitle>
                    Discover the inspiring moments and achievements from our programs and events. 
                    From annual celebrations to monthly workshops and weekly outreach programs, 
                    see how we're making a difference in our community.
                  </SlideSubtitle>
                  <SlideYear>
                    <FaCalendarAlt /> {new Date().getFullYear()}
                  </SlideYear>
                  
                  <SlideActions>
                    <CTAButton
                      primary
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        document.querySelector('.gallery-section')?.scrollIntoView({ 
                          behavior: 'smooth' 
                        });
                      }}
                    >
                      <FaTh /> Explore Gallery
                    </CTAButton>
                    <CTAButton
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        document.querySelector('.gallery-section')?.scrollIntoView({ 
                          behavior: 'smooth' 
                        });
                      }}
                    >
                      <FaCalendarAlt /> View Events
                    </CTAButton>
                  </SlideActions>

                  <HeroStats>
                    <StatItem>
                      <HeroStatNumber>{stats.totalEvents}</HeroStatNumber>
                      <HeroStatLabel>Total Events</HeroStatLabel>
                    </StatItem>
                    <StatItem>
                      <HeroStatNumber>{stats.totalImages}</HeroStatNumber>
                      <HeroStatLabel>Photos</HeroStatLabel>
                    </StatItem>
                    <StatItem>
                      <HeroStatNumber>{stats.annualEvents}</HeroStatNumber>
                      <HeroStatLabel>Annual Events</HeroStatLabel>
                    </StatItem>
                  </HeroStats>
                </SlideContent>
              </CarouselSlide>
          )}
        </HeroCarousel>
      </HeroSection>

      <div className="gallery-section">
        <Header>
          <Title>Our Gallery</Title>
          <Subtitle>
            Explore the inspiring moments and achievements from our programs and events. 
            Discover the impact we're making in our community through annual celebrations, 
            monthly workshops, and weekly outreach programs.
          </Subtitle>
        </Header>
      </div>

      {/* Statistics - Compact Display */}
      {stats.totalEvents > 0 && (
        <StatsContainer>
          <StatCard
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
          >
            <StatNumber>{stats.totalEvents}</StatNumber>
            <StatLabel>Events</StatLabel>
          </StatCard>
          <StatCard
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
          >
            <StatNumber>{stats.totalImages}</StatNumber>
            <StatLabel>Images</StatLabel>
          </StatCard>
          {stats.annualEvents > 0 && (
            <StatCard
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <StatNumber>{stats.annualEvents}</StatNumber>
              <StatLabel>Annual</StatLabel>
            </StatCard>
          )}
          {stats.monthlyEvents > 0 && (
            <StatCard
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25 }}
            >
              <StatNumber>{stats.monthlyEvents}</StatNumber>
              <StatLabel>Monthly</StatLabel>
            </StatCard>
          )}
          {stats.weeklyEvents > 0 && (
            <StatCard
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <StatNumber>{stats.weeklyEvents}</StatNumber>
              <StatLabel>Weekly</StatLabel>
            </StatCard>
          )}
        </StatsContainer>
      )}

      {/* Unified Filter Bar */}
      <FilterBar>
        <FilterTabs>
          <FilterTab
            active={frequencyFilter === 'all'}
            onClick={() => setFrequencyFilter('all')}
          >
            <FaFilter /> All
          </FilterTab>
          <FilterTab
            active={frequencyFilter === 'annual'}
            onClick={() => setFrequencyFilter('annual')}
          >
            <FaCalendarCheck /> Annual
          </FilterTab>
          <FilterTab
            active={frequencyFilter === 'monthly'}
            onClick={() => setFrequencyFilter('monthly')}
          >
            <FaCalendarAlt /> Monthly
          </FilterTab>
          <FilterTab
            active={frequencyFilter === 'weekly'}
            onClick={() => setFrequencyFilter('weekly')}
          >
            <FaCalendarWeek /> Weekly
          </FilterTab>
        </FilterTabs>
      </FilterBar>

      {/* Search and View Controls */}
      <Controls>
        <SearchContainer>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
        {years.length > 0 && (
          <FilterSelect
            value={yearFilter}
            onChange={(e) => setYearFilter(e.target.value)}
          >
            <option value="">All Years</option>
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </FilterSelect>
        )}
        <ViewModeToggle>
          <ViewModeButton
            active={viewMode === 'grid'}
            onClick={() => setViewMode('grid')}
            title="Grid View"
          >
            <FaTh />
          </ViewModeButton>
          <ViewModeButton
            active={viewMode === 'list'}
            onClick={() => setViewMode('list')}
            title="List View"
          >
            <FaList />
          </ViewModeButton>
          <ViewModeButton
            active={viewMode === 'timeline'}
            onClick={() => setViewMode('timeline')}
            title="Timeline View"
          >
            <FaThLarge />
          </ViewModeButton>
        </ViewModeToggle>
      </Controls>

      {filteredGalleries.length === 0 ? (
        <EmptyState>
          <EmptyIcon>📸</EmptyIcon>
          <EmptyTitle>No Events Found</EmptyTitle>
          <EmptyText>
            {searchTerm || yearFilter 
              ? 'Try adjusting your search criteria' 
              : 'No gallery events have been added yet'
            }
          </EmptyText>
        </EmptyState>
      ) : (
        <>
          {viewMode === 'timeline' ? (
            <TimelineView>
              {groupedByYear.map(group => (
                <div key={group.year}>
                  <TimelineYear>{group.year}</TimelineYear>
                  {group.items.map((gallery) => (
                    <TimelineItem
                      key={gallery._id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {renderEventCard(gallery)}
                    </TimelineItem>
                  ))}
                </div>
              ))}
            </TimelineView>
          ) : viewMode === 'list' ? (
            <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 2rem' }}>
              {filteredGalleries.map((gallery) => (
                <div key={gallery._id} style={{ marginBottom: '2rem' }}>
                  {renderEventCard(gallery)}
                </div>
              ))}
            </div>
          ) : (
            groupedByYear.map(group => (
              <div key={group.year} style={{ margin: '3rem auto', maxWidth: '1400px' }}>
                <div style={{ 
                  color: 'white', 
                  margin: '0 2rem 2rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem',
                  padding: '1rem 1.5rem',
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '15px',
                  border: '1px solid rgba(255, 255, 255, 0.3)',
                  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
                  maxWidth: '300px'
                }}>
                  <FaCalendarAlt style={{ fontSize: '1.5rem' }} /> 
                  <span style={{ fontSize: '1.5rem', fontWeight: 800, textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)' }}>
                    {group.year}
                  </span>
                </div>
                <GalleryGrid>
                  {group.items.map((gallery) => renderEventCard(gallery))}
                </GalleryGrid>
              </div>
            ))
          )}
        </>
      )}

      <AnimatePresence>
        {showViewer && selectedGallery && (
          <ImageViewerOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeImageViewer}
          >
            <ImageViewerContent
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.8 }}
              onClick={(e) => e.stopPropagation()}
            >
              <CloseButton onClick={closeImageViewer}>
                <FaTimes />
              </CloseButton>

              {selectedGallery.images && selectedGallery.images.length > 0 && (
                <>
                  <NavButton
                    className="prev"
                    onClick={() => navigateImage(-1)}
                  >
                    <FaChevronLeft />
                  </NavButton>

                  <ViewerImage
                    src={selectedGallery.images[selectedImageIndex].url}
                    alt={selectedGallery.images[selectedImageIndex].alt || selectedGallery.title}
                  />

                  <NavButton
                    className="next"
                    onClick={() => navigateImage(1)}
                  >
                    <FaChevronRight />
                  </NavButton>

                  <ImageCaption>
                    <ImageTitle>{selectedGallery.title}</ImageTitle>
                    <ImageDescription>
                      {selectedGallery.images[selectedImageIndex].caption || 
                       selectedGallery.images[selectedImageIndex].alt ||
                       selectedGallery.content}
                    </ImageDescription>
                    <div style={{ marginTop: '1rem', fontSize: '0.9rem', opacity: 0.7 }}>
                      {selectedImageIndex + 1} of {selectedGallery.images.length}
                    </div>
                  </ImageCaption>
                </>
              )}
            </ImageViewerContent>
          </ImageViewerOverlay>
        )}
      </AnimatePresence>
    </GalleryContainer>
  );
};

export default Gallery;