'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Code, Copy, Check, ExternalLink, Book, Zap, Shield } from 'lucide-react'
import Link from 'next/link'

export default function APIDocsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const codeExamples = {
    createPost: `curl -X POST https://api.postify.com/posts \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "My First Post",
    "content": "This is my first decentralized blog post!",
    "status": "published"
  }'`,
    
    getPosts: `curl -X GET https://api.postify.com/posts \\
  -H "Authorization: Bearer YOUR_API_KEY"`,
    
    updatePost: `curl -X PUT https://api.postify.com/posts/POST_ID \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "title": "Updated Post Title",
    "content": "Updated content here"
  }'`,
    
    deletePost: `curl -X DELETE https://api.postify.com/posts/POST_ID \\
  -H "Authorization: Bearer YOUR_API_KEY"`
  }

  const endpoints = [
    {
      method: 'POST',
      path: '/posts',
      description: 'Create a new blog post',
      auth: true,
      example: 'createPost'
    },
    {
      method: 'GET',
      path: '/posts',
      description: 'Get all your blog posts',
      auth: true,
      example: 'getPosts'
    },
    {
      method: 'GET',
      path: '/posts/{id}',
      description: 'Get a specific blog post',
      auth: true,
      example: 'getPosts'
    },
    {
      method: 'PUT',
      path: '/posts/{id}',
      description: 'Update a blog post',
      auth: true,
      example: 'updatePost'
    },
    {
      method: 'DELETE',
      path: '/posts/{id}',
      description: 'Delete a blog post',
      auth: true,
      example: 'deletePost'
    },
    {
      method: 'GET',
      path: '/users/{username}/posts',
      description: 'Get public posts for a user',
      auth: false,
      example: 'getPosts'
    }
  ]

  const features = [
    {
      icon: Shield,
      title: 'Secure Authentication',
      description: 'OAuth 2.0 and API key authentication for secure access'
    },
    {
      icon: Zap,
      title: 'Filecoin Integration',
      description: 'Automatic storage on Filecoin network with IPFS hashing'
    },
    {
      icon: Book,
      title: 'Rich Content',
      description: 'Support for markdown, images, videos, and rich formatting'
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
              API Documentation
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto mb-8"
            >
              Build powerful applications with our RESTful API. 
              Integrate decentralized blogging into your own projects.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium">
                RESTful API
              </span>
              <span className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                Filecoin Storage
              </span>
              <span className="bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium">
                Web3 Ready
              </span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              API Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to build with Postify
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <feature.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Start */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Quick Start
            </h2>
            <p className="text-xl text-gray-600">
              Get up and running in minutes
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                1. Get Your API Key
              </h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  Sign up for a Postify account and navigate to your dashboard. 
                  In the API section, generate your personal API key.
                </p>
                <p>
                  Keep your API key secure and never share it publicly. 
                  You can regenerate it anytime from your dashboard.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gray-900 rounded-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-green-400 text-sm font-medium">API Key</span>
                <button
                  onClick={() => copyToClipboard('pk_live_1234567890abcdef', 'api-key')}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  {copiedCode === 'api-key' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
              <code className="text-green-400 text-sm">
                pk_live_1234567890abcdef
              </code>
            </motion.div>
          </div>
        </div>
      </section>

      {/* API Endpoints */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              API Endpoints
            </h2>
            <p className="text-xl text-gray-600">
              Complete reference for all available endpoints
            </p>
          </div>

          <div className="space-y-6">
            {endpoints.map((endpoint, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded text-sm font-medium ${
                      endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                      endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                      endpoint.method === 'PUT' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {endpoint.method}
                    </span>
                    <code className="text-lg font-mono text-gray-900">
                      {endpoint.path}
                    </code>
                  </div>
                  <div className="flex items-center space-x-2">
                    {endpoint.auth && (
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs font-medium">
                        Auth Required
                      </span>
                    )}
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
                
                <p className="text-gray-600 mb-4">
                  {endpoint.description}
                </p>

                <div className="bg-gray-900 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400 text-sm">Example Request</span>
                    <button
                      onClick={() => copyToClipboard(codeExamples[endpoint.example as keyof typeof codeExamples], `example-${index}`)}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      {copiedCode === `example-${index}` ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                    </button>
                  </div>
                  <pre className="text-green-400 text-sm overflow-x-auto">
                    <code>{codeExamples[endpoint.example as keyof typeof codeExamples]}</code>
                  </pre>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Authentication */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Authentication
            </h2>
            <p className="text-xl text-gray-600">
              Secure your API requests with proper authentication
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              API Key Authentication
            </h3>
            <div className="space-y-6">
              <p className="text-gray-600">
                Include your API key in the Authorization header of all requests:
              </p>
              
              <div className="bg-gray-900 rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400 text-sm">Authorization Header</span>
                  <button
                    onClick={() => copyToClipboard('Authorization: Bearer YOUR_API_KEY', 'auth-header')}
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    {copiedCode === 'auth-header' ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  </button>
                </div>
                <pre className="text-green-400 text-sm">
                  <code>Authorization: Bearer YOUR_API_KEY</code>
                </pre>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="text-yellow-800 font-semibold mb-2">Security Note</h4>
                <p className="text-yellow-700 text-sm">
                  Never expose your API key in client-side code. Use server-side implementations 
                  or environment variables to keep your keys secure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Rate Limits */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Rate Limits
            </h2>
            <p className="text-xl text-gray-600">
              Fair usage policies to ensure optimal performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-50 rounded-2xl p-6 text-center">
              <h3 className="text-2xl font-bold text-blue-600 mb-2">Free Plan</h3>
              <p className="text-4xl font-bold text-gray-900 mb-2">100</p>
              <p className="text-gray-600">requests per hour</p>
            </div>
            <div className="bg-green-50 rounded-2xl p-6 text-center">
              <h3 className="text-2xl font-bold text-green-600 mb-2">Basic Plan</h3>
              <p className="text-4xl font-bold text-gray-900 mb-2">1,000</p>
              <p className="text-gray-600">requests per hour</p>
            </div>
            <div className="bg-purple-50 rounded-2xl p-6 text-center">
              <h3 className="text-2xl font-bold text-purple-600 mb-2">Premium Plan</h3>
              <p className="text-4xl font-bold text-gray-900 mb-2">10,000</p>
              <p className="text-gray-600">requests per hour</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to Start Building?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Get your API key and start integrating decentralized blogging into your applications.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/auth/signup" 
              className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-block"
            >
              Get API Key
            </Link>
            <Link 
              href="/contact" 
              className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-block"
            >
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
