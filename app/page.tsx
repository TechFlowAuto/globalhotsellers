import HeroSection from '@/components/HeroSection'
import FeaturedProducts from '@/components/FeaturedProducts'
import PlatformShowcase from '@/components/PlatformShowcase'
import HowItWorks from '@/components/HowItWorks'
import StatsSection from '@/components/StatsSection'

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedProducts />
      <PlatformShowcase />
      <HowItWorks />
      <StatsSection />
      
      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Start Discovering Global Hot Sellers Today
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of smart shoppers who save time and money by following global trends.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="btn-secondary bg-white text-primary hover:bg-gray-100">
              Explore Hot Products
            </button>
            <button className="btn-secondary border-2 border-white text-white hover:bg-white/10">
              How It Works
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}