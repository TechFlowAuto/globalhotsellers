import type { Metadata } from 'next'
import Link from 'next/link'
import { featuredProducts } from '@/data/products'
import ProductCard from '@/components/ProductCard'
import { siteConfig } from '@/site.config'

export const metadata: Metadata = {
  title: 'Trending Products',
  description: 'Browse current marketplace best-sellers with prices, ratings, product details and direct shopping links.',
  alternates: { canonical: '/products' },
}

export const dynamic = 'force-dynamic'

export default function ProductsPage({
  searchParams,
}: {
  searchParams?: { category?: string }
}) {
  const selected = searchParams?.category?.trim()
  const products = [...featuredProducts]
    .filter((product) => !selected || product.category === selected)
    .sort((a, b) => b.reviewCount - a.reviewCount)
  const categories = Array.from(new Set(featuredProducts.map((product) => product.category))).sort()

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-14">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-300">
            {siteConfig.name} catalogue
          </p>
          <h1 className="mt-3 text-4xl font-bold">
            {selected || 'Trending products, ranked by shopper activity'}
          </h1>
          <p className="mt-4 max-w-2xl text-gray-300">
            Browse products currently drawing the most reviews and purchases. Every link opens the marketplace, where you can check the live price before buying.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-10">
        <div className="mb-8 flex flex-wrap gap-2">
          <Link
            href="/products"
            className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${!selected ? 'border-primary bg-primary text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-primary'}`}
          >
            All products
          </Link>
          {categories.map((category) => (
            <Link
              key={category}
              href={`/products?category=${encodeURIComponent(category)}`}
              className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${selected === category ? 'border-primary bg-primary text-white' : 'border-gray-300 bg-white text-gray-700 hover:border-primary'}`}
            >
              {category}
            </Link>
          ))}
        </div>

        <p className="mb-6 text-sm text-gray-500">
          {products.length} products, ranked by review volume
        </p>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-white p-10 text-center">
            <h2 className="text-xl font-bold text-gray-900">No products in this category yet</h2>
            <Link href="/products" className="mt-4 inline-block font-semibold text-primary hover:underline">
              Browse all products
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
