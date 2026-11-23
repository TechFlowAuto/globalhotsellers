// The archived keyword-generated library is retained for existing links but
// excluded from search indexing. Only pages explicitly reviewed for useful
// buying intent should be allowed back into the index.
const editoriallyReviewed = new Set<string>([
  // Reviewed 2026-11-10: intent-matched title, rewritten summary and visible hero CTA.
  'best-supplement-brands-2026-20261013',
])

export function isArticleIndexable(slug: string): boolean {
  return editoriallyReviewed.has(slug)
}
