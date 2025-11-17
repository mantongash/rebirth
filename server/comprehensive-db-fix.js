/**
 * Comprehensive Database Connection Troubleshooting
 * This script will test multiple scenarios to identify the exact issue
 */

require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns').promises;

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[91m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const log = (color, message) => console.log(`${color}${message}${colors.reset}`);

const testConnection = async (uri, label, options = {}) => {
  const defaultOptions = {
    serverSelectionTimeoutMS: 15000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 15000,
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
    await mongoose.connection.close();
    return true;
  } catch (error) {
    log(colors.red, `❌ FAILED: ${label}`);
    log(colors.yellow, `   Error: ${error.message}`);
    return false;
  }
};

const main = async () => {
  console.clear();
  log(colors.cyan, '='.repeat(70));
  log(colors.cyan, 'COMPREHENSIVE MONGODB CONNECTION TROUBLESHOOTING');
  log(colors.cyan, '='.repeat(70));

  const mongoURI = process.env.MONGODB_URI;

  if (!mongoURI) {
    log(colors.red, '\n❌ ERROR: MONGODB_URI not found in .env file');
    process.exit(1);
  }

  log(colors.blue, '\n📋 Connection String Type:');
  if (mongoURI.startsWith('mongodb+srv://')) {
    log(colors.yellow, '   Type: SRV (mongodb+srv://)');
  } else if (mongoURI.startsWith('mongodb://')) {
    log(colors.green, '   Type: Standard (mongodb://)');
  }

  // Extract hostname for DNS test
  let hostname;
  try {
    const url = new URL(mongoURI);
    hostname = url.hostname || url.host.split(':')[0];
  } catch (e) {
    hostname = null;
  }

  // Test 1: DNS Resolution
  if (hostname) {
    log(colors.cyan, '\n🔍 Test 1: DNS Resolution');
    try {
      const addresses = await dns.resolve4(hostname);
      log(colors.green, `✅ DNS Resolution SUCCESS`);
      log(colors.blue, `   Resolved IPs: ${addresses.join(', ')}`);
    } catch (error) {
      log(colors.red, `❌ DNS Resolution FAILED`);
      log(colors.yellow, `   Error: ${error.message}`);
      log(colors.yellow, '   💡 This means your network cannot resolve the hostname');
    }
  }

  // Test 2: Basic Connection
  log(colors.cyan, '\n🔍 Test 2: Basic Connection Test');
  const basicSuccess = await testConnection(mongoURI, 'Basic Connection');

  // Test 3: Connection with Increased Timeouts
  if (!basicSuccess) {
    log(colors.cyan, '\n🔍 Test 3: Connection with Extended Timeouts');
    await testConnection(mongoURI, 'Extended Timeouts', {
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
    });
  }

  // Test 4: Try without SSL (if Standard connection)
  if (mongoURI.startsWith('mongodb://') && mongoURI.includes('ssl=true')) {
    log(colors.cyan, '\n🔍 Test 4: Connection without SSL (testing)');
    const uriWithoutSSL = mongoURI.replace('ssl=true', 'ssl=false');
    await testConnection(uriWithoutSSL, 'Without SSL (should fail, but tests network)');
  }

  // Test 5: Try with directConnection
  if (!basicSuccess) {
    log(colors.cyan, '\n🔍 Test 5: Direct Connection Mode');
    await testConnection(mongoURI, 'Direct Connection', {
      directConnection: true,
    });
  }

  // Summary and Recommendations
  log(colors.cyan, '\n' + '='.repeat(70));
  log(colors.cyan, 'TROUBLESHOOTING RECOMMENDATIONS');
  log(colors.cyan, '='.repeat(70));

  if (!basicSuccess) {
    log(colors.yellow, '\n⚠️  Connection is still failing. Try these solutions:\n');

    log(colors.blue, '1. VERIFY IP WHITELIST IN MONGODB ATLAS:');
    log(colors.reset, '   - Go to: https://cloud.mongodb.com/');
    log(colors.reset, '   - Network Access → Add IP Address');
    log(colors.reset, '   - Add: 0.0.0.0/0 (allows all IPs for testing)');
    log(colors.reset, '   - Wait 2-3 minutes after adding');

    log(colors.blue, '\n2. VERIFY CLUSTER STATUS:');
    log(colors.reset, '   - Check if cluster shows "Running" (green)');
    log(colors.reset, '   - If "Paused", click "Resume" and wait 2-3 minutes');

    log(colors.blue, '\n3. VERIFY DATABASE CREDENTIALS:');
    log(colors.reset, '   - Go to: Database Access in MongoDB Atlas');
    log(colors.reset, '   - Verify username and password are correct');
    log(colors.reset, '   - If password has special characters, URL-encode them');
    log(colors.reset, '   - Try resetting the password');

    log(colors.blue, '\n4. CHECK CONNECTION STRING FORMAT:');
    log(colors.reset, '   - Standard format should have: replicaSet parameter');
    log(colors.reset, '   - Check if replicaSet name is correct (not "atlas-xxxxx-shard-0")');
    log(colors.reset, '   - Get fresh connection string from MongoDB Atlas');

    log(colors.blue, '\n5. TEST FROM DIFFERENT NETWORK:');
    log(colors.reset, '   - Try using mobile hotspot');
    log(colors.reset, '   - If it works, your network/firewall is blocking MongoDB');

    log(colors.blue, '\n6. CHECK FIREWALL/ANTIVIRUS:');
    log(colors.reset, '   - Temporarily disable Windows Firewall');
    log(colors.reset, '   - Temporarily disable antivirus');
    log(colors.reset, '   - Test connection again');

    log(colors.blue, '\n7. CONTACT MONGODB SUPPORT:');
    log(colors.reset, '   - MongoDB Atlas has 24/7 support');
    log(colors.reset, '   - They can check your cluster status and network settings');
  } else {
    log(colors.green, '\n✅ Connection test passed! Your database should be working.');
    log(colors.blue, '   If server still shows errors, restart it: npm start');
  }

  log(colors.cyan, '\n' + '='.repeat(70));
};

main().catch(err => {
  log(colors.red, `\nFatal error: ${err.message}`);
  process.exit(1);
});

