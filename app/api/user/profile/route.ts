import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()
    
    const user = await User.findById(session.user.id).select('-password')
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Profile fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { username, bio, blogTitle, blogDescription, profilePicture, bannerImage, theme } = await request.json()

    await dbConnect()
    
    // Prevent changing username if locked
    if (username) {
      const self = await User.findById(session.user.id)
      if (self?.usernameLocked) {
        return NextResponse.json({ error: 'Username cannot be changed' }, { status: 400 })
      }

      const existingUser = await User.findOne({ 
        username, 
        _id: { $ne: session.user.id } 
      })
      
      if (existingUser) {
        return NextResponse.json(
          { error: 'Username is already taken' },
          { status: 400 }
        )
      }
    }

    const user = await User.findByIdAndUpdate(
      session.user.id,
      {
        ...(username && { username, usernameLocked: true }),
        ...(bio && { bio }),
        ...(blogTitle && { blogTitle }),
        ...(blogDescription && { blogDescription }),
        ...(profilePicture && { profilePicture }),
        ...(bannerImage && { bannerImage }),
        ...(theme && { theme })
      },
      { new: true }
    ).select('-password')

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    return NextResponse.json({ user })
  } catch (error) {
    console.error('Profile update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
