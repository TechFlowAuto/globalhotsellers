'use client'

import { Star, ShoppingCart, ExternalLink, TrendingUp, Flame, Info } from 'lucide-react'
import Link from 'next/link'

interface Product {
  id: string
  title: string
  description: string
  price: string
  originalPrice?: string
  imageUrl: string
  platform: string
  category: string
  rating: number
  reviewCount: number
  badge?: 'hot' | 'trending' | 'new'
  affiliateUrl: string
  source: string
}

const platformColors: Record<string, string> = {
  Amazon: 'bg-orange-100 text-orange-700',
  eBay: 'bg-blue-100 text-blue-700',
  AliExpress: 'bg-red-100 text-red-700',
  Walmart: 'bg-blue-100 text-blue-800',
  Etsy: 'bg-orange-100 text-orange-800',
}

const badgeConfig = {
  hot: { icon: Flame, text: 'HOT', className: 'bg-red-500 text-white' },
  trending: { icon: TrendingUp, text: 'TRENDING', className: 'bg-blue-500 text-white' },
  new: { icon: TrendingUp, text: 'NEW', className: 'bg-green-500 text-white' },
}

export default function ProductCard({ product }: { product: Product }) {
  const BadgeIcon = product.badge ? badgeConfig[product.badge].icon : null

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-gray-100">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        
        {/* Badge */}
        {product.badge && (
          <div className="absolute top-3 left-3">
            <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-bold ${badgeConfig[product.badge].className}`}>
              {BadgeIcon && <BadgeIcon className="w-3 h-3" />}
              <span>{badgeConfig[product.badge].text}</span>
            </span>
          </div>
        )}

        {/* Platform Badge */}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-semibold ${platformColors[product.platform] || 'bg-gray-100 text-gray-700'}`}>
            {product.platform}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <Link href={`/product/${product.id}`} className="group/title">
          <h3 className="font-bold text-gray-900 mb-1 line-clamp-2 group-hover/title:text-primary transition-colors">
            {product.title}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center space-x-1 mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3.5 h-3.5 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            ({product.reviewCount.toLocaleString()})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center space-x-2 mb-3">
          <span className="text-xl font-bold text-primary">{product.price}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through">{product.originalPrice}</span>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {product.description}
        </p>

        {/* Source */}
        <p className="text-xs text-gray-400 mb-4 truncate">
          📊 {product.source}
        </p>

        {/* CTA Buttons */}
        <div className="flex gap-2">
          <Link
            href={`/product/${product.id}`}
            className="flex-1 flex items-center justify-center space-x-1 border-2 border-primary text-primary font-semibold py-2.5 px-3 rounded-lg hover:bg-primary hover:text-white transition-all text-sm"
          >
            <Info className="w-3.5 h-3.5" />
            <span>Details</span>
          </Link>
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 flex items-center justify-center space-x-1 bg-primary hover:bg-primary-600 text-white font-semibold py-2.5 px-3 rounded-lg transition-colors text-sm"
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            <span>Buy</span>
            <ExternalLink className="w-3 h-3 opacity-70" />
          </a>
        </div>
      </div>
    </div>
  )
}
