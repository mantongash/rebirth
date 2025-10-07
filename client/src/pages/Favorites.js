import React, { useState, useEffect } from 'react';
import { useFavorites } from '../context/FavoritesContext';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { 
  FaHeart, 
  FaTrash, 
  FaShoppingCart, 
  FaArrowLeft,
  FaFilter,
  FaSort,
  FaTh,
  FaList,
  FaStar,
  FaEye,
  FaCheck,
  FaTimes,
  FaShoppingBag,
  FaRocket,
  FaGem
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { API_MAIN } from '../api';
import ProductRating from '../components/ProductRating';
import styled, { keyframes } from 'styled-components';

// Animations
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const slideIn = keyframes`
  from { transform: translateX(100%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.05); }
`;

// removed unused bounce animation

const glow = keyframes`
  0%, 100% { box-shadow: 0 0 5px rgba(231, 76, 60, 0.3); }
  50% { box-shadow: 0 0 20px rgba(231, 76, 60, 0.6); }
`;

// Styled Components
const Container = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 0;
`;

const Header = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px 0;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BackButton = styled.button`
  background: rgba(255,255,255,0.2);
  border: none;
  color: white;
  padding: 12px 16px;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255,255,255,0.3);
    transform: translateX(-2px);
  }
`;

const HeaderTitle = styled.h1`
  margin: 0;
  font-size: 28px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const FeatureBadge = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255,255,255,0.2);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
`;

const ClearButton = styled.button`
  background: #e74c3c;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #c0392b;
    transform: translateY(-2px);
  }
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
`;

const PageHeader = styled.div`
  background: white;
  padding: 25px 30px;
  border-radius: 16px;
  margin-bottom: 30px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  flex-wrap: wrap;
`;

const HeaderInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const Title = styled.h2`
  margin: 0;
  color: #2c3e50;
  font-size: 28px;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ItemCount = styled.div`
  color: #7f8c8d;
  font-size: 16px;
  font-weight: 500;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  padding: 12px 20px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &.primary {
    background: #667eea;
    color: white;
    border: none;
    
    &:hover {
      background: #5a6fd8;
      transform: translateY(-2px);
    }
  }
  
  &.secondary {
    background: #e74c3c;
    color: white;
    border: none;
    
    &:hover {
      background: #c0392b;
      transform: translateY(-2px);
    }
  }
`;

const FiltersSection = styled.div`
  background: white;
  padding: 20px 30px;
  border-radius: 16px;
  margin-bottom: 30px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  border: 1px solid rgba(255,255,255,0.2);
`;

const FiltersTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FiltersRow = styled.div`
  display: flex;
  gap: 15px;
  align-items: center;
  flex-wrap: wrap;
`;

const FilterButton = styled.button`
  padding: 8px 16px;
  border: 2px solid ${props => props.active ? '#667eea' : '#e1e8ed'};
  background: ${props => props.active ? '#667eea' : 'white'};
  color: ${props => props.active ? 'white' : '#2c3e50'};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 6px;
  
  &:hover {
    border-color: #667eea;
    background: #667eea;
    color: white;
  }
`;

const SearchInput = styled.input`
  padding: 10px 16px;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  font-size: 14px;
  min-width: 200px;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const ViewToggle = styled.div`
  display: flex;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  overflow: hidden;
`;

const ViewButton = styled.button`
  padding: 8px 12px;
  border: none;
  background: ${props => props.active ? '#667eea' : 'white'};
  color: ${props => props.active ? 'white' : '#2c3e50'};
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #667eea;
    color: white;
  }
`;

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 25px;
  margin-bottom: 40px;
`;

const ProductCard = styled.div`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  transition: all 0.3s ease;
  position: relative;
  animation: ${fadeIn} 0.5s ease-out;
  
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 20px 40px rgba(0,0,0,0.15);
  }
`;

const ProductImage = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  overflow: hidden;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ProductOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(102, 126, 234, 0.8) 0%, rgba(118, 75, 162, 0.8) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s ease;
  
  ${ProductCard}:hover & {
    opacity: 1;
  }
`;

const OverlayButton = styled.button`
  background: white;
  color: #667eea;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const ProductBadges = styled.div`
  position: absolute;
  top: 15px;
  left: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Badge = styled.div`
  padding: 6px 12px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 600;
  color: white;
  
  &.favorite {
    background: #e74c3c;
    animation: ${glow} 2s infinite;
  }
  
  &.sale {
    background: #f39c12;
  }
  
  &.new {
    background: #27ae60;
  }
`;

