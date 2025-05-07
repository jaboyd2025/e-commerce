'use client'

import { Inter } from 'next/font/google'
import { Providers } from '@/components/providers'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Toaster } from '@/components/ui/sonner'
import { cn } from '@/lib/utils'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(inter.className, 'min-h-screen bg-background font-sans antialiased')}>
        <Providers>
          <div className="relative flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
