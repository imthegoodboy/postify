'use client'

import { motion } from 'framer-motion'
import { Shield, Eye, Lock, Database, Users, Globe } from 'lucide-react'
import Link from 'next/link'

export default function PrivacyPage() {
  const sections = [
    {
      title: 'Information We Collect',
      icon: Database,
      content: [
        {
          subtitle: 'Account Information',
          text: 'When you create an account, we collect your username, email address, and password (encrypted). We also store your blog preferences and customization settings.'
        },
        {
          subtitle: 'Content Data',
          text: 'Your blog posts, images, and other content are stored on the decentralized Filecoin network. We only store metadata and references to your content.'
        },
        {
          subtitle: 'Usage Analytics',
          text: 'We collect anonymous usage statistics to improve our service, including page views, feature usage, and performance metrics.'
        }
      ]
    },
    {
      title: 'How We Use Your Information',
      icon: Eye,
      content: [
        {
          subtitle: 'Service Provision',
          text: 'We use your information to provide and maintain our decentralized blogging platform, including content storage and delivery.'
        },
        {
          subtitle: 'Communication',
          text: 'We may send you important updates about our service, security notifications, and feature announcements.'
        },
        {
          subtitle: 'Improvement',
          text: 'We analyze usage patterns to understand how to better serve our community and improve our platform.'
        }
      ]
    },
    {
      title: 'Data Security',
      icon: Lock,
      content: [
        {
          subtitle: 'Decentralized Storage',
          text: 'Your content is stored on the Filecoin network, which provides cryptographic security and redundancy across multiple nodes.'
        },
        {
          subtitle: 'Encryption',
          text: 'All sensitive data is encrypted both in transit and at rest. Your passwords are hashed using industry-standard algorithms.'
        },
        {
          subtitle: 'Access Control',
          text: 'Only you have access to your content. We implement strict access controls and audit logs for all data operations.'
        }
      ]
    },
    {
      title: 'Your Rights',
      icon: Users,
      content: [
        {
          subtitle: 'Data Portability',
          text: 'You can export all your content at any time. Your data is stored in standard formats that can be easily migrated.'
        },
        {
          subtitle: 'Deletion Rights',
          text: 'You can delete your account and all associated data. Content stored on Filecoin may persist according to network rules.'
        },
        {
          subtitle: 'Access Rights',
          text: 'You can view, modify, or delete your personal information at any time through your account settings.'
        }
      ]
    }
  ]

  const principles = [
    {
      icon: Shield,
      title: 'Privacy by Design',
      description: 'We build privacy protections into every aspect of our platform from the ground up.'
    },
    {
      icon: Globe,
      title: 'Decentralized Control',
      description: 'Your data is stored on decentralized networks, giving you true ownership and control.'
    },
    {
      icon: Lock,
      title: 'Minimal Collection',
      description: 'We only collect the information necessary to provide our service effectively.'
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
              Privacy Policy
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Your privacy is fundamental to our mission. Learn how we protect your data 
              in our decentralized blogging platform.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-sm text-gray-500 mt-4"
            >
              Last updated: January 15, 2024
            </motion.p>
          </div>
        </div>
      </section>

      {/* Privacy Principles */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Privacy Principles
            </h2>
            <p className="text-xl text-gray-600">
              The values that guide how we handle your data
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {principles.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <principle.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {principle.title}
                </h3>
                <p className="text-gray-600">
                  {principle.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Details */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {sections.map((section, sectionIndex) => (
              <motion.div
                key={sectionIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: sectionIndex * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <div className="flex items-center mb-8">
                  <div className="bg-blue-100 p-3 rounded-lg mr-4">
                    <section.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {section.title}
                  </h2>
                </div>

                <div className="space-y-8">
                  {section.content.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {item.subtitle}
                      </h3>
                      <p className="text-gray-600 leading-relaxed">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filecoin Integration */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Decentralized Data Storage
            </h2>
            <p className="text-xl text-gray-600">
              How Filecoin protects your content
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Your Content, Your Control
              </h3>
              <div className="space-y-4 text-gray-600">
                <p>
                  Unlike traditional platforms, your content is stored on the decentralized 
                  Filecoin network, not on our servers. This means:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3">•</span>
                    <span>Your content cannot be censored or removed by any single entity</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3">•</span>
                    <span>Your data is cryptographically secured and distributed</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3">•</span>
                    <span>You maintain true ownership of your content</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-3">•</span>
                    <span>Your content is accessible even if our platform goes offline</span>
                  </li>
                </ul>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8"
            >
              <h4 className="text-xl font-semibold text-gray-900 mb-6">
                Filecoin Network Benefits
              </h4>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">99.9% uptime guarantee</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Cryptographic security</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Global distribution</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Censorship resistance</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-gray-700">Data redundancy</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Questions About Privacy?
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            We're committed to transparency about how we handle your data. 
            If you have any questions about this privacy policy, please contact us.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-blue-600 text-white hover:bg-blue-700 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-block"
            >
              Contact Us
            </Link>
            <Link 
              href="/help" 
              className="border-2 border-gray-300 text-gray-700 hover:border-blue-600 hover:text-blue-600 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-block"
            >
              Help Center
            </Link>
          </div>
        </div>
      </section>

      {/* Legal Footer */}
      <footer className="py-12 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-gray-400">
            <p className="mb-4">
              This privacy policy is effective as of January 15, 2024. 
              We may update this policy from time to time and will notify users of any material changes.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <Link href="/terms" className="hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors">
                Cookie Policy
              </Link>
              <Link href="/contact" className="hover:text-white transition-colors">
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
