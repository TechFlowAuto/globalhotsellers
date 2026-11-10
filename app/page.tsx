import Link from 'next/link'
import { ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react'
import GuideCard from '@/components/guides/GuideCard'
import EmailSubscribe from '@/components/EmailSubscribe'
import { guides } from '@/data/guides'
import { featuredProducts } from '@/data/products'
import { siteConfig } from '@/site.config'

export const metadata = {
  title: `${siteConfig.name} — Practical buying guides for everyday tech and small-space living`,
  description:
    'Scenario-first buying guides for everyday tech and small-space home products. Compare the trade-offs before you check the live Amazon price.',
  alternates: { canonical: '/' },
}

const heroPicks = ['B0DGHMNQ5Z', 'B09T4YZGQR', 'B09PDLBFKY']
  .map((id) => featuredProducts.find((product) => product.id === id))
  .filter(Boolean)

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="overflow-hidden bg-white">
        <div className="container mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-[1.15fr_0.85fr] md:items-center md:py-24">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">GlobalHotSellers · Editorial guides</p>
            <h1 className="mt-5 max-w-3xl text-4xl font-bold leading-tight text-gray-900 md:text-6xl">
              Buy for the way you <span className="text-primary">actually live.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-600">
              Fewer, better buying guides for everyday tech and small-space living. We explain the scenario, the trade-offs and who should skip the product, then link you to the live Amazon listing.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/guides" className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:bg-primary-600">
                Read the buying guides <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/editorial-policy" className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-6 py-3 font-semibold text-gray-800 hover:border-primary">
                How we choose
              </Link>
            </div>
            <div className="mt-9 grid max-w-2xl gap-3 text-sm text-gray-600 sm:grid-cols-3">
              <div className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" /> Scenario first</div>
              <div className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" /> Trade-offs included</div>
              <div className="flex gap-2"><CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-green-600" /> Clear disclosure</div>
            </div>
          </div>
          <div className="relative">
            <div className="rounded-3xl border border-gray-200 bg-gray-50 p-6 shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-200 pb-4">
                <span className="text-sm font-bold text-gray-900">This week’s decision guides</span>
                <ShieldCheck className="h-5 w-5 text-primary" />
              </div>
              <div className="mt-4 space-y-3">
                {heroPicks.map((product) => product && (
                  <Link key={product.id} href={`/product/${product.id}`} className="group flex items-center gap-4 rounded-xl bg-white p-3 transition hover:shadow-md">
                    <img src={product.imageUrl} alt="" className="h-16 w-16 rounded-lg bg-gray-100 object-contain p-1" />
                    <div className="min-w-0">
                      <p className="line-clamp-2 text-sm font-semibold text-gray-900 group-hover:text-primary">{product.title}</p>
                      <p className="mt-1 text-xs text-gray-500">Check current price and seller on Amazon</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <p className="mt-3 text-center text-xs leading-5 text-gray-500">As an Amazon Associate, we earn from qualifying purchases.</p>
          </div>
        </div>
      </section>

      <div className="border-y border-amber-200 bg-amber-50">
        <div className="container mx-auto max-w-6xl px-4 py-3 text-center text-xs leading-5 text-amber-950">
          <strong>Affiliate disclosure:</strong> we may earn a commission when you buy through links on this site. Recommendations are based on scenario fit, not payment from brands. <Link href="/affiliate-disclosure" className="underline">Learn more</Link>.
        </div>
      </div>

      <section className="container mx-auto max-w-6xl px-4 py-16">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Start with the decision</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">Three useful buying guides</h2>
            <p className="mt-3 max-w-2xl text-gray-600">Each guide is built around a real-world use case, not a keyword. Start with the one closest to your day.</p>
          </div>
          <Link href="/guides" className="font-semibold text-primary hover:underline">View all guides →</Link>
        </div>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {guides.map((guide) => <GuideCard key={guide.slug} guide={guide} />)}
        </div>
      </section>

      <section className="bg-gray-900 py-16 text-white">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-10 md:grid-cols-2 md:items-start">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary-300">A different kind of shopping site</p>
              <h2 className="mt-3 text-3xl font-bold md:text-4xl">Not every product deserves a place on the page.</h2>
              <p className="mt-4 max-w-xl leading-7 text-gray-300">Our editorial layer is deliberately small. It covers products where a clear recommendation and a visible trade-off can save you from a bad purchase or an unnecessary upgrade.</p>
            </div>
            <div className="grid gap-4">
              {[
                ['Use case first', 'A recommendation must answer a specific question.'],
                ['Show the downside', 'Every pick includes a trade-off and who should skip it.'],
                ['Check the live listing', 'Prices, sellers and versions change; verify before ordering.'],
              ].map(([title, body]) => (
                <div key={title} className="rounded-xl border border-gray-700 bg-gray-800 p-5">
                  <p className="font-bold text-white">{title}</p>
                  <p className="mt-1 text-sm leading-6 text-gray-300">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto max-w-6xl px-4 py-16">
        <div className="grid gap-8 rounded-3xl border border-gray-200 bg-white p-7 md:grid-cols-[1fr_1fr] md:p-10">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-primary">Stay useful</p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">One useful guide, not a daily flood.</h2>
            <p className="mt-3 leading-7 text-gray-600">Get occasional new decision guides and material updates. No fake urgency, no recycled “top 10” lists.</p>
          </div>
          <div className="self-center">
            <EmailSubscribe title="Get new buying guides" subtitle="Occasional updates only. Unsubscribe anytime." />
            <div className="mt-3 text-xs leading-5 text-gray-500">
              By subscribing you agree to our <Link href="/privacy-policy" className="underline">Privacy Policy</Link>. We may receive a commission from qualifying purchases through links on this site.
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
