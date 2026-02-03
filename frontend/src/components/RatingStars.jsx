import { Star } from 'lucide-react'

export default function RatingStars({ rating, size = 20, showNumber = true }) {
    const fullStars = Math.floor(rating)
    const hasHalfStar = rating % 1 >= 0.5
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0)

    return (
        <div className="flex items-center space-x-1 rtl:space-x-reverse">
            {/* Full Stars */}
            {[...Array(fullStars)].map((_, i) => (
                <Star key={`full-${i}`} size={size} className="fill-yellow-400 text-yellow-400" />
            ))}

            {/* Half Star */}
            {hasHalfStar && (
                <div className="relative">
                    <Star size={size} className="text-gray-400" />
                    <div className="absolute top-0 left-0 overflow-hidden w-1/2">
                        <Star size={size} className="fill-yellow-400 text-yellow-400" />
                    </div>
                </div>
            )}

            {/* Empty Stars */}
            {[...Array(emptyStars)].map((_, i) => (
                <Star key={`empty-${i}`} size={size} className="text-gray-400" />
            ))}

            {/* Rating Number */}
            {showNumber && (
                <span className="text-white/80 font-semibold ml-2 rtl:mr-2">
                    {rating.toFixed(1)}
                </span>
            )}
        </div>
    )
}
