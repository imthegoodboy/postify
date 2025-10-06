import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import Post from '@/models/Post'

export async function GET(
  request: NextRequest,
  { params }: { params: { username: string } }
) {
  try {
    await dbConnect()
    
    // Find user by username
    const user = await User.findOne({ username: params.username })
    
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 })
    }

    // Get published posts for this user
    const posts = await Post.find({ 
      author: user._id, 
      status: 'published' 
    })
    .sort({ publishedAt: -1 })
    .populate('author', 'username')

    // Increment view count for each post (you might want to do this differently in production)
    await Post.updateMany(
      { _id: { $in: posts.map(post => post._id) } },
      { $inc: { views: 1 } }
    )

    return NextResponse.json({ posts })
  } catch (error) {
    console.error('Blog posts fetch error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
