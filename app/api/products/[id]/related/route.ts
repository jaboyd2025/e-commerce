import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // First, get the product to find its category
    const product = await db.product.findUnique({
      where: { id },
      select: { categoryId: true },
    })

    if (!product) {
      return new NextResponse('Product not found', { status: 404 })
    }

    // Fetch related products from the same category
    const relatedProducts = await db.product.findMany({
      where: {
        categoryId: product.categoryId,
        id: { not: id }, // Exclude the current product
      },
      take: 4,
      select: {
        id: true,
        name: true,
        price: true,
        images: true,
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return NextResponse.json(relatedProducts)
  } catch (error) {
    console.error('[RELATED_PRODUCTS_GET]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 