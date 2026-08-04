import type { Metadata } from 'next'
import { featuredProducts } from '@/data/products'
import ProductClient from './ProductClient'

const BASE_URL = 'https://globalhotsellers.net'

// Generate static pages for all products (required for static export & SEO)
export function generateStaticParams() {
  return featuredProducts.map((p) => ({ id: p.id }))
}

export async function generateMetadata({
  params,
}: {
  params: { id: string }
}): Promise<Metadata> {
  const product = featuredProducts.find((p) => p.id === params.id)
  if (!product) {
    return {
      title: 'Product Not Found | GlobalHotSellers',
      robots: { index: false },
    }
  }
  return {
    title: `${product.title} | GlobalHotSellers`,
    description: product.description,
    alternates: { canonical: `${BASE_URL}/product/${product.id}` },
    openGraph: {
      title: product.title,
      description: product.description,
      url: `${BASE_URL}/product/${product.id}`,
      siteName: 'GlobalHotSellers',
      images: [{ url: `${BASE_URL}${product.imageUrl}` }],
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.title,
      description: product.description,
      images: [`${BASE_URL}${product.imageUrl}`],
    },
  }
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = featuredProducts.find((p) => p.id === params.id)

  if (!product) {
    return <ProductClient id={params.id} />
  }

  // Product structured data (JSON-LD) for rich results
  const priceNum = parseFloat(product.price.replace(/[^0-9.]/g, ''))
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: `${BASE_URL}${product.imageUrl}`,
    sku: product.id,
    brand: {
      '@type': 'Brand',
      name: product.source,
    },
    offers: {
      '@type': 'Offer',
      url: product.affiliateUrl,
      priceCurrency: 'USD',
      price: isNaN(priceNum) ? undefined : priceNum,
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: product.platform,
      },
    },
  }
  if (product.rating > 0) {
    jsonLd.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
      bestRating: 5,
    }
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ProductClient id={params.id} />
    </>
  )
}
