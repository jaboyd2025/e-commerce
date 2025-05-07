'use client'

import Image from 'next/image'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface ProductImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  fill?: boolean
  className?: string
}

export function ProductImage({ 
  src, 
  alt, 
  width = 400, 
  height = 400,
  fill,
  className 
}: ProductImageProps) {
  const [error, setError] = useState(false)

  const imageProps = fill ? {
    fill: true,
    sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
  } : {
    width,
    height
  }

  return (
    <div className={cn('relative overflow-hidden', className)}>
      <Image
        src={error ? '/images/banner1.jpg' : src}
        alt={alt}
        {...imageProps}
        className={cn(
          'object-cover transition-transform group-hover:scale-105',
          fill ? 'absolute inset-0' : ''
        )}
        onError={() => setError(true)}
      />
    </div>
  )
} 