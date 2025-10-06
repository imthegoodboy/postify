import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

export const PRICING_PLANS = {
  basic: {
    name: 'Basic',
    price: 9.99,
    maxPosts: 20,
    features: [
      '20 posts per month',
      'Custom domain support',
      'Premium themes',
      'Advanced analytics',
      'Email support',
      'Custom colors'
    ]
  },
  premium: {
    name: 'Premium',
    price: 19.99,
    maxPosts: -1, // Unlimited
    features: [
      'Unlimited posts',
      'Custom domain support',
      'All themes + custom themes',
      'Advanced analytics',
      'Priority support',
      'SEO optimization tools',
      'Custom branding',
      'API access'
    ]
  }
}

export async function createCheckoutSession(
  userId: string,
  plan: 'basic' | 'premium'
) {
  const planDetails = PRICING_PLANS[plan]
  
  const session = await stripe.checkout.sessions.create({
    customer_email: undefined, // Will be set from user data
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'usd',
          product_data: {
            name: `Postify ${planDetails.name} Plan`,
            description: `${planDetails.maxPosts} posts per month`,
          },
          unit_amount: Math.round(planDetails.price * 100), // Convert to cents
          recurring: {
            interval: 'month',
          },
        },
        quantity: 1,
      },
    ],
    mode: 'subscription',
    success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true&plan=${plan}`,
    cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing`,
    metadata: {
      userId,
      plan,
    },
  })

  return session
}

export async function createCustomerPortalSession(customerId: string) {
  const session = await stripe.billingPortal.sessions.create({
    customer: customerId,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard`,
  })

  return session
}

export async function getSubscription(subscriptionId: string) {
  const subscription = await stripe.subscriptions.retrieve(subscriptionId)
  return subscription
}

export async function cancelSubscription(subscriptionId: string) {
  const subscription = await stripe.subscriptions.update(subscriptionId, {
    cancel_at_period_end: true,
  })
  return subscription
}

export default stripe
