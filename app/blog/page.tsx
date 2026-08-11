import Link from 'next/link'
import { articles } from '@/data/articles'
import { siteConfig } from '@/site.config'

export const metadata = {
  title: `Buying Guides & Trending Product Lists | ${siteConfig.name}`,
  description:
    'Data-backed buying guides and trending product lists, updated from live Amazon best-seller data.',
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-3">
            <span>📚</span>
            <span>Buying Guides</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Trending Guides &amp; Product Lists
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            What people are actually buying right now — researched from live
            best-seller data, updated daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {articles.map((article) => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="group bg-white rounded-2xl border border-gray-200 p-6 hover:shadow-lg hover:border-primary/30 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl">{article.emoji}</span>
                <span className="text-xs text-gray-400">{article.readTime}</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors mb-2">
                {article.title}
              </h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-4">
                {article.description}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-primary bg-primary/5 px-3 py-1 rounded-full">
                  {article.category}
                </span>
                <span className="text-sm font-semibold text-primary group-hover:translate-x-1 transition-transform">
                  Read guide →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
