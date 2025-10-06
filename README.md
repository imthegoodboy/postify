# Postify - Custom Blog Platform

Postify is a modern, decentralized blog platform that allows users to create custom blog pages with their own subdomain (e.g., `username.postify.com`). Built with Next.js, MongoDB, Lighthouse storage, and Stripe payments.

## Features

- 🎨 **Custom Blog Pages**: Each user gets their own subdomain
- 📝 **Rich Text Editor**: Create posts with images, videos, and rich formatting
- 💾 **Decentralized Storage**: All content stored on Lighthouse IPFS
- 💳 **Subscription Plans**: Free, Basic, and Premium tiers
- 🔐 **Secure Authentication**: NextAuth.js integration
- 📊 **Analytics**: Track views and engagement
- 🎨 **Customizable Themes**: Beautiful, responsive designs
- 📱 **Mobile Responsive**: Works perfectly on all devices

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js
- **Storage**: Lighthouse IPFS
- **Payments**: Stripe
- **Rich Text Editor**: React Quill

## Getting Started

### Prerequisites

- Node.js 18+ 
- MongoDB database
- Stripe account
- Lighthouse API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd postify
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Database
   MONGODB_URI=mongodb://localhost:27017/postify

   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here

   # Lighthouse Storage
   LIGHTHOUSE_API_KEY=your-lighthouse-api-key-here

   # Stripe
   STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_publishable_key_here
   STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key_here
   STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret_here

   # App Configuration
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```

4. **Set up Lighthouse Storage**
   - Visit [Lighthouse](https://lighthouse.storage/)
   - Create an account and get your API key
   - Add the API key to your `.env.local` file

5. **Set up Stripe**
   - Create a [Stripe account](https://stripe.com/)
   - Get your publishable and secret keys
   - Set up webhooks pointing to `http://localhost:3000/api/stripe/webhook`
   - Add the webhook secret to your `.env.local` file

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
postify/
├── app/                    # Next.js 14 app directory
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   ├── blog/          # Blog data endpoints
│   │   ├── posts/         # Post management endpoints
│   │   ├── stripe/        # Payment endpoints
│   │   └── upload/        # File upload endpoints
│   ├── auth/              # Authentication pages
│   ├── blog/              # Blog rendering pages
│   ├── dashboard/         # User dashboard
│   └── pricing/           # Pricing page
├── components/            # Reusable React components
├── lib/                   # Utility functions and configurations
├── models/                # MongoDB models
└── public/                # Static assets
```

## Key Features Explained

### 1. Subdomain Routing
- Users get their own subdomain: `username.postify.com`
- Implemented using Next.js rewrites and dynamic routing
- Each user's blog is accessible at `/[username]`

### 2. Lighthouse Storage Integration
- All images and videos are stored on IPFS via Lighthouse
- Content is decentralized and highly available
- Files are uploaded via the `/api/upload` endpoint

### 3. Subscription Plans
- **Free**: 3 posts/month, basic themes
- **Basic**: 10 posts/month, premium themes, custom domain
- **Premium**: 50 posts/month, all features, priority support
- Stripe handles payments and webhook events

### 4. Rich Content Creation
- React Quill editor for rich text formatting
- Support for images, videos, and custom styling
- Posts stored as HTML content with media references

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/[...nextauth]` - NextAuth.js endpoints

### Posts
- `GET /api/posts` - Get user's posts
- `POST /api/posts` - Create new post
- `DELETE /api/posts/[id]` - Delete post

### Blog
- `GET /api/blog/[username]` - Get blog user data
- `GET /api/blog/[username]/posts` - Get published posts

### Upload
- `POST /api/upload` - Upload files to Lighthouse storage

### Payments
- `GET /api/stripe/create-checkout` - Create Stripe checkout session
- `POST /api/stripe/webhook` - Handle Stripe webhooks

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

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | ✅ |
| `NEXTAUTH_SECRET` | Secret for NextAuth.js | ✅ |
| `NEXTAUTH_URL` | Your app URL | ✅ |
| `LIGHTHOUSE_API_KEY` | Lighthouse storage API key | ✅ |
| `STRIPE_SECRET_KEY` | Stripe secret key | ✅ |
| `STRIPE_PUBLISHABLE_KEY` | Stripe publishable key | ✅ |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook secret | ✅ |
| `NEXT_PUBLIC_APP_URL` | Public app URL | ✅ |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email support@postify.com or join our Discord community.

## Roadmap

- [ ] Advanced analytics dashboard
- [ ] Custom themes marketplace
- [ ] SEO optimization tools
- [ ] Social media integration
- [ ] Multi-language support
- [ ] API for third-party integrations
