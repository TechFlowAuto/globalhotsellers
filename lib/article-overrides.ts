/**
 * Per-article metadata overrides.
 *
 * Kept out of data/articles.ts on purpose: that file is rewritten by the daily
 * generation script, so any hand edit there would be lost on the next run.
 */

export interface ArticleHeroCta {
  heading: string
  body: string
  label: string
  href: string
}

export interface ArticleOverride {
  title?: string
  description?: string
  heroCta?: ArticleHeroCta
}

const overrides: Record<string, ArticleOverride> = {
  // GSC: high impressions, zero clicks, average position around 10.
  'best-supplement-brands-2026-20261013': {
    title: 'Best Supplement Brands 2026: 3 Picks Buyers Keep Reordering',
    description:
      'Collagen, probiotics and creatine brands that keep appearing in Amazon best-seller data - with ratings, review counts and the current listed price. No sponsored picks.',
    heroCta: {
      heading: 'Short on time? These are the three lines buyers reorder most',
      body: "Vital Proteins collagen peptides, Physician's Choice 60B CFU probiotics and Optimum Nutrition micronized creatine - the three brands that keep topping our daily Amazon data.",
      label: "See today's prices",
      href: '/product/B00K6JUG4K',
    },
  },
}

export function getArticleOverride(slug: string): ArticleOverride | undefined {
  return overrides[slug]
}
