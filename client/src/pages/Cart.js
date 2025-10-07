import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import { 
  FaTrash, 
  FaMinus, 
  FaPlus, 
  FaShoppingBag, 
  FaArrowLeft,
  FaTruck,
  FaShieldAlt,
  FaCreditCard,
  FaUndo,
  FaCheck,
  FaHeart
} from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import { API_MAIN } from '../api';
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

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 20px 0;
  font-size: 14px;
  color: #666;
`;

const BreadcrumbLink = styled(Link)`
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  
  &:hover {
    text-decoration: underline;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 30px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const CartSection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  border: 1px solid rgba(255,255,255,0.2);
`;

const SectionTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const CartItem = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: 20px;
  padding: 20px;
  border: 2px solid #f8f9fa;
  border-radius: 12px;
  background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%);
  margin-bottom: 16px;
  transition: all 0.3s ease;
  animation: ${fadeIn} 0.5s ease-out;
  
  &:hover {
    border-color: #667eea;
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.15);
    transform: translateY(-2px);
  }
`;

const ProductImage = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 12px;
  overflow: hidden;
  background: #f8f9fa;
  position: relative;
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

const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ProductName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
  margin: 0 0 8px 0;
  line-height: 1.3;
`;

const ProductCategory = styled.p`
  font-size: 12px;
  color: #666;
  margin: 0 0 10px 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const ProductPrice = styled.div`
  font-size: 18px;
  font-weight: 700;
  color: #667eea;
  margin-bottom: 15px;
`;

const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const QuantityLabel = styled.span`
  font-size: 14px;
  font-weight: 600;
  color: #2c3e50;
`;

const QuantityWrapper = styled.div`
  display: flex;
  align-items: center;
  border: 2px solid #e1e8ed;
  border-radius: 8px;
  overflow: hidden;
  background: white;
`;

const QuantityButton = styled.button`
  padding: 8px 12px;
  border: none;
  background: ${props => props.disabled ? '#f8f9fa' : 'white'};
  color: ${props => props.disabled ? '#bdc3c7' : '#2c3e50'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover:not(:disabled) {
    background: #667eea;
    color: white;
  }
`;

const QuantityDisplay = styled.span`
  padding: 8px 16px;
  border-left: 1px solid #e1e8ed;
  border-right: 1px solid #e1e8ed;
  font-size: 14px;
  font-weight: 600;
  min-width: 50px;
  text-align: center;
  background: #f8f9fa;
`;

const ItemActions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: space-between;
`;

const ItemTotal = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 15px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 8px;
`;

const ActionButton = styled.button`
  padding: 10px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s ease;
  
  &.remove {
    background: #e74c3c;
    color: white;
    
    &:hover {
      background: #c0392b;
      transform: scale(1.1);
    }
  }
  
  &.favorite {
    background: #f39c12;
    color: white;
    
    &:hover {
      background: #e67e22;
      transform: scale(1.1);
    }
  }
`;

const SummarySection = styled.div`
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  border: 1px solid rgba(255,255,255,0.2);
  height: fit-content;
  position: sticky;
  top: 120px;
`;

const PriceBreakdown = styled.div`
  margin-bottom: 25px;
`;

const PriceRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f1f3f4;
  
  &.total {
    border-top: 2px solid #e1e8ed;
    margin-top: 15px;
    font-weight: 700;
    font-size: 18px;
  }
`;

const PriceLabel = styled.span`
  font-size: 16px;
  color: #666;
`;

const PriceValue = styled.span`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  
  &.free {
    color: #27ae60;
    font-weight: 700;
  }
  
  &.total {
    font-size: 20px;
    color: #667eea;
  }
`;

const FreeDeliveryBanner = styled.div`
  font-size: 12px;
  color: #666;
  text-align: center;
  padding: 8px;
  background: #f8f9fa;
  border-radius: 6px;
  margin: 10px 0;
`;

const PaymentSection = styled.div`
  margin-bottom: 20px;
`;

const PaymentTitle = styled.div`
  font-size: 16px;
  color: #2c3e50;
  font-weight: 600;
  margin-bottom: 12px;
`;

const PaymentMethods = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
`;

const PaymentMethod = styled.button`
  padding: 12px 16px;
  border-radius: 8px;
  border: 2px solid ${props => props.selected ? '#27ae60' : '#e1e8ed'};
  background: white;
  cursor: pointer;
  font-weight: 600;
  color: #2c3e50;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: #667eea;
  }
`;

const PhoneInput = styled.input`
  width: 100%;
  padding: 12px 16px;
  border-radius: 8px;
  border: 2px solid #e1e8ed;
  font-size: 14px;
  margin-top: 10px;
  transition: border-color 0.3s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const CheckoutButton = styled.button`
  width: 100%;
  padding: 16px 20px;
  background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
  color: white;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  transition: all 0.3s ease;
  margin-bottom: 20px;
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(39, 174, 96, 0.3);
  }
  
  &:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
  }
