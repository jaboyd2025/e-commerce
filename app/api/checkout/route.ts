import { NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { formatAmountForStripe } from '@/lib/stripe'
import { auth } from '@/auth'

export async function POST(req: Request) {
  try {
    console.log('Checkout API: Starting request processing')
    const session = await auth()
    if (!session?.user) {
      console.log('Checkout API: Unauthorized - No user session')
      return new NextResponse('Unauthorized', { status: 401 })
    }

    const body = await req.json()
    console.log('Checkout API: Request body:', body)
    const { items } = body

    if (!items?.length) {
      console.log('Checkout API: No items provided')
      return new NextResponse('Items are required', { status: 400 })
    }

    // Create line items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.name,
          images: [item.image],
        },
        unit_amount: formatAmountForStripe(item.price, 'USD'),
      },
      quantity: item.quantity,
    }))

    console.log('Checkout API: Creating Stripe session with line items:', lineItems)

    // Create Stripe checkout session
    const stripeSession = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/cart`,
      customer_email: session.user.email!,
      shipping_address_collection: {
        allowed_countries: ['US', 'CA'], // Add more countries as needed
      },
      metadata: {
        userId: session.user.id,
        orderId: `order_${Date.now()}`,
      },
    })

    console.log('Checkout API: Stripe session created:', stripeSession.id)

    return NextResponse.json({ sessionId: stripeSession.id })
  } catch (error) {
    console.error('Checkout API: Error:', error)
    return new NextResponse(
      error instanceof Error ? error.message : 'Internal error',
      { status: 500 }
    )
  }
} 