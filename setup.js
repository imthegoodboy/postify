#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up Postify...\n');

// Create .env.local from env.example
if (!fs.existsSync('.env.local')) {
  if (fs.existsSync('env.example')) {
    fs.copyFileSync('env.example', '.env.local');
    console.log('✅ Created .env.local from env.example');
    console.log('⚠️  Please update the environment variables in .env.local\n');
  } else {
    console.log('❌ env.example file not found');
  }
} else {
  console.log('✅ .env.local already exists\n');
}

// Create necessary directories
const directories = [
  'app/api/auth/register',
  'app/api/auth/[...nextauth]',
  'app/api/blog/[username]',
  'app/api/blog/[username]/posts',
  'app/api/posts',
  'app/api/stripe/create-checkout',
  'app/api/stripe/webhook',
  'app/api/upload',
  'app/api/user/profile',
  'app/auth/signin',
  'app/auth/signup',
  'app/blog/[username]',
  'app/dashboard/posts/new',
  'app/dashboard/settings',
  'components',
  'lib',
  'models'
];

directories.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  }
});

console.log('\n🎉 Setup complete!');
console.log('\nNext steps:');
console.log('1. Update environment variables in .env.local');
console.log('2. Install dependencies: npm install');
console.log('3. Start development server: npm run dev');
console.log('\nRequired environment variables:');
console.log('- MONGODB_URI: Your MongoDB connection string');
console.log('- NEXTAUTH_SECRET: A random secret string');
console.log('- LIGHTHOUSE_API_KEY: Your Lighthouse storage API key');
console.log('- STRIPE_SECRET_KEY: Your Stripe secret key');
console.log('- STRIPE_PUBLISHABLE_KEY: Your Stripe publishable key');
console.log('- STRIPE_WEBHOOK_SECRET: Your Stripe webhook secret');
console.log('\n📚 Check README.md for detailed setup instructions');
