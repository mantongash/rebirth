# How to Get Standard Connection String from MongoDB Atlas

Since the SRV connection string is having DNS issues, use the Standard connection string instead.

## Steps:

1. **Go to MongoDB Atlas**: https://cloud.mongodb.com/
2. **Click "Connect"** on your cluster
3. **Click "Connect your application"**
4. **IMPORTANT**: Look for a link that says **"I am using driver 3.6 or earlier"** or **"Standard connection string"**
   - This will give you a connection string that starts with `mongodb://` instead of `mongodb+srv://`
5. **Copy the connection string**
6. **Update your `server/.env` file** with the new connection string

The Standard connection string looks like:
```
mongodb://username:password@cluster0-shard-00-00.xxxxx.mongodb.net:27017,cluster0-shard-00-01.xxxxx.mongodb.net:27017,cluster0-shard-00-02.xxxxx.mongodb.net:27017/rebirth-of-a-queen?ssl=true&replicaSet=atlas-xxxxx-shard-0&authSource=admin&retryWrites=true&w=majority
```

This bypasses DNS SRV resolution and should work even with DNS issues.

