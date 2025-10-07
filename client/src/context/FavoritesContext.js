import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { API_MAIN } from '../api';
import { useNotification } from './NotificationContext';

const FavoritesContext = createContext();

// Helper functions for localStorage management
const getFavoritesStorageKey = (userId) => `favorites_${userId}`;
const getGuestFavoritesStorageKey = () => 'favorites_guest';

const isFavoritesDataExpired = (timestamp) => {
  const now = Date.now();
  const thirtyDaysInMs = 30 * 24 * 60 * 60 * 1000; // 30 days in milliseconds (like major e-commerce sites)
  return (now - timestamp) > thirtyDaysInMs;
};

// Persisted clear flag helpers (prevents future re-sync)
const getFavoritesClearedFlagFromLocal = (key) => {
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

const saveFavoritesToLocalStorage = (userId, favoritesData) => {
  try {
    const storageKey = userId ? getFavoritesStorageKey(userId) : getGuestFavoritesStorageKey();
    const dataToSave = {
      items: favoritesData,
      timestamp: Date.now(),
      userId: userId || 'guest'
    };
    localStorage.setItem(storageKey, JSON.stringify(dataToSave));
  } catch (error) {
    console.error('Error saving favorites to localStorage:', error);
  }
};

const loadFavoritesFromLocalStorage = (userId) => {
  try {
    const storageKey = userId ? getFavoritesStorageKey(userId) : getGuestFavoritesStorageKey();
    const savedData = localStorage.getItem(storageKey);
    
    if (savedData) {
      const parsed = JSON.parse(savedData);
      
      // Check if data is expired
      if (isFavoritesDataExpired(parsed.timestamp)) {
        localStorage.removeItem(storageKey);
        return [];
      }
      
      // Verify the data belongs to the current user
      if (parsed.userId === (userId || 'guest')) {
        return parsed.items || [];
      }
    }
  } catch (error) {
    console.error('Error loading favorites from localStorage:', error);
  }
  return [];
};

const clearUserFavoritesFromStorage = (userId) => {
  try {
    const storageKey = userId ? getFavoritesStorageKey(userId) : getGuestFavoritesStorageKey();
    localStorage.removeItem(storageKey);
  } catch (error) {
    console.error('Error clearing favorites from localStorage:', error);
  }
};

const favoritesReducer = (state, action) => {
  console.log('FavoritesReducer: Action:', action.type, 'Payload:', action.payload);
  switch (action.type) {
    case 'ADD_TO_FAVORITES':
      if (state.items.find(item => item._id === action.payload._id)) {
        console.log('FavoritesReducer: Product already in favorites, returning current state');
        return state; // Already in favorites
      }
      console.log('FavoritesReducer: Adding new product to favorites');
      return {
        ...state,
        items: [...state.items, action.payload]
      };

    case 'REMOVE_FROM_FAVORITES':
      return {
        ...state,
        items: state.items.filter(item => item._id !== action.payload)
      };

    case 'CLEAR_FAVORITES':
      return {
        ...state,
        items: []
      };

    case 'LOAD_FAVORITES':
      return {
        ...state,
        items: action.payload || []
      };

    default:
      return state;
  }
};

export const FavoritesProvider = ({ children }) => {
  const [state, dispatch] = useReducer(favoritesReducer, {
    items: []
  });
  const { isAuthenticated, user } = useAuth();
  const { showSuccess } = useNotification();
  
  // Debug: Log authentication status
  console.log('FavoritesContext: isAuthenticated:', isAuthenticated);
  console.log('FavoritesContext: user:', user);
  console.log('FavoritesContext: token in localStorage:', localStorage.getItem('token'));

  // Load favorites from localStorage and server when user changes
  useEffect(() => {
    const loadFavorites = async () => {
      const userId = user?._id;
      const clearedFlag = sessionStorage.getItem('favorites_cleared');
      
      // Check if user cleared favorites (with timestamp check - expires after 7 days)
      if (clearedFlag) {
        try {
          const clearData = JSON.parse(clearedFlag);
          const sevenDaysInMs = 7 * 24 * 60 * 60 * 1000; // 7 days
          const isExpired = (Date.now() - clearData.timestamp) > sevenDaysInMs;
          const isCurrentUser = clearData.userId === (userId || 'guest');
          
          if (clearData.cleared && !isExpired && isCurrentUser) {
            dispatch({ type: 'LOAD_FAVORITES', payload: [] });
            clearUserFavoritesFromStorage(userId);
            // Don't sync from server if user explicitly cleared
            return;
          } else if (isExpired) {
            // Clear expired flag
            sessionStorage.removeItem('favorites_cleared');
          }
        } catch (_) {
          // If parsing fails, treat as old format and clear
          if (clearedFlag === '1') {
            dispatch({ type: 'LOAD_FAVORITES', payload: [] });
            clearUserFavoritesFromStorage(userId);
            return;
          }
        }
      }

      if (isAuthenticated && userId) {
        // Load server first (source of truth)
        try {
          console.log('FavoritesContext: Loading favorites from server...');
          const response = await API_MAIN.get('/auth/favorites');
          if (response.data.success) {
            const serverFavorites = response.data.data.favorites || [];
            // Normalize to array of Product objects for the UI/state
            const normalized = serverFavorites
              .map((fav) => fav && (fav.product || fav))
              .filter(Boolean);
            console.log('FavoritesContext: Loaded favorites (normalized):', normalized);
            dispatch({ type: 'LOAD_FAVORITES', payload: normalized });
            // Save to localStorage for offline access
            saveFavoritesToLocalStorage(userId, normalized);
            // Only merge guest favorites if server is empty and guest favorites weren't explicitly cleared
            const serverIsEmpty = normalized.length === 0;
            const guestCleared = !!getFavoritesClearedFlagFromLocal('favorites_cleared_guest');
            if (serverIsEmpty && !guestCleared) {
              const guestFavs = loadFavoritesFromLocalStorage(null);
              if (guestFavs && guestFavs.length > 0) {
                try {
                  for (const pf of guestFavs) {
                    if (pf?._id) {
                      await API_MAIN.post('/auth/favorites/add', { productId: pf._id });
                    }
                  }
                  clearUserFavoritesFromStorage(null);
                  showSuccess('Synced your favorites', { duration: 3000 });
                  // Reload server favorites after merge
                  const response2 = await API_MAIN.get('/auth/favorites');
                  if (response2.data.success) {
                    const serverFavorites2 = response2.data.data.favorites || [];
                    const normalized2 = serverFavorites2
                      .map((fav) => fav && (fav.product || fav))
                      .filter(Boolean);
                    dispatch({ type: 'LOAD_FAVORITES', payload: normalized2 });
                    saveFavoritesToLocalStorage(userId, normalized2);
                  }
                } catch (_) { /* best-effort */ }
              }
            }
            return;
          }
        } catch (error) {
          console.error('Error loading favorites from server:', error);
          console.log('Server favorites unavailable, loading from localStorage');
        }
        
        // If server fails, load from localStorage
        const localFavorites = loadFavoritesFromLocalStorage(userId);
        if (localFavorites.length > 0) {
          dispatch({ type: 'LOAD_FAVORITES', payload: localFavorites });
        }
      } else {
        // For guests: load from localStorage only
        const localFavorites = loadFavoritesFromLocalStorage(null);
        dispatch({ type: 'LOAD_FAVORITES', payload: localFavorites });
      }
    };

    loadFavorites();
  }, [isAuthenticated, user?._id, showSuccess]);

  const addToFavorites = async (product) => {
    if (!product || !product._id) return;
    // Once user adds something, clear any session cleared flag
    try { sessionStorage.removeItem('favorites_cleared'); } catch (_) {}
    console.log('FavoritesContext: Adding to favorites:', product.name, product._id);
    
    // Update local state immediately for better UX
    dispatch({
      type: 'ADD_TO_FAVORITES',
      payload: product
    });

    // Sync with server if authenticated
    if (isAuthenticated) {
      try {
        const response = await API_MAIN.post('/auth/favorites/add', {
          productId: product._id
        });

        if (!response.data.success) {
          console.error('Failed to add to favorites on server');
          // Revert local state if server call failed
          dispatch({
            type: 'REMOVE_FROM_FAVORITES',
            payload: product._id
          });
        }
      } catch (error) {
        console.error('Error adding to favorites:', error);
        console.error('Error response:', error.response?.data);
        console.error('Error status:', error.response?.status);
        // Revert local state if server call failed
        dispatch({
          type: 'REMOVE_FROM_FAVORITES',
          payload: product._id
        });
      }
    }
  };

  const removeFromFavorites = async (productId) => {
    if (!productId) return;
    // Update local state immediately
    dispatch({
      type: 'REMOVE_FROM_FAVORITES',
      payload: productId
    });

    // Sync with server if authenticated
    if (isAuthenticated) {
      try {
        const response = await API_MAIN.delete(`/auth/favorites/remove/${productId}`);

        if (!response.data.success) {
          console.error('Failed to remove from favorites on server');
        }
      } catch (error) {
        console.error('Error removing from favorites:', error);
      }
    }
  };

  // Save to localStorage whenever favorites change (persist empty to clear stale data)
  useEffect(() => {
    const userId = user?._id;
    saveFavoritesToLocalStorage(userId, state.items);
  }, [state.items, user?._id]);

  const clearFavorites = async () => {
    const userId = user?._id;
    const itemsSnapshot = [...state.items];

    // Optimistically clear UI
    dispatch({ type: 'CLEAR_FAVORITES' });
    
    // Set session flag with timestamp (expires after 7 days)
    try { 
      const clearData = { 
        cleared: true, 
        timestamp: Date.now(),
        userId: userId || 'guest'
      };
      sessionStorage.setItem('favorites_cleared', JSON.stringify(clearData));
    } catch (_) {}

    // Aggressively clear all possible localStorage keys (user + guest + legacy)
    try {
      const dataToSave = { items: [], timestamp: Date.now(), userId: userId || 'guest' };
      localStorage.setItem(userId ? getFavoritesStorageKey(userId) : getGuestFavoritesStorageKey(), JSON.stringify(dataToSave));
      localStorage.setItem(getGuestFavoritesStorageKey(), JSON.stringify({ items: [], timestamp: Date.now(), userId: 'guest' }));
      if (userId) {
        localStorage.setItem(getFavoritesStorageKey(userId), JSON.stringify(dataToSave));
      }
      // Also set a durable cleared flag to prevent future re-sync
      const clearedMarker = JSON.stringify({ cleared: true, timestamp: Date.now(), userId: userId || 'guest' });
      localStorage.setItem(userId ? `favorites_cleared_${userId}` : 'favorites_cleared_guest', clearedMarker);
      // Clear any legacy keys if they existed
      localStorage.removeItem('favorites');
      localStorage.removeItem('cart');
    } catch (_) {}

    // Best-effort: clear server by removing each favorite when authenticated
    if (isAuthenticated) {
      try {
        for (const pf of itemsSnapshot) {
          const pid = pf?._id;
          if (pid) {
            try { await API_MAIN.delete(`/auth/favorites/remove/${pid}`); } catch (_) {}
          }
        }
        // If a bulk clear endpoint exists, call as well
        try { await API_MAIN.post('/auth/favorites/clear'); } catch (_) {}
      } catch (_) {}
    }
  };

  const isFavorite = (productId) => {
    return state.items.some(item => item._id === productId);
  };

  const toggleFavorite = async (product) => {
    console.log('FavoritesContext: Toggling favorite for:', product.name, 'Current favorites count:', state.items.length);
    if (isFavorite(product._id)) {
      console.log('FavoritesContext: Removing from favorites');
      await removeFromFavorites(product._id);
    } else {
      console.log('FavoritesContext: Adding to favorites');
      await addToFavorites(product);
    }
  };

  const value = {
    items: state.items,
    addToFavorites,
    removeFromFavorites,
    clearFavorites,
    isFavorite,
    toggleFavorite
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
