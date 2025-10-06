'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Check, Star, Zap } from 'lucide-react'
import Link from 'next/link'

interface PricingModalProps {
  isOpen: boolean
  onClose: () => void
  onSelectPlan: (plan: string) => void
}

export default function PricingModal({ isOpen, onClose, onSelectPlan }: PricingModalProps) {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  const plans = {
    free: {
      name: 'Free',
      monthlyPrice: 0,
      yearlyPrice: 0,
      description: 'Perfect for getting started',
      features: [
        '5 posts per month',
        'Basic themes',
        'Community support',
        'Standard analytics',
        'Mobile responsive'
      ],
      maxPosts: 5,
      popular: false
    },
    basic: {
      name: 'Basic',
      monthlyPrice: 9.99,
      yearlyPrice: 99.99, // ~$8.33/month
      description: 'Great for regular bloggers',
      features: [
        '20 posts per month',
        'Premium themes',
        'Custom domain support',
        'Email support',
        'Advanced analytics',
        'Social media integration',
        'Custom colors'
      ],
      maxPosts: 20,
      popular: true
    },
    premium: {
      name: 'Premium',
      monthlyPrice: 19.99,
      yearlyPrice: 199.99, // ~$16.66/month
      description: 'For power users and professionals',
      features: [
        'Unlimited posts',
        'All themes + custom themes',
        'Custom domain support',
        'Priority support',
        'Advanced analytics',
        'SEO optimization tools',
        'Custom branding',
        'API access',
        'White-label options'
      ],
      maxPosts: -1, // Unlimited
      popular: false
    }
  }

  const handlePlanSelect = (planName: string) => {
    onSelectPlan(planName)
    onClose()
  }

  if (!isOpen) return null

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="inline-block align-bottom bg-white rounded-2xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full"
          >
            <div className="bg-white px-6 py-8">
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-3xl font-bold text-gray-900">Choose Your Plan</h2>
                  <p className="text-gray-600 mt-2">Start free and upgrade anytime. All plans include secure Lighthouse storage.</p>
                </div>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              {/* Billing Toggle */}
              <div className="flex items-center justify-center mb-8">
                <div className="bg-gray-100 rounded-full p-1 flex">
                  <button
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                      billingCycle === 'monthly'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle('yearly')}
                    className={`px-6 py-2 rounded-full text-sm font-medium transition-all relative ${
                      billingCycle === 'yearly'
                        ? 'bg-white text-gray-900 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    Yearly
                    <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                      Save 20%
                    </span>
                  </button>
                </div>
              </div>

              {/* Pricing Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {Object.entries(plans).map(([planKey, plan]) => (
                  <motion.div
                    key={planKey}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className={`relative bg-white rounded-2xl border-2 p-8 ${
                      plan.popular 
                        ? 'border-blue-500 shadow-lg' 
                        : 'border-gray-200 hover:border-blue-300'
                    }`}
                  >
                    {plan.popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <span className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                          <Star className="h-4 w-4 mr-1" />
                          Most Popular
                        </span>
                      </div>
                    )}

                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <p className="text-gray-600 mb-6">{plan.description}</p>
                      
                      <div className="flex items-baseline justify-center mb-2">
                        <span className="text-5xl font-bold text-gray-900">
                          ${billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice}
                        </span>
                        <span className="text-gray-600 ml-1">
                          /{billingCycle === 'monthly' ? 'month' : 'year'}
                        </span>
                      </div>
                      
                      {billingCycle === 'yearly' && plan.monthlyPrice > 0 && (
                        <p className="text-sm text-gray-500">
                          ${(plan.yearlyPrice / 12).toFixed(2)}/month billed yearly
                        </p>
                      )}
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button
                      onClick={() => handlePlanSelect(planKey)}
                      className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
                        planKey === 'free'
                          ? 'bg-gray-100 text-gray-900 hover:bg-gray-200'
                          : plan.popular
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-lg'
                          : 'bg-gray-900 text-white hover:bg-gray-800'
                      }`}
                    >
                      {planKey === 'free' ? (
                        'Get Started Free'
                      ) : (
                        <>
                          <Zap className="h-4 w-4 inline mr-2" />
                          Choose {plan.name}
                        </>
                      )}
                    </button>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="mt-8 text-center">
                <p className="text-gray-600">
                  All plans include secure Lighthouse IPFS storage and 99.9% uptime guarantee.
                </p>
                <p className="text-sm text-gray-500 mt-2">
                  Need help choosing? <Link href="/contact" className="text-blue-600 hover:text-blue-700">Contact our team</Link>
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </AnimatePresence>
  )
}
