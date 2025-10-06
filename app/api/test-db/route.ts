import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import User from '@/models/User'

export async function GET() {
  try {
    await dbConnect()
    
    // Test database connection
    const userCount = await User.countDocuments()
    
    return NextResponse.json({ 
      success: true, 
      message: 'Database connected successfully',
      userCount 
    })
  } catch (error) {
    console.error('Database test error:', error)
    const message = error instanceof Error ? error.message : String(error)
    return NextResponse.json({ 
      success: false, 
      error: message
    }, { status: 500 })
  }
}
