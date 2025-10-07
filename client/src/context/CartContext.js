import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { API_MAIN } from '../api';
import { useNotification } from './NotificationContext';

const CartContext = createContext();

// Helper functions for localStorage management
const getStorageKey = (userId) => `cart_${userId}`;
const getGuestStorageKey = () => 'cart_guest';

const isDataExpired = (timestamp) => {
  const now = Date.now();
  const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds (like major e-commerce sites)
  return (now - timestamp) > thirtyDaysInMs;
};

// Persisted clear flag helpers (prevents future re-sync)
const getClearedFlagFromLocal = (key) => {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000;
    const expired = (Date.now() - parsed.timestamp) > sevenDaysInMs;
    if (expired) {
      localStorage.removeItem(key);
      return null;
    }
    return parsed;
  } catch (_) {
    return null;
  }
};

const saveToLocalStorage = (userId, cartData) => {
  try {
    const storageKey = userId ? getStorageKey(userId) : getGuestStorageKey();
    const dataToSave = {
      items: cartData,
      timestamp: Date.now(),
      userId: userId || 'guest'
    };
    localStorage.setItem(storageKey, JSON.stringify(dataToSave));
  } catch (error) {
    console.error('Error saving cart to localStorage:', error);
  }
};

const loadFromLocalStorage = (userId) => {
  try {
    const storageKey = userId ? getStorageKey(userId) : getGuestStorageKey();
    const savedData = localStorage.getItem(storageKey);
    
    if (savedData) {
      const parsed = JSON.parse(savedData);
      
      // Check if data is expired
      if (isDataExpired(parsed.timestamp)) {
        localStorage.removeItem(storageKey);
        return [];
      }
      
      // Verify the data belongs to the current user
      if (parsed.userId === (userId || 'guest')) {
        return parsed.items || [];
      }
    }
  } catch (error) {
    console.error('Error loading cart from localStorage:', error);
  }
  return [];
};

