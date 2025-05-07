'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ProductImage } from '@/components/product-image'
import { QuantitySelector } from '@/components/products/quantity-selector'
import { useCartStore } from '@/lib/store/cart-store'
import { toast } from 'sonner'
import { Trash2 } from 'lucide-react'

interface CartItemProps {
  item: {
    id: string
    name: string
    price: number
    image: string
    quantity: number
  }
}

export function CartItem({ item }: CartItemProps) {
  const { removeItem, updateQuantity } = useCartStore()

  const handleQuantityChange = (quantity: number) => {
    updateQuantity(item.id, quantity)
  }

  const handleRemove = () => {
    removeItem(item.id)
    toast.success('Item removed from cart')
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="relative h-24 w-24 flex-shrink-0">
            <ProductImage
              src={item.image}
              alt={item.name}
              className="rounded-md object-cover"
            />
          </div>
          <div className="flex flex-1 flex-col">
            <div className="flex justify-between">
              <h3 className="font-medium">{item.name}</h3>
              <p className="font-medium">${item.price.toFixed(2)}</p>
            </div>
            <div className="mt-4 flex items-center justify-between">
              <QuantitySelector
                initialQuantity={item.quantity}
                onQuantityChange={handleQuantityChange}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={handleRemove}
                className="text-destructive hover:text-destructive/90"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 