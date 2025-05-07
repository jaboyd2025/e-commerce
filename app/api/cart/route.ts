import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import prisma from '@/lib/prisma'
import type { CartItem } from '@/lib/store/cart-store'

export async function GET() {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json({ items: [] })
    }

    const cart = await prisma.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        items: {
          include: {
            product: true
          }
        }
      }
    })

    if (!cart) {
      return NextResponse.json({ items: [] })
    }

    const items = cart.items.map(item => ({
      id: item.product.id,
      name: item.product.name,
      price: item.product.price,
      image: item.product.images[0],
      quantity: item.quantity
    }))

    return NextResponse.json({ items })
  } catch (error) {
    console.error('Error fetching cart:', error)
    return NextResponse.json(
      { error: 'Failed to fetch cart' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth()

    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { items } = await request.json() as { items: CartItem[] }

    if (!Array.isArray(items)) {
      return NextResponse.json(
        { error: 'Invalid request body' },
        { status: 400 }
      )
    }

    // Get or create cart
    let cart = await prisma.cart.findUnique({
      where: { userId: session.user.id }
    })

    if (!cart) {
      cart = await prisma.cart.create({
        data: {
          userId: session.user.id
        }
      })
    }

    // Update cart items
    await prisma.cartItem.deleteMany({
      where: { cartId: cart.id }
    })

    // Create new cart items
    const cartItems = await Promise.all(
      items.map(async (item) => {
        // Verify product exists
        const product = await prisma.product.findUnique({
          where: { id: item.id }
        })

        if (!product) {
          throw new Error(`Product ${item.id} not found`)
        }

        return prisma.cartItem.create({
          data: {
            cartId: cart.id,
            productId: item.id,
            quantity: item.quantity
          }
        })
      })
    )

    return NextResponse.json({ 
      success: true,
      items: cartItems
    })
  } catch (error) {
    console.error('Error updating cart:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update cart' },
      { status: 500 }
    )
  }
} 