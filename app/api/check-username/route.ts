import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'

export async function GET(request: NextRequest) {
  try {
  // Use request.nextUrl instead of constructing a new URL from request.url
  // to avoid triggering Next's staticGenerationBailout (dynamic server usage)
  const { searchParams } = request.nextUrl
    const username = searchParams.get('username')

    if (!username) {
      return NextResponse.json({ error: 'Username is required' }, { status: 400 })
    }

    // Validate username format
    if (username.length < 3 || username.length > 30) {
      return NextResponse.json({ available: false, reason: 'Username must be between 3 and 30 characters' })
    }

    if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
      return NextResponse.json({ available: false, reason: 'Username can only contain letters, numbers, underscores, and hyphens' })
    }

    // Check for reserved usernames
    const reservedUsernames = [
      'admin', 'api', 'www', 'mail', 'ftp', 'blog', 'support', 'help', 
      'about', 'contact', 'terms', 'privacy', 'login', 'signup', 'auth',
      'dashboard', 'profile', 'settings', 'account', 'user', 'postify'
    ]

    if (reservedUsernames.includes(username.toLowerCase())) {
      return NextResponse.json({ available: false, reason: 'This username is reserved' })
    }

    await dbConnect()

    // Check if username already exists
    const existingUser = await User.findOne({ username: username.toLowerCase() })

    return NextResponse.json({ 
      available: !existingUser,
      reason: existingUser ? 'Username is already taken' : null
    })
  } catch (error) {
    console.error('Username check error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
