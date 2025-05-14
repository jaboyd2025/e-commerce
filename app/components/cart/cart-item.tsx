'use client'

import Image from 'next/image'
import { Minus, Plus, Trash2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/lib/store/cart-store'
import { formatPrice } from '@/lib/utils'
import type { CartItem as CartItemType } from '@/lib/store/cart-store'

interface CartItemProps {
  item: CartItemType
}

export function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCartStore()

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-20 w-20 overflow-hidden rounded-md">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <h3 className="font-medium">{item.name}</h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => removeItem(item.id)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
            >
              <Minus className="h-4 w-4" />
            </Button>
            <span className="w-8 text-center">{item.quantity}</span>
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          <p className="font-medium">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>
      </div>
    </div>
  )
} 