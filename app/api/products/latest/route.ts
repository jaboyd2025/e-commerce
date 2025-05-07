import { db } from '@/lib/db'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const products = await db.product.findMany({
      take: 8,
      orderBy: {
        createdAt: 'desc',
      },
      select: {
        id: true,
        name: true,
        price: true,
        images: true,
      },
    })

    return NextResponse.json(products)
  } catch (error) {
    console.error('Error fetching latest products:', error)
    return new NextResponse('Error fetching latest products', { status: 500 })
  }
} 