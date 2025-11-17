# 🔧 Quick Database Connection Fix

## Current Error
`queryTxt ETIMEOUT cluster0.9fiw8iu.mongodb.net`

This means your computer cannot resolve the MongoDB Atlas hostname.

## ✅ Solutions (Try in Order)

### Solution 1: Check if Cluster is Active
1. Go to https://cloud.mongodb.com/
2. Log in to your account
3. Check if your cluster is **running** (not paused)
4. If paused, click **"Resume"** and wait 2-3 minutes

### Solution 2: Verify Connection String
1. In MongoDB Atlas, go to **"Connect"**
2. Click **"Connect your application"**
3. Select **"Node.js"** and copy the connection string
4. Make sure it matches your `.env` file

### Solution 3: Fix DNS Resolution (Windows)
Try these commands in PowerShell (as Administrator):

```powershell
# Flush DNS cache
ipconfig /flushdns

# Try using Google DNS
netsh interface ip set dns "Wi-Fi" static 8.8.8.8
netsh interface ip add dns "Wi-Fi" 8.8.4.4 index=2
```

Or manually:
1. Open **Network Settings**
2. Go to **Change adapter options**
3. Right-click your connection → **Properties**
4. Select **Internet Protocol Version 4 (TCP/IPv4)**
5. Click **Properties**
6. Select **"Use the following DNS server addresses"**
7. Enter:
   - Preferred: `8.8.8.8`
   - Alternate: `8.8.4.4`
8. Click **OK** and restart your computer

### Solution 4: Use Standard Connection String Instead of SRV
If SRV continues to fail, use the Standard connection string:

1. In MongoDB Atlas, go to **"Connect"**
2. Click **"Connect your application"**
3. Click **"I am using driver 3.6 or earlier"** or **"Standard connection string"**
4. Copy that connection string
5. Update your `.env` file with the new connection string

### Solution 5: Check Firewall/Antivirus
- Temporarily disable Windows Firewall
- Temporarily disable antivirus
- Try connecting again
- If it works, add MongoDB to firewall exceptions

### Solution 6: Test Internet Connection
```powershell
# Test if you can reach MongoDB
ping cluster0.9fiw8iu.mongodb.net

# Test DNS resolution
nslookup cluster0.9fiw8iu.mongodb.net
```

### Solution 7: Use Mobile Hotspot
If your current network is blocking DNS:
1. Connect to mobile hotspot
2. Try the connection test again
3. If it works, your network/firewall is the issue

## 🚀 Quick Test After Fix

After trying any solution, run:
```bash
cd server
node test-db-connection.js
```

## 📋 Most Common Fix

**90% of the time, this is fixed by:**
1. Ensuring cluster is running in MongoDB Atlas
2. Using Google DNS (8.8.8.8)
3. Flushing DNS cache

Try these first!

