const mongoose = require('mongoose');

const connectDB = async () => {
  // Fail fast instead of buffering model operations when DB is down
  mongoose.set('bufferCommands', false);
  let mongoURI = process.env.MONGODB_URI; // Atlas only; no local fallback

  const options = {
    // Connection robustness
    serverSelectionTimeoutMS: 20000, // Increased timeout for DNS resolution and IP whitelist propagation
    socketTimeoutMS: 45000,
    heartbeatFrequencyMS: 10000,
    maxPoolSize: 10,
    retryWrites: true,
    w: 'majority',
    appName: 'RebirthOfAQueenServer',
    // Networking
    family: 4, // prefer IPv4 which avoids some DNS issues on Windows
    // Additional options to help with connection
    connectTimeoutMS: 20000, // Increased timeout for better reliability
    maxIdleTimeMS: 30000,
    // DNS resolution options
    directConnection: false, // Allow replica set connections
    // Retry configuration
    retryReads: true,
  };

  // Ensure a database name is present; many Atlas URIs omit it which can cause issues
  try {
    if (mongoURI) {
      const uri = new URL(mongoURI);
      // URL.pathname is like '/dbName' or '/' if missing
      if (!uri.pathname || uri.pathname === '/') {
        // Default DB name; change if you prefer a different default
        // Note: Must match existing database name case (Rebirth-of-a-queen)
        uri.pathname = '/Rebirth-of-a-queen';
        mongoURI = uri.toString();
        console.log('📝 Database name added to URI:', uri.pathname);
      } else {
        console.log('📝 Using database from URI:', uri.pathname);
      }
    }
  } catch (error) {
    // If parsing fails, leave URI as-is
    console.warn('⚠️  Could not parse MongoDB URI:', error.message);
  }

  // Safe visibility into env presence without leaking secrets
  const uriHint = !mongoURI
    ? 'undefined'
    : mongoURI.startsWith('mongodb+srv://')
      ? 'mongodb+srv://<redacted>'
      : mongoURI.startsWith('mongodb://')
        ? 'mongodb://<redacted>'
        : '<unknown-scheme>';
  console.log('🔐 MONGODB_URI detected:', uriHint);

  // Retry connect a few times to ride out transient DNS/IP whitelist propagation
  const maxAttempts = 3; // increased attempts for better reliability
  const baseDelayMs = 2000; // increased delay for IP whitelist propagation
  const tryConnect = async (label, uri) => {
    for (let attempt = 1; attempt <= maxAttempts; attempt += 1) {
      try {
        console.log(`🧩 [${label}] MongoDB connect attempt ${attempt}/${maxAttempts} ...`);
        const conn = await mongoose.connect(uri, options);
        console.log(`📦 [${label}] MongoDB Connected: ${conn.connection.host}`);
        return true;
      } catch (error) {
        console.error(`❌ [${label}] DB connect attempt ${attempt} failed:`, error.message);
        if (attempt < maxAttempts) {
          const wait = baseDelayMs * Math.pow(2, attempt - 1); // exponential backoff
          await new Promise((r) => setTimeout(r, wait));
          continue;
        }
        return false;
      }
    }
  };

  // Try primary connection first (standard connection string)
  if (mongoURI) {
    console.log('🔄 Trying primary connection...');
    const primaryOk = await tryConnect('primary', mongoURI);
    if (primaryOk) {
      // Success - set up event listeners below
    } else {
      // Try fallback connections if primary fails
      const fallbackURI = process.env.MONGODB_URI_FALLBACK;
      if (fallbackURI) {
        console.log('🔄 Trying fallback connection...');
        const ok = await tryConnect('fallback', fallbackURI);
        if (ok) {
          // Success with fallback
        } else {
          const singleDirect = process.env.MONGODB_URI_FALLBACK_SINGLE;
          if (singleDirect) {
            console.log('🔄 Trying single-node direct connection...');
            const okSingle = await tryConnect('fallback-single', singleDirect);
            if (okSingle) {
              // Success with single direct
            } else {
              // All connections failed
              console.log('🔗 Attempted URIs:');
              console.log('   Primary:', mongoURI);
              console.log('   Fallback:', fallbackURI ? '<provided>' : '<not set>');
              console.log('   Single Direct:', singleDirect ? '<provided>' : '<not set>');
              console.log('💡 Tips:');
              console.log(' - If using MongoDB Atlas, whitelist your IP and verify the connection string.');
              console.log(' - Ensure credentials are correct and URL-encoded.');
              console.log(' - Check if your cluster is running (not paused) in MongoDB Atlas.');
              console.warn('⚠️  MongoDB connection failed, but continuing to start server...');
              console.warn('⚠️  Some features may not work without database connection.');
              return; // Continue without DB connection
            }
          } else {
            // All connections failed
            console.log('🔗 Attempted URI:', mongoURI);
            console.log('💡 Tips:');
            console.log(' - If using MongoDB Atlas, whitelist your IP and verify the connection string.');
            console.log(' - Ensure credentials are correct and URL-encoded.');
            console.log(' - Check if your cluster is running (not paused) in MongoDB Atlas.');
            console.warn('⚠️  MongoDB connection failed, but continuing to start server...');
            console.warn('⚠️  Some features may not work without database connection.');
            return; // Continue without DB connection
          }
        }
      } else {
        // Primary failed, no fallback
        console.log('🔗 Attempted URI:', mongoURI);
        console.log('💡 Tips:');
        console.log(' - If using MongoDB Atlas, whitelist your IP and verify the connection string.');
        console.log(' - Ensure credentials are correct and URL-encoded.');
        console.log(' - Check if your cluster is running (not paused) in MongoDB Atlas.');
        console.warn('⚠️  MongoDB connection failed, but continuing to start server...');
        console.warn('⚠️  Some features may not work without database connection.');
        return; // Continue without DB connection
      }
    }
  } else {
    console.error('❌ MONGODB_URI is not set in environment variables');
    console.warn('⚠️  Server will start without database connection.');
    return;
  }
  
  // Connection event listeners for better observability
  const db = mongoose.connection;
  db.on('connected', () => {
    console.log('🔌 Mongoose connected');
    // Note: Cart cleanup service is started in index.js via this event
  });
  db.on('error', (err) => console.error('🛑 Mongoose connection error:', err.message));
  db.on('disconnected', () => console.warn('⚠️  Mongoose disconnected'));

  // Graceful shutdown
  const gracefulExit = async (signal) => {
    try {
      console.log(`\n${signal} received. Closing MongoDB connection...`);
      await mongoose.connection.close();
      console.log('✅ MongoDB connection closed. Exiting.');
      process.exit(0);
    } catch (e) {
      console.error('Error during MongoDB shutdown:', e.message);
      process.exit(1);
    }
  };
  process.on('SIGINT', () => gracefulExit('SIGINT'));
  process.on('SIGTERM', () => gracefulExit('SIGTERM'));
};

module.exports = connectDB; 