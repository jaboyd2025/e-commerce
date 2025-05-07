'use client'

import * as React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'
import { Card } from '@/components/ui/card'

const banners = [
  {
    id: 1,
    title: 'Summer Sale',
    description: 'Up to 50% off on selected items',
    image: '/images/banner1.jpg',
  },
  {
    id: 2,
    title: 'New Arrivals',
    description: 'Check out our latest collection',
    image: '/images/banner2.jpg',
  },
  {
    id: 3,
    title: 'Special Offers',
    description: 'Limited time deals you don\'t want to miss',
    image: '/images/banner3.jpg',
  },
]

export function BannerCarousel() {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <Carousel className="w-full">
      <CarouselContent>
        {banners.map((banner) => (
          <CarouselItem key={banner.id}>
            <Card className="relative h-[600px] overflow-hidden">
              <Image
                src={banner.image}
                alt={banner.title}
                fill
                className="object-contain"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 p-8 text-white">
                <h2 className="text-4xl font-bold">{banner.title}</h2>
                <p className="mt-4 text-xl">{banner.description}</p>
              </div>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-6" />
      <CarouselNext className="right-6" />
    </Carousel>
  )
} 