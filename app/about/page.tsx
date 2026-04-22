import React from 'react';
import { Globe, Zap, Shield, TrendingUp, Users, Target } from 'lucide-react';

export default function AboutPage() {
  const teamMembers = [
    {
      name: 'Alex Chen',
      role: 'Founder & CEO',
      bio: 'Former e-commerce executive with 10+ years experience in global retail.',
      expertise: ['E-commerce Strategy', 'International Expansion', 'Data Analytics']
    },
    {
      name: 'Maria Rodriguez',
      role: 'Head of Product',
      bio: 'Product management expert specializing in user experience and growth.',
      expertise: ['UX Design', 'Product Development', 'Growth Hacking']
    },
    {
      name: 'David Kim',
      role: 'Lead Developer',
      bio: 'Full-stack developer passionate about building scalable web applications.',
      expertise: ['Next.js', 'TypeScript', 'Cloud Architecture']
    },
    {
      name: 'Sarah Johnson',
      role: 'Content Strategist',
      bio: 'Content marketing specialist with focus on SEO and conversion optimization.',
      expertise: ['SEO', 'Content Marketing', 'Social Media']
    }
  ];

  const values = [
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Mission-Driven',
      description: 'Helping people discover the best products at the best prices worldwide.'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Innovation First',
      description: 'Constantly improving our algorithms to provide the most accurate recommendations.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Trust & Transparency',
      description: 'Building trust through honest reviews and transparent affiliate relationships.'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'User-Centric',
      description: 'Every decision is made with our users needs and preferences in mind.'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Data-Driven',
      description: 'Using real-time data to track global trends and provide timely insights.'
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Perspective',
      description: 'Bringing together the best products from markets around the world.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 to-secondary-50 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
              <Globe className="w-6 h-6 text-primary" />
              <span className="font-semibold text-gray-800">Our Story</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              About <span className="text-primary">GlobalHotSellers</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              We're on a mission to help people discover the hottest products from around the world, 
              while creating a sustainable business that benefits everyone.
            </p>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -translate-y-32 translate-x-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full translate-y-48 -translate-x-48"></div>
      </section>

      {/* Our Story */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Story</h2>
            <div className="space-y-6 text-lg text-gray-700">
              <p>
                GlobalHotSellers was born from a simple observation: finding truly great products 
                among millions of options is incredibly difficult. With so many marketplaces, 
                languages, and currencies, shopping globally felt overwhelming.
              </p>
              <p>
                Our founder, Alex Chen, spent years working in international e-commerce and saw 
                firsthand how much value was being lost in translation. Great products in one 
                country were completely unknown in others, and shoppers were missing out on 
                amazing deals simply because they didn't know where to look.
              </p>
              <p>
                In 2026, we decided to solve this problem by creating GlobalHotSellers - a platform 
                that uses advanced algorithms to track millions of products across dozens of 
                marketplaces worldwide. Our goal is simple: to show you what's trending globally 
                and help you find the best prices, no matter where you are.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <div key={index} className="card hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 text-primary">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">How It Works</h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">1</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Track Global Trends</h3>
                <p className="text-gray-600">
                  Our algorithms monitor millions of products across Amazon, eBay, AliExpress, 
                  Walmart, and other major marketplaces worldwide.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">2</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Analyze & Rank</h3>
                <p className="text-gray-600">
                  We analyze sales data, reviews, price changes, and social signals to identify 
                  truly hot products before they go viral.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-primary text-white flex items-center justify-center text-2xl font-bold mx-auto mb-4">3</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Deliver Value</h3>
                <p className="text-gray-600">
                  We present the hottest products with price comparisons, availability info, 
                  and direct links to help you make smart purchasing decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Business Model */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Business Model</h2>
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">For Shoppers</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                        <div className="w-2 h-2 rounded-full bg-green-600"></div>
                      </div>
                      <span className="text-gray-700">100% free service - no hidden fees</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                        <div className="w-2 h-2 rounded-full bg-green-600"></div>
                      </div>
                      <span className="text-gray-700">Save time finding the best products</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                        <div className="w-2 h-2 rounded-full bg-green-600"></div>
                      </div>
                      <span className="text-gray-700">Save money with price comparisons</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 mt-1">
                        <div className="w-2 h-2 rounded-full bg-green-600"></div>
                      </div>
                      <span className="text-gray-700">Shop confidently with verified reviews</span>
                    </li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">For Our Business</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-1">
                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      </div>
                      <span className="text-gray-700">Earn commissions through affiliate programs</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-1">
                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      </div>
                      <span className="text-gray-700">Zero inventory - we don't hold products</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-1">
                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      </div>
                      <span className="text-gray-700">Global reach - serve customers worldwide</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center mr-3 mt-1">
                        <div className="w-2 h-2 rounded-full bg-blue-600"></div>
                      </div>
                      <span className="text-gray-700">Sustainable growth through user trust</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="mt-8 pt-8 border-t border-gray-200">
                <p className="text-gray-600 text-center">
                  <strong>Transparency Note:</strong> We participate in affiliate programs with Amazon, eBay, 
                  AliExpress, and other retailers. When you make a purchase through our links, 
                  we may earn a commission at no extra cost to you. This is how we keep our service free.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Join Our Global Community</h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Be part of a smarter way to shop globally. Discover amazing products, save money, 
            and shop with confidence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/" 
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 transition inline-flex items-center justify-center"
            >
              Start Exploring
            </a>
            <a 
              href="/contact" 
              className="px-8 py-3 border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition inline-flex items-center justify-center"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}