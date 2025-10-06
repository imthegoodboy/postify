import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'
import Post from '@/models/Post'

// PUT: owner-only update a post
export async function PUT(
  request: NextRequest,
  { params }: { params: { username: string, id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await dbConnect()
    const owner = await User.findOne({ username: params.username })
    if (!owner) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    if (owner._id.toString() !== session.user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const updates = await request.json()
    const post = await Post.findOneAndUpdate({ _id: params.id, author: owner._id }, updates, { new: true })
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 })

    return NextResponse.json({ post })
  } catch (error: any) {
    console.error('User post update error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

// DELETE: owner-only delete a post
export async function DELETE(
  _request: NextRequest,
  { params }: { params: { username: string, id: string } }
) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    await dbConnect()
    const owner = await User.findOne({ username: params.username })
    if (!owner) return NextResponse.json({ error: 'User not found' }, { status: 404 })
    if (owner._id.toString() !== session.user.id) return NextResponse.json({ error: 'Forbidden' }, { status: 403 })

    const post = await Post.findOneAndDelete({ _id: params.id, author: owner._id })
    if (!post) return NextResponse.json({ error: 'Post not found' }, { status: 404 })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('User post delete error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}


