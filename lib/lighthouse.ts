import lighthouse from '@lighthouse-web3/sdk'

const LIGHTHOUSE_API_KEY = process.env.LIGHTHOUSE_API_KEY

if (!LIGHTHOUSE_API_KEY) {
  throw new Error('LIGHTHOUSE_API_KEY is not defined in environment variables')
}

// The Lighthouse SDK exposes upload/getUploads functions that accept an auth token
// directly in their options. We avoid calling a global `setAuthToken` to match
// the SDK's TypeScript definitions.

export interface UploadResponse {
  data: {
    Hash: string
    Name: string
    Size: string
  }
}

export interface UploadProgress {
  progress: number
  status: 'uploading' | 'completed' | 'failed'
}

/**
 * Upload file to Lighthouse storage
 */
export async function uploadToLighthouse(file: File): Promise<UploadResponse> {
  try {
    // The SDK expects the API key as a string argument
    const uploadResponse = await lighthouse.upload(file, LIGHTHOUSE_API_KEY!)
    
    return uploadResponse
  } catch (error) {
    console.error('Lighthouse upload error:', error)
    throw new Error('Failed to upload file to Lighthouse storage')
  }
}

/**
 * Upload multiple files to Lighthouse storage
 */
export async function uploadMultipleToLighthouse(files: File[]): Promise<UploadResponse[]> {
  try {
    const uploadPromises = files.map(file => uploadToLighthouse(file))
    const responses = await Promise.all(uploadPromises)
    return responses
  } catch (error) {
    console.error('Lighthouse multiple upload error:', error)
    throw new Error('Failed to upload files to Lighthouse storage')
  }
}

/**
 * Get file from Lighthouse storage using CID
 */
export function getLighthouseFileUrl(cid: string): string {
  return `https://gateway.lighthouse.storage/ipfs/${cid}`
}

/**
 * Upload text content to Lighthouse storage
 */
export async function uploadTextToLighthouse(content: string, filename: string = 'content.txt'): Promise<UploadResponse> {
  try {
    const blob = new Blob([content], { type: 'text/plain' })
    const file = new File([blob], filename, { type: 'text/plain' })
    
    return await uploadToLighthouse(file)
  } catch (error) {
    console.error('Lighthouse text upload error:', error)
    throw new Error('Failed to upload text content to Lighthouse storage')
  }
}

/**
 * Get storage stats for an API key
 */
export async function getStorageStats(): Promise<any> {
  try {
  const stats = await lighthouse.getUploads(LIGHTHOUSE_API_KEY!)
    return stats
  } catch (error) {
    console.error('Lighthouse stats error:', error)
    throw new Error('Failed to get storage stats')
  }
}
