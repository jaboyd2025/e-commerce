import { BannerCarousel } from '../components/banner-carousel'
import { LatestProducts } from '../components/latest-products'

export default function HomePage() {
  return (
    <div className="space-y-16">
      <div className="container max-w-7xl py-12">
        <h1 className="text-5xl font-bold">Welcome to E-Commerce</h1>
        <p className="mt-6 text-xl text-muted-foreground">
          Discover amazing products at great prices.
        </p>
      </div>
      
      <div className="container max-w-7xl">
        <BannerCarousel />
      </div>

      <div className="container max-w-7xl">
        <LatestProducts />
      </div>
    </div>
  )
} 