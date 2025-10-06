import mongoose, { Schema, Document } from 'mongoose'

export interface IPost extends Document {
  _id: string
  title: string
  content: string
  excerpt?: string
  featuredImage?: string
  images?: string[]
  videos?: string[]
  tags: string[]
  status: 'draft' | 'published'
  publishedAt?: Date
  author: mongoose.Types.ObjectId
  lighthouseCID?: string // Lighthouse storage content ID
  views: number
  likes: number
  createdAt: Date
  updatedAt: Date
}

const PostSchema = new Schema<IPost>({
  title: {
    type: String,
    required: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true
  },
  excerpt: {
    type: String,
    maxlength: 500
  },
  featuredImage: {
    type: String,
    default: null
  },
  images: [{
    type: String
  }],
  videos: [{
    type: String
  }],
  tags: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  publishedAt: {
    type: Date,
    default: null
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lighthouseCID: {
    type: String,
    default: null
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

// Index for efficient queries
PostSchema.index({ author: 1, status: 1 })
PostSchema.index({ publishedAt: -1 })
PostSchema.index({ tags: 1 })

// Virtual for URL slug
PostSchema.virtual('slug').get(function() {
  return this.title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '')
})

export default mongoose.models.Post || mongoose.model<IPost>('Post', PostSchema)
