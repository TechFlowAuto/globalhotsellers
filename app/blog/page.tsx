import type { Metadata } from 'next'
import Link from 'next/link'
import GuideCard from '@/components/guides/GuideCard'
import { guides } from '@/data/guides'
import { siteConfig } from '@/site.config'

export const metadata: Metadata = {
  title: 'Archive',
  description: 'The GlobalHotSellers article archive. New editorial buying guides live in the guides library.',
  robots: { index: false, follow: true },
  alternates: { canonical: `${siteConfig.domain}/guides` },
}

export default function BlogPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto max-w-5xl px-4 py-14">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Archive</p>
        <h1 className="mt-3 text-4xl font-bold text-gray-900">Editorial guides have moved</h1>
        <p className="mt-4 max-w-2xl leading-7 text-gray-600">
          The old keyword-generated library is being retired from search. Current buying guides are shorter, scenario-first and maintained in one place.
        </p>
        <Link href="/guides" className="mt-6 inline-flex rounded-lg bg-primary px-5 py-3 font-semibold text-white hover:bg-primary-600">
          Browse current buying guides
        </Link>
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {guides.map((guide) => <GuideCard key={guide.slug} guide={guide} />)}
        </div>
      </div>
    </div>
  )
}
