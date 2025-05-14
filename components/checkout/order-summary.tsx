'use client'

import { Card } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { formatPrice } from '@/lib/utils'
import Image from 'next/image'

interface OrderSummaryProps {
  items: {
    id: string
    name: string
    price: number
    quantity: number
    image: string
  }[]
  total: number
}

export function OrderSummary({ items, total }: OrderSummaryProps) {
  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex items-center gap-4">
            <div className="relative w-16 h-16">
              <Image
                src={item.image}
                alt={item.name}
                fill
                className="object-cover rounded-md"
              />
            </div>
            <div className="flex-1">
              <h3 className="font-medium">{item.name}</h3>
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
      <Separator className="my-6" />
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-muted-foreground">Subtotal</span>
          <span>{formatPrice(total)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Shipping</span>
          <span>Free</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">Tax</span>
          <span>{formatPrice(total * 0.1)}</span>
        </div>
        <Separator className="my-2" />
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>{formatPrice(total + total * 0.1)}</span>
        </div>
      </div>
    </Card>
  )
} 