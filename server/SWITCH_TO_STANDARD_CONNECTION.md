# Switch to Standard Connection String (Fixes DNS Issues)

## Why This Works
The SRV connection string (`mongodb+srv://`) requires DNS SRV record resolution, which is failing on your network. The Standard connection string (`mongodb://`) uses direct IP addresses and bypasses DNS issues.

## Steps to Fix:

### Step 1: Get Standard Connection String from MongoDB Atlas

1. **Go to MongoDB Atlas**: https://cloud.mongodb.com/
2. **Log in** to your account
3. **Click "Connect"** button on your cluster
4. **Click "Connect your application"**
5. **IMPORTANT**: Look for and click **"I am using driver 3.6 or earlier"** or **"Standard connection string"**
   - This is usually a small link below the connection string
6. **Copy the connection string** that appears
   - It will start with `mongodb://` (NOT `mongodb+srv://`)
   - It will look like: `mongodb://username:password@cluster0-shard-00-00.xxxxx.mongodb.net:27017,...`

### Step 2: Update Your .env File

1. Open `server/.env` file
2. Find the line: `MONGODB_URI=...`
3. Replace it with your Standard connection string:
   ```
   MONGODB_URI=mongodb://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER-shard-00-00.xxxxx.mongodb.net:27017,YOUR_CLUSTER-shard-00-01.xxxxx.mongodb.net:27017,YOUR_CLUSTER-shard-00-02.xxxxx.mongodb.net:27017/YOUR_DATABASE?ssl=true&replicaSet=atlas-xxxxx-shard-0&authSource=admin&retryWrites=true&w=majority
   ```
   - Replace `password` with your actual password (URL-encoded if needed)
   - The connection string from Atlas will have the correct values

### Step 3: Test the Connection

```bash
cd server
node test-db-connection.js
```

You should see: `✅ SUCCESS! Connected to MongoDB Atlas`

### Step 4: Restart Your Server

```bash
npm start
```

## Alternative: If You Can't Find "Standard Connection String" Option

If you don't see the option in MongoDB Atlas:

1. Go to **"Connect"** → **"Connect your application"**
2. Look for **"Connection String Only"** or similar option
3. Or manually convert SRV to Standard:
   - Replace `mongodb+srv://` with `mongodb://`
   - Add port `:27017` after each hostname
   - Add `?ssl=true&authSource=admin&retryWrites=true&w=majority`

## What's the Difference?

- **SRV (`mongodb+srv://`)**: Uses DNS SRV records (requires DNS resolution) ❌ Failing
- **Standard (`mongodb://`)**: Uses direct IP addresses (bypasses DNS) ✅ Should work

## Still Having Issues?

If Standard connection string also fails:
1. Check if your password needs URL encoding
2. Verify the cluster is running (not paused)
3. Double-check IP whitelist includes `0.0.0.0/0` or your specific IP
4. Try from a different network (mobile hotspot) to rule out network issues

