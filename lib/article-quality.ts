// The archived keyword-generated library is retained for existing links but
// excluded from search indexing. Only pages explicitly reviewed for useful
// buying intent should be allowed back into the index.
const editoriallyReviewed = new Set<string>([])

export function isArticleIndexable(slug: string): boolean {
  return editoriallyReviewed.has(slug)
}
