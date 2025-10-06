import mongoose, { Schema, Document } from 'mongoose'

export interface IUser extends Document {
  _id: string
  username: string
  usernameLocked?: boolean
  email: string
  password: string
  profilePicture?: string
  bannerImage?: string
  bio?: string
  blogTitle?: string
  blogDescription?: string
  customDomain?: string
  theme: {
    primaryColor: string
    backgroundColor: string
    textColor: string
    accentColor: string
  }
  subscription: {
    plan: 'free' | 'basic' | 'premium'
    status: 'active' | 'inactive' | 'cancelled'
    stripeCustomerId?: string
    stripeSubscriptionId?: string
    currentPeriodEnd?: Date
    postsThisMonth: number
    maxPostsPerMonth: number
  }
  createdAt: Date
  updatedAt: Date
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 3,
    maxlength: 30,
    match: /^[a-zA-Z0-9_-]+$/
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  usernameLocked: {
    type: Boolean,
    default: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  profilePicture: {
    type: String,
    default: null
  },
  bannerImage: {
    type: String,
    default: null
  },
  bio: {
    type: String,
    maxlength: 500,
    default: ''
  },
  blogTitle: {
    type: String,
    maxlength: 100,
    default: ''
  },
  blogDescription: {
    type: String,
    maxlength: 500,
    default: ''
  },
  customDomain: {
    type: String,
    default: null
  },
  theme: {
    primaryColor: {
      type: String,
      default: '#3B82F6'
    },
    backgroundColor: {
      type: String,
      default: '#FFFFFF'
    },
    textColor: {
      type: String,
      default: '#1F2937'
    },
    accentColor: {
      type: String,
      default: '#EFF6FF'
    }
  },
  subscription: {
    plan: {
      type: String,
      enum: ['free', 'basic', 'premium'],
      default: 'free'
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'cancelled'],
      default: 'inactive'
    },
    stripeCustomerId: {
      type: String,
      default: null
    },
    stripeSubscriptionId: {
      type: String,
      default: null
    },
    currentPeriodEnd: {
      type: Date,
      default: null
    },
    postsThisMonth: {
      type: Number,
      default: 0
    },
        maxPostsPerMonth: {
          type: Number,
          default: 5 // Free plan limit
        }
  }
}, {
  timestamps: true
})

// Index for efficient username lookups (removed duplicate indexes)

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema)
