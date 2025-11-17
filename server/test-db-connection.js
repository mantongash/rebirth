/**
 * MongoDB Connection Test Script
 * Run this to test your MongoDB Atlas connection
 * 
 * Usage: node test-db-connection.js
 */

require('dotenv').config();
const mongoose = require('mongoose');

const testConnection = async () => {
  console.log('🔍 Testing MongoDB Connection...\n');
  
  // Check if MONGODB_URI is set
  if (!process.env.MONGODB_URI) {
    console.error('❌ ERROR: MONGODB_URI is not set in your .env file');
    console.log('\n💡 Solution:');
    console.log('1. Create a .env file in the server directory');
    console.log('2. Add: MONGODB_URI=your_connection_string_here');
    process.exit(1);
  }

  // Display connection string (masked)
  const uri = process.env.MONGODB_URI;
  const maskedUri = uri.replace(/(mongodb\+srv:\/\/)([^:]+):([^@]+)@/, '$1$2:***@');
  console.log('📋 Connection String:', maskedUri);
  console.log('');

  // Connection options
  const options = {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 30000,
    connectTimeoutMS: 10000,
    maxPoolSize: 10,
    retryWrites: true,
    w: 'majority',
    family: 4, // Prefer IPv4
  };

  try {
    console.log('🔄 Attempting to connect...');
    const conn = await mongoose.connect(uri, options);
    
    console.log('\n✅ SUCCESS! Connected to MongoDB Atlas');
    console.log('📦 Database:', conn.connection.name);
    console.log('🌐 Host:', conn.connection.host);
    console.log('🔌 Ready State:', conn.connection.readyState === 1 ? 'Connected' : 'Disconnected');
    
    // Test a simple query
    const collections = await conn.connection.db.listCollections().toArray();
    console.log('📚 Collections found:', collections.length);
    if (collections.length > 0) {
      console.log('   Collections:', collections.map(c => c.name).join(', '));
    }
    
    await mongoose.connection.close();
    console.log('\n✅ Connection test completed successfully!');
    process.exit(0);
    
  } catch (error) {
    console.error('\n❌ CONNECTION FAILED!');
    console.error('Error:', error.message);
    console.error('');
    
    // Provide specific solutions based on error type
    if (error.message.includes('IP')) {
      console.log('🔧 SOLUTION: IP Whitelisting Issue');
      console.log('1. Go to MongoDB Atlas Dashboard: https://cloud.mongodb.com/');
      console.log('2. Click "Network Access" in the left sidebar');
      console.log('3. Click "Add IP Address"');
      console.log('4. For testing, add: 0.0.0.0/0 (allows all IPs)');
      console.log('5. Click "Confirm" and wait 1-2 minutes');
      console.log('6. Run this test again');
    } else if (error.message.includes('authentication')) {
      console.log('🔧 SOLUTION: Authentication Failed');
      console.log('1. Check your username and password in the connection string');
      console.log('2. Ensure password is URL-encoded if it contains special characters');
      console.log('3. Verify the database user exists in MongoDB Atlas');
      console.log('4. Go to: Atlas Dashboard -> Database Access -> Verify user');
    } else if (error.message.includes('ETIMEOUT') || error.message.includes('DNS')) {
      console.log('🔧 SOLUTION: DNS/Network Issue');
      console.log('1. Check your internet connection');
      console.log('2. Try using a different DNS server (8.8.8.8)');
      console.log('3. Wait a few minutes and try again (DNS propagation)');
      console.log('4. Verify the cluster name in your connection string is correct');
    } else if (error.message.includes('queryTxt')) {
      console.log('🔧 SOLUTION: DNS Resolution Failed');
      console.log('1. The cluster hostname cannot be resolved');
      console.log('2. Check your internet connection');
      console.log('3. Verify the cluster name in MongoDB Atlas');
      console.log('4. Try using the Standard connection string instead of SRV');
    } else {
      console.log('🔧 GENERAL TROUBLESHOOTING:');
      console.log('1. Verify MONGODB_URI in your .env file');
      console.log('2. Check MongoDB Atlas status: https://status.mongodb.com/');
      console.log('3. Ensure your cluster is running in MongoDB Atlas');
      console.log('4. Review the full error message above for clues');
    }
    
    console.log('\n📖 For more help, see: MONGODB_CONNECTION_GUIDE.md');
    process.exit(1);
  }
};

// Run the test
testConnection();

