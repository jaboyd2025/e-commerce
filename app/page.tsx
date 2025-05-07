import { BannerCarousel } from './components/banner-carousel'
import { LatestProducts } from './components/latest-products'
import { db } from '@/lib/db'

export default async function HomePage() {
  const products = await db.product.findMany({
    take: 8,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
      stock: true,
    },
  })

  return (
    <main className="space-y-12">
      <BannerCarousel />
      <div className="container">
        <LatestProducts products={products} />
      </div>
    </main>
  )
}
