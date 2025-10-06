'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, Eye, Heart, Tag, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import toast from 'react-hot-toast'

interface User {
  _id: string
  username: string
  bio: string
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

interface Post {
  _id: string
  title: string
  content: string
  excerpt?: string
  featuredImage?: string
  images: string[]
  videos: string[]
  tags: string[]
  publishedAt: string
  views: number
  likes: number
}

export default function BlogPage({ params }: { params: { username: string } }) {
  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchBlogData()
  }, [params.username])

  const fetchBlogData = async () => {
    try {
      const [userResponse, postsResponse] = await Promise.all([
        fetch(`/api/blog/${params.username}`),
        fetch(`/api/blog/${params.username}/posts`)
      ])

      if (userResponse.ok) {
        const userData = await userResponse.json()
        setUser(userData.user)
      }

      if (postsResponse.ok) {
        const postsData = await postsResponse.json()
        setPosts(postsData.posts || [])
      }
    } catch (error) {
      toast.error('Failed to load blog data')
    } finally {
      setIsLoading(false)
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
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Blog Not Found</h1>
          <p className="text-gray-600 mb-6">The blog you're looking for doesn't exist.</p>
          <Link href="/" className="btn-primary">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div 
      className="min-h-screen"
      style={{
        backgroundColor: user.theme?.backgroundColor || '#f9fafb',
        color: user.theme?.textColor || '#1f2937'
      }}
    >
      {/* Header */}
      <header 
        className="border-b"
        style={{
          backgroundColor: user.theme?.accentColor || '#ffffff',
          borderColor: user.theme?.primaryColor ? `${user.theme.primaryColor}20` : '#e5e7eb'
        }}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {user.profilePicture ? (
                <Image
                  src={user.profilePicture}
                  alt={user.username}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              ) : (
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                  <span className="text-primary-600 font-semibold text-lg">
                    {user.username.charAt(0).toUpperCase()}
                  </span>
                </div>
              )}
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  {user.blogTitle || `${user.username}'s Blog`}
                </h1>
                <p className="text-gray-600">@{user.username}</p>
              </div>
            </div>
            <Link href="/" className="text-gray-600 hover:text-primary-600">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </div>
          
          {user.bio && (
            <div className="mt-4">
              <p className="text-gray-700">{user.bio}</p>
            </div>
          )}
        </div>
      </header>

      {/* Banner Image */}
      {user.bannerImage && (
        <div className="relative h-64 bg-gray-200">
          <Image
            src={user.bannerImage}
            alt="Blog banner"
            fill
            className="object-cover"
          />
        </div>
      )}

      {/* Blog Description */}
      {user.blogDescription && (
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <p className="text-gray-700 text-center">{user.blogDescription}</p>
          </div>
        </div>
      )}

      {/* Posts */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {posts.length === 0 ? (
          <div className="text-center py-12">
            <h2 className="text-xl font-semibold text-gray-900 mb-2">No posts yet</h2>
            <p className="text-gray-600">This blog doesn't have any published posts.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {posts.map((post, index) => (
              <motion.article
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                {/* Featured Image */}
                {post.featuredImage && (
                  <div className="relative h-48 bg-gray-200">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}

                <div className="p-6">
                  {/* Title */}
                  <h2 className="text-2xl font-bold text-gray-900 mb-3 hover:text-primary-600 transition-colors duration-200">
                    <Link href={`/blog/${user.username}/${post._id}`}>
                      {post.title}
                    </Link>
                  </h2>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                  )}

                  {/* Tags */}
                  {post.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800"
                        >
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Post Images */}
                  {post.images.length > 0 && (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      {post.images.slice(0, 4).map((image, imageIndex) => (
                        <div key={imageIndex} className="relative h-24 bg-gray-200 rounded-lg overflow-hidden">
                          <Image
                            src={image}
                            alt={`Post image ${imageIndex + 1}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ))}
                      {post.images.length > 4 && (
                        <div className="relative h-24 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                          <span className="text-gray-600 text-sm font-medium">
                            +{post.images.length - 4} more
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Post Videos */}
                  {post.videos.length > 0 && (
                    <div className="space-y-4 mb-4">
                      {post.videos.slice(0, 2).map((video, videoIndex) => (
                        <video
                          key={videoIndex}
                          src={video}
                          controls
                          className="w-full h-48 bg-gray-200 rounded-lg"
                        />
                      ))}
                    </div>
                  )}

                  {/* Meta Information */}
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Calendar className="h-4 w-4 mr-1" />
                        {new Date(post.publishedAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        {post.views} views
                      </span>
                      <span className="flex items-center">
                        <Heart className="h-4 w-4 mr-1" />
                        {post.likes} likes
                      </span>
                    </div>
                    <Link
                      href={`/blog/${user.username}/${post._id}`}
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Read more →
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <p className="text-gray-600">
              Powered by{' '}
              <Link href="/" className="text-primary-600 hover:text-primary-700 font-medium">
                Postify
              </Link>
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
