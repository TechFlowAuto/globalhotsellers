'use client'

import { Globe, TrendingUp, Zap, Shield } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Globe className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-gray-800">Global Shopping Intelligence</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Discover What's
              <span className="text-primary block">Hot Worldwide</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-2xl">
              We track millions of products across Amazon, eBay, AliExpress, Walmart and more to bring you the hottest selling items globally. Save time, save money, shop smart.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="btn-primary text-lg px-8 py-3 flex items-center justify-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Explore Trending Now</span>
              </button>
              <button className="btn-secondary text-lg px-8 py-3">
                How It Works
              </button>
            </div>
            
            {/* Stats */}
            <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">50K+</div>
                <div className="text-gray-600">Products Tracked</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">10+</div>
                <div className="text-gray-600">Global Platforms</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">24/7</div>
                <div className="text-gray-600">Real-time Updates</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-2">100%</div>
                <div className="text-gray-600">Free Service</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - Feature Cards */}
          <div className="space-y-6">
            <div className="card transform hover:-translate-y-1 transition-transform">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Zap className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Real-time Hotness Detection</h3>
                  <p className="text-gray-600">Our AI algorithms detect trending products before they go viral.</p>
                </div>
              </div>
            </div>
            
            <div className="card transform hover:-translate-y-1 transition-transform">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-secondary" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Global Price Comparison</h3>
                  <p className="text-gray-600">Find the best prices across different countries and platforms.</p>
                </div>
              </div>
            </div>
            
            <div className="card transform hover:-translate-y-1 transition-transform">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                  <Shield className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Zero Risk Shopping</h3>
                  <p className="text-gray-600">We only recommend products with high ratings and reliable sellers.</p>
                </div>
              </div>
            </div>
            
            {/* Platform Logos */}
            <div className="pt-6 border-t">
              <p className="text-gray-500 mb-4">Tracking products from:</p>
              <div className="flex flex-wrap gap-6 items-center">
                <div className="text-2xl font-bold text-gray-800">Amazon</div>
                <div className="text-2xl font-bold text-blue-600">eBay</div>
                <div className="text-2xl font-bold text-red-500">AliExpress</div>
                <div className="text-2xl font-bold text-blue-700">Walmart</div>
                <div className="text-2xl font-bold text-green-600">Etsy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Background Pattern */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-32 translate-x-32"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full translate-y-48 -translate-x-48"></div>
    </section>
  )
}