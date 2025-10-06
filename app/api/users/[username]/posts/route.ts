import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import Post from '@/models/Post'

// GET: public list of published posts for a username
export async function GET(
  _request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    await dbConnect()
    const owner = await User.findOne({ username: params.username })
    if (!owner) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    const posts = await Post.find({ author: owner._id, status: 'published' })
      .sort({ publishedAt: -1 })

    return NextResponse.json({ posts })
  } catch (error: any) {
    console.error('User posts fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// POST: owner-only create post for a username
export async function POST(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    await dbConnect()

    const owner = await User.findOne({ username: params.username })
    if (!owner) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Only the owner may create
    if (owner._id.toString() !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    const { title, content, excerpt, tags, images, videos, status } = await request.json()
    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 })
    }

    // Enforce plan limit when publishing
    if (status === 'published' && owner.subscription.postsThisMonth >= owner.subscription.maxPostsPerMonth) {
      return NextResponse.json({ error: 'Monthly post limit reached' }, { status: 400 })
    }

    const post = new Post({
      title,
      content,
      excerpt,
      tags: tags || [],
      images: images || [],
      videos: videos || [],
      status: status || 'draft',
      author: owner._id,
      publishedAt: status === 'published' ? new Date() : null,
    })

    await post.save()

    if (post.status === 'published') {
      await User.findByIdAndUpdate(owner._id, { $inc: { 'subscription.postsThisMonth': 1 } })
    }

    return NextResponse.json({ post }, { status: 201 })
  } catch (error: any) {
    console.error('User post creation error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


