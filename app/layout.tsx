import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Postify - Create Your Custom Blog',
  description: 'Create and customize your own blog page. Share your thoughts with the world through Postify.',
  keywords: ['blog', 'custom blog', 'blogging platform', 'content creation'],
  authors: [{ name: 'Postify Team' }],
  openGraph: {
    title: 'Postify - Create Your Custom Blog',
    description: 'Create and customize your own blog page. Share your thoughts with the world through Postify.',
    type: 'website',
    locale: 'en_US',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster 
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
              },
            }}
          />
        </Providers>
      </body>
    </html>
  )
}
