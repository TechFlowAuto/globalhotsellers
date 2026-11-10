import type { Metadata } from 'next'
import Link from 'next/link'
import { ShieldCheck, SlidersHorizontal, TestTube2 } from 'lucide-react'
import GuideCard from '@/components/guides/GuideCard'
import { guides } from '@/data/guides'
import { siteConfig } from '@/site.config'

export const metadata: Metadata = {
  title: 'Buying Guides',
  description:
    'Independent, scenario-first buying guides for everyday tech and small-space home products. Compare the trade-offs before checking the live Amazon price.',
  alternates: { canonical: `${siteConfig.domain}/guides` },
}

export default function GuidesPage() {
  return (
    <div className="bg-gray-50">
      <section className="border-b border-gray-200 bg-white">
        <div className="container mx-auto max-w-5xl px-4 py-16 md:py-20">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Editorial guides</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
            Buy the version that fits your day.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-gray-600">
            We start with the real-world scenario, show the trade-offs, and only then point to a product. Every guide makes both the recommendation and its downside easy to see.
          </p>
          <div className="mt-8 grid gap-3 text-sm text-gray-600 sm:grid-cols-3">
            <div className="flex items-center gap-2 rounded-xl bg-gray-50 p-3">
              <SlidersHorizontal className="h-5 w-5 shrink-0 text-primary" /> Scenario first
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-gray-50 p-3">
              <TestTube2 className="h-5 w-5 shrink-0 text-primary" /> Criteria explained
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-gray-50 p-3">
              <ShieldCheck className="h-5 w-5 shrink-0 text-primary" /> Disclosure visible
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-5xl px-4 py-14">
        <div className="grid gap-6 md:grid-cols-2">
          {guides.map((guide) => <GuideCard key={guide.slug} guide={guide} />)}
        </div>
        <div className="mt-10 rounded-2xl border border-gray-200 bg-white p-6 text-sm leading-6 text-gray-600">
          <strong className="text-gray-900">How we choose:</strong> recommendations are based on current product-list information and the fit between a product’s design and a clearly stated use case. We do not claim hands-on lab testing. Read our{' '}
          <Link href="/how-we-test" className="font-semibold text-primary underline">review method</Link>{' '}
          and{' '}
          <Link href="/affiliate-disclosure" className="font-semibold text-primary underline">affiliate disclosure</Link>.
        </div>
      </section>
    </div>
  )
}
