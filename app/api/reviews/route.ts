import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { auth } from '@/auth'

export async function POST(req: Request) {
  try {
    const session = await auth()

    if (!session?.user) {
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    const { productId, rating, content } = body

    if (!productId || !rating || !content) {
      return new NextResponse('Missing required fields', { status: 400 })
    }

    // Check if user has already reviewed this product
    const existingReview = await db.review.findFirst({
      where: {
        productId,
        userId: session.user.id,
      },
    })

    if (existingReview) {
      return new NextResponse('You have already reviewed this product', { status: 400 })
    }

    // Create the review
    const review = await db.review.create({
      data: {
        rating,
        comment: content,
        productId,
        userId: session.user.id,
      },
    })

    return NextResponse.json(review)
  } catch (error) {
    console.error('[REVIEWS_POST]', error)
    return new NextResponse('Internal error', { status: 500 })
  }
} 