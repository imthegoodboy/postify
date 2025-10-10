'use client'

import { motion } from 'framer-motion'
import { Users, Target, Heart, Award, Globe, Zap } from 'lucide-react'
import Link from 'next/link'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-blue-50 via-white to-purple-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
                About
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Postify
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                We're building the future of decentralized content creation powered by Filecoin Onchain Cloud, 
                ensuring every voice is heard without censorship or centralization.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Postify was born from a vision of a truly decentralized web where content creators 
                  have full control over their data and can monetize their work without intermediaries.
                </p>
                <p>
                  Built on Filecoin Onchain Cloud, we leverage decentralized storage, payments, and 
                  content delivery to create the first truly censorship-resistant blogging platform.
                </p>
                <p>
                  Today, Postify is pioneering the future of decentralized content creation, helping creators, 
                  entrepreneurs, and storytellers share their voices without fear of censorship or data loss.
                </p>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-3xl p-8 h-96 flex items-center justify-center">
                <div className="text-center">
                  <Globe className="h-24 w-24 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Global Reach</h3>
                  <p className="text-gray-600">Serving creators in 50+ countries</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Our Mission & Values */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-gray-900 mb-6"
            >
              Our Mission & Values
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              We're driven by core values that shape everything we do
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Target,
                title: 'Accessibility',
                description: 'Making professional blogging accessible to everyone, regardless of technical skills or budget.'
              },
              {
                icon: Heart,
                title: 'Creator-First',
                description: 'Every feature we build is designed with creators in mind, putting their needs first.'
              },
              {
                icon: Zap,
                title: 'Innovation',
                description: 'Continuously pushing boundaries with cutting-edge technology and user experience.'
              },
              {
                icon: Users,
                title: 'Community',
                description: 'Building a supportive ecosystem where creators can connect, learn, and grow together.'
              },
              {
                icon: Globe,
                title: 'Decentralization',
                description: 'Leveraging decentralized storage to ensure your content is secure and always available.'
              },
              {
                icon: Award,
                title: 'Quality',
                description: 'Delivering exceptional quality in everything we do, from our platform to our support.'
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6">
                  <value.icon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-gray-900 mb-6"
            >
              Meet Our Team
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              The passionate people behind Postify
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: 'Alex Chen',
                role: 'Founder & CEO',
                description: 'Former tech lead with 10+ years building scalable platforms. Passionate about democratizing content creation.',
                avatar: '👨‍💻'
              },
              {
                name: 'Sarah Johnson',
                role: 'Head of Design',
                description: 'Award-winning designer with expertise in user experience and brand identity. Believes great design should be accessible.',
                avatar: '👩‍🎨'
              },
              {
                name: 'David Rodriguez',
                role: 'Lead Developer',
                description: 'Full-stack engineer specializing in modern web technologies. Loves building tools that empower creators.',
                avatar: '👨‍🔬'
              },
              {
                name: 'Emma Wilson',
                role: 'Community Manager',
                description: 'Former content creator who understands the creator journey. Dedicated to supporting our community.',
                avatar: '👩‍💼'
              },
              {
                name: 'Michael Park',
                role: 'Head of Product',
                description: 'Product strategist with a focus on user-centered design. Always thinking about how to make Postify better.',
                avatar: '👨‍💼'
              },
              {
                name: 'Lisa Thompson',
                role: 'Marketing Lead',
                description: 'Growth expert with a passion for storytelling. Helps creators discover the power of Postify.',
                avatar: '👩‍🚀'
              }
            ].map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-blue-50 p-8 rounded-2xl border border-gray-100 text-center hover:shadow-lg transition-shadow duration-300"
              >
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-white mb-6"
            >
              By the Numbers
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-blue-100 max-w-3xl mx-auto"
            >
              The impact we've made in empowering creators worldwide
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: '10K+', label: 'Active Creators', description: 'Bloggers using our platform' },
              { number: '1M+', label: 'Posts Created', description: 'Stories shared worldwide' },
              { number: '50+', label: 'Countries', description: 'Global reach and impact' },
              { number: '99.9%', label: 'Uptime', description: 'Reliable platform performance' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-xl font-semibold text-blue-100 mb-1">{stat.label}</div>
                <div className="text-blue-200">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-gray-900 mb-6"
          >
            Ready to Join Our Community?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto"
          >
            Start your blogging journey today and become part of a global community of creators.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link href="/auth/signup" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:shadow-xl transition-all duration-300">
              Get Started Free
            </Link>
            <Link href="/contact" className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full text-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300">
              Contact Us
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
