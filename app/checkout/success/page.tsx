import { redirect } from 'next/navigation'
import { auth } from '@/auth'
import { stripe } from '@/lib/stripe'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

interface PageProps {
  searchParams: { session_id: string }
}

export default async function SuccessPage({ searchParams }: PageProps) {
  const session = await auth()
  if (!session?.user) {
    redirect('/login')
  }

  const { session_id } = searchParams
  if (!session_id) {
    redirect('/')
  }

  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id)
  if (!checkoutSession) {
    redirect('/')
  }

  return (
    <div className="container py-12">
      <div className="max-w-2xl mx-auto text-center space-y-8">
        <div className="flex justify-center">
          <CheckCircle className="h-16 w-16 text-green-500" />
        </div>
        <h1 className="text-3xl font-bold">Thank you for your order!</h1>
        <p className="text-muted-foreground">
          Your order has been confirmed and will be shipped soon.
        </p>
        <div className="space-y-4">
          <p className="font-medium">
            Order ID: {checkoutSession.metadata?.orderId}
          </p>
          <p>
            A confirmation email has been sent to {checkoutSession.customer_email}
          </p>
        </div>
        <div className="flex justify-center gap-4">
          <Button asChild>
            <Link href="/orders">View Orders</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    </div>
  )
} 