const ProductActions = styled.div`
  position: absolute;
  top: 15px;
  right: 15px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const ActionIcon = styled.button`
  width: 36px;
  height: 36px;
  background: rgba(255,255,255,0.9);
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${props => props.color || '#2c3e50'};
  
  &:hover {
    background: white;
    transform: scale(1.1);
    color: ${props => props.hoverColor || props.color || '#2c3e50'};
  }
`;

const ProductInfo = styled.div`
  padding: 20px;
`;

const ProductCategory = styled.div`
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
  font-weight: 500;
`;

const ProductName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 12px 0;
  line-height: 1.3;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductDescription = styled.p`
  font-size: 14px;
  color: #7f8c8d;
  margin: 0 0 15px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const ProductRatingContainer = styled.div`
  margin-bottom: 15px;
`;

const ProductPricing = styled.div`
  margin-bottom: 15px;
`;

const PriceRow = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;

const CurrentPrice = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #e74c3c;
`;

const OriginalPrice = styled.div`
  font-size: 16px;
  color: #666;
  text-decoration: line-through;
  font-weight: 500;
`;

const DiscountBadge = styled.div`
  background: #e74c3c;
  color: white;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
`;

const StockStatus = styled.div`
  font-size: 12px;
  color: ${props => props.inStock ? '#27ae60' : '#e74c3c'};
  margin-bottom: 15px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 6px;
`;

const AddToCartButton = styled.button`
  width: 100%;
  padding: 12px 16px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
  }
  
  &:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;

const RelatedSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  margin-bottom: 40px;
`;

const RelatedTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const RelatedProduct = styled.div`
  border: 1px solid #e1e8ed;
  border-radius: 12px;
  overflow: hidden;
  background: white;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px rgba(0,0,0,0.05);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0,0,0,0.15);
  }
`;

const RelatedImage = styled.div`
  width: 100%;
  height: 160px;
  background: #f8f9fa;
  overflow: hidden;
`;

const RelatedInfo = styled.div`
  padding: 15px;
`;

const RelatedCategory = styled.div`
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  margin-bottom: 8px;
`;

const RelatedName = styled.h3`
  font-size: 14px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 8px 0;
  line-height: 1.3;
`;

const RelatedPrice = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #667eea;
`;

const AddButton = styled.button`
  padding: 8px 12px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: #5a6fd8;
    transform: scale(1.05);
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 40px 20px;
`;

const EmptyIcon = styled.div`
  font-size: 80px;
  margin-bottom: 20px;
  animation: ${pulse} 2s infinite;
`;

const EmptyTitle = styled.h2`
  font-size: 28px;
  color: #2c3e50;
  margin-bottom: 16px;
  font-weight: 600;
`;

const EmptyText = styled.p`
  font-size: 16px;
  color: #7f8c8d;
  margin-bottom: 30px;
  line-height: 1.5;
`;

const EmptyButton = styled.button`
  padding: 15px 30px;
  background: #667eea;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;
  
  &:hover {
    background: #5a6fd8;
    transform: translateY(-2px);
  }
`;

const Notification = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  background: #27ae60;
  color: white;
  padding: 12px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  z-index: 1000;
  animation: ${slideIn} 0.3s ease-out;
`;

const LoadingState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 40px 20px;
`;

const LoadingIcon = styled.div`
  font-size: 48px;
  margin-bottom: 24px;
  color: #667eea;
  animation: ${pulse} 1s infinite;
`;

const LoadingTitle = styled.h2`
  margin-bottom: 16px;
  color: #2c3e50;
  font-size: 24px;
`;

const LoadingText = styled.p`
  color: #7f8c8d;
  font-size: 16px;
`;

const AuthRequired = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  text-align: center;
  padding: 40px 20px;
`;

const AuthIcon = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
  color: #e74c3c;
`;

const AuthTitle = styled.h2`
  margin-bottom: 12px;
  color: #2c3e50;
  font-size: 24px;
`;

const AuthText = styled.p`
  color: #7f8c8d;
  margin-bottom: 20px;
  font-size: 16px;
`;

const AuthButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  justify-content: center;
`;

const AuthButton = styled.button`
  padding: 12px 18px;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &.primary {
    background: #667eea;
    color: white;
    border: none;
    
    &:hover {
      background: #5a6fd8;
    }
  }
  
  &.secondary {
    background: #3498db;
    color: white;
    border: none;
    
    &:hover {
      background: #2980b9;
    }
  }
`;

const Favorites = () => {
  const { items: favorites, removeFromFavorites, clearFavorites } = useFavorites();
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [relatedProducts, setRelatedProducts] = useState([]);
  const params = new URLSearchParams(window.location.search);
  const [searchTerm, setSearchTerm] = useState(params.get('q') || '');
  const [sortBy, setSortBy] = useState(params.get('sort') || 'name');
  const [filterBy] = useState(params.get('filter') || 'all');
  const [viewMode, setViewMode] = useState(params.get('view') || 'grid');

  useEffect(() => {
    const next = new URLSearchParams();
    if (searchTerm) next.set('q', searchTerm);
    if (sortBy && sortBy !== 'name') next.set('sort', sortBy);
    if (filterBy && filterBy !== 'all') next.set('filter', filterBy);
    if (viewMode && viewMode !== 'grid') next.set('view', viewMode);
    const query = next.toString();
    const url = query ? `/favorites?${query}` : '/favorites';
    window.history.replaceState(null, '', url);
  }, [searchTerm, sortBy, filterBy, viewMode]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const categories = Array.from(new Set(
          favorites
            .map((p) => p.category)
            .filter((c) => typeof c === 'string' && c.trim().length > 0)
        ));

        const favoriteIds = new Set(favorites.map((p) => p._id).filter(Boolean));

        let fetched = [];
        if (categories.length > 0) {
          const topCategories = categories.slice(0, 2);
          const responses = await Promise.all(
            topCategories.map((cat) => API_MAIN.get(`/shop/products?category=${encodeURIComponent(cat)}&limit=8`))
          );
          responses.forEach(({ data }) => {
            if (data?.success && Array.isArray(data.data)) {
              fetched = fetched.concat(data.data);
            }
          });
        } else {
          const { data } = await API_MAIN.get(`/shop/products?limit=8`);
          if (data?.success && Array.isArray(data.data)) {
            fetched = data.data;
          }
        }

        const unique = new Map();
        fetched.forEach((p) => {
          if (p && p._id && !favoriteIds.has(p._id)) {
            unique.set(p._id, p);
          }
        });
        setRelatedProducts(Array.from(unique.values()).slice(0, 8));
      } catch (err) {
        console.error('Failed to load related products for favorites:', err);
      }
    };

    fetchRelated();
  }, [favorites]);

  const handleAddToCart = (product) => {
    if (!product || !product._id) return;
    addToCart(product, 1);
    setNotification({ show: true, message: `${product.name || 'Item'} added to cart!` });
    setTimeout(() => setNotification({ show: false, message: '' }), 3000);
  };

  const handleRemoveFromFavorites = async (product) => {
    try {
      if (!product || !product._id) return;
      await removeFromFavorites(product._id);
      setNotification({ show: true, message: `${product.name || 'Item'} removed from favorites` });
      setTimeout(() => setNotification({ show: false, message: '' }), 3000);
    } catch (error) {
      console.error('Error removing from favorites:', error);
      setNotification({ show: true, message: 'Failed to remove from favorites. Please try again.' });
      setTimeout(() => setNotification({ show: false, message: '' }), 3000);
    }
  };

  const filteredFavorites = favorites.filter(product => {
    const matchesSearch = product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterBy === 'all' || product.category === filterBy;
    return matchesSearch && matchesFilter;
  });

  const sortedFavorites = [...filteredFavorites].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name?.localeCompare(b.name) || 0;
      case 'price-low':
        return (a.price || 0) - (b.price || 0);
      case 'price-high':
        return (b.price || 0) - (a.price || 0);
      case 'rating':
        return (b.rating?.average || 0) - (a.rating?.average || 0);
      default:
        return 0;
    }
  });

  if (!user) {
    return (
      <Container>
        <Header>
          <HeaderContent>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <BackButton onClick={() => navigate('/')}>
                <FaArrowLeft />
                Back to Home
              </BackButton>
              <HeaderTitle>
                <FaHeart />
                My Favorites
              </HeaderTitle>
            </div>
          </HeaderContent>
        </Header>

        <AuthRequired>
          <AuthIcon>
            <FaHeart />
          </AuthIcon>
          <AuthTitle>Please log in to view favorites</AuthTitle>
          <AuthText>Your favorites are linked to your account.</AuthText>
          <AuthButtons>
            <AuthButton className="primary" onClick={() => navigate('/login', { state: { returnUrl: '/favorites' } })}>
              Login
            </AuthButton>
            <AuthButton className="secondary" onClick={() => navigate('/shop')}>
              Browse Shop
            </AuthButton>
          </AuthButtons>
        </AuthRequired>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container>
        <Header>
          <HeaderContent>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <BackButton onClick={() => navigate('/')}>
                <FaArrowLeft />
                Back to Home
              </BackButton>
              <HeaderTitle>
                <FaHeart />
                My Favorites
              </HeaderTitle>
        </div>
          </HeaderContent>
        </Header>

        <LoadingState>
          <LoadingIcon>⏳</LoadingIcon>
          <LoadingTitle>Loading favorites...</LoadingTitle>
          <LoadingText>Please wait while we load your favorite products.</LoadingText>
        </LoadingState>
      </Container>
    );
  }

  if (favorites.length === 0) {
    return (
      <Container>
        <Header>
          <HeaderContent>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <BackButton onClick={() => navigate('/')}>
                <FaArrowLeft />
                Back to Home
              </BackButton>
              <HeaderTitle>
          <FaHeart />
                My Favorites
              </HeaderTitle>
        </div>
          </HeaderContent>
        </Header>

        <EmptyState>
          <EmptyIcon>
            <FaHeart />
          </EmptyIcon>
          <EmptyTitle>No favorites yet</EmptyTitle>
          <EmptyText>Start adding products to your favorites to see them here.</EmptyText>
          <EmptyButton onClick={() => navigate('/shop')}>
            <FaShoppingBag />
          Browse Products
          </EmptyButton>
        </EmptyState>
      </Container>
    );
  }

  return (
    <Container>
        {notification.show && (
        <Notification>
            {notification.message}
        </Notification>
      )}

      <Header>
        <HeaderContent>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <BackButton onClick={() => navigate('/')}>
              <FaArrowLeft />
              Back to Home
            </BackButton>
            <HeaderTitle>
              <FaHeart />
              My Favorites
            </HeaderTitle>
            </div>
          
          <HeaderActions>
            <FeatureBadge>
              <FaGem />
              {favorites.length} {favorites.length === 1 ? 'item' : 'items'} saved
            </FeatureBadge>
            <ClearButton onClick={clearFavorites}>
              Clear All
            </ClearButton>
          </HeaderActions>
        </HeaderContent>
      </Header>

      <MainContent>
        <PageHeader>
          <HeaderInfo>
            <Title>
              <FaHeart />
              My Favorites
            </Title>
            <ItemCount>{favorites.length} {favorites.length === 1 ? 'item' : 'items'} saved</ItemCount>
          </HeaderInfo>
          
          <ActionButtons>
            <ActionButton className="primary" onClick={() => navigate('/shop')}>
              <FaShoppingBag />
              Continue Shopping
            </ActionButton>
            <ActionButton className="secondary" onClick={clearFavorites}>
              <FaTrash />
              Clear All
            </ActionButton>
          </ActionButtons>
        </PageHeader>

        <FiltersSection>
          <FiltersTitle>
            <FaFilter />
            Filters & Search
          </FiltersTitle>
          <FiltersRow>
            <SearchInput
              type="text"
              placeholder="Search favorites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <FilterButton
              active={sortBy === 'name'}
              onClick={() => setSortBy('name')}
            >
              <FaSort />
              Name
            </FilterButton>
            <FilterButton
              active={sortBy === 'price-low'}
              onClick={() => setSortBy('price-low')}
            >
              Price Low
            </FilterButton>
            <FilterButton
              active={sortBy === 'price-high'}
              onClick={() => setSortBy('price-high')}
            >
              Price High
            </FilterButton>
            <FilterButton
              active={sortBy === 'rating'}
              onClick={() => setSortBy('rating')}
            >
              <FaStar />
              Rating
            </FilterButton>
            <ViewToggle>
              <ViewButton
                active={viewMode === 'grid'}
                onClick={() => setViewMode('grid')}
              >
                <FaTh />
              </ViewButton>
              <ViewButton
                active={viewMode === 'list'}
                onClick={() => setViewMode('list')}
              >
                <FaList />
              </ViewButton>
            </ViewToggle>
          </FiltersRow>
        </FiltersSection>

        <ProductsGrid>
          {sortedFavorites.filter(Boolean).map((product, index) => (
            <ProductCard key={product._id || index}>
              <ProductImage>
              {product.images?.[0]?.url ? (
                  <Image
                  src={product.images[0].url}
                  alt={product.images[0]?.alt || product.name}
                />
              ) : (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  height: '100%',
                  color: '#aaa',
                  fontSize: '14px'
                }}>
                  No Image
                </div>
              )}

                <ProductOverlay>
                  <OverlayButton onClick={() => navigate(`/product/${product._id}`)}>
                    <FaEye />
                    View Details
                  </OverlayButton>
                </ProductOverlay>

                <ProductBadges>
                  <Badge className="favorite">
                <FaHeart />
                  </Badge>
                  {product.onOffer && (
                    <Badge className="sale">Sale</Badge>
                  )}
                </ProductBadges>

                <ProductActions>
                  <ActionIcon
                    color="#e74c3c"
                    hoverColor="#c0392b"
                onClick={() => handleRemoveFromFavorites(product)}
                    title="Remove from favorites"
              >
                <FaTrash />
                  </ActionIcon>
                  <ActionIcon
                    color="#3498db"
                    hoverColor="#2980b9"
                    onClick={() => handleAddToCart(product)}
                    title="Add to cart"
                  >
                    <FaShoppingCart />
                  </ActionIcon>
                </ProductActions>
              </ProductImage>

              <ProductInfo>
                <ProductCategory>{product.category?.replace('-', ' ')}</ProductCategory>
                <ProductName>{product.name}</ProductName>
                <ProductDescription>{product.description}</ProductDescription>

                <ProductRatingContainer>
                <ProductRating
                  currentRating={product.rating?.average || 0}
                  totalRatings={product.rating?.count || 0}
                  readonly={true}
                />
                </ProductRatingContainer>

                <ProductPricing>
                  <PriceRow>
                    <CurrentPrice>KSH {Number(product.price || 0).toFixed(0)}</CurrentPrice>
                    {product.onOffer && product.originalPrice && (
                      <>
                        <OriginalPrice>KSH {Number(product.originalPrice || 0).toFixed(0)}</OriginalPrice>
                        <DiscountBadge>
                      -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                        </DiscountBadge>
                      </>
                    )}
                  </PriceRow>
                </ProductPricing>

                <StockStatus inStock={product.stock > 0}>
                  {product.stock > 0 ? (
                    <>
                      <FaCheck />
                      In Stock ({product.stock})
                    </>
                  ) : (
                    <>
                      <FaTimes />
                      Out of Stock
                    </>
                  )}
                </StockStatus>

                <AddToCartButton
                onClick={() => handleAddToCart(product)}
                  disabled={product.stock <= 0}
              >
                <FaShoppingCart />
                  {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
                </AddToCartButton>
              </ProductInfo>
            </ProductCard>
          ))}
        </ProductsGrid>

        {relatedProducts.length > 0 && (
          <RelatedSection>
            <RelatedTitle>
              <FaRocket />
              Recommended For You
            </RelatedTitle>
            <RelatedGrid>
              {relatedProducts.map((p) => (
                <RelatedProduct
                  key={p._id}
                  onClick={() => navigate(`/product/${p._id}`)}
                >
                  <RelatedImage>
                    {p.images?.[0]?.url ? (
                      <img src={p.images[0].url} alt={p.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', color: '#aaa', fontSize: '14px' }}>No Image</div>
                    )}
                  </RelatedImage>
                  <RelatedInfo>
                    <RelatedCategory>{p.category?.replace('-', ' ')}</RelatedCategory>
                    <RelatedName>{p.name}</RelatedName>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <RelatedPrice>KSH {Number(p.price || 0).toFixed(0)}</RelatedPrice>
                      <AddButton
                        onClick={(e) => { e.stopPropagation(); handleAddToCart(p); }}
                      >
                        Add
                      </AddButton>
      </div>
                  </RelatedInfo>
                </RelatedProduct>
              ))}
            </RelatedGrid>
          </RelatedSection>
        )}

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <EmptyButton onClick={() => navigate('/shop')}>
            <FaShoppingBag />
          Continue Shopping
          </EmptyButton>
      </div>
      </MainContent>
    </Container>
  );
};

export default Favorites;