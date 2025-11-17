# MongoDB Atlas Connection Troubleshooting Guide

## 🔴 Current Issue

Your MongoDB Atlas connection is failing due to:
1. **IP Whitelisting**: Your current IP address is not whitelisted in MongoDB Atlas
2. **Connection Timeouts**: DNS resolution issues with the SRV connection string

## ✅ Solutions

### Solution 1: Whitelist Your IP Address (For Local Development)

1. **Get Your Current IP Address**:
   - Visit: https://whatismyipaddress.com/
   - Copy your IPv4 address

2. **Add IP to MongoDB Atlas Whitelist**:
   - Go to MongoDB Atlas Dashboard: https://cloud.mongodb.com/
   - Click on **"Network Access"** in the left sidebar
   - Click **"Add IP Address"**
   - Enter your IP address (e.g., `123.456.789.0`)
   - Click **"Confirm"**
   - Wait 1-2 minutes for changes to propagate

3. **For Development (Allow All IPs - NOT RECOMMENDED FOR PRODUCTION)**:
   - Click **"Add IP Address"**
   - Enter `0.0.0.0/0` (allows all IPs)
   - Add a comment: "Development - Allow all IPs"
   - ⚠️ **Warning**: Only use this for development/testing

### Solution 2: Configure for Render.com Deployment

For your Render deployment (`https://rebirth-of-a-queen.onrender.com`), you need to:

1. **Allow Render IPs in MongoDB Atlas**:
   - Render uses dynamic IPs, so you have two options:

   **Option A: Allow All IPs (Easier for now)**
   - Add `0.0.0.0/0` to Network Access
   - This allows connections from anywhere
   - ⚠️ **Security Note**: Ensure your database user has strong credentials

   **Option B: Use MongoDB Atlas VPC Peering (More Secure)**
   - This requires MongoDB Atlas M10+ cluster
   - More complex setup but more secure

2. **Set Environment Variables in Render**:
   - Go to your Render dashboard
   - Select your service
   - Go to **"Environment"** tab
   - Add/verify these variables:
     ```
     MONGODB_URI=mongodb+srv://username:password@cluster0.9fiw8iu.mongodb.net/Rebirth-of-a-queen?retryWrites=true&w=majority
     NODE_ENV=production
     PORT=5000
     JWT_SECRET=your_jwt_secret_here
     SESSION_SECRET=your_session_secret_here
     CORS_ORIGIN=https://your-frontend-domain.com
     ```

### Solution 3: Verify Connection String Format

Your connection string should be in this format:
```
mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<database-name>?retryWrites=true&w=majority
```

**Important Notes**:
- Username and password must be **URL-encoded** if they contain special characters
- Special characters to encode:
  - `@` → `%40`
  - `:` → `%3A`
  - `/` → `%2F`
  - `?` → `%3F`
  - `#` → `%23`
  - `[` → `%5B`
  - `]` → `%5D`

**Example**:
If your password is `p@ssw:rd`, it should be `p%40ssw%3Ard` in the connection string.

### Solution 4: Test Connection Locally

1. **Create a test file** (`test-db-connection.js`):
```javascript
const mongoose = require('mongoose');
require('dotenv').config();

const testConnection = async () => {
  try {
    console.log('Testing MongoDB connection...');
    await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log('✅ Connected successfully!');
    console.log('Database:', mongoose.connection.name);
    console.log('Host:', mongoose.connection.host);
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Connection failed:', error.message);
    process.exit(1);
  }
};

testConnection();
```

2. **Run the test**:
```bash
cd server
node test-db-connection.js
```

## 🔒 Security Best Practices

### For Production:

1. **Use Strong Database Credentials**:
   - Username: Use a strong, unique username
   - Password: Use a strong password (16+ characters, mix of letters, numbers, symbols)

2. **Limit IP Access**:
   - Instead of `0.0.0.0/0`, whitelist specific IPs:
     - Your Render service IPs (if static)
     - Your development machine IP
     - Your office/home IPs

3. **Use Database User with Limited Permissions**:
   - Create a dedicated database user for your application
   - Grant only necessary permissions (read/write to specific database)

4. **Enable MongoDB Atlas Security Features**:
   - Enable **IP Access List** (already using)
   - Enable **Database Access** with strong passwords
   - Enable **Encryption at Rest**
   - Enable **Audit Logging** (if available)

## 🚀 Quick Fix for Immediate Testing

If you need to test quickly:

1. **Temporarily allow all IPs**:
   - MongoDB Atlas → Network Access → Add IP Address
   - Enter: `0.0.0.0/0`
   - Comment: "Temporary - for testing"

2. **Restart your server**:
   ```bash
   # Stop the server (Ctrl+C)
   # Start again
   npm start
   ```

3. **Verify connection**:
   - Check server logs for: `✅ MongoDB Connected`
   - If still failing, check the connection string format

## 📋 Checklist

- [ ] MongoDB Atlas Network Access configured
- [ ] IP address whitelisted (or `0.0.0.0/0` for development)
- [ ] Database user created with strong password
- [ ] Connection string is correctly formatted
- [ ] Password is URL-encoded if it contains special characters
- [ ] Environment variable `MONGODB_URI` is set correctly
- [ ] Render environment variables are configured (for production)
- [ ] Connection test passes

## 🔍 Common Error Messages and Solutions

### "Could not connect to any servers in your MongoDB Atlas cluster"
**Solution**: Your IP is not whitelisted. Add it to Network Access.

### "queryTxt ETIMEOUT"
**Solution**: DNS resolution issue. Try:
- Check your internet connection
- Use a different DNS server (Google DNS: 8.8.8.8)
- Wait a few minutes and retry (DNS propagation)

### "Authentication failed"
**Solution**: 
- Check username and password
- Ensure password is URL-encoded
- Verify database user exists in MongoDB Atlas

### "Server selection timed out"
**Solution**:
- Check IP whitelist
- Verify connection string
- Check firewall settings
- Try increasing `serverSelectionTimeoutMS` in connection options

## 📞 Need More Help?

1. **MongoDB Atlas Documentation**: https://docs.atlas.mongodb.com/
2. **MongoDB Community Forums**: https://developer.mongodb.com/community/forums/
3. **Check MongoDB Atlas Status**: https://status.mongodb.com/

## ⚠️ Important Security Note

**NEVER commit your MongoDB connection string to version control!**

- Always use environment variables
- Add `.env` to `.gitignore`
- Use different credentials for development and production
- Rotate passwords regularly

