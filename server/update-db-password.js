/**
 * Quick script to update MongoDB password in connection string
 * Usage: node update-db-password.js
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(prompt) {
  return new Promise((resolve) => {
    rl.question(prompt, resolve);
  });
}

async function main() {
  console.log('🔧 MongoDB Password Updater\n');
  
  const envPath = path.join(__dirname, '.env');
  
  if (!fs.existsSync(envPath)) {
    console.error('❌ .env file not found!');
    rl.close();
    process.exit(1);
  }

  // Read current .env
  const envContent = fs.readFileSync(envPath, 'utf8');
  const currentURI = process.env.MONGODB_URI;
  
  if (!currentURI) {
    console.error('❌ MONGODB_URI not found in .env file');
    rl.close();
    process.exit(1);
  }

  // Extract current username
  const usernameMatch = currentURI.match(/mongodb\+?srv?:\/\/([^:]+):/);
  const username = usernameMatch ? usernameMatch[1] : 'Samokello024';
  
  console.log('📋 Current Connection Info:');
  console.log(`   Username: ${username}`);
  console.log(`   Format: ${currentURI.startsWith('mongodb+srv://') ? 'SRV' : 'Standard'}\n`);
  
  console.log('⚠️  IMPORTANT: Get your password from MongoDB Atlas:');
  console.log('   1. Go to: https://cloud.mongodb.com/');
  console.log('   2. Click "Database Access"');
  console.log('   3. Find user: ' + username);
  console.log('   4. Click "Edit" → "Edit Password" to see/reset password\n');
  
  const newPassword = await question('Enter your MongoDB password: ');
  
  if (!newPassword || newPassword.trim() === '') {
    console.error('❌ Password cannot be empty!');
    rl.close();
    process.exit(1);
  }

  // Check if password has special characters
  const hasSpecialChars = /[@:\/#%\[\]?=&+ ]/.test(newPassword);
  
  let encodedPassword = newPassword;
  if (hasSpecialChars) {
    console.log('\n⚠️  Password contains special characters - URL encoding needed');
    encodedPassword = encodeURIComponent(newPassword);
    console.log(`   Encoded: ${encodedPassword}`);
  }

  // Build new connection string
  let newURI;
  if (currentURI.startsWith('mongodb+srv://')) {
    // SRV connection string
    newURI = currentURI.replace(/mongodb\+srv:\/\/[^:]+:[^@]+@/, `mongodb+srv://${username}:${encodedPassword}@`);
  } else {
    // Standard connection string
    newURI = currentURI.replace(/mongodb:\/\/[^:]+:[^@]+@/, `mongodb://${username}:${encodedPassword}@`);
  }

  console.log('\n📝 New Connection String (masked):');
  const masked = newURI.replace(/:([^:@]+)@/, ':****@');
  console.log(`   ${masked}\n`);

  const confirm = await question('Update .env file with new password? (y/n): ');
  
  if (confirm.toLowerCase() !== 'y') {
    console.log('❌ Cancelled. No changes made.');
    rl.close();
    process.exit(0);
  }

  // Update .env file
  const updatedContent = envContent.replace(
    /MONGODB_URI=.*/,
    `MONGODB_URI=${newURI}`
  );

  fs.writeFileSync(envPath, updatedContent, 'utf8');
  
  console.log('\n✅ .env file updated successfully!');
  console.log('\n🧪 Testing connection...\n');
  
  rl.close();
  
  // Test the connection
  const mongoose = require('mongoose');
  const testOptions = {
    serverSelectionTimeoutMS: 10000,
    socketTimeoutMS: 30000,
    connectTimeoutMS: 10000,
    maxPoolSize: 10,
    retryWrites: true,
    w: 'majority',
    family: 4,
  };

  try {
    console.log('🔄 Attempting to connect...');
    const conn = await mongoose.connect(newURI, testOptions);
    console.log('\n✅ SUCCESS! Connected to MongoDB Atlas');
    console.log(`📦 Database: ${conn.connection.name}`);
    console.log(`🌐 Host: ${conn.connection.host}`);
    await mongoose.connection.close();
    console.log('\n✅ Connection test completed successfully!');
    console.log('\n💡 You can now restart your server with: node index.js');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ CONNECTION FAILED!');
    console.error(`Error: ${error.message}\n`);
    
    if (error.message.includes('authentication')) {
      console.log('🔧 The password is still incorrect. Please:');
      console.log('   1. Double-check the password in MongoDB Atlas');
      console.log('   2. Make sure you copied it correctly');
      console.log('   3. If you reset the password, wait a minute and try again');
      console.log('   4. Verify the username is correct: ' + username);
    } else if (error.message.includes('IP')) {
      console.log('🔧 IP Whitelisting Issue:');
      console.log('   1. Go to MongoDB Atlas → Network Access');
      console.log('   2. Add your current IP address');
      console.log('   3. Or add 0.0.0.0/0 for testing (allows all IPs)');
    }
    
    process.exit(1);
  }
}

main().catch((error) => {
  console.error('Error:', error);
  rl.close();
  process.exit(1);
});

