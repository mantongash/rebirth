import React, { createContext, useContext, useState, useEffect } from 'react';
import { getBaseUrl } from '../utils/apiConfig';

const AdminAuthContext = createContext();

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
};

export const AdminAuthProvider = ({ children }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminUser, setAdminUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if admin is logged in on app start
    const adminToken = localStorage.getItem('adminToken');
    const adminUserData = localStorage.getItem('adminUser');
    
    if (adminToken && adminUserData) {
      try {
        const user = JSON.parse(adminUserData);
        setAdminUser(user);
        setIsAdmin(true);
      } catch (error) {
        console.error('Error parsing admin user data:', error);
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
      }
    }
    setLoading(false);
  }, []);

  const adminLogin = React.useCallback(async (email, password) => {
    try {
      const API_BASE = getBaseUrl();
      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();

      if (response.ok && data.success && data.data?.user) {
        // Check if user has admin role
        const userRole = data.data.user.role;
        if (userRole !== 'admin') {
          console.error('User role:', userRole, 'Expected: admin');
          return { 
            success: false, 
            error: `Admin access required. Your current role is: ${userRole || 'user'}. Please contact support to upgrade your account.` 
          };
        }
        // Generate avatar from email or initials
        const generateAvatar = (userData) => {
          // If user has a custom profile picture, use it
          if (userData.profilePicture) {
            return userData.profilePicture;
          }
          
          // Generate avatar from name using UI Avatars service
          const fullName = `${userData.firstName || ''} ${userData.lastName || ''}`.trim();
          if (fullName) {
            return `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=667eea&color=fff&size=200&bold=true&format=svg`;
          }
          
          // Fallback to initials
          const initials = `${userData.firstName?.charAt(0) || ''}${userData.lastName?.charAt(0) || ''}`.toUpperCase();
          return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=667eea&color=fff&size=200&bold=true&format=svg`;
        };

        const adminData = {
          id: data.data.user._id,
          _id: data.data.user._id,
          firstName: data.data.user.firstName,
          lastName: data.data.user.lastName,
          name: `${data.data.user.firstName} ${data.data.user.lastName}`,
          email: data.data.user.email,
          phone: data.data.user.phone,
          role: data.data.user.role,
          avatar: generateAvatar(data.data.user),
          lastLogin: data.data.user.lastLogin || new Date().toISOString(),
          loginCount: data.data.user.loginCount || 0,
          createdAt: data.data.user.createdAt,
          isActive: data.data.user.isActive
        };
        
        localStorage.setItem('adminToken', data.data.token);
        localStorage.setItem('adminUser', JSON.stringify(adminData));
        
        setAdminUser(adminData);
        setIsAdmin(true);
        
        return { success: true, user: adminData };
      } else {
        return { success: false, error: data.message || 'Login failed' };
      }
    } catch (error) {
      console.error('Admin login error:', error);
      return { success: false, error: 'Login failed' };
    }
  }, []);

  const adminLogout = React.useCallback(async () => {
    // Show logout success message
    const logoutMessage = '👋 Logged out successfully. Thank you for using the admin panel!';
    
    // Store logout message for display
    sessionStorage.setItem('adminLogoutMessage', logoutMessage);
    
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    setAdminUser(null);
    setIsAdmin(false);
    
    // Redirect to admin login with logout message
    window.location.href = '/admin-login?logout=success';
  }, []);

  const getAdminToken = React.useCallback(() => localStorage.getItem('adminToken'), []);

  const updateAdminUser = React.useCallback((newUserData) => {
    const updatedUser = { ...adminUser, ...newUserData };
    setAdminUser(updatedUser);
    localStorage.setItem('adminUser', JSON.stringify(updatedUser));
  }, [adminUser]);

  const refreshAdminUser = React.useCallback(async () => {
    try {
      const token = getAdminToken();
      if (!token) {
        return;
      }
      
      const API_BASE = getBaseUrl();
      
      const response = await fetch(`${API_BASE}/api/auth/profile`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        
        // Generate avatar from name
        const generateAvatar = (userData) => {
          if (userData.profilePicture) {
            return userData.profilePicture;
          }
          
          const fullName = `${userData.firstName || ''} ${userData.lastName || ''}`.trim();
          if (fullName) {
            return `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&background=667eea&color=fff&size=200&bold=true&format=svg`;
          }
          
          const initials = `${userData.firstName?.charAt(0) || ''}${userData.lastName?.charAt(0) || ''}`.toUpperCase();
          return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=667eea&color=fff&size=200&bold=true&format=svg`;
        };

        const user = data.data?.user || data.user;
        const updatedAdminData = {
          id: user._id,
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          name: `${user.firstName} ${user.lastName}`,
          email: user.email,
          phone: user.phone,
          role: user.role,
          avatar: generateAvatar(user),
          lastLogin: user.lastLogin,
          loginCount: user.loginCount,
          createdAt: user.createdAt,
          isActive: user.isActive
        };

        setAdminUser(updatedAdminData);
        localStorage.setItem('adminUser', JSON.stringify(updatedAdminData));
      }
    } catch (error) {
      console.error('Error refreshing admin user:', error);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = {
    isAdmin,
    adminUser,
    loading,
    adminLogin,
    adminLogout,
    getAdminToken,
    updateAdminUser,
    refreshAdminUser
  };

  return (
    <AdminAuthContext.Provider value={value}>
      {children}
    </AdminAuthContext.Provider>
  );
}; 