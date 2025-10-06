import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { uploadMultipleToLighthouse } from '@/lib/lighthouse'

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const files = formData.getAll('files') as File[]

    if (files.length === 0) {
      return NextResponse.json({ error: 'No files provided' }, { status: 400 })
    }

    // Validate file sizes (max 10MB per file)
    const maxSize = 10 * 1024 * 1024 // 10MB
    for (const file of files) {
      if (file.size > maxSize) {
        return NextResponse.json(
          { error: `File ${file.name} is too large. Maximum size is 10MB.` },
          { status: 400 }
        )
      }
    }

    // Upload files to Lighthouse storage
    const uploadResponses = await uploadMultipleToLighthouse(files)
    
    // Extract URLs from upload responses
    const urls = uploadResponses.map(response => 
      `https://gateway.lighthouse.storage/ipfs/${response.data.Hash}`
    )

    return NextResponse.json({ 
      message: 'Files uploaded successfully',
      urls,
      cids: uploadResponses.map(response => response.data.Hash)
    })
  } catch (error) {
    console.error('Upload error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
