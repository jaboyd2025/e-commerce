'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/store/cart-store'
import { getStripe } from '@/lib/stripe'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface CheckoutButtonProps {
  className?: string
}

export function CheckoutButton({ className }: CheckoutButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const items = useCartStore((state) => state.items)
  const router = useRouter()

  const handleCheckout = async () => {
    try {
      setIsLoading(true)
      console.log('Starting checkout process...')
      console.log('Cart items:', items)

      if (!items.length) {
        toast.error('Your cart is empty')
        return
      }

      console.log('Creating checkout session...')
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
        }),
      })

      console.log('Checkout response status:', response.status)
      const data = await response.json()
      console.log('Checkout response data:', data)

      if (!response.ok) {
        throw new Error('Failed to create checkout session')
      }

      const { sessionId } = data
      console.log('Got session ID:', sessionId)

      console.log('Loading Stripe...')
      const stripe = await getStripe()
      
      if (!stripe) {
        throw new Error('Failed to load Stripe')
      }

      console.log('Redirecting to Stripe checkout...')
      const { error } = await stripe.redirectToCheckout({
        sessionId,
      })

      if (error) {
        console.error('Stripe redirect error:', error)
        throw error
      }
    } catch (error) {
      console.error('Error in checkout:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleCheckout}
      disabled={isLoading || !items.length}
      className={className}
    >
      {isLoading ? 'Processing...' : 'Checkout'}
    </Button>
  )
} 