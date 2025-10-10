'use client'

import { motion } from 'framer-motion'
import { MapPin, Clock, Users, Heart, Zap, Shield } from 'lucide-react'
import Link from 'next/link'

export default function CareersPage() {
  const openPositions = [
    {
      title: 'Senior Full-Stack Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'Build the future of decentralized blogging with React, Next.js, and Filecoin integration.',
      requirements: [
        '5+ years of full-stack development experience',
        'Expertise in React, Next.js, and TypeScript',
        'Experience with blockchain/Web3 technologies',
        'Knowledge of Filecoin ecosystem preferred'
      ]
    },
    {
      title: 'Blockchain Developer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      description: 'Integrate Filecoin Onchain Cloud services and build decentralized features.',
      requirements: [
        '3+ years of blockchain development experience',
        'Experience with Filecoin/IPFS',
        'Smart contract development',
        'Web3 integration expertise'
      ]
    },
    {
      title: 'Product Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      description: 'Design intuitive user experiences for decentralized content creation.',
      requirements: [
        '3+ years of product design experience',
        'Portfolio showcasing Web3/blockchain projects',
        'Figma and design system expertise',
        'Understanding of decentralized UX patterns'
      ]
    },
    {
      title: 'Community Manager',
      department: 'Marketing',
      location: 'Remote',
      type: 'Full-time',
      description: 'Build and engage our decentralized community of content creators.',
      requirements: [
        '2+ years of community management experience',
        'Passion for Web3 and decentralized technologies',
        'Social media and Discord management',
        'Content creation and event planning'
      ]
    }
  ]

  const benefits = [
    {
      icon: Heart,
      title: 'Work-Life Balance',
      description: 'Flexible hours and remote-first culture'
    },
    {
      icon: Zap,
      title: 'Cutting-Edge Tech',
      description: 'Work with the latest Web3 and blockchain technologies'
    },
    {
      icon: Users,
      title: 'Amazing Team',
      description: 'Collaborate with passionate developers and creators'
    },
    {
      icon: Shield,
      title: 'Job Security',
      description: 'Growing company with strong Filecoin backing'
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
              Join Our Team
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Help us build the future of decentralized content creation. 
              We're looking for passionate individuals who share our vision of a censorship-resistant web.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Why Work With Us */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Work at Postify?
            </h2>
            <p className="text-xl text-gray-600">
              Be part of the decentralized web revolution
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center p-6"
              >
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Open Positions
            </h2>
            <p className="text-xl text-gray-600">
              Join our team and help shape the future of decentralized blogging
            </p>
          </div>

          <div className="space-y-8">
            {openPositions.map((position, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {position.title}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        {position.location}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {position.type}
                      </span>
                      <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs font-medium">
                        {position.department}
                      </span>
                    </div>
                  </div>
                  <button className="mt-4 md:mt-0 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                    Apply Now
                  </button>
                </div>

                <p className="text-gray-600 mb-6">
                  {position.description}
                </p>

                <div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">
                    Requirements:
                  </h4>
                  <ul className="space-y-2">
                    {position.requirements.map((requirement, reqIndex) => (
                      <li key={reqIndex} className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span className="text-gray-600">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Culture
              </h2>
              <div className="space-y-4 text-gray-600">
                <p>
                  At Postify, we believe in the power of decentralized technology to create 
                  a more open, free, and accessible internet. Our team is passionate about 
                  building tools that give content creators true ownership of their work.
                </p>
                <p>
                  We're a remote-first company that values autonomy, creativity, and 
                  collaboration. We encourage our team members to contribute to open-source 
                  projects and participate in the broader Web3 community.
                </p>
                <p>
                  If you're excited about the future of decentralized content creation and 
                  want to work with cutting-edge technologies like Filecoin, we'd love to 
                  hear from you.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                What We Offer
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Competitive salary and equity</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Flexible working hours</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Remote-first culture</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Learning and development budget</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Health and wellness benefits</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                  <span className="text-gray-700">Conference and event attendance</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Don't See a Role That Fits?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            We're always looking for talented individuals who share our vision. 
            Send us your resume and tell us how you'd like to contribute.
          </p>
          <Link 
            href="/contact" 
            className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-colors duration-200 inline-block"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  )
}
