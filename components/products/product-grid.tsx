'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ProductImage } from '@/components/product-image'
import { QuantitySelector } from '@/components/products/quantity-selector'
import { StockStatus } from '@/components/products/stock-status'
import { useState } from 'react'

interface Product {
  id: string
  name: string
  price: number
  images: string[]
  stock: number
  category: {
    name: string
  }
}

interface ProductGridProps {
  products: Product[]
}

const getImageUrl = (images: string[] | string | null | undefined) => {
  if (!images) return '/images/banner1.jpg'
  let url = Array.isArray(images) ? images[0] : images
  if (!url) return '/images/banner1.jpg'
  if (url.startsWith('http')) return url
  const cleanPath = url.trim().replace(/\s+/g, '')
  if (cleanPath.startsWith('/images/')) return cleanPath
  if (cleanPath.startsWith('/')) return cleanPath
  return `/images/${cleanPath}`
}

export function ProductGrid({ products }: ProductGridProps) {
  const [quantities, setQuantities] = useState<Record<string, number>>({})

  const handleQuantityChange = (productId: string, quantity: number) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: quantity
    }))
  }

  if (!products.length) {
    return (
      <div className="text-center py-10">
        <p className="text-muted-foreground">No products found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <Card key={product.id} className="overflow-hidden">
          <Link href={`/products/${product.id}`}>
            <CardHeader className="p-0">
              <div className="aspect-square relative">
                <ProductImage
                  src={getImageUrl(product.images)}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
            </CardHeader>
          </Link>
          <CardContent className="p-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-semibold hover:underline">{product.name}</h3>
                </Link>
                <StockStatus stock={product.stock} />
              </div>
              <p className="text-sm text-muted-foreground">
                {product.category.name}
              </p>
              <p className="font-semibold">${product.price.toFixed(2)}</p>
            </div>
          </CardContent>
          <CardFooter className="p-4 pt-0">
            <div className="w-full space-y-4">
              <QuantitySelector
                initialQuantity={quantities[product.id] || 1}
                onQuantityChange={(quantity) => handleQuantityChange(product.id, quantity)}
                max={product.stock}
              />
              <Button 
                className="w-full" 
                disabled={product.stock <= 0}
              >
                {product.stock <= 0 ? 'Out of Stock' : 'Add to Cart'}
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
} 