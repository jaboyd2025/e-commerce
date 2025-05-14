import { auth } from '@/auth'
import { prisma } from '@/lib/prisma'
import { Card } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'
import { redirect } from 'next/navigation'

interface PageProps {
  searchParams: { session_id: string }
}

export default async function OrderConfirmationPage({
  searchParams,
}: PageProps) {
  const session = await auth()
  if (!session?.user) {
    redirect('/login')
  }

  const { session_id } = searchParams
  if (!session_id) {
    redirect('/')
  }

  const order = await prisma.order.findFirst({
    where: {
      userId: session.user.id,
      status: 'PENDING',
    },
    include: {
      items: {
        include: {
          product: true,
        },
      },
      shippingAddress: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  if (!order) {
    redirect('/')
  }

  // Update order status to PAID
  await prisma.order.update({
    where: {
      id: order.id,
    },
    data: {
      status: 'PAID',
    },
  })

  return (
    <div className="container mx-auto py-10">
      <Card className="p-6 max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">Thank you for your order!</h1>
          <p className="text-muted-foreground">
            Your order has been successfully placed.
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <div className="space-y-2">
              <p>
                <span className="font-medium">Order ID:</span> {order.id}
              </p>
              <p>
                <span className="font-medium">Date:</span>{' '}
                {new Date(order.createdAt).toLocaleDateString()}
              </p>
              <p>
                <span className="font-medium">Total:</span>{' '}
                {formatPrice(order.total)}
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Shipping Address</h2>
            <div className="space-y-2">
              <p>{order.shippingAddress.address}</p>
              <p>
                {order.shippingAddress.city}, {order.shippingAddress.state}{' '}
                {order.shippingAddress.zipCode}
              </p>
              <p>{order.shippingAddress.country}</p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4">
                  <div className="flex-1">
                    <p className="font-medium">{item.product.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <p className="font-medium">
                    {formatPrice(item.price * item.quantity)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
} 