import { db } from '@/lib/db'
import { notFound } from 'next/navigation'
import { format } from 'date-fns'
import { ProductRelated } from '@/components/products/product-related'
import { ImageGallery } from '@/components/products/image-gallery'
import { ReviewForm } from '@/components/products/review-form'
import { StockStatus } from '@/components/products/stock-status'
import { AddToCartSection } from '@/app/components/products/add-to-cart-section'
import { auth } from '@/auth'

interface PageProps {
  params: Promise<{ id: string }>
}

interface Review {
  id: string
  comment: string | null
  rating: number
  createdAt: Date
  user: {
    name: string | null
    image: string | null
  }
}

export default async function ProductPage(props: PageProps) {
  const { id } = await props.params
  const session = await auth()

  const product = await db.product.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      images: true,
      stock: true,
      category: {
        select: {
          name: true
        }
      },
      reviews: {
        include: {
          user: {
            select: {
              name: true,
              image: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      },
    },
  })

  if (!product) {
    notFound()
  }

  // Calculate average rating
  const averageRating = product.reviews.length
    ? product.reviews.reduce((acc: number, review: Review) => acc + review.rating, 0) / product.reviews.length
    : 0

  return (
    <div className="container py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Image Gallery Section */}
        <div className="space-y-4">
          <ImageGallery images={product.images} name={product.name} />
        </div>

        {/* Product Information Section */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h1 className="text-3xl font-bold">{product.name}</h1>
              <StockStatus stock={product.stock} />
            </div>
            <p className="text-2xl font-semibold mt-2">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Description</h2>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Category</h2>
            <p className="text-muted-foreground">{product.category.name}</p>
          </div>

          {/* Add to Cart Section */}
          <AddToCartSection product={product} />
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mt-16 space-y-8">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Reviews</h2>
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold">{averageRating.toFixed(1)}</span>
            <span className="text-muted-foreground">
              ({product.reviews.length} reviews)
            </span>
          </div>
        </div>

        {session?.user && (
          <div className="border rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Write a Review</h3>
            <ReviewForm productId={product.id} />
          </div>
        )}

        <div className="space-y-8">
          {product.reviews.map((review: Review) => (
            <div key={review.id} className="space-y-4">
              <div className="flex items-center space-x-4">
                <div className="h-10 w-10 rounded-full bg-muted" />
                <div>
                  <p className="font-medium">{review.user.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(review.createdAt), 'MMMM d, yyyy')}
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-16">
        <ProductRelated currentProductId={product.id} />
      </div>
    </div>
  )
} 