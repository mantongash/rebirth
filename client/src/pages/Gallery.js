import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaTimes, FaChevronLeft, FaChevronRight, FaExpand, FaHeart, FaShare, FaSearch, FaFilter, FaCalendarAlt, FaSpinner, FaMapMarkerAlt, FaClock, FaTh, FaList, FaThLarge, FaCalendarWeek, FaCalendarCheck } from 'react-icons/fa';
import api from '../services/api';

// Main Container
const GalleryContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 0;
`;

const HeroSection = styled.div`
  position: relative;
  height: 80vh;
  min-height: 600px;
  overflow: hidden;
  margin-bottom: 4rem;
  border-radius: 0 0 30px 30px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
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
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.7) 0%, rgba(118, 75, 162, 0.7) 100%);
  z-index: 1;
`;

const SlideContent = styled.div`
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  max-width: 900px;
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

const SlideTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const SlideSubtitle = styled.p`
  font-size: 1.3rem;
  opacity: 0.95;
  margin-bottom: 2rem;
  line-height: 1.6;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

const SlideYear = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(255, 255, 255, 0.2);
  padding: 0.5rem 1rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: 500;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  margin-bottom: 2rem;
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
  padding: 1rem 2rem;
  border-radius: 30px;
  font-size: 1rem;
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
  gap: 2rem;
  margin-top: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

const StatItem = styled.div`
  text-align: center;
  color: white;
  opacity: 0.9;
`;

const StatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const CarouselControls = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 1rem;
  z-index: 3;
`;

const CarouselButton = styled.button`
  background: rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.75rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  font-size: 1.2rem;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: scale(1.1);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const CarouselDots = styled.div`
  position: absolute;
  bottom: 1rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  z-index: 3;
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
  color: white;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  opacity: 0.9;
  max-width: 600px;
  margin: 0 auto;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 3rem;
  flex-wrap: wrap;
  align-items: center;
`;

const ViewModeToggle = styled.div`
  display: flex;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 25px;
  padding: 0.25rem;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const ViewModeButton = styled.button`
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.3)' : 'transparent'};
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.9rem;
  font-weight: 500;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const FilterTabs = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const FilterTab = styled.button`
  background: ${props => props.active ? 'rgba(255, 255, 255, 0.3)' : 'rgba(255, 255, 255, 0.1)'};
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 500;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const StatsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
  margin-bottom: 3rem;
  padding: 0 2rem;
  max-width: 1200px;
  margin-left: auto;
  margin-right: auto;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  color: white;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const HeroStatNumber = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const HeroStatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.9;
`;

const EventCard = styled(motion.div)`
  background: white;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  cursor: pointer;
  position: relative;

  &:hover {
    transform: translateY(-10px);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  }
`;

const EventBadge = styled.div`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: ${props => {
    switch(props.frequency) {
      case 'annual': return 'linear-gradient(135deg, #ff6b6b, #ee5a24)';
      case 'monthly': return 'linear-gradient(135deg, #4ecdc4, #44a08d)';
      case 'weekly': return 'linear-gradient(135deg, #45b7d1, #96c93d)';
      default: return 'linear-gradient(135deg, #667eea, #764ba2)';
    }
  }};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.7rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 2;
`;

const EventTypeBadge = styled.div`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 15px;
  font-size: 0.7rem;
  font-weight: 500;
  z-index: 2;
`;

const EventInfo = styled.div`
  padding: 1.5rem;
`;

const EventTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 0.5rem;
  line-height: 1.3;
`;

const EventMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  color: #7f8c8d;
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
  font-size: 0.95rem;
`;

const EventStats = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  border-top: 1px solid #ecf0f1;
`;

const ImageCount = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #667eea;
  font-weight: 500;
  font-size: 0.9rem;
`;

const EventActions = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const ActionButton = styled.button`
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  color: #6c757d;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;

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
  padding: 0.75rem 1rem 0.75rem 3rem;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  width: 300px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 1rem;
  color: #7f8c8d;
  z-index: 1;
`;

const FilterSelect = styled.select`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 25px;
  font-size: 1rem;
  background: white;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: all 0.3s ease;

  &:focus {
    outline: none;
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    transform: translateY(-2px);
  }
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
  padding: 0 2rem;
  max-width: 1400px;
  margin: 0 auto;
`;

const CardImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  transition: transform 0.3s ease;
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
  z-index: 1000;
  padding: 2rem;
`;

const ImageViewerContent = styled(motion.div)`
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -50px;
  right: 0;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 1.5rem;
  padding: 0.5rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.1);
  }
`;

const NavButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  font-size: 1.5rem;
  padding: 1rem;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-50%) scale(1.1);
  }

  &.prev {
    left: -60px;
  }

  &.next {
    right: -60px;
  }
`;

const ViewerImage = styled.img`
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 10px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`;

const ImageCaption = styled.div`
  color: white;
  text-align: center;
  margin-top: 1rem;
  max-width: 600px;
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
  }, [galleries, searchTerm, yearFilter, frequencyFilter]);

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

  const handleKeyPress = (e) => {
    if (!showViewer) return;

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

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [showViewer, selectedImageIndex, selectedGallery]);

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

      {/* Statistics */}
      <StatsContainer>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <StatNumber>{stats.totalEvents}</StatNumber>
          <StatLabel>Total Events</StatLabel>
        </StatCard>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <StatNumber>{stats.totalImages}</StatNumber>
          <StatLabel>Total Images</StatLabel>
        </StatCard>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <StatNumber>{stats.annualEvents}</StatNumber>
          <StatLabel>Annual Events</StatLabel>
        </StatCard>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <StatNumber>{stats.monthlyEvents}</StatNumber>
          <StatLabel>Monthly Events</StatLabel>
        </StatCard>
        <StatCard
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <StatNumber>{stats.weeklyEvents}</StatNumber>
          <StatLabel>Weekly Events</StatLabel>
        </StatCard>
      </StatsContainer>

      {/* Filter Tabs */}
      <FilterTabs>
        <FilterTab
          active={frequencyFilter === 'all'}
          onClick={() => setFrequencyFilter('all')}
        >
          <FaFilter /> All Events
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

      <Controls>
        <SearchContainer>
          <SearchIcon />
          <SearchInput
            type="text"
            placeholder="Search events, locations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </SearchContainer>
        <FilterSelect
          value={yearFilter}
          onChange={(e) => setYearFilter(e.target.value)}
        >
          <option value="">All Years</option>
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </FilterSelect>
        <ViewModeToggle>
          <ViewModeButton
            active={viewMode === 'grid'}
            onClick={() => setViewMode('grid')}
          >
            <FaTh /> Grid
          </ViewModeButton>
          <ViewModeButton
            active={viewMode === 'list'}
            onClick={() => setViewMode('list')}
          >
            <FaList /> List
          </ViewModeButton>
          <ViewModeButton
            active={viewMode === 'timeline'}
            onClick={() => setViewMode('timeline')}
          >
            <FaThLarge /> Timeline
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
              <div key={group.year} style={{ margin: '2rem auto', maxWidth: '1400px' }}>
                <div style={{ color: 'white', margin: '0 2rem 1rem', opacity: 0.9, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <FaCalendarAlt /> <span style={{ fontSize: '1.25rem', fontWeight: 700 }}>{group.year}</span>
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