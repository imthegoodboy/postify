import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { headers } from 'next/headers'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
})

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
  try {
    const body = await request.text()
    const signature = headers().get('stripe-signature')!

    let event: Stripe.Event

    try {
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err) {
      console.error('Webhook signature verification failed:', err)
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    await dbConnect()

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        
        if (session.mode === 'subscription') {
          const userId = session.metadata?.userId
          const plan = session.metadata?.plan as 'basic' | 'premium'
          
          if (userId && plan) {
            const maxPosts = plan === 'basic' ? 20 : -1 // -1 for unlimited
            
            await User.findByIdAndUpdate(userId, {
              'subscription.plan': plan,
              'subscription.status': 'active',
              'subscription.stripeCustomerId': session.customer as string,
              'subscription.stripeSubscriptionId': session.subscription as string,
              'subscription.maxPostsPerMonth': maxPosts,
              'subscription.postsThisMonth': 0
            })
          }
        }
        break
      }

      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        
        if (invoice.subscription) {
          await User.findOneAndUpdate(
            { 'subscription.stripeSubscriptionId': invoice.subscription },
            { 'subscription.status': 'active' }
          )
        }
        break
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice
        
        if (invoice.subscription) {
          await User.findOneAndUpdate(
            { 'subscription.stripeSubscriptionId': invoice.subscription },
            { 'subscription.status': 'inactive' }
          )
        }
        break
      }

      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        
        await User.findOneAndUpdate(
          { 'subscription.stripeSubscriptionId': subscription.id },
          {
            'subscription.status': 'cancelled',
            'subscription.plan': 'free',
            'subscription.maxPostsPerMonth': 3
          }
        )
        break
      }

      default:
        console.log(`Unhandled event type: ${event.type}`)
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
