import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/Providers'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Postify - Decentralized Blog Platform on Filecoin',
  description: 'Create and customize your own blog page powered by Filecoin Onchain Cloud. Decentralized storage, payments, and content delivery for the future of blogging.',
  keywords: ['blog', 'decentralized blog', 'filecoin', 'web3', 'blockchain', 'content creation', 'decentralized storage'],
  authors: [{ name: 'Postify Team' }],
  icons: {
    icon: '/favicon.ico',
  },
  openGraph: {
    title: 'Postify - Decentralized Blog Platform on Filecoin',
    description: 'Create and customize your own blog page powered by Filecoin Onchain Cloud. Decentralized storage, payments, and content delivery for the future of blogging.',
    type: 'website',
    locale: 'en_US',
  },
  metadataBase: process.env.NEXT_PUBLIC_APP_URL ? new URL(process.env.NEXT_PUBLIC_APP_URL) : undefined,
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
