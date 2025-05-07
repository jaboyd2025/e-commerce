'use client'

import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'

interface StockStatusProps {
  stock: number
  className?: string
}

export function StockStatus({ stock, className }: StockStatusProps) {
  const getStockStatus = () => {
    if (stock <= 0) {
      return {
        label: 'Out of Stock',
        variant: 'destructive' as const,
      }
    }
    if (stock <= 5) {
      return {
        label: `Low Stock (${stock} left)`,
        variant: 'warning' as const,
      }
    }
    if (stock <= 10) {
      return {
        label: `Limited Stock (${stock} left)`,
        variant: 'secondary' as const,
      }
    }
    return {
      label: 'In Stock',
      variant: 'default' as const,
    }
  }

  const status = getStockStatus()

  return (
    <Badge 
      variant={status.variant} 
      className={cn(
        'text-xs font-medium',
        className
      )}
    >
      {status.label}
    </Badge>
  )
} 