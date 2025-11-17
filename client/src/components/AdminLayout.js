import React, { useState, useRef, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FaBars, 
  FaUsers, 
  FaShoppingCart, 
  FaBox, 
  FaChartBar, 
  FaCog, 
  FaBell, 
  FaUser, 
  FaSignOutAlt,
  FaSearch,
  FaTachometerAlt,
  FaFileAlt,
  FaEnvelope,
  FaDollarSign,
  FaCheck,
  FaExclamationTriangle,
  FaInfo,
  FaImages
} from 'react-icons/fa';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useNotification } from '../context/NotificationContext';


// Animations removed - using framer-motion instead

// Main Container
const AdminContainer = styled.div`
  display: flex;
  min-height: 100vh;
  background: #f8fafc;
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
`;

// Sidebar Styles
const Sidebar = styled.aside`
  width: ${props => props.collapsed ? '80px' : '250px'};
  background: #53185D;
  color: white;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: fixed;
  height: 100vh;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  box-shadow: 4px 0 20px rgba(0, 0, 0, 0.1);
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  border-radius: 10px;

  
  @media (max-width: 768px) {
    transform: translateX(${props => props.isOpen ? '0' : '-100%'});
    width: 280px;
  }
`;

const SidebarHeader = styled.div`
  padding: 1rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  background: rgba(255, 255, 255, 0.02);
  min-height: 80px;
  flex-shrink: 0;
`;

const LogoContainer = styled.div`
  position: relative;
  width: 50%;
  border-radius: 8px;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  }
`;

const Logo = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius:5px;
`;

const LogoText = styled.div`
  font-size: 1rem;
  font-weight: 700;
  color: white;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
`;

const AdminInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
  opacity: ${props => props.collapsed ? 0 : 1};
  transform: ${props => props.collapsed ? 'translateY(-10px)' : 'translateY(0)'};
  transition: all 0.3s ease;
  pointer-events: ${props => props.collapsed ? 'none' : 'auto'};
`;

const AdminAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.8rem;
  color: white;
  box-shadow: 0 2px 6px rgba(59, 130, 246, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3);
  }
`;

const AdminName = styled.div`
  font-size: 0.8rem;
  font-weight: 500;
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
`;


// Navigation Menu
const SidebarMenu = styled.nav`
  padding: 1rem 0;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  position: relative;
  height: calc(100vh - 140px);
  
  &::-webkit-scrollbar {
    width: 4px;
  }
  
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    
    &:hover {
      background: rgba(255, 255, 255, 0.3);
    }
  }
  
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
`;

const MenuSection = styled.div`
  margin-bottom: 1.5rem;
  padding: 0 1rem;
`;

const MenuTitle = styled.h3`
  font-size: 0.7rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.8px;
  padding: 0 1rem;
  margin-bottom: 1rem;
  opacity: ${props => props.collapsed ? 0 : 1};
  transform: ${props => props.collapsed ? 'translateY(-10px)' : 'translateY(0)'};
  transition: all 0.3s ease;
  pointer-events: ${props => props.collapsed ? 'none' : 'auto'};
`;

const MenuItem = styled(Link)`
  display: flex;
  align-items: center;
  gap: 0.875rem;
  padding: 0.875rem 1rem;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  border-radius: 10px;
  margin: 0.25rem 0;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  font-weight: 500;
  font-size: 0.9rem;
  border: 1px solid transparent;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(135deg, 
      rgba(59, 130, 246, 0.1) 0%, 
      rgba(139, 92, 246, 0.05) 100%);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    border-radius: 10px;
  }
  
  &:hover {
    background: rgba(255, 255, 255, 0.08);
    color: white;
    transform: translateX(6px);
    border-color: rgba(59, 130, 246, 0.3);
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
    
    &::before {
      transform: translateX(0);
    }
  }
  
  &.active {
    background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(139, 92, 246, 0.1));
    color: white;
    font-weight: 600;
    transform: translateX(6px);
    border-color: rgba(59, 130, 246, 0.4);
    box-shadow: 0 4px 16px rgba(59, 130, 246, 0.25);
    
    &::before {
      transform: translateX(0);
    }
  }
  
  ${props => props.collapsed && `
    justify-content: center;
    padding: 0.875rem 0.5rem;
    margin: 0.25rem 0.5rem;
    border-radius: 10px;
    
    span {
      display: none;
    }
  `}
