'use client'

import Image from 'next/image'
import { useState } from 'react'

interface ProductImageProps {
  src: string
  alt: string
  width?: number
  height?: number
}

export function ProductImage({ src, alt, width = 400, height = 400 }: ProductImageProps) {
  const [error, setError] = useState(false)

  return (
    <div className="relative aspect-square w-full overflow-hidden rounded-t-lg">
      <Image
        src={error ? '/images/banner1.jpg' : src}
        alt={alt}
        width={width}
        height={height}
        className="object-cover transition-transform group-hover:scale-105"
        onError={() => setError(true)}
      />
    </div>
  )
} 