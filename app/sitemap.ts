import type { MetadataRoute } from 'next'
import { featuredProducts } from '@/data/products'
import { articles } from '@/data/articles'
import { duplicateSlugs } from '@/lib/duplicate-articles'
import { siteConfig } from '@/site.config'

const BASE_URL = siteConfig.domain

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.2,
    },
  ]

  const productPages: MetadataRoute.Sitemap = featuredProducts.map((p) => ({
    url: `${BASE_URL}/product/${p.id}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }))

  const articlePages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    // 重复页（历史 bug 产物）已 noindex，不应出现在 sitemap 中
    ...articles
      .filter((a) => !duplicateSlugs.has(a.slug))
      .map((a) => ({
        url: `${BASE_URL}/blog/${a.slug}`,
        lastModified: new Date(a.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
      })),
  ]

  return [...staticPages, ...productPages, ...articlePages]
}
