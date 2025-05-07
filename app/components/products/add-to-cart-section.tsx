'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { QuantitySelector } from '@/components/products/quantity-selector'
import { useCartStore } from '@/lib/store/cart-store'
import { toast } from 'sonner'

interface AddToCartSectionProps {
  product: {
    id: string
    name: string
    price: number
    images: string[]
    stock: number
  }
}

export function AddToCartSection({ product }: AddToCartSectionProps) {
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const addItem = useCartStore((state) => state.addItem)

  const handleAddToCart = async () => {
    try {
      setIsLoading(true)
      const item = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0]
      }
      addItem(item, quantity)
      toast.success('Added to cart', {
        description: `${product.name} (${quantity}) has been added to your cart.`
      })
    } catch (error) {
      toast.error('Failed to add to cart', {
        description: 'Please try again.'
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <QuantitySelector
          initialQuantity={1}
          max={product.stock}
          onQuantityChange={setQuantity}
        />
        <Button
          className="flex-1"
          onClick={handleAddToCart}
          disabled={product.stock <= 0 || isLoading}
        >
          {isLoading ? 'Adding...' : product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
        </Button>
      </div>
    </div>
  )
} 