'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { StarRating } from '@/components/ui/star-rating'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

interface ReviewFormProps {
  productId: string
}

export function ReviewForm({ productId }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (rating === 0) {
      toast.error('Rating Required', {
        description: 'Please select a rating before submitting your review.',
      })
      return
    }

    if (!content.trim()) {
      toast.error('Review Required', {
        description: 'Please write your review before submitting.',
      })
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId,
          rating,
          content,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit review')
      }

      toast.success('Review Submitted', {
        description: 'Thank you for your review!',
      })

      // Reset form
      setRating(0)
      setContent('')
      
      // Refresh the page to show the new review
      router.refresh()
    } catch (error) {
      toast.error('Error', {
        description: 'Failed to submit review. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Rating</label>
        <StarRating
          value={rating}
          onChange={setRating}
          className="text-2xl"
        />
      </div>
      <div className="space-y-2">
        <label htmlFor="review" className="text-sm font-medium">
          Your Review
        </label>
        <Textarea
          id="review"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your review here..."
          className="min-h-[100px]"
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </Button>
    </form>
  )
} 