'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ProductImage } from '@/components/product-image'
import { useEffect, useState } from 'react'

interface Product {
  id: string
  name: string
  price: number
  images: string[]
  category: {
    name: string
  }
}

interface ProductRelatedProps {
  currentProductId: string
}

const getImageUrl = (imageUrl: string | undefined) => {
  if (!imageUrl) return '/images/banner1.jpg'
  
  // If it's already a full URL, return it
  if (imageUrl.startsWith('http://') || imageUrl.startsWith('https://')) {
    return imageUrl
  }
  
  // Clean the path by removing extra spaces and ensuring proper slashes
  const cleanPath = imageUrl.trim().replace(/\s+/g, '')
  return cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`
}

export function ProductRelated({ currentProductId }: ProductRelatedProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      try {
        const response = await fetch(`/api/products/${currentProductId}/related`)
        if (!response.ok) throw new Error('Failed to fetch related products')
        const data = await response.json()
        setProducts(data)
      } catch (error) {
        console.error('Error fetching related products:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchRelatedProducts()
  }, [currentProductId])

  if (isLoading) {
    return (
      <div className="space-y-8">
        <h2 className="text-2xl font-bold">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="group animate-pulse">
              <CardHeader className="p-0">
                <div className="aspect-square bg-muted" />
              </CardHeader>
              <CardContent className="p-4">
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-4 bg-muted rounded w-1/2" />
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <div className="h-10 bg-muted rounded w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">Related Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="group">
            <CardHeader className="p-0">
              <Link href={`/products/${product.id}`}>
                <ProductImage
                  src={getImageUrl(product.images[0])}
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
              <Button className="w-full">Add to Cart</Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
} 