const clearUserCartFromStorage = (userId) => {
  try {
    const storageKey = userId ? getStorageKey(userId) : getGuestStorageKey();
    localStorage.removeItem(storageKey);
  } catch (error) {
    console.error('Error clearing cart from localStorage:', error);
  }
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      if (!action.payload || !action.payload.product || !action.payload.product._id) {
        return state;
      }
      const existingItem = state.items.find(item => item?.product?._id === action.payload.product._id);
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            (item?.product?._id === action.payload.product._id)
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        };
      } else {
        return {
          ...state,
          items: [...state.items, action.payload]
        };
      }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item?.product?._id !== action.payload)
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          (item?.product?._id === action.payload.productId)
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };

    case 'LOAD_CART':
      return {
        ...state,
        items: action.payload || []
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: []
  });
  const { isAuthenticated, user } = useAuth();
  const { showSuccess } = useNotification();

  // Load cart from localStorage and server when user changes
  useEffect(() => {
    const loadCart = async () => {
      const userId = user?._id;
      const clearedFlag = sessionStorage.getItem('cart_cleared');
      
      // Check if user cleared cart (with timestamp check - expires after 7 days)
      if (clearedFlag) {
        try {
          const clearData = JSON.parse(clearedFlag);
          const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000; // 7 days
          const isExpired = (Date.now() - clearData.timestamp) > sevenDaysInMs;
          const isCurrentUser = clearData.userId === (userId || 'guest');
          
          if (clearData.cleared && !isExpired && isCurrentUser) {
            dispatch({ type: 'LOAD_CART', payload: [] });
            clearUserCartFromStorage(userId);
            // Don't sync from server if user explicitly cleared
            return;
          } else if (isExpired) {
            // Clear expired flag
            sessionStorage.removeItem('cart_cleared');
          }
        } catch (_) {
          // If parsing fails, treat as old format and clear
          if (clearedFlag === '1') {
            dispatch({ type: 'LOAD_CART', payload: [] });
            clearUserCartFromStorage(userId);
            return;
          }
        }
      }

      if (isAuthenticated && userId) {
        // Load server first (source of truth)
        try {
          const res = await API_MAIN.get('/auth/cart');
          if (res.data?.success) {
            const serverItems = (res.data.data?.cart || []).map((ci) => ({ product: ci.product, quantity: ci.quantity }));
            dispatch({ type: 'LOAD_CART', payload: serverItems });
            // Save to localStorage for offline access
            saveToLocalStorage(userId, serverItems);
            // Only merge guest data if server is empty and guest cart wasn't explicitly cleared
            const serverIsEmpty = serverItems.length === 0;
            const guestCleared = !!getClearedFlagFromLocal('cart_cleared_guest');
            if (serverIsEmpty && !guestCleared) {
              const guestItems = loadFromLocalStorage(null);
              if (guestItems && guestItems.length > 0) {
                try {
                  for (const gi of guestItems) {
                    const productId = gi.product?._id;
                    const quantity = gi.quantity || 1;
                    if (productId) {
                      await API_MAIN.post('/auth/cart/add', { productId, quantity });
                    }
                  }
                  // Clear guest storage after merge
                  clearUserCartFromStorage(null);
                  showSuccess('Synced your cart', { duration: 3000 });
                  // Reload server cart after merge
                  const res2 = await API_MAIN.get('/auth/cart');
                  if (res2.data?.success) {
                    const merged = (res2.data.data?.cart || []).map((ci) => ({ product: ci.product, quantity: ci.quantity }));
                    dispatch({ type: 'LOAD_CART', payload: merged });
                    saveToLocalStorage(userId, merged);
                  }
                } catch (_) { /* best-effort */ }
              }
            }
            return;
          }
          
          // Fallback: try /auth/me
          const me = await API_MAIN.get('/auth/me');
          const meCart = me.data?.data?.user?.cart || [];
          if (meCart.length) {
            const items = meCart.map((ci) => ({ product: ci.product, quantity: ci.quantity }));
            dispatch({ type: 'LOAD_CART', payload: items });
            saveToLocalStorage(userId, items);
            return;
          }
        } catch (error) {
          console.log('Server cart unavailable, loading from localStorage');
        }
        
        // If server fails, load from localStorage
        const localItems = loadFromLocalStorage(userId);
        if (localItems.length > 0) {
          dispatch({ type: 'LOAD_CART', payload: localItems });
        }
      } else {
        // For guests: load from localStorage only
        const localItems = loadFromLocalStorage(null);
        dispatch({ type: 'LOAD_CART', payload: localItems });
      }
    };
    
    loadCart();
  }, [isAuthenticated, user?._id, showSuccess]);

  // Save to localStorage whenever cart changes (persist empty to clear stale data)
  useEffect(() => {
    const userId = user?._id;
    saveToLocalStorage(userId, state.items);
  }, [state.items, user?._id]);

  const addToCart = async (product, quantity = 1) => {
    if (!product || !product._id) return;
    // Once user adds something, clear any session cleared flag
    try { sessionStorage.removeItem('cart_cleared'); } catch (_) {}
    dispatch({ type: 'ADD_TO_CART', payload: { product, quantity } });
    if (isAuthenticated) {
      try {
        await API_MAIN.post('/auth/cart/add', { productId: product._id, quantity });
      } catch (_) { /* best-effort */ }
    }
  };

  const removeFromCart = async (productId) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    if (isAuthenticated) {
      try { await API_MAIN.delete(`/auth/cart/remove/${productId}`); } catch (_) {}
    }
  };

  const updateQuantity = async (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      if (!productId) return;
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: { productId, quantity }
      });
      if (isAuthenticated) {
        try { await API_MAIN.put('/auth/cart/update', { productId, quantity }); } catch (_) {}
      }
    }
  };

  const clearCart = async () => {
    const userId = user?._id;
    const itemsSnapshot = [...state.items];

    // Optimistically clear UI
    dispatch({ type: 'CLEAR_CART' });
    
    // Set session flag with timestamp (expires after 7 days)
    try { 
      const clearData = { 
        cleared: true, 
        timestamp: Date.now(),
        userId: userId || 'guest'
      };
      sessionStorage.setItem('cart_cleared', JSON.stringify(clearData));
    } catch (_) {}

    // Aggressively clear all possible localStorage keys (user + guest + legacy)
    try {
      const dataToSave = { items: [], timestamp: Date.now(), userId: userId || 'guest' };
      localStorage.setItem(userId ? getStorageKey(userId) : getGuestStorageKey(), JSON.stringify(dataToSave));
      localStorage.setItem(getGuestStorageKey(), JSON.stringify({ items: [], timestamp: Date.now(), userId: 'guest' }));
      if (userId) {
        localStorage.setItem(getStorageKey(userId), JSON.stringify(dataToSave));
      }
      // Also set a durable cleared flag to prevent future re-sync
      const clearedMarker = JSON.stringify({ cleared: true, timestamp: Date.now(), userId: userId || 'guest' });
      localStorage.setItem(userId ? `cart_cleared_${userId}` : 'cart_cleared_guest', clearedMarker);
      // Clear any legacy keys if they existed
      localStorage.removeItem('cart');
      localStorage.removeItem('favorites');
    } catch (_) {}

    // Best-effort: clear server by removing each item when authenticated
    if (isAuthenticated) {
      try {
        for (const ci of itemsSnapshot) {
          const pid = ci?.product?._id;
          if (pid) {
            try { await API_MAIN.delete(`/auth/cart/remove/${pid}`); } catch (_) {}
          }
        }
        // If a bulk clear endpoint exists, call as well
        try { await API_MAIN.post('/auth/cart/clear'); } catch (_) {}
      } catch (_) {}
    }
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => {
      const price = item.product?.price || 0;
      const quantity = item.quantity || 0;
      return total + (price * quantity);
    }, 0);
  };

  const getCartItemCount = () => {
    return state.items.reduce((count, item) => count + (item.quantity || 0), 0);
  };

  const value = {
    items: state.items,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getCartTotal,
    getCartItemCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 