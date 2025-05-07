'use client'

import { useState } from 'react'
import Image from 'next/image'
import { cn } from '@/lib/utils'

interface ImageGalleryProps {
  images: string[]
  name: string
}

export function ImageGallery({ images, name }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(images[0])

  const getImageUrl = (url: string | null) => {
    if (!url) return '/placeholder.png'
    if (url.startsWith('http')) return url
    // Clean the path by removing extra spaces and ensuring proper slashes
    const cleanPath = url.trim().replace(/\s+/g, '')
    return cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-square relative rounded-lg overflow-hidden">
        <Image
          src={getImageUrl(selectedImage)}
          alt={name}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 gap-4">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(image)}
              className={cn(
                'aspect-square relative rounded-lg overflow-hidden',
                selectedImage === image && 'ring-2 ring-primary'
              )}
            >
              <Image
                src={getImageUrl(image)}
                alt={`${name} - Image ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
} 