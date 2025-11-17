/**
 * Verify Connection String Format
 * Checks if connection string has correct format and no placeholders
 */

require('dotenv').config();

const mongoURI = process.env.MONGODB_URI;

if (!mongoURI) {
  console.error('❌ MONGODB_URI not found in .env file');
  process.exit(1);
}

console.log('🔍 Verifying Connection String Format...\n');
console.log('='.repeat(70));

let issues = [];
let warnings = [];

// Check 1: Connection string type
if (mongoURI.startsWith('mongodb+srv://')) {
  warnings.push('Using SRV connection string (may have DNS issues)');
  console.log('⚠️  Type: SRV (mongodb+srv://)');
} else if (mongoURI.startsWith('mongodb://')) {
  console.log('✅ Type: Standard (mongodb://)');
} else {
  issues.push('Invalid connection string format');
  console.log('❌ Type: Invalid format');
}

// Check 2: Check for placeholders
if (mongoURI.includes('xxxxx') || mongoURI.includes('atlas-xxxxx-shard-0')) {
  issues.push('Connection string contains placeholder "xxxxx" - get actual connection string from MongoDB Atlas');
  console.log('❌ Contains placeholder "xxxxx"');
} else {
  console.log('✅ No placeholders found');
}

// Check 3: Check for username and password
const userPassMatch = mongoURI.match(/mongodb\+?srv?:\/\/([^:]+):([^@]+)@/);
if (userPassMatch) {
  const username = userPassMatch[1];
  const password = userPassMatch[2];
  console.log(`✅ Username found: ${username}`);
  if (password && password.length > 0 && password !== 'YOUR_PASSWORD' && password !== 'password') {
    console.log('✅ Password found (masked)');
  } else {
    issues.push('Password appears to be placeholder or empty');
    console.log('❌ Password is placeholder or empty');
  }
} else {
  issues.push('Username/password not found in connection string');
  console.log('❌ Username/password not found');
}

// Check 4: Check for replicaSet
if (mongoURI.includes('replicaSet=')) {
  const replicaSetMatch = mongoURI.match(/replicaSet=([^&]+)/);
  if (replicaSetMatch) {
    const replicaSet = replicaSetMatch[1];
    if (replicaSet.includes('xxxxx')) {
      issues.push('replicaSet name contains placeholder - get actual name from MongoDB Atlas');
      console.log(`❌ replicaSet: ${replicaSet} (contains placeholder)`);
    } else {
      console.log(`✅ replicaSet: ${replicaSet}`);
    }
  }
} else if (mongoURI.startsWith('mongodb://')) {
  warnings.push('Standard connection string should have replicaSet parameter');
  console.log('⚠️  replicaSet parameter not found');
}

// Check 5: Check for database name
if (mongoURI.includes('/rebirth-of-a-queen') || mongoURI.includes('/Rebirth-of-a-queen')) {
  console.log('✅ Database name found');
} else {
  warnings.push('Database name might be missing or incorrect');
  console.log('⚠️  Database name might be missing');
}

// Check 6: Check for required parameters
const requiredParams = ['ssl=true', 'authSource=admin', 'retryWrites=true'];
requiredParams.forEach(param => {
  if (mongoURI.includes(param)) {
    console.log(`✅ Parameter found: ${param}`);
  } else {
    warnings.push(`Missing parameter: ${param}`);
    console.log(`⚠️  Missing parameter: ${param}`);
  }
});

// Summary
console.log('\n' + '='.repeat(70));
console.log('SUMMARY');
console.log('='.repeat(70));

if (issues.length === 0 && warnings.length === 0) {
  console.log('\n✅ Connection string format looks good!');
  console.log('   If connection still fails, check:');
  console.log('   - IP whitelist in MongoDB Atlas');
  console.log('   - Cluster is running (not paused)');
  console.log('   - Password is correct and URL-encoded');
} else {
  if (issues.length > 0) {
    console.log('\n❌ CRITICAL ISSUES FOUND:');
    issues.forEach((issue, i) => {
      console.log(`   ${i + 1}. ${issue}`);
    });
  }
  
  if (warnings.length > 0) {
    console.log('\n⚠️  WARNINGS:');
    warnings.forEach((warning, i) => {
      console.log(`   ${i + 1}. ${warning}`);
    });
  }
  
  console.log('\n💡 SOLUTION:');
  console.log('   1. Go to MongoDB Atlas: https://cloud.mongodb.com/');
  console.log('   2. Click "Connect" → "Connect your application"');
  console.log('   3. Click "I am using driver 3.6 or earlier"');
  console.log('   4. Copy the EXACT connection string (no placeholders)');
  console.log('   5. Update MONGODB_URI in your .env file');
}

console.log('\n' + '='.repeat(70));


