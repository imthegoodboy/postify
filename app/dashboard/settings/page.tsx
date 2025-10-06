 'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Save, Upload, User, Image, Globe, FileText } from 'lucide-react'
import toast from 'react-hot-toast'

interface User {
  _id: string
  username: string
  email: string
  bio: string
  blogTitle: string
  blogDescription: string
  profilePicture?: string
  bannerImage?: string
  customDomain?: string
  subscription: {
    plan: 'free' | 'basic' | 'premium'
    status: 'active' | 'inactive' | 'cancelled'
  }
}

export default function SettingsPage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [isUploading, setIsUploading] = useState(false)
  
  const [formData, setFormData] = useState({
    username: '',
    bio: '',
    blogTitle: '',
    blogDescription: '',
    customDomain: ''
  })

  useEffect(() => {
    if (!session) {
      router.push('/auth/signin')
      return
    }
    
    fetchUserData()
  }, [session, router])

  const fetchUserData = async () => {
    try {
      const response = await fetch('/api/user/profile')
      if (response.ok) {
        const data = await response.json()
        setUser(data.user)
        setFormData({
          username: data.user.username || '',
          bio: data.user.bio || '',
          blogTitle: data.user.blogTitle || '',
          blogDescription: data.user.blogDescription || '',
          customDomain: data.user.customDomain || ''
        })
      }
    } catch (error) {
      toast.error('Failed to load user data')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'banner') => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    
    try {
      const formData = new FormData()
      formData.append('file', file)

      const response = await fetch('/api/upload/local', {
        method: 'POST',
        body: formData
      })

      if (response.ok) {
        const data = await response.json()
        const imageUrl = data.url
        
        // Update user profile with new image
        const updateResponse = await fetch('/api/user/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            [type === 'profile' ? 'profilePicture' : 'bannerImage']: imageUrl
          }),
        })

        if (updateResponse.ok) {
          toast.success(`${type === 'profile' ? 'Profile' : 'Banner'} image updated successfully!`)
          fetchUserData() // Refresh user data
        } else {
          toast.error('Failed to update profile')
        }
      } else {
        toast.error('Failed to upload image')
      }
    } catch (error) {
      toast.error('An error occurred while uploading')
    } finally {
      setIsUploading(false)
    }
  }

  const handleSave = async () => {
    if (!formData.username.trim()) {
      toast.error('Username is required')
      return
    }

    setIsSaving(true)

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        toast.success('Settings saved successfully!')
        fetchUserData() // Refresh user data
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to save settings')
      }
    } catch (error) {
      toast.error('An error occurred while saving')
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-primary-600 mr-4">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Dashboard
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Blog Settings</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="btn-primary flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Settings Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Profile Information
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
                    Username *
                  </label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter your username"
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    This will be your blog URL: {formData.username || 'username'}.postify.com
                  </p>
                </div>

                <div>
                  <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={3}
                    className="input-field"
                    placeholder="Tell us about yourself..."
                    maxLength={500}
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    {formData.bio.length}/500 characters
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Blog Settings */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <FileText className="h-5 w-5 mr-2" />
                Blog Settings
              </h3>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="blogTitle" className="block text-sm font-medium text-gray-700 mb-2">
                    Blog Title
                  </label>
                  <input
                    type="text"
                    id="blogTitle"
                    name="blogTitle"
                    value={formData.blogTitle}
                    onChange={handleInputChange}
                    className="input-field"
                    placeholder="Enter your blog title"
                    maxLength={100}
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    {formData.blogTitle.length}/100 characters
                  </p>
                </div>

                <div>
                  <label htmlFor="blogDescription" className="block text-sm font-medium text-gray-700 mb-2">
                    Blog Description
                  </label>
                  <textarea
                    id="blogDescription"
                    name="blogDescription"
                    value={formData.blogDescription}
                    onChange={handleInputChange}
                    rows={3}
                    className="input-field"
                    placeholder="Describe what your blog is about..."
                    maxLength={500}
                  />
                  <p className="mt-1 text-sm text-gray-500">
                    {formData.blogDescription.length}/500 characters
                  </p>
                </div>

                {user.subscription.plan !== 'free' && (
                  <div>
                    <label htmlFor="customDomain" className="block text-sm font-medium text-gray-700 mb-2">
                      Custom Domain
                    </label>
                    <input
                      type="text"
                      id="customDomain"
                      name="customDomain"
                      value={formData.customDomain}
                      onChange={handleInputChange}
                      className="input-field"
                      placeholder="example.com"
                    />
                    <p className="mt-1 text-sm text-gray-500">
                      Enter your custom domain (without http:// or https://)
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Media Upload */}
          <div className="space-y-8">
            {/* Profile Picture */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Image className="h-5 w-5 mr-2" />
                Profile Picture
              </h3>
              
              <div className="text-center">
                <div className="relative inline-block">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                    />
                  ) : (
                    <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <User className="h-12 w-12 text-primary-600" />
                    </div>
                  )}
                </div>
                
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'profile')}
                  className="hidden"
                  id="profile-upload"
                />
                <label
                  htmlFor="profile-upload"
                  className="btn-secondary w-full cursor-pointer flex items-center justify-center"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {isUploading ? 'Uploading...' : 'Upload Photo'}
                </label>
              </div>
            </motion.div>

            {/* Banner Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Image className="h-5 w-5 mr-2" />
                Banner Image
              </h3>
              
              <div className="text-center">
                <div className="relative">
                  {user.bannerImage ? (
                    <img
                      src={user.bannerImage}
                      alt="Banner"
                      className="w-full h-32 object-cover rounded-lg mb-4"
                    />
                  ) : (
                    <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center mb-4">
                      <Image className="h-8 w-8 text-gray-400" />
                    </div>
                  )}
                </div>
                
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, 'banner')}
                  className="hidden"
                  id="banner-upload"
                />
                <label
                  htmlFor="banner-upload"
                  className="btn-secondary w-full cursor-pointer flex items-center justify-center"
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {isUploading ? 'Uploading...' : 'Upload Banner'}
                </label>
              </div>
            </motion.div>

            {/* Blog Preview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="card"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Blog Preview
              </h3>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <div className="flex items-center space-x-3 mb-3">
                  {user.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt="Profile"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                      <User className="h-4 w-4 text-primary-600" />
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium text-gray-900">
                      {formData.blogTitle || `${formData.username}'s Blog`}
                    </h4>
                    <p className="text-sm text-gray-600">@{formData.username}</p>
                  </div>
                </div>
                
                {formData.bio && (
                  <p className="text-sm text-gray-700 mb-3">{formData.bio}</p>
                )}
                
                <Link
                  href={`/${formData.username}`}
                  target="_blank"
                  className="text-primary-600 hover:text-primary-700 text-sm font-medium"
                >
                  View Blog →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
