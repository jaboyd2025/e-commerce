'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Minus, Plus } from 'lucide-react'

interface QuantitySelectorProps {
  initialQuantity?: number
  min?: number
  max?: number
  onQuantityChange?: (quantity: number) => void
}

export function QuantitySelector({
  initialQuantity = 1,
  min = 1,
  max = 99,
  onQuantityChange,
}: QuantitySelectorProps) {
  const [quantity, setQuantity] = useState(initialQuantity)

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity >= min && newQuantity <= max) {
      setQuantity(newQuantity)
      onQuantityChange?.(newQuantity)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value)
    if (!isNaN(value)) {
      handleQuantityChange(value)
    }
  }

  return (
    <div className="flex items-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleQuantityChange(quantity - 1)}
        disabled={quantity <= min}
      >
        <Minus className="h-4 w-4" />
      </Button>
      <Input
        type="number"
        min={min}
        max={max}
        value={quantity}
        onChange={handleInputChange}
        className="w-16 text-center"
      />
      <Button
        variant="outline"
        size="icon"
        onClick={() => handleQuantityChange(quantity + 1)}
        disabled={quantity >= max}
      >
        <Plus className="h-4 w-4" />
      </Button>
    </div>
  )
} 