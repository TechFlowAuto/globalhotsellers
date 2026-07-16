import HeroSection from '@/components/HeroSection'
import ProductCard from '@/components/ProductCard'
import EmailSubscribe from '@/components/EmailSubscribe'
import { featuredProducts, platforms, categories } from '@/data/products'
import { TrendingUp, Star, Globe, Zap, ChevronRight } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />

      {/* ═══ Categories Section ═══ */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <a
                key={cat.name}
                href="#"
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-full bg-gray-50 hover:bg-primary/5 hover:text-primary border border-gray-200 hover:border-primary/30 transition-all text-gray-700 font-medium"
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
                <span className="text-xs text-gray-400">({cat.count})</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ Featured Products Section ═══ */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-10">
            <div>
              <div className="inline-flex items-center space-x-2 bg-red-100 text-red-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-3">
                <TrendingUp className="w-4 h-4" />
                <span>🔥 Trending Now</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Featured Products
              </h2>
              <p className="text-lg text-gray-600 mt-2">
                The hottest products from around the world, updated daily.
              </p>
            </div>
            <a
              href="#"
              className="hidden md:flex items-center space-x-1 text-primary font-semibold hover:text-primary-600 transition-colors"
            >
              <span>View All</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-10">
            <a
              href="#"
              className="inline-flex items-center space-x-2 bg-white border-2 border-primary text-primary font-semibold px-8 py-3 rounded-lg hover:bg-primary hover:text-white transition-all"
            >
              <span>Load More Products</span>
              <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* ═══ Platform Stats Section ═══ */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Global Platforms We Track
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We monitor millions of products across the world&apos;s largest marketplaces to find the best deals.
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-6 mb-12">
            {platforms.map((p) => (
              <div
                key={p.name}
                className={`${p.bg} rounded-xl p-6 text-center hover:shadow-lg transition-shadow`}
              >
                <div className="text-2xl font-bold mb-2" style={{ color: p.color }}>
                  {p.name}
                </div>
                <div className="text-sm text-gray-600">
                  Real-time product tracking
                </div>
              </div>
            ))}
          </div>

          {/* How It Works */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <Globe className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">1. We Scan</h3>
              <p className="text-gray-600 text-sm">
                Our AI scans millions of products across global marketplaces 24/7.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">2. We Analyze</h3>
              <p className="text-gray-600 text-sm">
                We detect trending products before they go viral using smart algorithms.
              </p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">3. You Save</h3>
              <p className="text-gray-600 text-sm">
                Get the best deals with zero effort. Save time and money shopping smart.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ CTA Section ═══ */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-500 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50"></div>
        <div className="container mx-auto px-4 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Start Discovering Global Hot Sellers Today
              </h2>
              <p className="text-lg text-white/90 mb-8 max-w-lg">
                Join thousands of smart shoppers who save time and money by following global trends. 
                Get notified when hot products go viral.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition shadow-lg">
                  🔥 Explore Hot Products
                </button>
                <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition">
                  How It Works →
                </button>
              </div>
              <div className="mt-8 flex items-center space-x-6 text-white/70 text-sm">
                <span>✅ Free to use</span>
                <span>✅ Daily updates</span>
                <span>✅ No spam</span>
              </div>
            </div>
            <div className="max-w-md mx-auto w-full">
              <EmailSubscribe
                variant="hero"
                title="Get Hot Deals First 🚀"
                subtitle="Be the first to know about trending products and exclusive deals. No spam. Unsubscribe anytime."
              />
            </div>
          </div>
        </div>
      </section>

      {/* ═══ Footer Extra ═══ */}
      <section className="py-8 bg-gray-900 text-gray-400">
        <div className="container mx-auto px-4 text-center text-sm">
          <p>
            GlobalHotSellers.net — Discover what&apos;s hot worldwide. 
            As an Amazon Associate we earn from qualifying purchases.
          </p>
        </div>
      </section>
    </div>
  )
}
