const mongoose = require('mongoose');

const connectDB = async () => {
  // Fail fast instead of buffering model operations when DB is down
  mongoose.set('bufferCommands', false);
  let mongoURI = process.env.MONGODB_URI; // Atlas only; no local fallback

  const options = {
    // Connection robustness
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 30000,
    heartbeatFrequencyMS: 10000,
    maxPoolSize: 10,
    retryWrites: true,
    w: 'majority',
    appName: 'RebirthOfAQueenServer',
    // Networking
    family: 4, // prefer IPv4 which avoids some DNS issues on Windows
    // Additional options to help with connection
    connectTimeoutMS: 10000,
    maxIdleTimeMS: 30000,
  };

  // Ensure a database name is present; many Atlas URIs omit it which can cause issues
  try {
    if (mongoURI) {
      const uri = new URL(mongoURI);
      // URL.pathname is like '/dbName' or '/' if missing
      if (!uri.pathname || uri.pathname === '/') {
        // Default DB name; change if you prefer a different default
        uri.pathname = '/rebirth-of-a-queen';
        mongoURI = uri.toString();
      }
    }
  } catch (_) {
    // If parsing fails, leave URI as-is
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
  const maxAttempts = 2; // fewer attempts for faster fallback
  const baseDelayMs = 1000;
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

  // Try fallback first if SRV is known to fail, then SRV as backup
  const singleDirect = process.env.MONGODB_URI_FALLBACK_SINGLE;
  if (singleDirect) {
    console.log('🔄 Trying single-node direct connection first...');
    const okSingle = await tryConnect('fallback-single', singleDirect);
    if (okSingle) return;
  }

  const fallbackURI = process.env.MONGODB_URI_FALLBACK;
  if (fallbackURI) {
    console.log('🔄 Trying multi-host fallback connection...');
    const ok = await tryConnect('fallback', fallbackURI);
    if (ok) return;
  }

  // Try SRV as last resort
  console.log('🔄 Trying SRV connection as last resort...');
  const primaryOk = await tryConnect('primary', mongoURI);
  if (!primaryOk) {

    console.log('🔗 Attempted URI:', mongoURI);
    if (process.env.MONGODB_URI_FALLBACK_SINGLE) {
      console.log('🔗 Attempted Single Direct Fallback URI: <provided>');
    }
    if (process.env.MONGODB_URI_FALLBACK) {
      console.log('🔗 Attempted Fallback URI: <provided>');
    }
    console.log('💡 Tips:');
    console.log(' - If using MongoDB Atlas, whitelist your IP and verify the SRV or use Standard connection string.');
    console.log(' - Ensure credentials are correct and URL-encoded.');

    console.warn('⚠️  MongoDB connection failed, but continuing to start server...');
    console.warn('⚠️  Some features may not work without database connection.');
    return; // Continue without DB connection
  }
  
  // Connection event listeners for better observability
  const db = mongoose.connection;
  db.on('connected', () => console.log('🔌 Mongoose connected'));
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