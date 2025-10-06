'use client'

import { useState } from 'react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Check, Star, Zap } from 'lucide-react'

export default function PricingPage() {
  const { data: session } = useSession()

  const plans = [
    {
      name: 'Free',
      price: 0,
      period: 'month',
      description: 'Perfect for getting started',
      features: [
        '3 posts per month',
        'Basic themes',
        'Community support',
        'Standard analytics'
      ],
      maxPosts: 3,
      popular: false
    },
    {
      name: 'Basic',
      price: 9.99,
      period: 'month',
      description: 'Great for regular bloggers',
      features: [
        '10 posts per month',
        'Premium themes',
        'Custom domain support',
        'Email support',
        'Advanced analytics',
        'Social media integration'
      ],
      maxPosts: 10,
      popular: true
    },
    {
      name: 'Premium',
      price: 19.99,
      period: 'month',
      description: 'For power users and professionals',
      features: [
        '50 posts per month',
        'All themes + custom themes',
        'Custom domain support',
        'Priority support',
        'Advanced analytics',
        'SEO optimization tools',
        'Custom branding',
        'API access'
      ],
      maxPosts: 50,
      popular: false
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-600">
                Postify
              </Link>
              <span className="ml-4 text-gray-500">Pricing</span>
            </div>
            
            <div className="flex items-center space-x-4">
              {session ? (
                <Link href="/dashboard" className="btn-primary">
                  Dashboard
                </Link>
              ) : (
                <>
                  <Link href="/auth/signin" className="text-gray-600 hover:text-primary-600">
                    Sign In
                  </Link>
                  <Link href="/auth/signup" className="btn-primary">
                    Get Started
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Choose Your Plan
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            Start free and upgrade as you grow. All plans include secure Lighthouse storage and beautiful themes.
          </motion.p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative bg-white rounded-2xl shadow-lg border-2 overflow-hidden ${
                  plan.popular ? 'border-primary-500 scale-105' : 'border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-primary-500 text-white text-center py-2 text-sm font-medium">
                    <Star className="h-4 w-4 inline mr-1" />
                    Most Popular
                  </div>
                )}
                
                <div className="p-8">
                  <div className="text-center mb-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                    <p className="text-gray-600 mb-6">{plan.description}</p>
                    
                    <div className="flex items-baseline justify-center">
                      <span className="text-5xl font-bold text-gray-900">${plan.price}</span>
                      {plan.price > 0 && (
                        <span className="text-gray-600 ml-1">/{plan.period}</span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="text-center">
                    {session ? (
                      plan.name === 'Free' ? (
                        <span className="btn-secondary w-full opacity-50 cursor-not-allowed">
                          Current Plan
                        </span>
                      ) : (
                        <Link
                          href={`/api/stripe/create-checkout?plan=${plan.name.toLowerCase()}`}
                          className="btn-primary w-full"
                        >
                          {plan.popular && <Zap className="h-4 w-4 mr-2" />}
                          Upgrade to {plan.name}
                        </Link>
                      )
                    ) : (
                      <Link
                        href="/auth/signup"
                        className={`w-full py-3 px-6 rounded-lg font-medium transition-colors duration-200 ${
                          plan.popular
                            ? 'bg-primary-600 hover:bg-primary-700 text-white'
                            : 'bg-gray-900 hover:bg-gray-800 text-white'
                        }`}
                      >
                        Start Free Trial
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our pricing and plans.
            </p>
          </div>

          <div className="space-y-8">
            {[
              {
                question: 'Can I change my plan anytime?',
                answer: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately for upgrades and at the end of your billing cycle for downgrades.'
              },
              {
                question: 'What happens if I exceed my monthly post limit?',
                answer: 'If you exceed your monthly post limit, you\'ll need to upgrade to a higher plan or wait until the next month. We\'ll notify you when you\'re approaching your limit.'
              },
              {
                question: 'Is my content secure on Lighthouse storage?',
                answer: 'Yes, all your content is stored securely using decentralized Lighthouse storage. Your data is encrypted and distributed across multiple nodes for maximum security and reliability.'
              },
              {
                question: 'Can I cancel my subscription anytime?',
                answer: 'Yes, you can cancel your subscription anytime from your dashboard. You\'ll continue to have access to your plan features until the end of your billing period.'
              },
              {
                question: 'Do you offer custom domains?',
                answer: 'Yes, Basic and Premium plans include custom domain support. You can connect your own domain or use our subdomain (username.postify.com).'
              }
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="border border-gray-200 rounded-lg p-6"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-600">
                  {faq.answer}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 gradient-bg">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Ready to start your blog?
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            Join thousands of creators who are already sharing their stories with the world.
          </p>
          {session ? (
            <Link href="/dashboard" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200 inline-block">
              Go to Dashboard
            </Link>
          ) : (
            <Link href="/auth/signup" className="bg-white text-primary-600 hover:bg-gray-100 font-medium py-3 px-8 rounded-lg transition-colors duration-200 inline-block">
              Get Started Free
            </Link>
          )}
        </div>
      </section>
    </div>
  )
}
