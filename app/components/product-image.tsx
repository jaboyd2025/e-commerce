'use client'

import Image from 'next/image'

interface ProductImageProps {
  src: string
  alt: string
}

export function ProductImage({ src, alt }: ProductImageProps) {
  return (
    <div className="relative aspect-square overflow-hidden">
      <Image
        src={src}
        alt={alt}
        fill
        className="object-contain"
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
        priority={true}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.src = '/images/banner1.jpg';
        }}
      />
    </div>
  )
} 