'use client'

import Link from 'next/link'
import { Search, User } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useSession, signOut } from 'next-auth/react'
import { CartDrawer } from '@/app/components/cart/cart-drawer'

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">Fashion Frontier</span>
          </Link>
          <Link href="/products" className="mr-6 flex items-center space-x-2 text-sm font-medium transition-colors hover:text-foreground/80">
            Products
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            <Link href="/categories" className="transition-colors hover:text-foreground/80">
              Categories
            </Link>
          </nav>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <div className="w-full flex-1 md:w-auto md:flex-none">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[300px]"
              />
            </div>
          </div>
          <nav className="flex items-center space-x-2">
            <CartDrawer />
            {session ? (
              <div className="flex items-center space-x-2">
                <Link href="/dashboard">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Dashboard</span>
                  </Button>
                </Link>
                <Button
                  variant="ghost"
                  onClick={() => signOut()}
                >
                  Sign Out
                </Button>
              </div>
            ) : (
              <Link href="/auth/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
} 