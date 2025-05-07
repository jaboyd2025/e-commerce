'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Checkbox } from '@/components/ui/checkbox'
import { Slider } from '@/components/ui/slider'
import { useEffect, useState, useCallback } from 'react'
import { Label } from '@/components/ui/label'

interface Category {
  id: string
  name: string
}

interface SidebarProps {
  categories: Category[]
}

export function Sidebar({ categories }: SidebarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Get current filter values from URL
  const currentCategories = searchParams.get('categories')?.split(',') || []
  const minPrice = parseInt(searchParams.get('minPrice') || '0')
  const maxPrice = parseInt(searchParams.get('maxPrice') || '1000')

  // Local state for price range
  const [priceRange, setPriceRange] = useState<number[]>([minPrice, maxPrice])

  // Update local state when URL params change
  useEffect(() => {
    setPriceRange([minPrice, maxPrice])
  }, [minPrice, maxPrice])

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString()
    },
    [searchParams]
  )

  const updateFilters = (updates: Record<string, string | string[]>) => {
    const params = new URLSearchParams(searchParams.toString())
    
    // Update or remove each parameter
    Object.entries(updates).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        if (value.length > 0) {
          params.set(key, value.join(','))
        } else {
          params.delete(key)
        }
      } else {
        if (value) {
          params.set(key, value)
        } else {
          params.delete(key)
        }
      }
    })

    // Reset to page 1 when filters change
    params.set('page', '1')
    
    router.push(`/products?${params.toString()}`)
  }

  const handleCategoryChange = (categoryId: string) => {
    const newQueryString = createQueryString('category', categoryId)
    router.push(`/products?${newQueryString}`)
  }

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value)
  }

  const handlePriceChangeEnd = (value: number[]) => {
    updateFilters({
      minPrice: value[0].toString(),
      maxPrice: value[1].toString()
    })
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={searchParams.get('category') === category.id}
                onCheckedChange={() => handleCategoryChange(category.id)}
              />
              <Label htmlFor={category.id}>{category.name}</Label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <div className="space-y-4">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
          <Slider
            min={0}
            max={1000}
            step={10}
            value={priceRange}
            onValueChange={handlePriceChange}
            onValueCommit={handlePriceChangeEnd}
          />
        </div>
      </div>
    </div>
  )
} 