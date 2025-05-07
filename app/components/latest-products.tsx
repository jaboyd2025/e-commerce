import { db } from '@/lib/db'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ProductImage } from './product-image'

interface Product {
  id: string
  name: string
  price: number
  images: string[]
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

export default async function LatestProducts() {
  const products: Product[] = await db.product.findMany({
    take: 8,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
    },
  })

  if (!products.length) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-3xl font-bold">Latest Products</h2>
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
        <h2 className="text-3xl font-bold">Latest Products</h2>
        <Button variant="outline" asChild>
          <Link href="/products">View All</Link>
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product: Product) => (
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