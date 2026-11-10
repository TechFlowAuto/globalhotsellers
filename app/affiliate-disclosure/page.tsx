import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/site.config'

export const metadata: Metadata = {
  title: 'Affiliate Disclosure',
  description: 'GlobalHotSellers affiliate relationship disclosure for Amazon and other commerce links.',
  alternates: { canonical: `${siteConfig.domain}/affiliate-disclosure` },
}

export default function AffiliateDisclosurePage() {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto max-w-3xl px-4 py-14">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Transparency</p>
        <h1 className="mt-3 text-4xl font-bold text-gray-900">Affiliate Disclosure</h1>
        <p className="mt-5 text-lg leading-8 text-gray-600">GlobalHotSellers is reader-supported. When you buy through links on this site, we may earn an affiliate commission at no additional cost to you.</p>

        <div className="mt-10 space-y-8 text-base leading-7 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-900">Amazon Associates</h2>
            <p className="mt-3">As an Amazon Associate, we earn from qualifying purchases. Amazon and the Amazon logo are trademarks of Amazon.com, Inc. or its affiliates. We are not Amazon and do not control Amazon pricing, availability, shipping or returns.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900">How links work</h2>
            <p className="mt-3">Affiliate links may include a tracking tag. We make a commission only when a qualifying purchase is completed, and the price you pay is the same whether or not you use our link.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900">Our editorial rule</h2>
            <p className="mt-3">Compensation does not determine inclusion. Guides begin with a buyer scenario and explain the product’s trade-offs. See our <Link href="/editorial-policy" className="text-primary underline">editorial policy</Link> and <Link href="/how-we-test" className="text-primary underline">review method</Link>.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900">Prices and availability</h2>
            <p className="mt-3">Prices and availability shown on this site or in a guide are not guarantees. They can change without notice. Always confirm the current price, seller and product details on the marketplace listing before ordering.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900">Other partners</h2>
            <p className="mt-3">Some pages may link to other marketplaces or digital tools. The same principle applies: we may earn a commission, but the editorial reason for a recommendation is stated separately from the commercial relationship.</p>
          </section>
        </div>

        <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-6">
          <p className="font-semibold text-gray-900">Questions?</p>
          <p className="mt-2 text-sm leading-6 text-gray-600">Contact <Link href="/contact" className="text-primary underline">GlobalHotSellers</Link>. Last updated November 10, 2026.</p>
        </div>
      </div>
    </div>
  )
}
