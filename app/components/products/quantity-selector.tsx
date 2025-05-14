'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Minus, Plus } from 'lucide-react'

interface QuantitySelectorProps {
  initialQuantity?: number
  max?: number
  onQuantityChange?: (quantity: number) => void
}

export function QuantitySelector({
  initialQuantity = 1,
  max,
  onQuantityChange
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) return
    if (max && newQuantity > max) return
    setQuantity(newQuantity)
    onQuantityChange?.(newQuantity)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (isNaN(value)) return
    handleQuantityChange(value)
  }

  if (!mounted) {
    return (
      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="icon"
          disabled
        >
          <Minus className="h-4 w-4" />
        </Button>
        <Input
          type="number"
          min={1}
          max={max}
          value={initialQuantity}
          readOnly
          className="w-16 text-center"
        />
        <Button
          variant="outline"
          size="icon"
          disabled
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    )
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleQuantityChange(quantity - 1)}
        disabled={quantity <= 1}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        type="number"
        min={1}
        max={max}
        value={quantity}
        onChange={handleInputChange}
        className="w-16 text-center"
      />
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleQuantityChange(quantity + 1)}
        disabled={max ? quantity >= max : false}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
} 