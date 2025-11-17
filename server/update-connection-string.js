/**
 * Helper script to update connection string format
 * This helps convert SRV to Standard format if needed
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');

console.log('🔧 MongoDB Connection String Helper\n');
console.log('='.repeat(60));

// Check if .env exists
const envPath = path.join(__dirname, '.env');
if (!fs.existsSync(envPath)) {
  console.error('❌ .env file not found!');
  console.log('\n💡 Create a .env file in the server directory with:');
  console.log('MONGODB_URI=your_connection_string_here');
  process.exit(1);
}

// Read current .env
const envContent = fs.readFileSync(envPath, 'utf8');
const currentURI = process.env.MONGODB_URI;

if (!currentURI) {
  console.error('❌ MONGODB_URI not found in .env file');
  process.exit(1);
}

console.log('📋 Current Connection String Type:');
if (currentURI.startsWith('mongodb+srv://')) {
  console.log('   Type: SRV (mongodb+srv://)');
  console.log('   Status: ❌ Having DNS issues');
  console.log('\n💡 Solution: Switch to Standard connection string');
  console.log('\n📖 Instructions:');
  console.log('1. Go to MongoDB Atlas: https://cloud.mongodb.com/');
  console.log('2. Click "Connect" on your cluster');
  console.log('3. Click "Connect your application"');
  console.log('4. Click "I am using driver 3.6 or earlier"');
  console.log('5. Copy the Standard connection string (starts with mongodb://)');
  console.log('6. Update MONGODB_URI in your .env file');
} else if (currentURI.startsWith('mongodb://')) {
  console.log('   Type: Standard (mongodb://)');
  console.log('   Status: ✅ Should work (bypasses DNS)');
  console.log('\n✅ You\'re using Standard connection string!');
  console.log('   If connection still fails, check:');
  console.log('   - Password is correct and URL-encoded');
  console.log('   - IP is whitelisted in MongoDB Atlas');
  console.log('   - Cluster is running (not paused)');
} else {
  console.log('   Type: Unknown format');
  console.log('   Status: ⚠️  Invalid connection string format');
}

console.log('\n' + '='.repeat(60));
console.log('\n📝 Current MONGODB_URI (masked):');
const masked = currentURI.replace(/(mongodb\+?srv?:\/\/)([^:]+):([^@]+)@/, '$1$2:***@');
console.log('   ' + masked);

console.log('\n🔍 To test connection, run:');
console.log('   node test-db-connection.js');

