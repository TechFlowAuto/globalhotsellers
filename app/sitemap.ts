import type { MetadataRoute } from 'next'
import { featuredProducts } from '@/data/products'
import { guides } from '@/data/guides'
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
      url: `${BASE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/seller-tools`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
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

  const guidePages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/guides`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${BASE_URL}/editorial-policy`,
      lastModified: new Date('2026-11-10'),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/how-we-test`,
      lastModified: new Date('2026-11-10'),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${BASE_URL}/affiliate-disclosure`,
      lastModified: new Date('2026-11-10'),
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    ...guides.map((guide) => ({
      url: `${BASE_URL}/guides/${guide.slug}`,
      lastModified: new Date(guide.updatedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    })),
  ]

  return [...staticPages, ...productPages, ...guidePages]
}
