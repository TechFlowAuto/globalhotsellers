import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AlertTriangle, ArrowLeft, CheckCircle2, ExternalLink, RefreshCcw } from 'lucide-react'
import AffiliateLink from '@/components/AffiliateLink'
import EditorialProductCard from '@/components/guides/EditorialProductCard'
import GuideCard from '@/components/guides/GuideCard'
import { featuredProducts } from '@/data/products'
import { getGuide, guides, type Guide } from '@/data/guides'
import { siteConfig } from '@/site.config'

interface Props {
  params: { slug: string }
}

export function generateStaticParams() {
  return guides.map((guide) => ({ slug: guide.slug }))
}

export function generateMetadata({ params }: Props): Metadata {
  const guide = getGuide(params.slug)
  if (!guide) {
    return { title: 'Guide not found', robots: { index: false } }
  }
  const url = `${siteConfig.domain}/guides/${guide.slug}`
  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords.join(', '),
    alternates: { canonical: url },
    openGraph: {
      title: guide.title,
      description: guide.description,
      type: 'article',
      url,
      siteName: siteConfig.name,
      modifiedTime: guide.updatedAt,
    },
  }
}

function productMap(guide: Guide) {
  return guide.productVerdicts.map((verdict) => {
    const product = featuredProducts.find((item) => item.id === verdict.productId)
    if (!product) throw new Error(`Unknown product ${verdict.productId} in guide ${guide.slug}`)
    return { verdict, product }
  })
}

