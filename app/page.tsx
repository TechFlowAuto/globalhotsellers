import HeroSection from '@/components/HeroSection'
import EmailSubscribe from '@/components/EmailSubscribe'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      
      {/* Simple content sections */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover the hottest products from around the world.
          </p>
        </div>
      </section>
      
      <section className="py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Global Platforms
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            We track trends from Amazon, eBay, AliExpress, and more.
          </p>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Start Discovering Global Hot Sellers Today
              </h2>
              <p className="text-lg text-white/90 mb-6 max-w-lg">
                Join thousands of smart shoppers who save time and money by following global trends.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                <button className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition">
                  Explore Hot Products
                </button>
                <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition">
                  How It Works
                </button>
              </div>
            </div>
            <div>
              <EmailSubscribe
                variant="hero"
                title="Get Hot Deals First 🚀"
                subtitle="Be the first to know about trending products and exclusive deals."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}