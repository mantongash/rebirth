/**
 * FINAL MONGODB CONNECTION FIX
 * This script will diagnose and fix all MongoDB connection issues
 */

require('dotenv').config();
const mongoose = require('mongoose');
const https = require('https');
const http = require('http');

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[91m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
  magenta: '\x1b[35m',
};

const log = (color, message) => console.log(`${color}${message}${colors.reset}`);

// Get current IP address
const getCurrentIP = () => {
  return new Promise((resolve, reject) => {
    const req = http.get('http://api.ipify.org', (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => resolve(data.trim()));
    });
    req.on('error', () => reject(null));
    req.setTimeout(5000, () => { req.destroy(); reject(null); });
  });
};

// Test MongoDB connection
const testConnection = async (uri, label, options = {}) => {
  const defaultOptions = {
    serverSelectionTimeoutMS: 20000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 20000,
    maxPoolSize: 10,
    retryWrites: true,
    w: 'majority',
    family: 4,
  };

  const mergedOptions = { ...defaultOptions, ...options };

  try {
    log(colors.cyan, `\n🔄 Testing: ${label}`);
    const conn = await mongoose.connect(uri, mergedOptions);
    log(colors.green, `✅ SUCCESS! Connected via ${label}`);
    log(colors.blue, `   Database: ${conn.connection.name}`);
    log(colors.blue, `   Host: ${conn.connection.host}`);
    log(colors.blue, `   Ready State: ${conn.connection.readyState === 1 ? 'Connected' : conn.connection.readyState}`);
    await mongoose.connection.close();
    return true;
  } catch (error) {
    log(colors.red, `❌ FAILED: ${label}`);
    log(colors.yellow, `   Error: ${error.message}`);
    
    // Provide specific guidance based on error
    if (error.message.includes('IP') || error.message.includes('whitelist')) {
      log(colors.magenta, '   💡 This is an IP whitelist issue - see instructions below');
    } else if (error.message.includes('authentication')) {
      log(colors.magenta, '   💡 Check your username and password');
    } else if (error.message.includes('DNS') || error.message.includes('ENOTFOUND')) {
      log(colors.magenta, '   💡 DNS resolution issue - try standard connection string');
    }
    
    return false;
  }
};

