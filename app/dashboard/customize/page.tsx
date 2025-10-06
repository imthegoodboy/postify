'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft, Save, Palette, Eye, Upload, Image, Globe } from 'lucide-react'
import toast from 'react-hot-toast'

interface User {
  username: string
  blogTitle: string
  blogDescription: string
  profilePicture?: string
  bannerImage?: string
  theme: {
    primaryColor: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
}

const colorThemes = [
  {
    name: 'Ocean Blue',
    primaryColor: '#3B82F6',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937',
    accentColor: '#EFF6FF'
  },
  {
    name: 'Forest Green',
    primaryColor: '#10B981',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937',
    accentColor: '#ECFDF5'
  },
  {
    name: 'Sunset Orange',
    primaryColor: '#F59E0B',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937',
    accentColor: '#FFFBEB'
  },
  {
    name: 'Royal Purple',
    primaryColor: '#8B5CF6',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937',
    accentColor: '#F3E8FF'
  },
  {
    name: 'Rose Pink',
    primaryColor: '#EC4899',
    backgroundColor: '#FFFFFF',
    textColor: '#1F2937',
    accentColor: '#FDF2F8'
  },
  {
    name: 'Midnight Dark',
    primaryColor: '#6366F1',
    backgroundColor: '#1F2937',
    textColor: '#F9FAFB',
    accentColor: '#374151'
  }
]

export default function CustomizePage() {
  const { data: session } = useSession()
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  
  const [formData, setFormData] = useState({
    blogTitle: '',
    blogDescription: '',
    theme: colorThemes[0]
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
          blogTitle: data.user.blogTitle || '',
          blogDescription: data.user.blogDescription || '',
          theme: data.user.theme || colorThemes[0]
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

  const handleThemeSelect = (theme: typeof colorThemes[0]) => {
    setFormData(prev => ({
      ...prev,
      theme
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)

    try {
      const response = await fetch('/api/user/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          blogTitle: formData.blogTitle,
          blogDescription: formData.blogDescription,
          theme: formData.theme
        }),
      })

      if (response.ok) {
        toast.success('Blog customization saved successfully!')
        fetchUserData()
      } else {
        const error = await response.json()
        toast.error(error.error || 'Failed to save customization')
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
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
              <Link href="/dashboard" className="flex items-center text-gray-600 hover:text-blue-600 mr-4">
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back to Dashboard
              </Link>
              <h1 className="text-xl font-semibold text-gray-900">Customize Your Blog</h1>
            </div>
            
            <div className="flex items-center space-x-3">
              <Link 
                href={`/${user.username}`}
                target="_blank"
                className="flex items-center text-gray-600 hover:text-blue-600"
              >
                <Eye className="h-4 w-4 mr-1" />
                Preview
              </Link>
              <button
                onClick={handleSave}
                disabled={isSaving}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors duration-200 flex items-center"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customization Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Blog Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Blog Information
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
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your blog title"
                    maxLength={100}
                  />
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
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Describe what your blog is about..."
                    maxLength={500}
                  />
                </div>
              </div>
            </motion.div>

            {/* Color Themes */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Palette className="h-5 w-5 mr-2" />
                Choose Your Theme
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {colorThemes.map((theme, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleThemeSelect(theme)}
                    className={`relative cursor-pointer rounded-xl p-4 border-2 transition-all duration-300 ${
                      formData.theme.name === theme.name
                        ? 'border-blue-500 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    style={{
                      backgroundColor: theme.backgroundColor,
                      color: theme.textColor
                    }}
                  >
                    {formData.theme.name === theme.name && (
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium">{theme.name}</h4>
                      </div>
                      
                      <div className="space-y-2">
                        <div 
                          className="w-full h-3 rounded-full"
                          style={{ backgroundColor: theme.primaryColor }}
                        ></div>
                        <div className="flex space-x-1">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: theme.primaryColor }}
                          ></div>
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: theme.accentColor }}
                          ></div>
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: theme.backgroundColor }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Live Preview */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 sticky top-8"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center">
                <Eye className="h-5 w-5 mr-2" />
                Live Preview
              </h3>
              
              <div 
                className="border rounded-xl overflow-hidden"
                style={{
                  backgroundColor: formData.theme.backgroundColor,
                  color: formData.theme.textColor
                }}
              >
                {/* Blog Header Preview */}
                <div 
                  className="p-6 border-b"
                  style={{ backgroundColor: formData.theme.accentColor }}
                >
                  <div className="flex items-center space-x-3">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                      style={{ backgroundColor: formData.theme.primaryColor }}
                    >
                      {user.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h2 className="font-bold text-lg">
                        {formData.blogTitle || `${user.username}'s Blog`}
                      </h2>
                      <p className="text-sm opacity-75">@{user.username}</p>
                    </div>
                  </div>
                  
                  {formData.blogDescription && (
                    <div className="mt-3 text-sm opacity-80">
                      {formData.blogDescription}
                    </div>
                  )}
                </div>

                {/* Sample Post Preview */}
                <div className="p-6">
                  <div className="space-y-4">
                    <div 
                      className="h-2 rounded-full"
                      style={{ backgroundColor: formData.theme.primaryColor, opacity: 0.7 }}
                    ></div>
                    <div className="space-y-2">
                      <div 
                        className="h-2 rounded-full"
                        style={{ backgroundColor: formData.theme.textColor, opacity: 0.3 }}
                      ></div>
                      <div 
                        className="h-2 rounded-full w-3/4"
                        style={{ backgroundColor: formData.theme.textColor, opacity: 0.3 }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-4 text-center">
                <Link
                  href={`/${user.username}`}
                  target="_blank"
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                >
                  View Full Blog →
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
