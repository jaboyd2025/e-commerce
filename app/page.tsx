import { BannerCarousel } from './components/banner-carousel'
import LatestProducts from './components/latest-products'

export default function HomePage() {
  return (
    <main className="space-y-12">
      <BannerCarousel />
      <div className="container">
        <LatestProducts />
      </div>
    </main>
  )
}