const main = async () => {
  console.clear();
  log(colors.cyan, '='.repeat(80));
  log(colors.cyan, '🔧 FINAL MONGODB CONNECTION FIX');
  log(colors.cyan, '='.repeat(80));

  // Step 1: Check environment variables
  log(colors.blue, '\n📋 Step 1: Checking Environment Variables...');
  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    log(colors.red, '❌ ERROR: MONGODB_URI not found in .env file');
    log(colors.yellow, '\n💡 Solution:');
    log(colors.reset, '   1. Create or edit server/.env file');
    log(colors.reset, '   2. Add: MONGODB_URI=your_connection_string_here');
    process.exit(1);
  }

  log(colors.green, '✅ MONGODB_URI found');

  // Step 2: Analyze connection string
  log(colors.blue, '\n📋 Step 2: Analyzing Connection String...');
  
  let issues = [];
  let warnings = [];

  // Check connection string type
  if (mongoURI.startsWith('mongodb+srv://')) {
    warnings.push('Using SRV connection (mongodb+srv://) - may have DNS issues');
    log(colors.yellow, '⚠️  Type: SRV (mongodb+srv://)');
  } else if (mongoURI.startsWith('mongodb://')) {
    log(colors.green, '✅ Type: Standard (mongodb://)');
  } else {
    issues.push('Invalid connection string format');
    log(colors.red, '❌ Type: Invalid format');
  }

  // Check for placeholders
  if (mongoURI.includes('xxxxx') || mongoURI.includes('atlas-xxxxx-shard-0')) {
    issues.push('Connection string contains placeholder "xxxxx"');
    log(colors.red, '❌ Contains placeholder "xxxxx"');
  } else {
    log(colors.green, '✅ No placeholders found');
  }

  // Check for username/password
  const userPassMatch = mongoURI.match(/mongodb\+?srv?:\/\/([^:]+):([^@]+)@/);
  if (userPassMatch) {
    log(colors.green, `✅ Username found: ${userPassMatch[1]}`);
    if (userPassMatch[2] && userPassMatch[2].length > 0) {
      log(colors.green, '✅ Password found');
    } else {
      issues.push('Password is missing or empty');
      log(colors.red, '❌ Password is missing');
    }
  } else {
    issues.push('Username/password not found in connection string');
    log(colors.red, '❌ Username/password not found');
  }

  // Check replicaSet
  if (mongoURI.includes('replicaSet=')) {
    const replicaSetMatch = mongoURI.match(/replicaSet=([^&]+)/);
    if (replicaSetMatch) {
      const replicaSet = replicaSetMatch[1];
      if (replicaSet.includes('xxxxx')) {
        issues.push('replicaSet contains placeholder');
        log(colors.red, `❌ replicaSet: ${replicaSet} (contains placeholder)`);
      } else {
        log(colors.green, `✅ replicaSet: ${replicaSet}`);
      }
    }
  } else if (mongoURI.startsWith('mongodb://')) {
    warnings.push('Standard connection should have replicaSet parameter');
    log(colors.yellow, '⚠️  replicaSet parameter not found');
  }

  // Step 3: Get current IP address
  log(colors.blue, '\n📋 Step 3: Getting Your Current IP Address...');
  let currentIP = null;
  try {
    currentIP = await getCurrentIP();
    log(colors.green, `✅ Your current IP: ${currentIP}`);
  } catch (error) {
    log(colors.yellow, '⚠️  Could not automatically detect IP address');
    log(colors.reset, '   Visit https://www.whatismyip.com/ to find your IP');
  }

  // Step 4: Test connection
  log(colors.blue, '\n📋 Step 4: Testing MongoDB Connection...');
  
  let connectionSuccess = false;

  // Try primary connection
  if (mongoURI) {
    connectionSuccess = await testConnection(mongoURI, 'Primary Connection');
  }

  // Try with extended timeouts if first attempt failed
  if (!connectionSuccess) {
    log(colors.cyan, '\n🔄 Retrying with extended timeouts...');
    connectionSuccess = await testConnection(mongoURI, 'Extended Timeouts', {
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
    });
  }

  // Step 5: Final Summary and Instructions
  log(colors.cyan, '\n' + '='.repeat(80));
  log(colors.cyan, '📊 FINAL DIAGNOSIS & SOLUTION');
  log(colors.cyan, '='.repeat(80));

  if (connectionSuccess) {
    log(colors.green, '\n✅ SUCCESS! MongoDB connection is working!');
    log(colors.blue, '   Your server should now be able to connect to MongoDB.');
    log(colors.reset, '\n   Next step: Restart your server with: npm start');
  } else {
    log(colors.red, '\n❌ CONNECTION FAILED');
    
    if (issues.length > 0) {
      log(colors.yellow, '\n🔴 CRITICAL ISSUES TO FIX:');
      issues.forEach((issue, i) => {
        log(colors.reset, `   ${i + 1}. ${issue}`);
      });
    }

    log(colors.blue, '\n📝 STEP-BY-STEP FIX INSTRUCTIONS:');
    log(colors.reset, '');
    
    log(colors.cyan, '1. FIX IP WHITELIST (MOST COMMON ISSUE):');
    log(colors.reset, '   a. Go to: https://cloud.mongodb.com/');
    log(colors.reset, '   b. Log in to your account');
    log(colors.reset, '   c. Click "Network Access" in the left sidebar');
    log(colors.reset, '   d. Click "Add IP Address" button');
    if (currentIP) {
      log(colors.green, `   e. Click "Add Current IP Address" (or enter: ${currentIP})`);
    } else {
      log(colors.reset, '   e. Click "Add Current IP Address" (or enter your IP manually)');
    }
    log(colors.reset, '   f. Click "Confirm"');
    log(colors.reset, '   g. Wait 2-3 minutes for changes to propagate');
    log(colors.yellow, '   ⚠️  OR for quick testing: Add 0.0.0.0/0 (allows all IPs - less secure)');
    
    log(colors.cyan, '\n2. VERIFY CLUSTER STATUS:');
    log(colors.reset, '   a. In MongoDB Atlas dashboard, check your cluster');
    log(colors.reset, '   b. Make sure it shows "Running" (green status)');
    log(colors.reset, '   c. If "Paused", click "Resume" and wait 2-3 minutes');
    
    log(colors.cyan, '\n3. VERIFY DATABASE CREDENTIALS:');
    log(colors.reset, '   a. Go to "Database Access" in MongoDB Atlas');
    log(colors.reset, '   b. Verify username and password are correct');
    log(colors.reset, '   c. If password has special characters, make sure they are URL-encoded');
    log(colors.reset, '      Special characters: @ → %40, : → %3A, / → %2F, # → %23, % → %25');
    
    if (mongoURI.startsWith('mongodb+srv://')) {
      log(colors.cyan, '\n4. SWITCH TO STANDARD CONNECTION STRING (if DNS issues persist):');
      log(colors.reset, '   a. In MongoDB Atlas, click "Connect" → "Connect your application"');
      log(colors.reset, '   b. Click "I am using driver 3.6 or earlier"');
      log(colors.reset, '   c. Copy the Standard connection string (starts with mongodb://)');
      log(colors.reset, '   d. Update MONGODB_URI in your .env file');
    }
    
    log(colors.cyan, '\n5. TEST CONNECTION AGAIN:');
    log(colors.reset, '   After fixing the issues above, run:');
    log(colors.yellow, '   node final-mongodb-fix.js');
    
    log(colors.cyan, '\n6. IF STILL FAILING:');
    log(colors.reset, '   - Check Windows Firewall (temporarily disable to test)');
    log(colors.reset, '   - Check antivirus software (temporarily disable to test)');
    log(colors.reset, '   - Try from a different network (mobile hotspot)');
    log(colors.reset, '   - Contact MongoDB Atlas Support (24/7 available)');
  }

  log(colors.cyan, '\n' + '='.repeat(80));
  
  if (currentIP && !connectionSuccess) {
    log(colors.magenta, `\n💡 YOUR IP ADDRESS: ${currentIP}`);
    log(colors.reset, '   Make sure this IP is whitelisted in MongoDB Atlas Network Access');
  }
  
  log(colors.reset, '');
};

main().catch(err => {
  log(colors.red, `\nFatal error: ${err.message}`);
  console.error(err);
  process.exit(1);
});

