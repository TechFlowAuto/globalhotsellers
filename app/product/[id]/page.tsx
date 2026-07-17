'use client'

import { useParams, useRouter } from 'next/navigation'
import { featuredProducts, type Product } from '@/data/products'
import { Star, ShoppingCart, ExternalLink, ChevronLeft, TrendingUp, Flame, Check, Clock, Battery, Heart, Activity, Zap, Shield } from 'lucide-react'

const badgeConfig = {
  hot: { icon: Flame, text: 'HOT', className: 'bg-red-500 text-white' },
  trending: { icon: TrendingUp, text: 'TRENDING', className: 'bg-blue-500 text-white' },
  new: { icon: TrendingUp, text: 'NEW', className: 'bg-green-500 text-white' },
}

// WHOOP-specific extended details (loaded by product id)
interface ProductDetail {
  features: string[]
  specs: { label: string; value: string }[]
  highlights: { icon: React.ReactNode; text: string }[]
  reviews: { rating: number; text: string; author: string }[]
}

const productDetails: Record<string, ProductDetail> = {
  '9': {
    features: [
      '24/7 heart rate monitoring with optical sensor',
      'Sleep stage tracking (light, deep, REM) with Sleep Score',
      'Daily Strain measurement based on cardiovascular load',
      'Recovery Score combining HRV, resting heart rate, sleep & HR',
      'VO2 Max estimation for cardiovascular fitness',
      'Heart rate zone training (5 zones)',
      "Women's Hormonal Insights for menstrual cycle tracking",
      'Stress Monitor with daily stress score',
      'Health Monitor for respiratory rate, skin temp & SpO2',
      'Haptic alarm that wakes you at optimal sleep stage',
      'Step and activity monitoring',
      '14+ day battery life (single charge)',
      'Water resistant to 10 ATM (100m)',
      'Screen-free design — no distractions, pure data',
    ],
    specs: [
      { label: 'Model', value: 'WHOOP 5.0' },
      { label: 'Battery Life', value: '14+ days' },
      { label: 'Charging', value: 'Basic Charger (wired) included' },
      { label: 'Band Included', value: 'CoreKnit Jet Black Band' },
      { label: 'Device Condition', value: 'Certified Pre-Owned' },
      { label: 'Membership', value: '12 months included' },
      { label: 'Water Resistance', value: '10 ATM (100m)' },
      { label: 'Weight', value: '3.84 oz (109 g)' },
      { label: 'Sensors', value: 'Optical HR, 3-axis accelerometer, gyroscope, thermistor, pulse oximeter' },
      { label: 'Compatibility', value: 'iOS & Android (via Bluetooth 5.0)' },
      { label: 'HSA/FSA', value: 'Eligible' },
      { label: 'Warranty', value: 'Lifetime warranty on device' },
      { label: 'UPC', value: '810114363324' },
    ],
    highlights: [
      { icon: <Battery className="w-5 h-5" />, text: '14+ day battery — charge once every two weeks' },
      { icon: <Heart className="w-5 h-5" />, text: '24/7 health monitoring — HR, HRV, SpO2, skin temp' },
      { icon: <Activity className="w-5 h-5" />, text: 'Personalized coaching based on your body\'s data' },
      { icon: <Zap className="w-5 h-5" />, text: 'Worn by elite athletes — Cristiano Ronaldo, Patrick Mahomes, Ferrari F1' },
      { icon: <Shield className="w-5 h-5" />, text: 'HSA/FSA eligible — pay with health savings funds' },
      { icon: <Clock className="w-5 h-5" />, text: 'Screen-free — no notifications, better focus' },
    ],
    reviews: [
      { rating: 5, text: '"WHOOP completely changed how I understand my body. The recovery score helps me know when to push harder and when to rest."', author: 'Mike R. ⭐⭐⭐⭐⭐' },
      { rating: 4, text: '"Great for tracking sleep patterns and recovery. Battery life is incredible — charge it once and forget about it for two weeks."', author: 'Sarah K. ⭐⭐⭐⭐' },
      { rating: 5, text: '"As a marathon runner, WHOOP gives me insights I never had before. The strain coach feature is a game-changer."', author: 'James L. ⭐⭐⭐⭐⭐' },
      { rating: 4, text: '"The women\'s health tracking is surprisingly detailed. Love that it tracks my cycle alongside training data."', author: 'Emily T. ⭐⭐⭐⭐' },
    ],
  },
}

