import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/site.config'

export const metadata: Metadata = {
  title: 'How We Evaluate Products',
  description: 'Our practical, evidence-based method for choosing products and explaining trade-offs in GlobalHotSellers buying guides.',
  alternates: { canonical: `${siteConfig.domain}/how-we-test` },
}

export default function HowWeTestPage() {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto max-w-3xl px-4 py-14">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Review method</p>
        <h1 className="mt-3 text-4xl font-bold text-gray-900">We explain the decision, not just the product</h1>
        <p className="mt-5 text-lg leading-8 text-gray-600">
          Our guides are editorial research, not disguised lab tests. We make that distinction clear so you can judge how much weight to give each recommendation.
        </p>

        <div className="mt-10 space-y-8 text-base leading-7 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-900">What we compare</h2>
            <ul className="mt-4 space-y-3">
              <li><strong>Fit for the scenario:</strong> Does the design solve the stated problem without creating a larger one?</li>
              <li><strong>Practical trade-offs:</strong> What does the buyer give up in space, maintenance, charging or cost?</li>
              <li><strong>Verifiable product information:</strong> Do the listing, manufacturer information and product category agree on the feature being recommended?</li>
              <li><strong>Maintenance burden:</strong> Will the product create more chores than it removes?</li>
              <li><strong>Value at the current listed price:</strong> Is there a sensible lower-cost option for the same use case?</li>
            </ul>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900">What we do not claim</h2>
            <p className="mt-3">Unless a page explicitly says otherwise, we have not performed controlled durability, battery, acoustic, suction or safety testing. We do not present manufacturer claims as independent test results. For regulated or safety-critical purchases, follow the manufacturer’s instructions and the applicable safety guidance.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900">How recommendations can change</h2>
            <p className="mt-3">A guide may change when a product is discontinued, the listing materially changes, a better option becomes available, or the price no longer makes sense. We display the last update date and do not imply that an old price is guaranteed.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900">Corrections</h2>
            <p className="mt-3">If a recommendation is materially wrong or the product information is out of date, <Link href="/contact" className="text-primary underline">tell us</Link>. Corrections are reviewed against the current listing and documented in the page update.</p>
          </section>
        </div>

        <div className="mt-12 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm leading-6 text-amber-950">
          <strong>Affiliate note:</strong> We may earn a commission when you buy through a link. See our <Link href="/affiliate-disclosure" className="underline">affiliate disclosure</Link> and <Link href="/editorial-policy" className="underline">editorial policy</Link>.
        </div>
      </div>
    </div>
  )
}
