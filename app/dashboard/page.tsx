 'use client'

export const dynamic = 'force-dynamic'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Edit, 
  Eye, 
  Trash2, 
  Settings, 
  BarChart3, 
  Users, 
  FileText,
  Calendar,
  TrendingUp,
  Crown,
  Sparkles
} from 'lucide-react'
import toast from 'react-hot-toast'
import PricingModal from '@/components/PricingModal'

interface Post {
  _id: string
  title: string
  status: 'draft' | 'published'
  publishedAt?: string
  views: number
  likes: number
  createdAt: string
}

interface User {
  username: string
  subscription: {
    plan: 'free' | 'basic' | 'premium'
    status: 'active' | 'inactive' | 'cancelled'
    postsThisMonth: number
    maxPostsPerMonth: number
  }
}

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [posts, setPosts] = useState<Post[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showPricingModal, setShowPricingModal] = useState(false)
  const [blogUrl, setBlogUrl] = useState<string>('')

  useEffect(() => {
    if (status === 'loading') return

    if (!session) {
      router.push('/auth/signin')
      return
    }

    fetchDashboardData()
  }, [session, status, router])

  const fetchDashboardData = async () => {
    try {
      const [postsResponse, userResponse] = await Promise.all([
        fetch('/api/posts'),
        fetch('/api/user/profile')
      ])

      if (postsResponse.ok) {
        const postsData = await postsResponse.json()
        setPosts(postsData.posts || [])
      }

      if (userResponse.ok) {
        const userData = await userResponse.json()
        setUser(userData.user)
        const base = process.env.NEXT_PUBLIC_APP_URL || (typeof window !== 'undefined' ? window.location.origin : '')
        setBlogUrl(userData.user?.username ? `${base}/${userData.user.username}` : '')
      }
    } catch (error) {
      toast.error('Failed to load dashboard data')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeletePost = async (postId: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        toast.success('Post deleted successfully')
        setPosts(posts.filter(post => post._id !== postId))
      } else {
        toast.error('Failed to delete post')
      }
    } catch (error) {
      toast.error('An error occurred')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    )
  }

  if (!session) {
    return null
  }

  const publishedPosts = posts.filter(post => post.status === 'published')
  const draftPosts = posts.filter(post => post.status === 'draft')
  const totalViews = posts.reduce((sum, post) => sum + post.views, 0)
  const totalLikes = posts.reduce((sum, post) => sum + post.likes, 0)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Link href="/" className="text-2xl font-bold text-primary-600">
                Postify
              </Link>
              <span className="ml-4 text-gray-500">Dashboard</span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Link 
                href={`/${user?.username}`}
                target="_blank"
                className="text-gray-600 hover:text-primary-600 flex items-center"
              >
                <Eye className="h-4 w-4 mr-1" />
                View Blog
              </Link>
              <Link href="/dashboard/settings" className="btn-secondary">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-gray-600">
            Manage your blog posts and track your performance.
          </p>
          {user && (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="col-span-1 md:col-span-2 card">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">Your public blog URL</p>
                    <a href={blogUrl} target="_blank" rel="noreferrer" className="text-lg font-medium text-primary-600 hover:text-primary-700 break-all">
                      {blogUrl}
                    </a>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(blogUrl)
                        toast.success('Copied blog URL')
                      }}
                      className="btn-secondary"
                    >
                      Copy URL
                    </button>
                    <Link href={`/${user.username}`} target="_blank" className="btn-primary">
                      View
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="card"
          >
            <div className="flex items-center">
              <div className="p-2 bg-primary-100 rounded-lg">
                <FileText className="h-6 w-6 text-primary-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Posts</p>
                <p className="text-2xl font-bold text-gray-900">{posts.length}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="card"
          >
            <div className="flex items-center">
              <div className="p-2 bg-green-100 rounded-lg">
                <Eye className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Views</p>
                <p className="text-2xl font-bold text-gray-900">{totalViews}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="card"
          >
            <div className="flex items-center">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Likes</p>
                <p className="text-2xl font-bold text-gray-900">{totalLikes}</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="card"
          >
            <div className="flex items-center">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Posts This Month</p>
                <p className="text-2xl font-bold text-gray-900">
                  {user?.subscription.postsThisMonth || 0}/{user?.subscription.maxPostsPerMonth || 3}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Plan Status */}
        {user?.subscription.plan === 'free' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 mb-8 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full transform translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-10 rounded-full transform -translate-x-12 translate-y-12"></div>
            
            <div className="relative z-10 flex items-center justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <Crown className="h-6 w-6 mr-2" />
                  <h3 className="text-xl font-semibold">Unlock Premium Features!</h3>
                </div>
                <p className="text-blue-100 mb-4">
                  You're on the free plan with 5 posts per month. Upgrade to get unlimited posts, premium themes, and more!
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center">
                    <Sparkles className="h-4 w-4 mr-1" />
                    <span>Unlimited posts</span>
                  </div>
                  <div className="flex items-center">
                    <Sparkles className="h-4 w-4 mr-1" />
                    <span>Premium themes</span>
                  </div>
                  <div className="flex items-center">
                    <Sparkles className="h-4 w-4 mr-1" />
                    <span>Custom domain</span>
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setShowPricingModal(true)}
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-lg flex items-center"
              >
                <Crown className="h-4 w-4 mr-2" />
                Upgrade Now
              </button>
            </div>
          </motion.div>
        )}

        {/* Posts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Create New Post */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="card h-fit">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Post</h3>
              <p className="text-gray-600 mb-6">
                Share your thoughts with the world. Create engaging content for your blog.
              </p>
              <Link href="/dashboard/posts/new" className="btn-primary w-full flex items-center justify-center">
                <Plus className="h-4 w-4 mr-2" />
                Create Post
              </Link>
            </div>
          </motion.div>

          {/* Posts List */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="lg:col-span-2"
          >
            <div className="card">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Your Posts</h3>
                <Link href="/dashboard/posts" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                  View All
                </Link>
              </div>

              {posts.length === 0 ? (
                <div className="text-center py-8">
                  <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-4">No posts yet. Create your first post to get started!</p>
                  <Link href="/dashboard/posts/new" className="btn-primary">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Your First Post
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {posts.slice(0, 5).map((post) => (
                    <div key={post._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow duration-200">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{post.title}</h4>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              post.status === 'published' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {post.status}
                            </span>
                            <span>{post.views} views</span>
                            <span>{post.likes} likes</span>
                            <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <Link 
                            href={`/dashboard/posts/${post._id}/edit`}
                            className="p-2 text-gray-400 hover:text-primary-600 transition-colors duration-200"
                          >
                            <Edit className="h-4 w-4" />
                          </Link>
                          <button
                            onClick={() => handleDeletePost(post._id)}
                            className="p-2 text-gray-400 hover:text-red-600 transition-colors duration-200"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Pricing Modal */}
      <PricingModal
        isOpen={showPricingModal}
        onClose={() => setShowPricingModal(false)}
        onSelectPlan={(plan) => {
          if (plan === 'free') {
            toast.success('You\'re already on the free plan!')
          } else {
            // Redirect to payment for paid plans
            window.location.href = `/api/stripe/create-checkout?plan=${plan}`
          }
        }}
      />
    </div>
  )
}
