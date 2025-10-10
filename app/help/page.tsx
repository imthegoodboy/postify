'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, ChevronDown, ChevronRight, Book, MessageCircle, Mail, Phone } from 'lucide-react'
import Link from 'next/link'

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [expandedItems, setExpandedItems] = useState<number[]>([])

  const toggleExpanded = (index: number) => {
    setExpandedItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    )
  }

  const faqCategories = [
    {
      title: 'Getting Started',
      icon: Book,
      items: [
        {
          question: 'How do I create my first blog?',
          answer: 'Sign up for a free account, choose your unique blog URL, and start creating content. Your blog will be live at yourname.postify.com within minutes.'
        },
        {
          question: 'What is Filecoin storage?',
          answer: 'Filecoin is a decentralized storage network that ensures your content is secure, censorship-resistant, and always accessible. Your blog content is stored across multiple nodes worldwide.'
        },
        {
          question: 'How do I customize my blog?',
          answer: 'Go to your dashboard and click "Customize" to change your blog\'s theme, colors, profile picture, and description. All changes are saved automatically.'
        }
      ]
    },
    {
      title: 'Content Creation',
      icon: MessageCircle,
      items: [
        {
          question: 'What types of content can I post?',
          answer: 'You can post text, images, videos, and rich formatted content. All media is stored securely on the Filecoin network.'
        },
        {
          question: 'How do I add images to my posts?',
          answer: 'Use the rich text editor in the post creation page. Click the image icon to upload files, which are automatically stored on Filecoin storage.'
        },
        {
          question: 'Can I schedule posts?',
          answer: 'Currently, posts are published immediately when you click "Publish". Scheduled posting is coming in a future update.'
        }
      ]
    },
    {
      title: 'Filecoin Integration',
      icon: Book,
      items: [
        {
          question: 'How does Filecoin storage work?',
          answer: 'Your content is automatically stored on the Filecoin network using Warm Storage services. This ensures maximum security and global availability.'
        },
        {
          question: 'Can I accept FIL payments?',
          answer: 'Yes! FilecoinPay integration allows you to accept FIL tokens and other cryptocurrencies from your readers and supporters.'
        },
        {
          question: 'Is my content really decentralized?',
          answer: 'Absolutely. Your content is stored across multiple nodes on the Filecoin network, making it impossible for any single entity to censor or remove your content.'
        }
      ]
    },
    {
      title: 'Account & Billing',
      icon: Mail,
      items: [
        {
          question: 'How do I upgrade my plan?',
          answer: 'Go to your dashboard and click "Upgrade Plan" to see available options. You can upgrade anytime to get more posts per month and additional features.'
        },
        {
          question: 'What happens if I exceed my post limit?',
          answer: 'If you exceed your monthly post limit, you\'ll need to upgrade to a higher plan or wait until the next month. We\'ll notify you when you\'re approaching your limit.'
        },
        {
          question: 'Can I cancel my subscription?',
          answer: 'Yes, you can cancel your subscription anytime from your dashboard. You\'ll continue to have access to your plan features until the end of your billing period.'
        }
      ]
    }
  ]

  const popularArticles = [
    {
      title: 'Creating Your First Blog Post',
      description: 'Step-by-step guide to creating and publishing your first blog post',
      category: 'Getting Started'
    },
    {
      title: 'Customizing Your Blog Theme',
      description: 'Learn how to personalize your blog with custom colors and themes',
      category: 'Customization'
    },
    {
      title: 'Understanding Filecoin Storage',
      description: 'Everything you need to know about decentralized storage',
      category: 'Filecoin'
    },
    {
      title: 'Accepting FIL Payments',
      description: 'How to set up cryptocurrency payments for your blog',
      category: 'Monetization'
    }
  ]

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Postify
            </Link>
            <Link href="/" className="text-gray-600 hover:text-blue-600">
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Help Center
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            >
              Find answers to common questions about our decentralized blog platform
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="max-w-2xl mx-auto"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for help articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Articles */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Popular Articles
            </h2>
            <p className="text-xl text-gray-600">
              Start here for the most common questions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularArticles.map((article, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                  <Book className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  {article.description}
                </p>
                <span className="text-xs text-blue-600 font-medium">
                  {article.category}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Browse questions by category
            </p>
          </div>

          <div className="space-y-8">
            {faqCategories.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: categoryIndex * 0.1 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6">
                  <div className="flex items-center">
                    <category.icon className="h-6 w-6 mr-3" />
                    <h3 className="text-xl font-semibold">{category.title}</h3>
                  </div>
                </div>

                <div className="p-6">
                  {category.items.map((item, itemIndex) => {
                    const globalIndex = categoryIndex * 10 + itemIndex
                    const isExpanded = expandedItems.includes(globalIndex)
                    
                    return (
                      <div key={itemIndex} className="border-b border-gray-100 last:border-b-0">
                        <button
                          onClick={() => toggleExpanded(globalIndex)}
                          className="w-full text-left py-4 flex items-center justify-between hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-lg font-medium text-gray-900">
                            {item.question}
                          </span>
                          {isExpanded ? (
                            <ChevronDown className="h-5 w-5 text-gray-400" />
                          ) : (
                            <ChevronRight className="h-5 w-5 text-gray-400" />
                          )}
                        </button>
                        
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            className="pb-4"
                          >
                            <p className="text-gray-600 leading-relaxed">
                              {item.answer}
                            </p>
                          </motion.div>
                        )}
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Still Need Help?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            Can't find what you're looking for? Our support team is here to help.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-blue-50 rounded-2xl p-6"
            >
              <Mail className="h-12 w-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Email Support</h3>
              <p className="text-gray-600 mb-4">
                Get help via email within 24 hours
              </p>
              <Link 
                href="/contact" 
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Send us an email →
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-green-50 rounded-2xl p-6"
            >
              <MessageCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Discord Community</h3>
              <p className="text-gray-600 mb-4">
                Join our community for real-time help
              </p>
              <a 
                href="#" 
                className="text-green-600 hover:text-green-800 font-medium"
              >
                Join Discord →
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-purple-50 rounded-2xl p-6"
            >
              <Phone className="h-12 w-12 text-purple-600 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Live Chat</h3>
              <p className="text-gray-600 mb-4">
                Chat with our support team instantly
              </p>
              <button className="text-purple-600 hover:text-purple-800 font-medium">
                Start Chat →
              </button>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
