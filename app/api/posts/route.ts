import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import Post from '@/models/Post'

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()
    
    const posts = await Post.find({ author: session.user.id })
      .sort({ createdAt: -1 })
      .populate('author', 'username')
    
    return NextResponse.json({ posts })
  } catch (error) {
    console.error('Posts fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { title, content, excerpt, tags, images, videos, status } = await request.json()

    if (!title || !content) {
      return NextResponse.json(
        { error: 'Title and content are required' },
        { status: 400 }
      )
    }

    await dbConnect()
    
    // Check user's post limit
    const user = await User.findById(session.user.id)
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    if (status === 'published' && user.subscription.postsThisMonth >= user.subscription.maxPostsPerMonth) {
      return NextResponse.json(
        { error: 'You have reached your monthly post limit. Please upgrade your plan.' },
        { status: 400 }
      )
    }

    // Create post
    const post = new Post({
      title,
      content,
      excerpt,
      tags: tags || [],
      images: images || [],
      videos: videos || [],
      status,
      author: session.user.id,
      publishedAt: status === 'published' ? new Date() : null
    })

    await post.save()

    // Update user's post count if published
    if (status === 'published') {
      await User.findByIdAndUpdate(session.user.id, {
        $inc: { 'subscription.postsThisMonth': 1 }
      })
    }

    return NextResponse.json({ post }, { status: 201 })
  } catch (error) {
    console.error('Post creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
