'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { useState, useEffect } from 'react'

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
  const selectedCategories = searchParams.get('categories')?.split(',') || []
  const minPrice = searchParams.get('minPrice') ? parseInt(searchParams.get('minPrice')!) : 0
  const maxPrice = searchParams.get('maxPrice') ? parseInt(searchParams.get('maxPrice')!) : 1000

  // Local state for form values
  const [priceRange, setPriceRange] = useState<number[]>([minPrice, maxPrice])
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<string[]>(selectedCategories)

  // Update local state when URL params change
  useEffect(() => {
    setPriceRange([minPrice, maxPrice])
    setSelectedCategoryIds(selectedCategories)
  }, [minPrice, maxPrice, selectedCategories])

  const handleCategoryChange = (categoryId: string) => {
    const newSelectedCategories = selectedCategoryIds.includes(categoryId)
      ? selectedCategoryIds.filter(id => id !== categoryId)
      : [...selectedCategoryIds, categoryId]
    
    setSelectedCategoryIds(newSelectedCategories)
    updateFilters({ categories: newSelectedCategories })
  }

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value)
  }

  const handlePriceChangeEnd = (value: number[]) => {
    updateFilters({
      minPrice: value[0].toString(),
      maxPrice: value[1].toString(),
    })
  }

  const updateFilters = (updates: {
    categories?: string[]
    minPrice?: string
    maxPrice?: string
  }) => {
    const params = new URLSearchParams(searchParams.toString())
    
    if (updates.categories !== undefined) {
      if (updates.categories.length > 0) {
        params.set('categories', updates.categories.join(','))
      } else {
        params.delete('categories')
      }
    }
    
    if (updates.minPrice !== undefined) {
      if (updates.minPrice) {
        params.set('minPrice', updates.minPrice)
      } else {
        params.delete('minPrice')
      }
    }
    
    if (updates.maxPrice !== undefined) {
      if (updates.maxPrice) {
        params.set('maxPrice', updates.maxPrice)
      } else {
        params.delete('maxPrice')
      }
    }

    router.push(`/products?${params.toString()}`)
  }

  return (
    <div className="space-y-6">
      <Card className="p-4">
        <h3 className="font-semibold mb-4">Categories</h3>
        <div className="space-y-3">
          {categories.map((category) => (
            <div key={category.id} className="flex items-center space-x-2">
              <Checkbox
                id={category.id}
                checked={selectedCategoryIds.includes(category.id)}
                onCheckedChange={() => handleCategoryChange(category.id)}
              />
              <Label htmlFor={category.id}>{category.name}</Label>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-4">
        <h3 className="font-semibold mb-4">Price Range</h3>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
            <Slider
              defaultValue={[0, 1000]}
              max={1000}
              step={10}
              value={priceRange}
              onValueChange={handlePriceChange}
              onValueCommit={handlePriceChangeEnd}
              className="py-4"
            />
          </div>
        </div>
      </Card>
    </div>
  )
} 