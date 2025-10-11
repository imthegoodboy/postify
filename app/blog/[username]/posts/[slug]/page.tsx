'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, Tag, ArrowLeft, Share2, Heart, Bookmark } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

interface BlogPost {
  id: string
  title: string
  content: string
  author: string
  date: string
  category: string
  readTime: string
  image?: string
  featured: boolean
  views: number
  likes: number
}

export default function BlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)

  // Mock blog posts data
  const blogPosts: { [key: string]: BlogPost } = {
    'future-decentralized-content-creation': {
      id: '1',
      title: 'The Future of Decentralized Content Creation',
      content: `
# The Future of Decentralized Content Creation

The internet as we know it is changing. For decades, content creators have been at the mercy of centralized platforms that can censor, delete, or monetize their work without permission. But what if there was a better way?

## The Problem with Centralized Platforms

Traditional blogging platforms like WordPress, Medium, and even social media sites have a fundamental flaw: they control your content. They can:

- Delete your posts without warning
- Change their terms of service
- Censor content they don't like
- Shut down entirely, taking your content with them
- Monetize your content while giving you little in return

## Enter Decentralized Storage

This is where Filecoin and IPFS come in. These decentralized storage networks distribute your content across thousands of nodes worldwide, making it:

- **Censorship-resistant**: No single entity can delete your content
- **Permanent**: Your content lives on even if the platform disappears
- **Fast**: Content is served from the closest node to your readers
- **Secure**: Cryptographically protected and tamper-proof

## How Postify Changes Everything

At Postify, we're building the future of content creation. When you publish a blog post with us, your content is automatically stored on the Filecoin network. This means:

### True Ownership
Your content is truly yours. We can't delete it, censor it, or take it away from you. Even if Postify disappears tomorrow, your blog will continue to work.

### Censorship Resistance
No government, corporation, or individual can shut down your blog or delete your posts. Your voice cannot be silenced.

### Global Distribution
Your content is served from nodes all around the world, ensuring fast access for readers everywhere.

### Future-Proof
The Filecoin network is designed to last decades. Your content will be accessible for generations to come.

## The Technical Magic

When you publish a post on Postify, here's what happens behind the scenes:

1. **Content Processing**: Your post is processed and optimized for the decentralized web
2. **Filecoin Storage**: Your content is stored across multiple nodes on the Filecoin network
3. **IPFS Hashing**: A unique hash is created that points to your content
4. **Global CDN**: Your content is distributed worldwide for fast access
5. **Permanent Record**: Your content is now part of the permanent web

## Real-World Impact

This isn't just about technology - it's about freedom. Journalists can report without fear of censorship. Artists can share their work without worrying about platform changes. Educators can create content that will last forever.

## Getting Started

Ready to join the decentralized content revolution? Here's how to get started:

1. **Sign up for Postify**: Create your account and choose your unique blog URL
2. **Start publishing**: Share your ideas without fear
3. **Build your audience**: Connect with like-minded people
4. **Preserve your work**: Your content will last forever

## The Future is Decentralized

The internet was meant to be free, open, and decentralized. With platforms like Postify and technologies like Filecoin, we're finally realizing that vision.

Your content deserves better than being at the mercy of centralized platforms. It deserves to be truly yours, permanent, and free from censorship.

Welcome to the future of content creation. Welcome to Postify.

---

*Ready to start your decentralized blog? [Get started today!](/auth/signup)*
      `,
      author: 'Postify Team',
      date: '2024-01-15',
      category: 'Web3',
      readTime: '5 min read',
      featured: true,
      views: 1250,
      likes: 89
    },
    'getting-started-filecoin-storage': {
      id: '2',
      title: 'Getting Started with Filecoin Storage',
      content: `
# Getting Started with Filecoin Storage

Filecoin is revolutionizing how we store and access data on the internet. In this comprehensive guide, we'll walk you through everything you need to know about using Filecoin for decentralized storage.

## What is Filecoin?

Filecoin is a decentralized storage network that allows anyone to store data on a global network of storage providers. Unlike traditional cloud storage, Filecoin is:

- **Decentralized**: No single company controls your data
- **Censorship-resistant**: Your data cannot be deleted or censored
- **Economically incentivized**: Storage providers are rewarded for reliable service
- **Cryptographically secure**: Your data is protected by advanced encryption

## How Filecoin Works

### The Network
Filecoin consists of thousands of storage providers worldwide who offer their storage space to the network. These providers are incentivized to:

- Store data reliably
- Provide fast access
- Maintain high uptime
- Keep data secure

### Storage and Retrieval
When you store data on Filecoin:

1. **Deal Creation**: You create a storage deal with one or more providers
2. **Data Storage**: Your data is stored across multiple providers for redundancy
3. **Proof Generation**: Providers generate cryptographic proofs that your data is stored correctly
4. **Retrieval**: Your data can be retrieved from any provider who has it

## Benefits for Content Creators

### Permanent Storage
Your content is stored permanently on the Filecoin network. Unlike traditional platforms that can delete your content, Filecoin ensures your data persists.

### Global Distribution
Your content is automatically distributed worldwide, ensuring fast access for readers everywhere.

### Cost-Effective
Filecoin storage is often more cost-effective than traditional cloud storage, especially for long-term storage.

### Censorship Resistance
No single entity can delete or censor your content. Your voice cannot be silenced.

## Getting Started with Postify

Postify makes it easy to use Filecoin storage for your blog:

### 1. Create Your Account
Sign up for Postify and choose your unique blog URL. Your account is automatically connected to the Filecoin network.

### 2. Start Creating Content
Write your first blog post using our intuitive editor. Your content is automatically stored on Filecoin.

### 3. Customize Your Blog
Personalize your blog with custom themes, colors, and layouts. All your customizations are also stored on Filecoin.

### 4. Publish and Share
When you publish a post, it's immediately available worldwide through the Filecoin network.

## Technical Deep Dive

### IPFS Integration
Postify uses IPFS (InterPlanetary File System) as the underlying protocol for Filecoin storage. This ensures:

- **Content Addressing**: Your content is identified by its hash, not its location
- **Deduplication**: Identical content is stored only once
- **Versioning**: You can track changes to your content over time

### Warm Storage
Postify uses Filecoin's Warm Storage service, which provides:

- **Fast Access**: Your content is readily available for retrieval
- **Reliability**: Multiple copies ensure your content is always accessible
- **Performance**: Optimized for frequent access patterns

### Smart Contracts
Filecoin uses smart contracts to:

- **Automate Deals**: Storage deals are created and managed automatically
- **Ensure Reliability**: Providers are penalized for poor service
- **Enable Payments**: Automatic payments for storage services

## Best Practices

### Content Optimization
- **Compress Images**: Optimize images before uploading
- **Use Efficient Formats**: Choose formats that balance quality and file size
- **Structure Content**: Organize your content logically

### Backup Strategies
- **Multiple Copies**: Filecoin automatically creates multiple copies
- **Regular Exports**: Export your content regularly for additional backup
- **Version Control**: Keep track of content changes

### Performance Tips
- **Optimize for Mobile**: Ensure your content works well on all devices
- **Use CDN**: Leverage Filecoin's global distribution
- **Monitor Performance**: Keep track of your content's accessibility

## Troubleshooting

### Common Issues
- **Slow Retrieval**: This can happen during network congestion
- **Access Problems**: Check your internet connection and try again
- **Content Not Found**: Verify the content hash and try alternative providers

### Getting Help
- **Documentation**: Check our comprehensive documentation
- **Community**: Join our Discord for community support
- **Support**: Contact our support team for technical issues

## The Future of Storage

Filecoin is just the beginning. As decentralized storage technology evolves, we can expect:

- **Better Performance**: Faster access and retrieval
- **Lower Costs**: More competitive pricing
- **Enhanced Features**: Advanced functionality and capabilities
- **Broader Adoption**: More applications using decentralized storage

## Conclusion

Filecoin represents a fundamental shift in how we think about data storage. By using Postify, you're not just creating a blog - you're participating in the future of the internet.

Your content deserves to be stored on a network that's permanent, censorship-resistant, and truly decentralized. That's exactly what Filecoin provides.

Ready to experience the future of content storage? [Start your Postify blog today!](/auth/signup)

---

*Want to learn more about Filecoin? Check out our [Filecoin documentation](/api-docs) or join our [community discussions](/contact).*
      `,
      author: 'Tech Team',
      date: '2024-01-12',
      category: 'Tutorials',
      readTime: '8 min read',
      featured: true,
      views: 2100,
      likes: 156
    }
  }

  useEffect(() => {
    const slug = params.slug as string
    const postData = blogPosts[slug]
    
    if (postData) {
      setPost(postData)
    } else {
      // Handle 404 for unknown posts
      setPost(null)
    }
    setLoading(false)
  }, [params.slug])

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading post...</p>
        </div>
      </div>
    )
  }

  if (!post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Post Not Found</h1>
          <p className="text-gray-600 mb-8">The blog post you're looking for doesn't exist.</p>
          <Link href="/blog" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
            ← Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Postify
            </Link>
            <Link href="/blog" className="text-gray-600 hover:text-blue-600 flex items-center">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>
          </div>
        </div>
      </header>

      {/* Article */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Article Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center space-x-4 mb-6">
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              {post.category}
            </span>
            <span className="text-gray-500 text-sm">{post.readTime}</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>
          
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-6 text-gray-600">
              <span className="flex items-center">
                <User className="h-5 w-5 mr-2" />
                {post.author}
              </span>
              <span className="flex items-center">
                <Calendar className="h-5 w-5 mr-2" />
                {new Date(post.date).toLocaleDateString()}
              </span>
              <span className="flex items-center">
                <Tag className="h-5 w-5 mr-2" />
                {post.views} views
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setLiked(!liked)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  liked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600'
                }`}
              >
                <Heart className={`h-4 w-4 ${liked ? 'fill-current' : ''}`} />
                <span>{post.likes + (liked ? 1 : 0)}</span>
              </button>
              
              <button
                onClick={() => setBookmarked(!bookmarked)}
                className={`p-2 rounded-lg transition-colors ${
                  bookmarked ? 'bg-yellow-100 text-yellow-600' : 'bg-gray-100 text-gray-600 hover:bg-yellow-100 hover:text-yellow-600'
                }`}
              >
                <Bookmark className={`h-4 w-4 ${bookmarked ? 'fill-current' : ''}`} />
              </button>
              
              <button className="p-2 bg-gray-100 text-gray-600 rounded-lg hover:bg-gray-200 transition-colors">
                <Share2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="prose prose-lg max-w-none"
        >
          <div 
            className="text-gray-800 leading-relaxed whitespace-pre-wrap"
            style={{ whiteSpace: 'pre-wrap' }}
          >
            {post.content}
          </div>
        </motion.div>

        {/* Article Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-16 pt-8 border-t border-gray-200"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{post.author}</h3>
                <p className="text-gray-600 text-sm">Author</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Follow
              </button>
              <button className="border border-gray-300 text-gray-700 px-6 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </motion.div>
      </article>

      {/* Related Posts */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            Related Posts
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Understanding IPFS and Decentralized Storage',
                excerpt: 'Learn how IPFS works and why it\'s the future of web storage.',
                category: 'Web3',
                readTime: '6 min read'
              },
              {
                title: 'Building Censorship-Resistant Applications',
                excerpt: 'How to build apps that cannot be shut down or censored.',
                category: 'Development',
                readTime: '10 min read'
              },
              {
                title: 'The Economics of Decentralized Storage',
                excerpt: 'Understanding the tokenomics behind Filecoin and similar networks.',
                category: 'Economics',
                readTime: '7 min read'
              }
            ].map((relatedPost, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="flex items-center space-x-2 mb-3">
                  <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs font-medium">
                    {relatedPost.category}
                  </span>
                  <span className="text-gray-500 text-xs">{relatedPost.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {relatedPost.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {relatedPost.excerpt}
                </p>
                <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                  Read More →
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
