import { db } from '@/lib/db'
import { Sidebar } from '@/components/products/sidebar'
import { ProductGrid } from '@/components/products/product-grid'
import { Pagination } from '@/components/products/pagination'

const ITEMS_PER_PAGE = 9

interface SearchParams {
  categories?: string
  minPrice?: string
  maxPrice?: string
  page?: string
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  // Await search params before using them
  const params = await searchParams

  // Parse search params
  const categories = params.categories?.split(',') || []
  const minPrice = parseFloat(params.minPrice || '0')
  const maxPrice = params.maxPrice ? parseFloat(params.maxPrice) : undefined
  const currentPage = parseInt(params.page || '1')

  // Fetch categories for sidebar
  const allCategories = await db.category.findMany({
    select: {
      id: true,
      name: true,
    },
  })

  // Build the where clause for filtering
  const where = {
    AND: [
      categories.length > 0
        ? { categoryId: { in: categories } }
        : {},
      {
        price: {
          gte: minPrice,
          ...(maxPrice ? { lte: maxPrice } : {}),
        },
      },
    ],
  }

  // Get total count for pagination
  const totalItems = await db.product.count({ where })
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE)

  // Fetch filtered and paginated products
  const products = await db.product.findMany({
    where,
    take: ITEMS_PER_PAGE,
    skip: (currentPage - 1) * ITEMS_PER_PAGE,
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
    },
  })

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <p className="text-muted-foreground">
          Showing {products.length} of {totalItems} products
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <Sidebar categories={allCategories} />
        </aside>
        <div className="md:col-span-3">
          <ProductGrid products={products} />
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
            />
          )}
        </div>
      </div>
    </>
  )
} 