export default function ProductDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string
  const product = featuredProducts.find((p) => p.id === id)
  const detail = productDetails[id]

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
          <button onClick={() => router.push('/')} className="text-primary font-semibold hover:underline">
            ← Back to Home
          </button>
        </div>
      </div>
    )
  }

  const BadgeIcon = product.badge ? badgeConfig[product.badge].icon : null
  const ratingPercent = product.rating / 5 * 100

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-3">
          <button
            onClick={() => router.push('/')}
            className="flex items-center space-x-1 text-gray-600 hover:text-primary transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Products</span>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* ═══ Main Content ═══ */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Image */}
          <div className="relative">
            <div className="sticky top-8">
              <div className="aspect-square bg-white rounded-2xl shadow-lg overflow-hidden">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-contain p-8"
                />
              </div>

              {/* Badge overlay */}
              {product.badge && (
                <div className="absolute top-4 left-4">
                  <span className={`inline-flex items-center space-x-1 px-4 py-1.5 rounded-full text-sm font-bold shadow-lg ${badgeConfig[product.badge].className}`}>
                    {BadgeIcon && <BadgeIcon className="w-4 h-4" />}
                    <span>{badgeConfig[product.badge].text}</span>
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              {/* Platform */}
              <span className="inline-block bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full mb-4">
                {product.platform}
              </span>

              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.title}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-2 mb-6">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="font-bold text-gray-900">{product.rating}</span>
                <span className="text-gray-500">({product.reviewCount.toLocaleString()} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline space-x-3 mb-6">
                <span className="text-4xl font-bold text-primary">{product.price}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-400 line-through">{product.originalPrice}</span>
                )}
                <span className="text-sm text-green-600 font-semibold bg-green-100 px-2 py-1 rounded">
                  Save ${parseInt(product.originalPrice?.replace(/[$,]/g, '') || '0') - parseInt(product.price.replace(/[$,]/g, '') || '0')}
                </span>
              </div>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                {product.description}
              </p>

              {/* Source */}
              <p className="text-sm text-gray-400 mb-8 flex items-center space-x-2">
                <span>📊</span>
                <span>{product.source}</span>
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <a
                  href={product.affiliateUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center space-x-2 bg-primary hover:bg-primary-600 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md hover:shadow-lg"
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span>View Deal on Amazon</span>
                  <ExternalLink className="w-4 h-4 opacity-70" />
                </a>
              </div>

              {/* Highlights */}
              {detail && (
                <div className="space-y-3 mb-8">
                  <h3 className="font-bold text-gray-900 text-lg mb-4">✨ Why This Product</h3>
                  {detail.highlights.map((h, i) => (
                    <div key={i} className="flex items-start space-x-3">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                        {h.icon}
                      </div>
                      <p className="text-gray-700 pt-2">{h.text}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ═══ Features Section ═══ */}
        {detail && detail.features.length > 0 && (
          <section className="mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">📋 Features & Capabilities</h2>
              <div className="grid md:grid-cols-2 gap-3">
                {detail.features.map((feature, i) => (
                  <div key={i} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══ Specs Section ═══ */}
        {detail && detail.specs.length > 0 && (
          <section className="mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">🔧 Specifications</h2>
              <div className="grid md:grid-cols-2 gap-x-8 gap-y-4">
                {detail.specs.map((spec, i) => (
                  <div key={i} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="text-gray-500 font-medium">{spec.label}</span>
                    <span className="text-gray-900 font-semibold text-right">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══ Reviews Section ═══ */}
        {detail && detail.reviews.length > 0 && (
          <section className="mb-12">
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">⭐ Customer Reviews</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {detail.reviews.map((review, i) => (
                  <div key={i} className="p-6 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="flex items-center mb-3">
                      {[...Array(5)].map((_, j) => (
                        <Star
                          key={j}
                          className={`w-4 h-4 ${
                            j < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-gray-700 italic mb-3">{review.text}</p>
                    <p className="text-sm text-gray-500 font-medium">{review.author}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ═══ Bottom CTA ═══ */}
        <div className="text-center bg-gradient-to-r from-primary to-purple-600 rounded-2xl p-12 shadow-xl">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Health?</h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Join millions of WHOOP users and unlock your body&apos;s full potential. Start your 12-month journey today.
          </p>
          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 bg-white text-primary font-bold px-8 py-4 rounded-xl hover:bg-gray-100 transition-all shadow-lg"
          >
            <ShoppingCart className="w-5 h-5" />
            <span>Buy on Amazon — {product.price}</span>
            <ExternalLink className="w-4 h-4 opacity-60" />
          </a>
        </div>
      </div>
    </div>
  )
}
