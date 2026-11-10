import type { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/site.config'

export const metadata: Metadata = {
  title: 'Editorial Policy',
  description: 'How GlobalHotSellers chooses products, writes buying guides and separates editorial recommendations from affiliate revenue.',
  alternates: { canonical: `${siteConfig.domain}/editorial-policy` },
}

export default function EditorialPolicyPage() {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto max-w-3xl px-4 py-14">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Editorial standards</p>
        <h1 className="mt-3 text-4xl font-bold text-gray-900">How we decide what to recommend</h1>
        <p className="mt-5 text-lg leading-8 text-gray-600">
          Our job is to make a buying decision easier, not to pretend every product is right for everyone. These are the rules we use for editorial guides.
        </p>

        <div className="mt-10 space-y-8 text-base leading-7 text-gray-700">
          <section>
            <h2 className="text-2xl font-bold text-gray-900">1. Start with a use case</h2>
            <p className="mt-3">A recommendation must answer a specific question: commuting in noise, cleaning pet hair in a small apartment, or keeping a compact desk powered. We do not use a generic “best products” list as a substitute for a decision.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900">2. Show the trade-off</h2>
            <p className="mt-3">Every pick includes a downside and a clearly described buyer. A guide that only lists benefits is an advertisement, not useful buying advice.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900">3. Be clear about evidence</h2>
            <p className="mt-3">We use product listings, manufacturer information and observable design differences to explain a recommendation. We do not claim laboratory testing, hands-on measurement or expertise we do not have. When a claim needs verification, we link readers back to the live listing.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900">4. Keep affiliate revenue separate</h2>
            <p className="mt-3">Some links earn a commission. That does not determine whether a product appears in a guide. We disclose this before the first affiliate link and provide the full <Link href="/affiliate-disclosure" className="text-primary underline">affiliate disclosure</Link>.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900">5. Correct and date the work</h2>
            <p className="mt-3">Guides display an update date. Prices and availability change frequently, so we tell readers to check the live seller listing before purchase. If you find a material error, contact us and we will review it.</p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-gray-900">6. Avoid thin, automated pages</h2>
            <p className="mt-3">We do not treat page count as editorial value. New guides must have a distinct question, a defensible recommendation and a useful explanation of trade-offs. Older bulk-generated pages are being reviewed separately from the editorial guide library.</p>
          </section>
        </div>

        <div className="mt-12 rounded-2xl border border-gray-200 bg-white p-6">
          <p className="font-semibold text-gray-900">Questions about our method?</p>
          <p className="mt-2 text-sm leading-6 text-gray-600">Read <Link href="/how-we-test" className="text-primary underline">how we evaluate products</Link> or <Link href="/contact" className="text-primary underline">contact the editorial team</Link>.</p>
        </div>
      </div>
    </div>
  )
}
