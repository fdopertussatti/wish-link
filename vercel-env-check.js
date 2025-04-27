#!/usr/bin/env node

/**
 * This script checks for required environment variables
 * that should be set in Vercel for proper production deployment.
 */

// List of required environment variables
const requiredEnvVars = [
  // Database
  'DATABASE_URL',
  
  // NextAuth Secret
  'NEXTAUTH_SECRET',
  'NEXTAUTH_URL',
  
  // OAuth Providers (at least one is recommended)
  'GOOGLE_CLIENT_ID',
  'GOOGLE_CLIENT_SECRET',
  
  // Optional but recommended
  // 'FACEBOOK_CLIENT_ID',
  // 'FACEBOOK_CLIENT_SECRET',
  // 'APPLE_CLIENT_ID',
  // 'APPLE_CLIENT_SECRET',
];

// Get missing environment variables
const missingVars = requiredEnvVars.filter(envVar => !process.env[envVar]);

// Display results
console.log('\n===== Environment Variables Check =====\n');

if (missingVars.length === 0) {
  console.log('✅ All required environment variables are set.');
} else {
  console.log('❌ Missing environment variables that should be set in Vercel:');
  missingVars.forEach(envVar => {
    console.log(`   - ${envVar}`);
  });
}

// Additional recommendations
console.log('\n===== Recommendations =====\n');
console.log('Make sure your Vercel deployment includes these environment variables.');
console.log('For the DATABASE_URL, you should be using a production database connection string.');
console.log('Generate a secure NEXTAUTH_SECRET for production.');
console.log('Set NEXTAUTH_URL to your production URL (e.g., https://your-app.vercel.app).');

console.log('\n======================================\n');

// Exit with error code if missing variables
if (missingVars.length > 0) {
  process.exit(1);
}

process.exit(0); 