'use client'

import Image from 'next/image'

interface ProductImageProps {
  src: string
  alt: string
  className?: string
}

const cleanImagePath = (path: string) => {
  if (!path) return '/images/placeholder.jpg'
  const cleaned = path.trim().replace(/^\s+|\s+$/g, '')
  return cleaned.startsWith('/') ? cleaned : `/${cleaned}`
}

export function ProductImage({ src, alt, className }: ProductImageProps) {
  const imagePath = cleanImagePath(src)

  return (
    <div className="relative aspect-square overflow-hidden">
      <Image
        src={imagePath}
        alt={alt}
        fill
        className={`object-contain ${className || ''}`}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        priority={true}
        onError={(e) => {
          const target = e.target as HTMLImageElement
          target.src = '/images/placeholder.jpg'
        }}
      />
    </div>
  )
} 