`;

const SecurityFeatures = styled.div`
  border-top: 1px solid #e1e8ed;
  padding-top: 20px;
`;

const SecurityTitle = styled.h3`
  font-size: 16px;
  font-weight: 600;
  color: #2c3e50;
  margin-bottom: 15px;
`;

const SecurityGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
`;

const SecurityFeature = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 8px;
  font-size: 12px;
  color: #666;
`;

const RelatedSection = styled.div`
  margin-top: 40px;
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
`;

const RelatedTitle = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #2c3e50;
  margin-bottom: 20px;
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
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
  height: 140px;
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

const EmptyActions = styled.div`
  display: flex;
  gap: 15px;
  justify-content: center;
  flex-wrap: wrap;
`;

const EmptyButton = styled.button`
  padding: 15px 30px;
  border-radius: 8px;
  font-size: 16px;
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
    background: transparent;
    color: #667eea;
    border: 2px solid #667eea;
    
    &:hover {
      background: #667eea;
      color: white;
    }
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

const Cart = () => {
  const { items, removeFromCart, updateQuantity, clearCart, addToCart } = useCart();
  const { addToFavorites } = useFavorites();
  const { isAuthenticated } = useAuth();
  const [isCheckingOut] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('paystack');
  const [mpesaPhone, setMpesaPhone] = useState('');
  const navigate = useNavigate();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [notification, setNotification] = useState({ show: false, message: '' });
  const [promoCode, setPromoCode] = useState('');
  const [promoApplying, setPromoApplying] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0); // absolute amount in KSH
  const [savedForLater, setSavedForLater] = useState([]);

  // Saved for later storage helpers (per-user/guest)
  const savedKey = 'saved_for_later';
  useEffect(() => {
    try {
      const raw = localStorage.getItem(savedKey);
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr)) setSavedForLater(arr);
      }
    } catch (_) {}
  }, []);
  useEffect(() => {
    try { localStorage.setItem(savedKey, JSON.stringify(savedForLater)); } catch (_) {}
  }, [savedForLater]);

  const handleSaveForLater = (item) => {
    if (!item || !item.product) return;
    setSavedForLater((prev) => {
      const exists = prev.find((s) => (s.product?._id || s.product) === (item.product?._id || item.product));
      if (exists) return prev;
      return [...prev, { product: item.product, quantity: item.quantity || 1 }];
    });
    removeFromCart(item.product?._id || item.id);
    setNotification({ show: true, message: 'Saved for later' });
    setTimeout(() => setNotification({ show: false, message: '' }), 2000);
  };

  const handleMoveSavedToCart = (saved) => {
    if (!saved || !saved.product || !saved.product._id) return;
    addToCart(saved.product, saved.quantity || 1);
    setSavedForLater((prev) => prev.filter((s) => (s.product?._id || s.product) !== (saved.product?._id || saved.product)));
    setNotification({ show: true, message: 'Moved to cart' });
    setTimeout(() => setNotification({ show: false, message: '' }), 2000);
  };

  const handleMoveToFavorites = async (item) => {
    try {
      if (!item || !item.product) return;
      await addToFavorites(item.product);
      removeFromCart(item.product?._id || item.id);
      setNotification({ show: true, message: 'Moved to favorites' });
      setTimeout(() => setNotification({ show: false, message: '' }), 2000);
    } catch (_) {}
  };

  const handleQuantityChange = (productId, newQuantity) => {
    if (newQuantity >= 1) {
      updateQuantity(productId, newQuantity);
    }
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { returnUrl: '/checkout' } });
      return;
    }
    navigate('/checkout');
  };

  const calculateSubtotal = () => {
    return items.reduce((total, item) => {
      const price = item.product?.price || 0;
      const quantity = item.quantity || 0;
      return total + (price * quantity);
    }, 0);
  };

  const calculateDelivery = () => {
    const subtotal = calculateSubtotal();
    return subtotal >= 2000 ? 0 : 200;
  };

  const calculateTotal = () => {
    const totalBeforePromo = calculateSubtotal() + calculateDelivery();
    const discount = Math.min(promoDiscount, totalBeforePromo);
    return totalBeforePromo - discount;
  };

  const applyPromo = async () => {
    const code = (promoCode || '').trim();
    if (!code) return;
    try {
      setPromoApplying(true);
      // Try server validation first
      try {
        const { data } = await API_MAIN.post('/shop/promo/validate', { code, subtotal: calculateSubtotal() });
        if (data?.success && typeof data.data?.discountAmount === 'number') {
          setPromoDiscount(Math.max(0, Number(data.data.discountAmount)));
          setNotification({ show: true, message: `Promo applied: -KSH ${Number(data.data.discountAmount).toFixed(0)}` });
          setTimeout(() => setNotification({ show: false, message: '' }), 2500);
          return;
        }
      } catch (_) {
        // fall through to client known codes
      }

      // Client-side known codes as fallback
      const codeUpper = code.toUpperCase();
      const subtotal = calculateSubtotal();
      if (codeUpper === 'WELCOME10') {
        setPromoDiscount(Math.floor(subtotal * 0.1));
        setNotification({ show: true, message: 'WELCOME10 applied: 10% off' });
      } else if (codeUpper === 'FREESHIP') {
        // emulate free shipping (up to delivery cost)
        setPromoDiscount(calculateDelivery());
        setNotification({ show: true, message: 'Free shipping applied' });
      } else {
        setPromoDiscount(0);
        setNotification({ show: true, message: 'Invalid promo code' });
      }
      setTimeout(() => setNotification({ show: false, message: '' }), 2000);
    } finally {
      setPromoApplying(false);
    }
  };

  useEffect(() => {
    const fetchRelated = async () => {
      try {
        const categories = Array.from(new Set(
          items
            .map((i) => i.product?.category)
            .filter((c) => typeof c === 'string' && c.trim().length > 0)
        ));

        const productIdsInCart = new Set(
          items.map((i) => i.product?._id || i.product?.id).filter(Boolean)
        );

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

        const uniqueById = new Map();
        fetched.forEach((p) => {
          if (p && p._id && !productIdsInCart.has(p._id)) {
            uniqueById.set(p._id, p);
          }
        });
        setRelatedProducts(Array.from(uniqueById.values()).slice(0, 8));
      } catch (err) {
        console.error('Failed to load related products for cart:', err);
      }
    };

    fetchRelated();
  }, [items]);

  if (items.length === 0) {
    return (
      <Container>
        <Header>
          <HeaderContent>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              <BackButton onClick={() => navigate('/shop')}>
                <FaArrowLeft />
                Back to Shop
              </BackButton>
              <HeaderTitle>
                <FaShoppingBag />
                Shopping Cart
              </HeaderTitle>
            </div>
          </HeaderContent>
        </Header>

        <EmptyState>
          <EmptyIcon>🛒</EmptyIcon>
          <EmptyTitle>Your cart is empty</EmptyTitle>
          <EmptyText>
            Looks like you haven't added any items to your cart yet. Start shopping to fill it up!
          </EmptyText>
          <EmptyActions>
            <EmptyButton className="primary" onClick={() => navigate('/shop')}>
              <FaShoppingBag />
              Start Shopping
            </EmptyButton>
            <EmptyButton className="secondary" onClick={() => navigate('/')}>
              Back to Home
            </EmptyButton>
          </EmptyActions>
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
            <BackButton onClick={() => navigate('/shop')}>
              <FaArrowLeft />
              Back to Shop
            </BackButton>
            <HeaderTitle>
              <FaShoppingBag />
              Shopping Cart ({items.length} {items.length === 1 ? 'item' : 'items'})
            </HeaderTitle>
          </div>
          
          <HeaderActions>
            <FeatureBadge>
              <FaTruck />
              Free Delivery
            </FeatureBadge>
            <ClearButton onClick={clearCart}>
              Clear Cart
            </ClearButton>
          </HeaderActions>
        </HeaderContent>
      </Header>

      <MainContent>
        <Breadcrumb>
          <BreadcrumbLink to="/">Home</BreadcrumbLink>
          <span>/</span>
          <BreadcrumbLink to="/shop">Shop</BreadcrumbLink>
          <span>/</span>
          <span style={{ color: '#2c3e50' }}>Shopping Cart</span>
        </Breadcrumb>

        <Grid>
          <CartSection>
            <SectionTitle>
              <FaShoppingBag />
              Cart Items
            </SectionTitle>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {items.map((item) => (
                <CartItem key={item.id}>
                  <ProductImage>
                    {item.product?.images && item.product.images[0] ? (
                      <Image
                        src={item.product.images[0].url}
                        alt={item.product.name}
                      />
                    ) : (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        height: '100%',
                        color: '#aaa',
                        fontSize: '12px'
                      }}>
                        No Image
                      </div>
                    )}
                  </ProductImage>

                  <ProductDetails>
                    <div>
                      <ProductName>{item.product?.name || 'Unknown Product'}</ProductName>
                      <ProductCategory>{item.product?.category?.replace('-', ' ') || 'Uncategorized'}</ProductCategory>
                      <ProductPrice>KSH {(item.product?.price || 0).toFixed(0)}</ProductPrice>
                    </div>

                    <QuantityControls>
                      <QuantityLabel>Qty:</QuantityLabel>
                      <QuantityWrapper>
                        <QuantityButton
                          onClick={() => handleQuantityChange(item.product?._id || item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                        >
                          <FaMinus />
                        </QuantityButton>
                        <QuantityDisplay>{item.quantity}</QuantityDisplay>
                        <QuantityButton
                          onClick={() => handleQuantityChange(item.product?._id || item.id, item.quantity + 1)}
                        >
                          <FaPlus />
                        </QuantityButton>
                      </QuantityWrapper>
                    </QuantityControls>
                  </ProductDetails>

                  <ItemActions>
                    <ItemTotal>
                      KSH {((item.product?.price || 0) * (item.quantity || 0)).toFixed(0)}
                    </ItemTotal>
                    
                    <ActionButtons>
                      <ActionButton
                        className="favorite"
                        onClick={() => handleMoveToFavorites(item)}
                        title="Move to favorites"
                      >
                        <FaHeart />
                      </ActionButton>
                      <ActionButton
                        onClick={() => handleSaveForLater(item)}
                        title="Save for later"
                        style={{ background: '#95a5a6', color: 'white' }}
                      >
                        Save
                      </ActionButton>
                      <ActionButton
                        className="remove"
                        onClick={() => {
                          removeFromCart(item.product?._id || item.id);
                          setNotification({ show: true, message: 'Item removed from cart' });
                          setTimeout(() => setNotification({ show: false, message: '' }), 2000);
                        }}
                        title="Remove item"
                      >
                        <FaTrash />
                      </ActionButton>
                    </ActionButtons>
                  </ItemActions>
                </CartItem>
              ))}
            </div>
          </CartSection>

          <SummarySection>
            <SectionTitle>Order Summary</SectionTitle>

            <PriceBreakdown>
              <PriceRow>
                <PriceLabel>Subtotal ({items.length} items)</PriceLabel>
                <PriceValue>KSH {calculateSubtotal().toFixed(0)}</PriceValue>
              </PriceRow>
              
              <PriceRow>
                <PriceLabel>Delivery</PriceLabel>
                <PriceValue className={calculateDelivery() === 0 ? 'free' : ''}>
                  {calculateDelivery() === 0 ? 'FREE' : `KSH ${calculateDelivery()}`}
                </PriceValue>
              </PriceRow>

              {calculateDelivery() > 0 && (
                <FreeDeliveryBanner>
                  Add KSH {(2000 - calculateSubtotal()).toFixed(0)} more for free delivery
                </FreeDeliveryBanner>
              )}

              <PriceRow className="total">
                <PriceLabel>Total</PriceLabel>
                <PriceValue className="total">KSH {calculateTotal().toFixed(0)}</PriceValue>
              </PriceRow>
            </PriceBreakdown>

        {/* Promo Code */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 14, color: '#2c3e50', fontWeight: 600, marginBottom: 8 }}>Promo Code</div>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter promo code (e.g., WELCOME10)"
              style={{ flex: 1, padding: '10px 12px', border: '1px solid #e1e8ed', borderRadius: 8, fontSize: 14 }}
            />
            <button
              onClick={applyPromo}
              disabled={promoApplying}
              style={{ padding: '10px 12px', borderRadius: 8, background: '#667eea', color: 'white', border: 'none', fontWeight: 600, cursor: promoApplying ? 'not-allowed' : 'pointer' }}
            >
              {promoApplying ? 'Applying...' : 'Apply'}
            </button>
          </div>
          {promoDiscount > 0 && (
            <div style={{ marginTop: 8, fontSize: 13, color: '#27ae60', fontWeight: 600 }}>
              Promo discount: -KSH {promoDiscount.toFixed(0)}
            </div>
          )}
        </div>

            <PaymentSection>
              <PaymentTitle>Payment Method</PaymentTitle>
              <PaymentMethods>
                <PaymentMethod
                  selected={paymentMethod === 'paystack'}
                  onClick={() => setPaymentMethod('paystack')}
                >
                  Paystack
                </PaymentMethod>
                <PaymentMethod
                  selected={paymentMethod === 'mpesa'}
                  onClick={() => setPaymentMethod('mpesa')}
                >
                  M-Pesa
                </PaymentMethod>
              </PaymentMethods>
              {paymentMethod === 'mpesa' && (
                <PhoneInput
                  type="tel"
                  placeholder="M-Pesa phone (07XXXXXXXX)"
                  value={mpesaPhone}
                  onChange={(e) => setMpesaPhone(e.target.value)}
                />
              )}
            </PaymentSection>

            <CheckoutButton
              onClick={handleCheckout}
              disabled={isCheckingOut}
            >
              <FaCheck />
              {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
            </CheckoutButton>

            <SecurityFeatures>
              <SecurityTitle>Secure Checkout</SecurityTitle>
              <SecurityGrid>
                <SecurityFeature>
                  <FaShieldAlt style={{ color: '#667eea' }} />
                  <span>SSL Secure</span>
                </SecurityFeature>
                <SecurityFeature>
                  <FaCreditCard style={{ color: '#667eea' }} />
                  <span>Safe Payment</span>
                </SecurityFeature>
                <SecurityFeature>
                  <FaUndo style={{ color: '#667eea' }} />
                  <span>Easy Returns</span>
                </SecurityFeature>
              </SecurityGrid>
            </SecurityFeatures>
          </SummarySection>
        </Grid>

        {/* Saved For Later */}
        {savedForLater.length > 0 && (
          <RelatedSection>
            <RelatedTitle>Saved For Later</RelatedTitle>
            <RelatedGrid>
              {savedForLater.map((s, idx) => (
                <RelatedProduct key={(s.product?._id) || idx}>
                  <RelatedImage>
                    {s.product?.images?.[0]?.url ? (
                      <img src={s.product.images[0].url} alt={s.product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', height: '100%', color: '#aaa', fontSize: '14px' }}>No Image</div>
                    )}
                  </RelatedImage>
                  <RelatedInfo>
                    <RelatedCategory>{s.product?.category?.replace('-', ' ')}</RelatedCategory>
                    <RelatedName>{s.product?.name}</RelatedName>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
                      <RelatedPrice>KSH {Number(s.product?.price || 0).toFixed(0)}</RelatedPrice>
                      <div style={{ display: 'flex', gap: 8 }}>
                        <AddButton onClick={() => handleMoveSavedToCart(s)}>Move to Cart</AddButton>
                        <AddButton style={{ background: '#e74c3c' }} onClick={() => setSavedForLater(prev => prev.filter(p => (p.product?._id || p.product) !== (s.product?._id || s.product)))}>Remove</AddButton>
                      </div>
                    </div>
                  </RelatedInfo>
                </RelatedProduct>
              ))}
            </RelatedGrid>
          </RelatedSection>
        )}

        {relatedProducts.length > 0 && (
          <RelatedSection>
            <RelatedTitle>You May Also Like</RelatedTitle>
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
                        onClick={(e) => { e.stopPropagation(); addToCart(p, 1); setNotification({ show: true, message: `${p.name} added to cart` }); setTimeout(() => setNotification({ show: false, message: '' }), 2000); }}
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

        <div style={{ marginTop: '30px', textAlign: 'center' }}>
          <EmptyButton className="secondary" onClick={() => navigate('/shop')}>
            <FaShoppingBag />
            Continue Shopping
          </EmptyButton>
        </div>
      </MainContent>
    </Container>
  );
};

export default Cart;