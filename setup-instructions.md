# Postify Setup Instructions

## Quick Start Guide

### 1. Install Dependencies
```bash
npm install
```

### 2. Set up Environment Variables
Copy the example environment file and fill in your credentials:
```bash
cp env.example .env.local
```

Fill in the following variables in `.env.local`:

#### Required Environment Variables:
```env
# Database (MongoDB Atlas)
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/postify

# NextAuth Secret (generate a random string)
NEXTAUTH_SECRET=your-random-secret-key-here

# Lighthouse Storage API Key
LIGHTHOUSE_API_KEY=your-lighthouse-api-key-here

# Stripe Keys (for payments)
STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXTAUTH_URL=http://localhost:3000
```

### 3. Get Your API Keys

#### MongoDB Atlas:
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Create a database user
4. Get your connection string
5. Add it to your `.env.local` file

#### Lighthouse Storage:
1. Go to [Lighthouse](https://lighthouse.storage/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add it to your `.env.local` file

#### Stripe (for payments):
1. Go to [Stripe](https://stripe.com/)
2. Create a free account
3. Get your test keys from the dashboard
4. Set up webhooks pointing to `http://localhost:3000/api/stripe/webhook`
5. Add the keys to your `.env.local` file

### 4. Run the Development Server
```bash
npm run dev
```

### 5. Open Your Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## Features Included

✅ **Modern Homepage** - Beautiful landing page with About Us, Features, and Pricing
✅ **User Authentication** - Secure sign-up and login system
✅ **Blog URL Selection** - Users choose their unique blog URL (username.postify.com)
✅ **Pricing Plans** - Free (5 posts/month), Basic ($9.99), Premium ($19.99)
✅ **Blog Customization** - Color themes and personalization options
✅ **Rich Post Editor** - Create posts with images, videos, and rich text
✅ **Lighthouse Storage** - All files stored on decentralized IPFS
✅ **Responsive Design** - Works perfectly on all devices
✅ **Blog Preview** - Users can preview their blog before publishing

## Default Credentials

The system is set up with the following:
- **Free Plan**: 5 posts per month
- **Basic Plan**: 20 posts per month, premium themes, custom domain
- **Premium Plan**: Unlimited posts, all features, priority support

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

### Other Platforms
- Ensure MongoDB is accessible
- Set up environment variables
- Configure domain for subdomain routing
- Set up Stripe webhooks for production URL

## Support

If you need help:
1. Check the console for error messages
2. Ensure all environment variables are set correctly
3. Verify your API keys are valid
4. Check that MongoDB is accessible

## Next Steps

1. Customize the branding and colors
2. Add more themes and customization options
3. Implement additional features like comments, social sharing
4. Set up analytics and monitoring
5. Add more payment options

Happy blogging! 🚀
