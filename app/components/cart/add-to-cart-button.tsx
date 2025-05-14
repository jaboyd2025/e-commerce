'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/store/cart-store'
import { toast } from 'sonner'
import type { CartItem } from '@/lib/store/cart-store'

interface AddToCartButtonProps {
  product: {
    id: string
    name: string
    price: number
    images: string[]
  }
  quantity?: number
  className?: string
}

export function AddToCartButton({ product, quantity = 1, className }: AddToCartButtonProps) {
  const [isLoading, setIsLoading] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = async () => {
    try {
      setIsLoading(true)
      const item: CartItem = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        quantity
      }
      addItem(item)
      toast.success('Added to cart')
    } catch (error) {
      toast.error('Failed to add to cart')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Button
      onClick={handleAddToCart}
      disabled={isLoading}
      className={className}
    >
      {isLoading ? 'Adding...' : 'Add to Cart'}
    </Button>
  )
} 