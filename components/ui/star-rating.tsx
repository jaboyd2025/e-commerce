'use client'

import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  value: number
  onChange: (value: number) => void
  className?: string
}

export function StarRating({ value, onChange, className }: StarRatingProps) {
  return (
    <div className={cn('flex items-center gap-1', className)}>
      {[1, 2, 3, 4, 5].map((rating) => (
        <button
          key={rating}
          type="button"
          onClick={() => onChange(rating)}
          className="focus:outline-none"
        >
          <Star
            className={cn(
              'h-6 w-6 transition-colors',
              rating <= value
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            )}
          />
        </button>
      ))}
    </div>
  )
} 