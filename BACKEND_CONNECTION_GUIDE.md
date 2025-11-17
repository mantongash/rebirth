# Backend Connection Guide

## ✅ All API Endpoints Updated

All frontend API endpoints have been updated to use a centralized configuration that reads from the `REACT_APP_API_URL` environment variable.

## 🔧 Setup Instructions

### 1. Create Environment Variable File

Create a `.env` file in the `client` directory with your Render backend URL:

```env
REACT_APP_API_URL=https://your-backend-app.onrender.com
```

**Important**: 
- Replace `your-backend-app.onrender.com` with your actual Render backend URL
- Do NOT include `/api` at the end - the configuration handles that automatically
- Make sure the URL starts with `https://`

### 2. Example Configuration

If your Render backend URL is: `https://rebirth-queen-api.onrender.com`

Your `.env` file should contain:
```env
REACT_APP_API_URL=https://rebirth-queen-api.onrender.com
```

### 3. Files Updated

All the following files have been updated to use the centralized API configuration:

#### Core API Files:
- ✅ `client/src/api.js`
- ✅ `client/src/services/api.js`
- ✅ `client/src/utils/apiConfig.js` (NEW - centralized config)

#### Context Files:
- ✅ `client/src/context/AuthContext.js`
- ✅ `client/src/context/AdminAuthContext.js`

#### Page Files:
- ✅ `client/src/pages/AdminProducts.js`
- ✅ `client/src/pages/AdminGallery.js`
- ✅ `client/src/pages/AdminUsers.js`
- ✅ `client/src/pages/AdminAnalytics.js`
- ✅ `client/src/pages/AdminBulkSMS.js`
- ✅ `client/src/pages/AdminSubscribers.js`
- ✅ `client/src/pages/Donate.js`
- ✅ `client/src/pages/Contact.js`
- ✅ `client/src/pages/Login.js`
- ✅ `client/src/pages/Signup.js`

#### Component Files:
- ✅ `client/src/components/PaymentStatus.js`

## 📝 How It Works

The centralized API configuration (`client/src/utils/apiConfig.js`) provides:

1. **`getApiUrl()`** - Returns the full API URL (base + `/api`)
2. **`getBaseUrl()`** - Returns just the base URL
3. **`buildApiUrl(endpoint)`** - Builds a complete API endpoint URL

All endpoints now automatically use your Render backend URL when `REACT_APP_API_URL` is set.

## 🚀 Testing

After setting up your `.env` file:

1. Restart your development server:
   ```bash
   cd client
   npm start
   ```

2. Check the browser console - all API calls should now go to your Render backend

3. Test key features:
   - User login/registration
   - Admin panel access
   - Payment processing
   - Contact form submission
   - Product management (admin)

## ⚠️ Important Notes

1. **CORS Configuration**: Make sure your Render backend has CORS configured to allow requests from your frontend domain. Update `CORS_ORIGIN` in your server `.env` file.

2. **Environment Variables**: 
   - The `.env` file should be in the `client` directory
   - Restart the dev server after creating/updating `.env`
   - For production builds, set the environment variable in your hosting platform

3. **Production Deployment**:
   - Set `REACT_APP_API_URL` in your hosting platform's environment variables
   - For Netlify/Vercel: Add it in the site settings
   - The variable must start with `REACT_APP_` to be accessible in React

## 🔍 Verification

To verify the connection is working:

1. Open browser DevTools (F12)
2. Go to Network tab
3. Perform an action (e.g., login, fetch products)
4. Check the API requests - they should all point to your Render backend URL

## 📞 Need Help?

If you encounter CORS errors or connection issues:

1. Check that your Render backend is running
2. Verify CORS settings in `server/index.js`
3. Ensure `REACT_APP_API_URL` is set correctly
4. Check browser console for specific error messages

