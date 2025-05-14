'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ProductImage } from '@/components/product-image'
import { ProductCard } from './products/product-card'

interface Product {
  id: string
  name: string
  price: number
  images: string[]
  stock: number
}

interface LatestProductsProps {
  products: Product[]
}

export function LatestProducts({ products }: LatestProductsProps) {
  if (!products.length) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Latest Products</h2>
        </div>
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground">
            No products available at the moment.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Latest Products</h2>
        <Button variant="outline" asChild>
          <Link href="/products">View All</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
} 