'use client'

import { motion } from 'framer-motion'
import { 
  Globe, 
  Zap, 
  Shield, 
  Users, 
  Star, 
  CheckCircle, 
  Palette, 
  BarChart3, 
  Smartphone, 
  Cloud,
  Lock,
  Rocket
} from 'lucide-react'
import Link from 'next/link'

export default function FeaturesPage() {
  const features = [
    {
      icon: Globe,
      title: 'Custom Blog URLs',
      description: 'Get your own personalized domain like yourname.postify.com. Make your blog uniquely yours with a memorable URL that reflects your brand.',
      benefits: ['Easy to remember', 'Professional appearance', 'SEO friendly', 'Brand consistency']
    },
    {
      icon: Zap,
      title: 'Lightning Fast Publishing',
      description: 'Create and publish stunning posts in seconds with our intuitive editor. No technical knowledge required.',
      benefits: ['Real-time preview', 'Auto-save', 'One-click publish', 'Instant updates']
    },
    {
      icon: Palette,
      title: 'Beautiful Themes',
      description: 'Choose from professionally designed themes or customize your blog to match your unique style and brand.',
      benefits: ['20+ themes', 'Custom colors', 'Typography options', 'Mobile responsive']
    },
    {
      icon: Shield,
      title: 'Secure Lighthouse Storage',
      description: 'All your content is stored on decentralized Lighthouse IPFS storage, ensuring maximum security and availability.',
      benefits: ['Decentralized storage', '99.9% uptime', 'Data redundancy', 'Future-proof']
    },
    {
      icon: Users,
      title: 'Community Features',
      description: 'Connect with readers, build your audience, and grow your community with our built-in social features.',
      benefits: ['Reader engagement', 'Social sharing', 'Comments system', 'Newsletter integration']
    },
    {
      icon: Smartphone,
      title: 'Post by Email',
      description: 'Write drafts or posts directly from your email. Attach photos to create automatic photo galleries. We\'ll even remove your email signature automatically.',
      benefits: ['Email posting', 'Photo galleries', 'Auto-signature removal', 'Mobile-friendly']
    },
    {
      icon: Globe,
      title: 'Automatic Link Expansion',
      description: 'Paste a link (YouTube, Google Maps, Soundcloud) and we\'ll automatically embed it inside your post for rich content.',
      benefits: ['YouTube embeds', 'Google Maps', 'Soundcloud', 'Rich media']
    },
    {
      icon: Palette,
      title: 'Custom Themes & Design',
      description: 'Use one of our themes or build your own with HTML, CSS, and our CLI. Complete control over your blog\'s appearance.',
      benefits: ['Custom HTML/CSS', 'CLI tools', 'Header images', 'Unsplash integration']
    },
    {
      icon: BarChart3,
      title: 'Analytics & Insights',
      description: 'Track visits with Google Analytics and detailed insights. Monitor your blog\'s performance and growth.',
      benefits: ['Google Analytics', 'Visitor tracking', 'Performance metrics', 'Growth insights']
    },
    {
      icon: Lock,
      title: 'Privacy & Security',
      description: 'Password protection, private posts, and secure hosting. Keep your content safe and control who can see it.',
      benefits: ['Password protection', 'Private posts', 'SSL hosting', 'Data security']
    },
    {
      icon: BarChart3,
      title: 'Analytics Dashboard',
      description: 'Track your blog performance with detailed analytics. See what resonates with your audience.',
      benefits: ['View statistics', 'Engagement metrics', 'Traffic sources', 'Growth insights']
    },
    {
      icon: Smartphone,
      title: 'Mobile Optimized',
      description: 'Your blog looks perfect on any device. Responsive design ensures great experience everywhere.',
      benefits: ['Mobile-first design', 'Touch-friendly', 'Fast loading', 'Offline reading']
    },
    {
      icon: Cloud,
      title: 'Cloud-Based',
      description: 'Access your blog from anywhere, anytime. No downloads or installations required.',
      benefits: ['Anywhere access', 'Cross-platform', 'Automatic backups', 'Scalable infrastructure']
    },
    {
      icon: Lock,
      title: 'Privacy & Security',
      description: 'Your content is protected with enterprise-grade security. You control your data.',
      benefits: ['Data encryption', 'Privacy controls', 'GDPR compliant', 'Secure hosting']
    },
    {
      icon: Rocket,
      title: 'SEO Optimized',
      description: 'Built-in SEO features help your content get discovered by search engines and readers.',
      benefits: ['Meta tags', 'Sitemap generation', 'Schema markup', 'Performance optimization']
    }
  ]

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
                Powerful
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Features
                </span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Everything you need to create, customize, and grow your blog. 
                No technical skills required.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group p-8 rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                    <feature.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                    <p className="text-gray-600 leading-relaxed mb-4">{feature.description}</p>
                    <div className="grid grid-cols-2 gap-2">
                      {feature.benefits.map((benefit, benefitIndex) => (
                        <div key={benefitIndex} className="flex items-center text-sm text-gray-500">
                          <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-gray-900 mb-6"
            >
              Why Choose Postify?
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              We've built Postify to be the most user-friendly and powerful blogging platform available
            </motion.p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-green-100 to-blue-100 rounded-2xl flex items-center justify-center mb-6">
                <Zap className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Easy to Use</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                No coding required. Create professional blogs in minutes with our intuitive interface.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Drag & drop editor
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  One-click publishing
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Real-time preview
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mb-6">
                <Rocket className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Powerful & Fast</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Built with modern technology for speed, reliability, and scalability.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Lightning fast loading
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  99.9% uptime guarantee
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Global CDN delivery
                </li>
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Secure & Reliable</h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                Your content is protected with enterprise-grade security and decentralized storage.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Lighthouse IPFS storage
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  SSL encryption
                </li>
                <li className="flex items-center text-gray-600">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-3" />
                  Regular backups
                </li>
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-gray-900 mb-6"
            >
              Compare with Others
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl text-gray-600 max-w-3xl mx-auto"
            >
              See how Postify compares to other blogging platforms
            </motion.p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border border-gray-200 rounded-2xl overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left font-semibold text-gray-900">Features</th>
                  <th className="px-6 py-4 text-center font-semibold text-blue-600">Postify</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-600">WordPress.com</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-600">Medium</th>
                  <th className="px-6 py-4 text-center font-semibold text-gray-600">Ghost</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {[
                  { feature: 'Custom Domain', postify: '✓', others: ['✓', '✓', 'Paid'] },
                  { feature: 'Decentralized Storage', postify: '✓', others: ['✗', '✗', '✗'] },
                  { feature: 'No Coding Required', postify: '✓', others: ['✓', '✓', 'Limited'] },
                  { feature: 'Mobile Responsive', postify: '✓', others: ['✓', '✓', '✓'] },
                  { feature: 'SEO Optimized', postify: '✓', others: ['Limited', 'Limited', '✓'] },
                  { feature: 'Analytics Dashboard', postify: '✓', others: ['Paid', 'Limited', 'Paid'] },
                  { feature: 'Social Features', postify: '✓', others: ['Limited', '✓', 'Limited'] },
                  { feature: 'Free Plan', postify: '✓', others: ['Limited', '✓', '✗'] }
                ].map((row, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                    <td className="px-6 py-4 font-medium text-gray-900">{row.feature}</td>
                    <td className="px-6 py-4 text-center text-green-600 font-semibold">{row.postify}</td>
                    {row.others.map((other, otherIndex) => (
                      <td key={otherIndex} className="px-6 py-4 text-center text-gray-600">{other}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-white mb-6"
          >
            Ready to Experience These Features?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-xl text-blue-100 mb-12 max-w-2xl mx-auto"
          >
            Start your free trial today and see why thousands of creators choose Postify.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <Link href="/auth/signup" className="bg-white text-blue-600 hover:bg-gray-50 font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300">
              Start Free Trial
            </Link>
            <Link href="/pricing" className="border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold px-8 py-4 rounded-full text-lg transition-all duration-300">
              View Pricing
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