export default function GuidePage({ params }: Props) {
  const guide = getGuide(params.slug)
  if (!guide) notFound()

  const picks = productMap(guide)
  const related = guides.filter((item) => item.slug !== guide.slug).slice(0, 2)
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: guide.title,
    description: guide.description,
    dateModified: guide.updatedAt,
    author: { '@type': 'Organization', name: `${siteConfig.name} Editorial Team` },
    publisher: { '@type': 'Organization', name: siteConfig.name },
    mainEntityOfPage: `${siteConfig.domain}/guides/${guide.slug}`,
  }

  return (
    <div className="bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="border-b border-amber-200 bg-amber-50">
        <div className="container mx-auto max-w-5xl px-4 py-3 text-center text-xs leading-5 text-amber-950">
          <strong>Affiliate disclosure:</strong> As an Amazon Associate, we earn from qualifying purchases. Recommendations are chosen for scenario fit, not by payment from brands.{' '}
          <Link href="/affiliate-disclosure" className="underline">Read the full disclosure</Link>.
        </div>
      </div>

      <article>
        <header className="border-b border-gray-200 bg-white">
          <div className="container mx-auto max-w-5xl px-4 py-12 md:py-16">
            <Link href="/guides" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              <ArrowLeft className="h-4 w-4" /> All buying guides
            </Link>
            <div className="mt-7 flex flex-wrap items-center gap-3 text-xs text-gray-500">
              <span className="rounded-full bg-primary/10 px-3 py-1 font-bold uppercase tracking-wide text-primary">{guide.category}</span>
              <span>{guide.readTime}</span>
              <span>Updated {guide.updatedAt}</span>
            </div>
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.16em] text-gray-500">{guide.eyebrow}</p>
            <h1 className="mt-3 max-w-4xl text-3xl font-bold leading-tight text-gray-900 md:text-5xl">{guide.title}</h1>
            <p className="mt-5 max-w-3xl text-lg leading-8 text-gray-600">{guide.description}</p>
            <p className="mt-5 max-w-3xl border-l-4 border-primary pl-4 text-sm leading-6 text-gray-600">{guide.heroNote}</p>
          </div>
        </header>

        <div className="container mx-auto grid max-w-5xl gap-12 px-4 py-12 lg:grid-cols-[minmax(0,1fr)_250px]">
          <div>
            <section className="rounded-2xl bg-gray-900 p-6 text-white md:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-primary-300">The short answer</p>
              <p className="mt-3 text-lg leading-8 text-gray-100">{guide.quickAnswer}</p>
            </section>

            <section className="mt-10">
              <h2 className="text-2xl font-bold text-gray-900">Our picks, with the trade-offs</h2>
              <p className="mt-2 text-sm leading-6 text-gray-600">
                These are buying recommendations, not lab-test scores. Product details and prices should be checked on the live listing before purchase.
              </p>
              <div className="mt-6 space-y-6">
                {picks.map(({ verdict, product }) => (
                  <EditorialProductCard key={product.id} product={product} verdict={verdict} guideSlug={guide.slug} />
                ))}
              </div>
            </section>

            <section className="mt-12 rounded-2xl border border-orange-200 bg-orange-50 p-6">
              <div className="flex gap-3">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-orange-700" />
                <div>
                  <p className="text-sm font-bold uppercase tracking-wide text-orange-800">{guide.callout.label}</p>
                  <h2 className="mt-1 text-xl font-bold text-gray-900">{guide.callout.title}</h2>
                  <p className="mt-2 text-sm leading-6 text-gray-700">{guide.callout.body}</p>
                </div>
              </div>
            </section>

            <div className="mt-12 space-y-10">
              {guide.sections.map((section) => (
                <section key={section.title}>
                  <h2 className="text-2xl font-bold text-gray-900">{section.title}</h2>
                  <div className="mt-4 space-y-4 text-base leading-7 text-gray-700">
                    {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                  </div>
                  {section.criteria && (
                    <div className="mt-6 grid gap-3 sm:grid-cols-2">
                      {section.criteria.map((criterion) => (
                        <div key={criterion.title} className="rounded-xl border border-gray-200 bg-white p-4">
                          <h3 className="text-sm font-bold text-gray-900">{criterion.title}</h3>
                          <p className="mt-1 text-sm leading-6 text-gray-600">{criterion.detail}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}
            </div>

            <section className="mt-12 rounded-2xl border border-gray-200 bg-white p-6">
              <h2 className="text-xl font-bold text-gray-900">Skip this guide if…</h2>
              <ul className="mt-4 space-y-3">
                {guide.skipIf.map((item) => (
                  <li key={item} className="flex gap-2 text-sm leading-6 text-gray-700">
                    <span className="mt-1 text-gray-400">—</span> {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="mt-10 border-t border-gray-200 pt-8">
              <div className="flex items-center gap-2 text-sm font-bold text-gray-900">
                <RefreshCcw className="h-4 w-4 text-primary" /> What this guide is based on
              </div>
              <ul className="mt-3 space-y-2 text-sm leading-6 text-gray-600">
                {guide.sources.map((source) => (
                  <li key={source.label}><strong className="text-gray-800">{source.label}:</strong> {source.detail}</li>
                ))}
                <li><strong className="text-gray-800">Editorial method:</strong> no paid placements; see <Link className="text-primary underline" href="/how-we-test">how we choose products</Link>.</li>
              </ul>
            </section>

            {related.length > 0 && (
              <section className="mt-12">
                <h2 className="mb-5 text-2xl font-bold text-gray-900">Keep comparing</h2>
                <div className="grid gap-5 sm:grid-cols-2">
                  {related.map((item) => <GuideCard key={item.slug} guide={item} />)}
                </div>
              </section>
            )}
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-2xl border border-gray-200 bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-gray-500">Quick check</p>
              <ul className="mt-4 space-y-4 text-sm text-gray-700">
                <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" /> Start with the use case, not the product name.</li>
                <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" /> Confirm the live seller and price before ordering.</li>
                <li className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" /> A product’s downside is part of the recommendation.</li>
              </ul>
              <AffiliateLink
                href={picks[0].product.affiliateUrl}
                productId={picks[0].product.id}
                source={`editorial_sticky:${guide.slug}`}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white hover:bg-primary-600"
              >
                Check top pick price <ExternalLink className="h-4 w-4" />
              </AffiliateLink>
              <p className="mt-3 text-xs leading-5 text-gray-500">Amazon prices and availability can change. Check the listing before buying.</p>
            </div>
          </aside>
        </div>
      </article>
    </div>
  )
}
