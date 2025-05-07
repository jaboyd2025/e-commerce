'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ProductImage } from '@/components/product-image'
import { QuantitySelector } from '@/components/products/quantity-selector'
import { useState } from 'react'
import { useCartStore } from '@/lib/store/cart-store'
import { toast } from 'sonner'
import { useSession } from 'next-auth/react'

interface Product {
  id: string
  name: string
  price: number
  images: string[]
  stock: number
}

interface ProductCardProps {
  product: Product
}

const cleanImagePath = (path: string) => {
  if (!path) return '/images/placeholder.jpg'
  return path.trim().replace(/^\s+|\s+$/g, '')
}

export function ProductCard({ product }: ProductCardProps) {
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const addItem = useCartStore((state) => state.addItem)
  const { data: session } = useSession()

  const handleAddToCart = async () => {
    try {
      setIsLoading(true)
      const item = {
        id: product.id,
        name: product.name,
        price: product.price,
        image: cleanImagePath(product.images[0]),
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
    <Card className="group">
      <CardHeader className="p-0">
        <Link href={`/products/${product.id}`}>
          <ProductImage
            src={cleanImagePath(product.images[0])}
            alt={product.name}
          />
        </Link>
      </CardHeader>
      <CardContent className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-semibold line-clamp-1">{product.name}</h3>
        </Link>
        <p className="text-lg font-bold mt-2">
          ${product.price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <div className="w-full space-y-4">
          <QuantitySelector
            initialQuantity={1}
            max={product.stock}
            onQuantityChange={setQuantity}
          />
          <Button
            className="w-full"
            onClick={handleAddToCart}
            disabled={product.stock <= 0 || isLoading}
          >
            {isLoading ? 'Adding...' : product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
} 