'use client'

import { useEffect } from 'react'
import { useCartStore } from '@/lib/store/cart-store'
import { CartItem } from '@/components/cart/cart-item'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { CheckoutButton } from '@/components/checkout/checkout-button'

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

  if (!items.length) {
    return (
      <div className="container py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
          <p className="text-muted-foreground">Your cart is empty</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <h1 className="text-2xl font-bold mb-8">Your Cart</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
        <div className="lg:col-span-1">
          <div className="bg-card rounded-lg border p-6 space-y-4">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t pt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
            <CheckoutButton className="w-full" />
          </div>
        </div>
      </div>
    </div>
  )
} 