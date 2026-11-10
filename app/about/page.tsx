import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, CheckCircle2, ShieldCheck } from 'lucide-react'
import { siteConfig } from '@/site.config'

export const metadata: Metadata = {
  title: 'About GlobalHotSellers',
  description: 'Why GlobalHotSellers focuses on fewer, more useful buying guides for everyday tech and small-space living.',
  alternates: { canonical: `${siteConfig.domain}/about` },
}

export default function AboutPage() {
  return (
    <div className="bg-gray-50">
      <section className="border-b border-gray-200 bg-white">
        <div className="container mx-auto max-w-4xl px-4 py-16">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">About us</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight text-gray-900 md:text-5xl">A smaller shopping site, on purpose.</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-gray-600">
            GlobalHotSellers publishes scenario-first buying guides for everyday technology and small-space living. Our goal is to help a reader make one better decision, not to publish another endless list of products.
          </p>
        </div>
      </section>

      <div className="container mx-auto max-w-4xl px-4 py-14">
        <div className="grid gap-10 md:grid-cols-2">
          <section>
            <h2 className="text-2xl font-bold text-gray-900">What changed</h2>
            <p className="mt-4 leading-7 text-gray-700">The site previously relied on a large volume of automated product lists. Search data showed that those pages were being seen but rarely chosen. We are now prioritizing fewer guides with a clear use case, an explicit trade-off and a visible update date.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900">What we cover</h2>
            <p className="mt-4 leading-7 text-gray-700">The current editorial focus is everyday audio, small-space cleaning and compact desk setups. We add a guide only when there is a useful decision to explain and a relevant product to compare.</p>
          </section>
        </div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {[
            { icon: BookOpen, title: 'One clear question', body: 'A guide should help with a specific buying decision, not rank an entire category.' },
            { icon: CheckCircle2, title: 'Trade-offs shown', body: 'Every recommendation names the compromise, so the reader can judge fit.' },
            { icon: ShieldCheck, title: 'Clear disclosure', body: 'Affiliate links are disclosed before the first recommendation.' },
          ].map(({ icon: Icon, title, body }) => (
            <div key={title} className="rounded-2xl border border-gray-200 bg-white p-6">
              <Icon className="h-6 w-6 text-primary" />
              <h3 className="mt-4 font-bold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-gray-600">{body}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-6">
          <h2 className="text-xl font-bold text-gray-900">Editorial responsibility</h2>
          <p className="mt-3 leading-7 text-gray-700">GlobalHotSellers is reader-supported. We may earn from qualifying purchases through affiliate links. That commercial relationship does not determine whether a product appears in an editorial guide. Read our <Link href="/editorial-policy" className="text-primary underline">editorial policy</Link>, <Link href="/how-we-test" className="text-primary underline">review method</Link> and <Link href="/affiliate-disclosure" className="text-primary underline">affiliate disclosure</Link>.</p>
        </div>
      </div>
    </div>
  )
}
