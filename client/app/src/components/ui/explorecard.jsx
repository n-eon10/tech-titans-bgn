import React, { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, Link as LinkIcon, ChevronDown, ChevronUp } from 'lucide-react'

const ExploreCard = ({
  name,
  location,
  description,
  rating,
  reviews = [], // Default value to an empty array if reviews is undefined
  category,
  link
}) => {
  const [showReviews, setShowReviews] = useState(false)

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-2xl font-bold">{name}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <MapPin className="w-4 h-4 mr-1" />
              {location}
            </CardDescription>
          </div>
          <Badge variant="secondary">{category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{description}</p>
        <div className="flex items-center mb-4">
          <Star className="w-5 h-5 text-yellow-400 mr-1" />
          {rating !== undefined ? (
            <span className="font-semibold">{rating.toFixed(1)}</span>
          ) : (
            <span className="font-semibold">N/A</span>
          )}
          <span className="text-sm text-gray-600 ml-2">({reviews.length} reviews)</span>
        </div>
        <Button variant="outline" className="w-full" onClick={() => setShowReviews(!showReviews)}>
          {showReviews ? 'Hide Reviews' : 'Show Reviews'}
          {showReviews ? <ChevronUp className="w-4 h-4 ml-2" /> : <ChevronDown className="w-4 h-4 ml-2" />}
        </Button>
        {showReviews && (
          <div className="mt-4 space-y-3">
            {reviews.map((review, index) => (
              <div key={index} className="bg-gray-100 p-3 rounded-md">
                <p className="font-semibold">{review.username}</p>
                <p className="text-sm">{review.review}</p>
              </div>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Button variant="default" className="w-full" asChild>
          <a href={link} target="_blank" rel="noopener noreferrer">
            <LinkIcon className="w-4 h-4 mr-2" />
            Visit Website
          </a>
        </Button>
      </CardFooter>
    </Card>
  )
}

export default ExploreCard;
