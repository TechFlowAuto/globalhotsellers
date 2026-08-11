import Link from 'next/link'
import { notFound } from 'next/navigation'
import { articles, getArticle } from '@/data/articles'
import { featuredProducts } from '@/data/products'
import { siteConfig } from '@/site.config'
import { Star, ExternalLink } from 'lucide-react'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props) {
  const article = getArticle(params.slug)
  if (!article) return {}
  return {
    title: article.title,
    description: article.description,
    keywords: article.keywords.join(', '),
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      url: `${siteConfig.domain}/blog/${article.slug}`,
      siteName: siteConfig.name,
      publishedTime: article.date,
    },
  }
}

function getProducts(ids?: string[]) {
  if (!ids) return []
  return ids
    .map((id) => featuredProducts.find((p) => p.id === id))
    .filter(Boolean) as typeof featuredProducts
}

export default function ArticlePage({ params }: Props) {
  const article = getArticle(params.slug)
  if (!article) notFound()

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        {/* Header */}
        <div className="mb-10">
          <Link
            href="/blog"
            className="text-sm text-primary font-semibold hover:underline"
          >
            ← All guides
          </Link>
          <div className="flex items-center space-x-3 mt-6 mb-4">
            <span className="text-xs font-medium text-primary bg-primary/5 px-3 py-1 rounded-full">
              {article.category}
            </span>
            <span className="text-xs text-gray-400">
              {article.date} · {article.readTime}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {article.emoji} {article.title}
          </h1>
          <p className="text-lg text-gray-600 mt-4 leading-relaxed">
            {article.description}
          </p>
        </div>

        {/* Body */}
        <div className="space-y-10">
          {article.sections.map((section, i) => (
            <section key={i}>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                {section.heading}
              </h2>
              <p className="text-gray-700 leading-relaxed mb-5">
                {section.body}
              </p>

              {section.productIds && (
                <div className="grid grid-cols-1 gap-4">
                  {getProducts(section.productIds).map((product) => (
                    <div
                      key={product.id}
                      className="flex items-center gap-4 bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md transition-all"
                    >
                      <Link href={`/product/${product.id}`} className="shrink-0">
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                          className="w-24 h-24 object-cover rounded-lg"
                          loading="lazy"
                        />
                      </Link>
                      <div className="flex-1 min-w-0">
                        <Link href={`/product/${product.id}`}>
                          <h3 className="font-semibold text-gray-900 hover:text-primary line-clamp-2">
                            {product.title}
                          </h3>
                        </Link>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="flex items-center text-amber-500 text-sm">
                            <Star className="w-4 h-4 fill-current" />
                            <span className="ml-1 font-medium">{product.rating}</span>
                          </span>
                          <span className="text-xs text-gray-400">
                            ({product.reviewCount.toLocaleString()} reviews)
                          </span>
                          <span className="text-sm font-bold text-gray-900 ml-2">
                            {product.price}
                          </span>
                        </div>
                        <div className="mt-2 flex items-center space-x-3">
                          <Link
                            href={`/product/${product.id}`}
                            className="text-sm font-semibold text-primary hover:underline"
                          >
                            View details →
                          </Link>
                          <a
                            href={product.affiliateUrl}
                            target="_blank"
                            rel="noopener noreferrer nofollow sponsored"
                            className="inline-flex items-center space-x-1 text-sm font-semibold bg-primary text-white px-3 py-1 rounded-lg hover:opacity-90"
                          >
                            <span>Check price</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 bg-white rounded-2xl border border-gray-200 p-8 text-center">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            See today&apos;s full trending list
          </h3>
          <p className="text-gray-600 mb-5">
            {siteConfig.name} updates its product catalog daily from live
            best-seller data.
          </p>
          <Link
            href="/"
            className="inline-flex items-center space-x-2 bg-primary text-white font-semibold px-6 py-3 rounded-lg hover:opacity-90 transition-opacity"
          >
            <span>Browse trending products</span>
          </Link>
        </div>
      </div>
    </div>
  )
}