`;

const MenuIcon = styled.div`
  font-size: 1rem;
  width: 22px;
  text-align: center;
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0.9;
  
  ${MenuItem}:hover & {
    opacity: 1;
    transform: scale(1.1);
  }
`;

const MenuLabel = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  position: relative;
  z-index: 1;
  opacity: ${props => props.hidden ? 0 : 1};
  pointer-events: ${props => props.hidden ? 'none' : 'auto'};
  transition: opacity 0.3s ease;
`;

// Main Content Area
const MainContent = styled.main`
  flex: 1;
  margin-left: ${props => props.collapsed ? '80px' : '280px'};
  transition: margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  min-height: 100vh;
  background: #f8fafc;
  width: 100%;
  max-width: 100%;
  overflow-x: hidden;
  
  @media (max-width: 768px) {
    margin-left: 0;
  }
`;

// Top Navigation Bar
const TopBar = styled.header`
  background: white;
  border-bottom: 1px solid #e2e8f0;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
`;

const TopBarLeft = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ToggleButton = styled.button`
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #64748b;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f1f5f9;
    color: #3b82f6;
  }
`;

const PageTitle = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e293b;
  margin: 0;
`;

const TopBarRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem 0.5rem 2.5rem;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  background: #f8fafc;
  font-size: 0.9rem;
  width: 150px;
  transition: all 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #3b82f6;
    background: white;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }
  
  &::placeholder {
    color: #94a3b8;
  }
`;

const SearchIcon = styled(FaSearch)`
  position: absolute;
  left: 0.75rem;
  color: #94a3b8;
  font-size: 0.9rem;
`;

const NotificationButton = styled.button`
  position: relative;
  background: none;
  border: none;
  font-size: 1.2rem;
  color: #64748b;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 8px;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f1f5f9;
    color: #3b82f6;
  }
`;

const NotificationBadge = styled.span`
  position: absolute;
  top: 0.25rem;
  right: 0.25rem;
  background: #ef4444;
  color: white;
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.1rem 0.3rem;
  border-radius: 10px;
  min-width: 18px;
  text-align: center;
`;

const OnlineIndicator = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  margin-left: 8px;
  background: ${props => props.online ? '#10b981' : '#9ca3af'};
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: #f1f5f9;
  }
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.8rem;
  color: white;
`;

const UserName = styled.span`
  font-size: 0.9rem;
  font-weight: 500;
  color: #1e293b;
`;

// Dashboard Content
const DashboardContent = styled.div`
  padding: 2rem;
  max-width: 100%;
  width: 100%;
  box-sizing: border-box;
  overflow-x: hidden;
`;



// Mobile Overlay
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
  display: ${props => props.isOpen ? 'block' : 'none'};
  
  @media (min-width: 769px) {
    display: none;
  }
`;

// Sidebar Footer
const SidebarFooter = styled.div`
  padding: 1rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const FooterButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  border-radius: 8px;
  transition: all 0.2s ease;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  text-align: left;
  
  &:hover {
    background: rgba(255, 255, 255, 0.1);
    color: white;
  }
  
  ${props => props.collapsed && `
    justify-content: center;
    padding: 0.75rem 0.5rem;
    
    span {
      display: none;
    }
  `}
`;

// Professional Notification Components
const NotificationContainer = styled(motion.div)`
  position: fixed;
  top: 2rem;
  right: 2rem;
  z-index: 9999;
  max-width: 400px;
  width: 100%;
`;

