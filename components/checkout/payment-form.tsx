'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/hooks/use-toast'
import { useCart } from '@/hooks/use-cart'

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

const paymentFormSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
})

type PaymentFormValues = z.infer<typeof paymentFormSchema>

interface PaymentFormProps {
  shippingData: {
    address: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  onBack: () => void
}

export function PaymentForm({ shippingData, onBack }: PaymentFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { items, total, clearCart } = useCart()
  const [isProcessing, setIsProcessing] = useState(false)

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      name: '',
      email: '',
    },
  })

  const handleSubmit = async (data: PaymentFormValues) => {
    try {
      setIsProcessing(true)

      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          items,
          shippingData,
          customerData: data,
        }),
      })

      if (!response.ok) {
        throw new Error('Payment failed')
      }

      const { sessionId } = await response.json()

      // Redirect to Stripe Checkout
      const stripe = await stripePromise
      const { error } = await stripe!.redirectToCheckout({
        sessionId,
      })

      if (error) {
        throw error
      }

      // Clear cart and show success message
      clearCart()
      toast({
        title: 'Order placed successfully!',
        description: 'Thank you for your purchase.',
      })

      // Redirect to order confirmation page
      router.push('/order-confirmation')
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Something went wrong. Please try again.',
        variant: 'destructive',
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Enter your email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="flex-1"
          >
            Back
          </Button>
          <Button
            type="submit"
            className="flex-1"
            disabled={isProcessing}
          >
            {isProcessing ? 'Processing...' : 'Place Order'}
          </Button>
        </div>
      </form>
    </Form>
  )
} 