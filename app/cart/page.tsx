'use client'

import { useEffect } from 'react'
import { useCartStore } from '@/lib/store/cart-store'
import { CartItem } from '../components/cart/cart-item'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import { useRouter } from 'next/navigation'

export default function CartPage() {
  const { items, total } = useCartStore()
  const router = useRouter()

  // Sync cart with server when user is authenticated
  useEffect(() => {
    const syncCart = async () => {
      try {
        const response = await fetch('/api/cart')
        if (response.ok) {
          const data = await response.json()
          if (data.items.length > 0) {
            useCartStore.setState({ items: data.items })
          }
        }
      } catch (error) {
        console.error('Error syncing cart:', error)
      }
    }

    syncCart()
  }, [])

  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12">
          <p className="mb-4 text-lg text-muted-foreground">
            Your cart is empty
          </p>
          <Button onClick={() => router.push('/products')}>
            Continue Shopping
          </Button>
        </div>
      ) : (
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>
          </div>
          <div className="lg:col-span-4">
            <div className="rounded-lg border p-6">
              <h2 className="mb-4 text-lg font-semibold">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="mt-4 border-t pt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
                <Button
                  className="mt-6 w-full"
                  onClick={() => router.push('/checkout')}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 