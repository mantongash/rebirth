/**
 * MongoDB Authentication Fix Helper
 * This script helps fix authentication issues with MongoDB Atlas
 */

require('dotenv').config();

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function urlEncodePassword(password) {
  // URL encode special characters that cause issues in connection strings
  return encodeURIComponent(password);
}

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function main() {
  console.log('🔧 MongoDB Authentication Fix Helper\n');
  console.log('The error "bad auth : authentication failed" usually means:');
  console.log('1. Wrong password in connection string');
  console.log('2. Password needs URL-encoding (if it has special characters)');
  console.log('3. Database user doesn\'t exist in MongoDB Atlas\n');

  // Check current connection string
  const currentURI = process.env.MONGODB_URI;
  if (!currentURI) {
    console.error('❌ MONGODB_URI not found in .env file');
    console.log('\n💡 Solution: Add MONGODB_URI to your .env file');
    rl.close();
    process.exit(1);
  }

  // Extract username from current URI
  const usernameMatch = currentURI.match(/mongodb\+?srv?:\/\/([^:]+):/);
  const currentUsername = usernameMatch ? usernameMatch[1] : null;

  console.log('📋 Current Connection String Info:');
  console.log(`   Username: ${currentUsername || 'Not found'}`);
  console.log(`   Format: ${currentURI.startsWith('mongodb+srv://') ? 'SRV' : 'Standard'}\n`);

  console.log('🔍 Let\'s fix the authentication issue:\n');

  // Option 1: URL encode password
  console.log('Option 1: URL-Encode Your Password');
  console.log('If your password has special characters (@, :, /, #, %, etc.), they need to be URL-encoded.\n');

  const encodeChoice = await question('Do you want to URL-encode a password? (y/n): ');
  
  if (encodeChoice.toLowerCase() === 'y') {
    const password = await question('Enter your MongoDB password: ');
    const encoded = urlEncodePassword(password);
    console.log(`\n✅ URL-Encoded Password: ${encoded}`);
    console.log('\n📝 Special character encoding:');
    console.log('   @ → %40');
    console.log('   : → %3A');
    console.log('   / → %2F');
    console.log('   # → %23');
    console.log('   % → %25');
    console.log('   [ → %5B');
    console.log('   ] → %5D');
    console.log('   ? → %3F');
    console.log('   = → %3D');
    console.log('   & → %26');
    console.log('   + → %2B');
    console.log('   space → %20\n');
  }

  // Option 2: Get new connection string from Atlas
  console.log('\nOption 2: Get Fresh Connection String from MongoDB Atlas');
  console.log('This is the RECOMMENDED approach - get a fresh connection string with the correct password.\n');

  const atlasChoice = await question('Do you want instructions to get a new connection string? (y/n): ');
  
  if (atlasChoice.toLowerCase() === 'y') {
    console.log('\n📖 Step-by-Step Instructions:\n');
    console.log('1. Go to MongoDB Atlas: https://cloud.mongodb.com/');
    console.log('2. Log in to your account');
    console.log('3. Click "Connect" button on your cluster');
    console.log('4. Click "Connect your application"');
    console.log('5. Select "Node.js" as your driver');
    console.log('6. Copy the connection string');
    console.log('7. IMPORTANT: Replace <password> with your actual password');
    console.log('   - If password has special characters, URL-encode them');
    console.log('8. Update MONGODB_URI in your .env file\n');
    
    console.log('💡 Alternative: Use Standard Connection String (if SRV has issues)');
    console.log('   - Look for "I am using driver 3.6 or earlier" link');
    console.log('   - This gives you a mongodb:// connection string\n');
  }

  // Option 3: Verify database user
  console.log('\nOption 3: Verify Database User Exists');
  console.log('Make sure your database user exists in MongoDB Atlas:\n');
  console.log('1. Go to MongoDB Atlas: https://cloud.mongodb.com/');
  console.log('2. Click "Database Access" in the left sidebar');
  console.log('3. Find your user (username: ' + (currentUsername || 'check in Atlas') + ')');
  console.log('4. If user doesn\'t exist, create a new one');
  console.log('5. Make sure the user has "Atlas admin" or appropriate permissions\n');

  // Option 4: Reset password
  console.log('\nOption 4: Reset Database User Password');
  console.log('If you\'re not sure about the password:\n');
  console.log('1. Go to MongoDB Atlas: https://cloud.mongodb.com/');
  console.log('2. Click "Database Access"');
  console.log('3. Find your user and click "Edit"');
  console.log('4. Click "Edit Password"');
  console.log('5. Set a new password (preferably without special characters)');
  console.log('6. Update your connection string with the new password\n');

  console.log('\n✅ After fixing the connection string:');
  console.log('1. Save your .env file');
  console.log('2. Run: node test-db-connection.js');
  console.log('3. You should see: ✅ SUCCESS! Connected to MongoDB Atlas\n');

  rl.close();
}

main().catch((error) => {
  console.error('Error:', error);
  rl.close();
  process.exit(1);
});

