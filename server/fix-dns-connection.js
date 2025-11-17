/**
 * Alternative Connection Test - Using Direct IP Resolution
 * This script tests if we can connect using alternative methods
 */

require('dotenv').config();
const mongoose = require('mongoose');
const dns = require('dns').promises;

const testDNSResolution = async () => {
  console.log('🔍 Testing DNS Resolution...\n');
  
  // Get hostname from environment or use placeholder
  const hostname = process.env.MONGODB_CLUSTER_HOSTNAME || 'YOUR_CLUSTER.mongodb.net';
  
  try {
    console.log(`Testing DNS lookup for: ${hostname}`);
    const addresses = await dns.resolve4(hostname);
    console.log('✅ DNS Resolution SUCCESS!');
    console.log('Resolved IPs:', addresses);
    return true;
  } catch (error) {
    console.error('❌ DNS Resolution FAILED!');
    console.error('Error:', error.message);
    console.log('\n💡 This means your computer cannot resolve the MongoDB hostname.');
    console.log('Solutions:');
    console.log('1. Use Google DNS (8.8.8.8) - See instructions in QUICK_DB_FIX.md');
    console.log('2. Use Standard connection string instead of SRV');
    console.log('3. Check if your network/firewall is blocking DNS queries');
    return false;
  }
};

const testConnectionWithStandardURI = async () => {
  console.log('\n🔍 Testing with Standard Connection String...\n');
  
  // You need to get this from MongoDB Atlas
  // Go to: Connect -> Connect your application -> "I am using driver 3.6 or earlier"
  const standardURI = process.env.MONGODB_URI_STANDARD;
  
  if (!standardURI) {
    console.log('⚠️  MONGODB_URI_STANDARD not set in .env file');
    console.log('\n📋 To get Standard Connection String:');
    console.log('1. Go to MongoDB Atlas Dashboard');
    console.log('2. Click "Connect" on your cluster');
    console.log('3. Click "Connect your application"');
    console.log('4. Click "I am using driver 3.6 or earlier"');
    console.log('5. Copy the connection string (starts with mongodb://)');
    console.log('6. Add to .env as: MONGODB_URI_STANDARD=your_connection_string');
    return false;
  }
  
  const options = {
    serverSelectionTimeoutMS: 15000,
    socketTimeoutMS: 45000,
    connectTimeoutMS: 15000,
    maxPoolSize: 10,
    retryWrites: true,
    w: 'majority',
    family: 4,
  };
  
  try {
    console.log('🔄 Attempting connection with Standard URI...');
    const conn = await mongoose.connect(standardURI, options);
    console.log('\n✅ SUCCESS! Connected using Standard connection string!');
    console.log('📦 Database:', conn.connection.name);
    console.log('🌐 Host:', conn.connection.host);
    await mongoose.connection.close();
    return true;
  } catch (error) {
    console.error('\n❌ Connection with Standard URI also failed');
    console.error('Error:', error.message);
    return false;
  }
};

const main = async () => {
  console.log('='.repeat(60));
  console.log('MongoDB Connection Diagnostic Tool');
  console.log('='.repeat(60));
  
  // Test 1: DNS Resolution
  const dnsWorks = await testDNSResolution();
  
  // Test 2: Standard Connection String (if available)
  if (!dnsWorks) {
    console.log('\n' + '='.repeat(60));
    await testConnectionWithStandardURI();
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('Diagnostic Complete');
  console.log('='.repeat(60));
};

main().then(() => process.exit(0)).catch(err => {
  console.error('Fatal error:', err);
  process.exit(1);
});