const NotificationCard = styled(motion.div)`
  background: ${props => {
    switch(props.type) {
      case 'success': return 'linear-gradient(135deg, #d4edda 0%, #c3e6cb 100%)';
      case 'error': return 'linear-gradient(135deg, #f8d7da 0%, #f5c6cb 100%)';
      case 'warning': return 'linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%)';
      case 'info': return 'linear-gradient(135deg, #d1ecf1 0%, #bee5eb 100%)';
      default: return 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)';
    }
  }};
  color: ${props => {
    switch(props.type) {
      case 'success': return '#155724';
      case 'error': return '#721c24';
      case 'warning': return '#856404';
      case 'info': return '#0c5460';
      default: return '#1565c0';
    }
  }};
  padding: 1.5rem 2rem;
  border-radius: 16px;
  border: 1px solid ${props => {
    switch(props.type) {
      case 'success': return '#c3e6cb';
      case 'error': return '#f5c6cb';
      case 'warning': return '#ffeaa7';
      case 'info': return '#bee5eb';
      default: return '#90caf9';
    }
  }};
  font-size: 1rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 1rem;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  margin-bottom: 1rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 5px;
    height: 100%;
    background: ${props => {
      switch(props.type) {
        case 'success': return '#28a745';
        case 'error': return '#dc3545';
        case 'warning': return '#ffc107';
        case 'info': return '#17a2b8';
        default: return '#2196f3';
      }
    }};
  }

  &::after {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 0;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4));
    animation: shimmer 3s infinite;
  }

  @keyframes shimmer {
    0% { width: 0; }
    50% { width: 100%; }
    100% { width: 0; }
  }
`;

const NotificationIcon = styled(motion.div)`
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  backdrop-filter: blur(5px);
`;

const NotificationContent = styled.div`
  flex: 1;
`;

const NotificationTitle = styled.h4`
  margin: 0 0 0.5rem 0;
  font-size: 1rem;
  font-weight: 600;
`;

const NotificationMessage = styled.p`
  margin: 0;
  font-size: 0.9rem;
  opacity: 0.9;
  line-height: 1.4;
`;

const ProgressBar = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  background: ${props => {
    switch(props.type) {
      case 'success': return '#28a745';
      case 'error': return '#dc3545';
      case 'warning': return '#ffc107';
      case 'info': return '#17a2b8';
      default: return '#2196f3';
    }
  }};
  border-radius: 0 0 16px 16px;
