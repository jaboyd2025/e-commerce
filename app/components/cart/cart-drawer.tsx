'use client'

import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useCartStore } from '@/lib/store/cart-store'
import { CartItem } from './cart-item'
import { formatPrice } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { Separator } from '@/components/ui/separator'

export function CartDrawer() {
  const { items } = useCartStore()
  const router = useRouter()

  // Safely calculate total
  const total = Array.isArray(items)
    ? items.reduce((sum, item) => sum + Number(item.price) * Number(item.quantity), 0)
    : 0

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {items.length > 0 && (
            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
              {items.reduce((acc, item) => acc + item.quantity, 0)}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col sm:max-w-lg">
        <SheetHeader className="flex-none">
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="flex h-[calc(100vh-8rem)] flex-col">
          {items.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-muted-foreground">Your cart is empty</p>
            </div>
          ) : (
            <>
              <ScrollArea className="flex-1">
                <div className="space-y-4 p-4">
                  {items.map((item) => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </ScrollArea>
              <div className="flex-none border-t p-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </div>
                <Button
                  className="mt-6 w-full"
                  onClick={() => router.push('/checkout')}
                >
                  Proceed to Checkout
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
} 