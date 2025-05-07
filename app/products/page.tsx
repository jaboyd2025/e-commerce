import { db } from '@/lib/db'
import { Sidebar } from '@/components/products/sidebar'
import { ProductGrid } from '@/components/products/product-grid'
import { Pagination } from '@/components/products/pagination'

interface PageProps {
  searchParams: Promise<{
    page?: string
    category?: string
    minPrice?: string
    maxPrice?: string
  }>
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams
  const currentPage = Number(params.page) || 1
  const itemsPerPage = 9

  // Build the where clause based on filters
  const where: any = {}
  
  if (params.category) {
    where.categoryId = params.category
  }
  
  if (params.minPrice || params.maxPrice) {
    where.price = {}
    if (params.minPrice) {
      where.price.gte = Number(params.minPrice)
    }
    if (params.maxPrice) {
      where.price.lte = Number(params.maxPrice)
    }
  }

  // Get total count for pagination
  const totalItems = await db.product.count({ where })
  const totalPages = Math.ceil(totalItems / itemsPerPage)

  // Get products with pagination and filters
  const products = await db.product.findMany({
    where,
    take: itemsPerPage,
    skip: (currentPage - 1) * itemsPerPage,
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
      stock: true,
      category: {
        select: {
          name: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  // Get all categories for the sidebar
  const allCategories = await db.category.findMany({
    orderBy: {
      name: 'asc'
    }
  })

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-8">Products</h1>
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
    </div>
  )
} 