`;

// Main AdminLayout Component
const AdminLayout = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [menuQuery, setMenuQuery] = useState('');
  const [notifications, setNotifications] = useState([]);
  const sidebarRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { adminUser, adminLogout } = useAdminAuth();
  const { notifications: globalNotifications } = useNotification();
  const online = typeof navigator !== 'undefined' ? navigator.onLine : true;

  // Safe, real-time user info derived from context
  const adminDisplay = useMemo(() => {
    if (!adminUser) {
      return { 
        name: 'Admin User', 
        email: 'admin@rebirthofaqueen.org', 
        initials: 'AU',
        fullName: '',
        firstName: '',
        lastName: ''
      };
    }
    
    // Get firstName and lastName from adminUser
    const first = (adminUser?.firstName || adminUser?.first_name || '').trim();
    const last = (adminUser?.lastName || adminUser?.last_name || '').trim();
    const full = [first, last].filter(Boolean).join(' ').trim();
    const email = (adminUser?.email || '').trim();
    
    // Priority: Full name > name property > Email prefix > Default
    const name = full || adminUser?.name || (email ? email.split('@')[0] : 'Admin User');
    
    // Generate initials from firstName and lastName, or from name
    let initials = 'AU';
    if (first && last) {
      initials = `${first[0]?.toUpperCase()}${last[0]?.toUpperCase()}`;
    } else if (name) {
      initials = name
        .split(/\s|\./)
        .filter(Boolean)
        .slice(0, 2)
        .map(s => s[0]?.toUpperCase())
        .join('') || 'AU';
    }
    
    return { 
      name, 
      email: email || 'admin@rebirthofaqueen.org', 
      initials,
      fullName: full,
      firstName: first,
      lastName: last
    };
  }, [adminUser]);

  // Notification functions
  const addNotification = (type, title, message, duration = 5000) => {
    const id = Date.now() + Math.random();
    const notification = { id, type, title, message, duration };
    
    setNotifications(prev => [...prev, notification]);
    
    // Auto remove after duration
    setTimeout(() => {
      removeNotification(id);
    }, duration);
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  // Listen for cross-page notifications (e.g., from AdminProducts)
  React.useEffect(() => {
    const handler = (e) => {
      const { type, title, message, duration } = e.detail || {};
      if (type && title && message) addNotification(type, title, message, duration || 5000);
    };
    window.addEventListener('global-notification', handler);
    return () => window.removeEventListener('global-notification', handler);
  }, []);

  const handleLogout = async () => {
    try {
      // Show logout notification
      addNotification('info', 'Logging Out', 'You are being logged out of the admin panel...', 2000);
      
      // Wait a moment for the notification to show
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      await adminLogout();
    } finally {
      navigate('/admin/login');
    }
  };

  // Get page title based on current route
  const getPageTitle = () => {
    const path = location.pathname;
    const titles = {
      '/admin': 'Dashboard',
      '/admin/analytics': 'Analytics',
      '/admin/reports': 'Reports',
      '/admin/users': 'User Management',
      '/admin/applications': 'Applications',
      '/admin/subscribers': 'Subscribers',
      '/admin/products': 'Product Management',
      '/admin/orders': 'Order Management',
      '/admin/inventory': 'Inventory',
      '/admin/shop-settings': 'Shop Settings',
      '/admin/programs': 'Programs',
      '/admin/content': 'Content Management',
      '/admin/announcements': 'Announcements',
      '/admin/donations': 'Donations',
      '/admin/financials': 'Financial Reports',
      '/admin/bulk-sms': 'Bulk SMS',
      '/admin/settings': 'System Settings',
      '/admin/profile': 'Profile'
    };
    return titles[path] || 'Dashboard';
  };

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };


  return (
    <AdminContainer>
      <Overlay isOpen={isSidebarOpen} onClick={closeSidebar} />
      
      <Sidebar ref={sidebarRef} isOpen={isSidebarOpen} collapsed={collapsed}>
        <SidebarHeader>
          <LogoContainer>
            <Logo 
              src="https://res.cloudinary.com/samokello/image/upload/v1758147536/rebirth-of-a-queen/images/logo_jwavy0.jpg" 
              alt="Rebirth of a Queen Logo"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <LogoText style={{ display: 'none' }}>RQ</LogoText>
          </LogoContainer>
          
          <AdminInfo collapsed={collapsed}>
            <AdminAvatar title={`${adminDisplay.name} (${adminDisplay.email})`}>
              {adminDisplay.initials}
            </AdminAvatar>
            <AdminName>{adminDisplay.name}</AdminName>
          </AdminInfo>
        </SidebarHeader>
        
        <SidebarMenu>
          <MenuSection>
            <MenuTitle collapsed={collapsed}>Dashboard</MenuTitle>
            <MenuItem to="/admin" className={location.pathname === '/admin' ? 'active' : ''} collapsed={collapsed}>
              <MenuIcon><FaTachometerAlt /></MenuIcon>
              <MenuLabel hidden={collapsed}>Overview</MenuLabel>
            </MenuItem>
            <MenuItem to="/admin/analytics" className={location.pathname === '/admin/analytics' ? 'active' : ''} collapsed={collapsed}>
              <MenuIcon><FaChartBar /></MenuIcon>
              <MenuLabel hidden={collapsed}>Analytics</MenuLabel>
            </MenuItem>
            <MenuItem to="/admin/reports" className={location.pathname === '/admin/reports' ? 'active' : ''} collapsed={collapsed}>
              <MenuIcon><FaFileAlt /></MenuIcon>
              <MenuLabel hidden={collapsed}>Reports</MenuLabel>
            </MenuItem>
          </MenuSection>

          <MenuSection>
            <MenuTitle collapsed={collapsed}>User Management</MenuTitle>
            <MenuItem to="/admin/users" className={location.pathname === '/admin/users' ? 'active' : ''} collapsed={collapsed}>
              <MenuIcon><FaUsers /></MenuIcon>
              <MenuLabel hidden={collapsed}>Users</MenuLabel>
            </MenuItem>
            <MenuItem to="/admin/applications" className={location.pathname === '/admin/applications' ? 'active' : ''} collapsed={collapsed}>
              <MenuIcon><FaFileAlt /></MenuIcon>
              <MenuLabel hidden={collapsed}>Applications</MenuLabel>
            </MenuItem>
            <MenuItem to="/admin/subscribers" className={location.pathname === '/admin/subscribers' ? 'active' : ''} collapsed={collapsed}>
              <MenuIcon><FaEnvelope /></MenuIcon>
              <MenuLabel hidden={collapsed}>Subscribers</MenuLabel>
            </MenuItem>
          </MenuSection>

          <MenuSection>
            <MenuTitle collapsed={collapsed}>E-commerce</MenuTitle>
            <MenuItem to="/admin/products" className={location.pathname === '/admin/products' ? 'active' : ''} collapsed={collapsed}>
              <MenuIcon><FaBox /></MenuIcon>
              <MenuLabel hidden={collapsed}>Products</MenuLabel>
            </MenuItem>
            <MenuItem to="/admin/gallery" className={location.pathname === '/admin/gallery' ? 'active' : ''} collapsed={collapsed}>
              <MenuIcon><FaImages /></MenuIcon>
              <MenuLabel hidden={collapsed}>Gallery</MenuLabel>
            </MenuItem>
            <MenuItem to="/admin/orders" className={location.pathname === '/admin/orders' ? 'active' : ''} collapsed={collapsed}>
              <MenuIcon><FaShoppingCart /></MenuIcon>
              <MenuLabel hidden={collapsed}>Orders</MenuLabel>
            </MenuItem>
            <MenuItem to="/admin/inventory" className={location.pathname === '/admin/inventory' ? 'active' : ''} collapsed={collapsed}>
              <MenuIcon><FaBox /></MenuIcon>
              <MenuLabel hidden={collapsed}>Inventory</MenuLabel>
            </MenuItem>
            <MenuItem to="/admin/shop-settings" className={location.pathname === '/admin/shop-settings' ? 'active' : ''} collapsed={collapsed}>
              <MenuIcon><FaCog /></MenuIcon>
              <MenuLabel hidden={collapsed}>Shop Settings</MenuLabel>
            </MenuItem>
          </MenuSection>

          <MenuSection>
            <MenuTitle collapsed={collapsed}>Programs & Content</MenuTitle>
            <MenuItem to="/admin/programs" className={location.pathname === '/admin/programs' ? 'active' : ''} collapsed={collapsed}>
              <MenuIcon><FaFileAlt /></MenuIcon>
              <MenuLabel hidden={collapsed}>Programs</MenuLabel>
            </MenuItem>
            <MenuItem to="/admin/content" className={location.pathname === '/admin/content' ? 'active' : ''} collapsed={collapsed}>
              <MenuIcon><FaFileAlt /></MenuIcon>
              <MenuLabel hidden={collapsed}>Content</MenuLabel>
            </MenuItem>
            <MenuItem to="/admin/announcements" className={location.pathname === '/admin/announcements' ? 'active' : ''} collapsed={collapsed}>
              <MenuIcon><FaBell /></MenuIcon>
              <MenuLabel hidden={collapsed}>Announcements</MenuLabel>
            </MenuItem>
          </MenuSection>

          <MenuSection>
            <MenuTitle collapsed={collapsed}>Financial</MenuTitle>
            <MenuItem to="/admin/donations" className={location.pathname === '/admin/donations' ? 'active' : ''} collapsed={collapsed}>
              <MenuIcon><FaDollarSign /></MenuIcon>
              <MenuLabel hidden={collapsed}>Donations</MenuLabel>
            </MenuItem>
            <MenuItem to="/admin/financials" className={location.pathname === '/admin/financials' ? 'active' : ''} collapsed={collapsed}>
              <MenuIcon><FaChartBar /></MenuIcon>
              <MenuLabel hidden={collapsed}>Financial Reports</MenuLabel>
            </MenuItem>
          </MenuSection>

          <MenuSection>
            <MenuTitle collapsed={collapsed}>Communication</MenuTitle>
            <MenuItem to="/admin/bulk-sms" className={location.pathname === '/admin/bulk-sms' ? 'active' : ''} collapsed={collapsed}>
              <MenuIcon><FaEnvelope /></MenuIcon>
              <MenuLabel hidden={collapsed}>Bulk SMS</MenuLabel>
            </MenuItem>
          </MenuSection>

          <MenuSection>
            <MenuTitle collapsed={collapsed}>Settings</MenuTitle>
            <MenuItem to="/admin/settings" className={location.pathname === '/admin/settings' ? 'active' : ''} collapsed={collapsed}>
              <MenuIcon><FaCog /></MenuIcon>
              <MenuLabel hidden={collapsed}>System Settings</MenuLabel>
            </MenuItem>
            <MenuItem to="/admin/profile" className={location.pathname === '/admin/profile' ? 'active' : ''} collapsed={collapsed}>
              <MenuIcon><FaUser /></MenuIcon>
              <MenuLabel hidden={collapsed}>Profile</MenuLabel>
            </MenuItem>
          </MenuSection>
        </SidebarMenu>

        <SidebarFooter>
          <FooterButton onClick={handleLogout} collapsed={collapsed}>
            <FaSignOutAlt />
            <MenuLabel hidden={collapsed}>Logout</MenuLabel>
          </FooterButton>
        </SidebarFooter>
      </Sidebar>

      <MainContent collapsed={collapsed}>
        <TopBar>
          <TopBarLeft>
            <ToggleButton onClick={toggleSidebar}>
              <FaBars />
            </ToggleButton>
            <PageTitle>{getPageTitle()}</PageTitle>
          </TopBarLeft>
          
          <TopBarRight>
            <SearchContainer>
              <SearchIcon />
              <SearchInput 
                type="text" 
                placeholder="Search..." 
                value={menuQuery}
                onChange={(e) => setMenuQuery(e.target.value)}
              />
            </SearchContainer>
            
            <NotificationButton aria-label="Notifications">
              <FaBell />
              {globalNotifications.length > 0 && (
                <NotificationBadge>{globalNotifications.length}</NotificationBadge>
              )}
            </NotificationButton>
            
            <UserInfo>
              <UserAvatar title={online ? 'Online' : 'Offline'}>
                {adminDisplay.initials}
              </UserAvatar>
              <UserName>
                {adminDisplay.name || adminDisplay.username || 'Admin User'}
                <OnlineIndicator online={online} />
              </UserName>
            </UserInfo>
          </TopBarRight>
        </TopBar>

        <DashboardContent>
          {children}
        </DashboardContent>
      </MainContent>

      {/* Professional Notifications */}
      <NotificationContainer>
        <AnimatePresence>
          {notifications.map((notification) => (
            <NotificationCard
              key={notification.id}
              type={notification.type}
              initial={{ opacity: 0, x: 400, scale: 0.8 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 400, scale: 0.8 }}
              transition={{ 
                duration: 0.5,
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
            >
              <NotificationIcon
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.1, duration: 0.4 }}
              >
                {notification.type === 'success' && <FaCheck />}
                {notification.type === 'error' && <FaExclamationTriangle />}
                {notification.type === 'warning' && <FaExclamationTriangle />}
                {notification.type === 'info' && <FaInfo />}
              </NotificationIcon>
              
              <NotificationContent>
                <NotificationTitle>{notification.title}</NotificationTitle>
                <NotificationMessage>{notification.message}</NotificationMessage>
              </NotificationContent>

              <ProgressBar
                type={notification.type}
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: notification.duration / 1000, ease: "linear" }}
              />
            </NotificationCard>
          ))}
        </AnimatePresence>
      </NotificationContainer>
    </AdminContainer>
  );
};

export default AdminLayout;