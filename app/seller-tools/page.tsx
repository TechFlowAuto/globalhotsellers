import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Offline Seller Tools for Amazon, Etsy & Shopify',
  description:
    'One-time-purchase calculators for landed cost, fees and profit, PPC break-even, inventory reorder points, and marketplace listing titles. Offline, no account required.',
  alternates: { canonical: '/seller-tools' },
}

const tools = [
  {
    name: 'LandedCost',
    price: '$15',
    summary: 'Calculate true landed cost with freight, insurance, duty, tax and supplier comparison.',
    href: 'https://payhip.com/b/7LGxO?utm_source=globalhotsellers&utm_medium=organic&utm_campaign=seller_tools',
    tag: 'Importing',
  },
  {
    name: 'StockPilot',
    price: '$15',
    summary: 'Turn sales velocity, supplier lead time and safety stock into reorder dates and quantities.',
    href: 'https://payhip.com/b/mInca?utm_source=globalhotsellers&utm_medium=organic&utm_campaign=seller_tools',
    tag: 'Inventory',
  },
  {
    name: 'AdMath',
    price: '$12',
    summary: 'Find the ACOS your margin can afford, the maximum CPC, and term-level bid actions.',
    href: 'https://payhip.com/b/Z0unK?utm_source=globalhotsellers&utm_medium=organic&utm_campaign=seller_tools',
    tag: 'Advertising',
  },
  {
    name: 'ShopFee',
    price: '$12',
    summary: 'Break down platform and payment fees to see net profit, margin, ROI and break-even price.',
    href: 'https://payhip.com/b/X5kH8?utm_source=globalhotsellers&utm_medium=organic&utm_campaign=seller_tools',
    tag: 'Profit',
  },
  {
    name: 'PriceTrack',
    price: '$9',
    summary: 'Check Amazon price history and set optional price-drop alerts from one browser extension.',
    href: 'https://payhip.com/b/fLomD?utm_source=globalhotsellers&utm_medium=organic&utm_campaign=seller_tools',
    tag: 'Research',
  },
]

export default function SellerToolsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-16">
          <p className="text-sm font-semibold uppercase tracking-widest text-primary-300">Seller toolkit</p>
          <h1 className="mt-3 max-w-3xl text-4xl font-bold md:text-5xl">
            Stop pricing, bidding and reordering from a guess.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-gray-300">
            Practical offline calculators for online sellers. Buy once, keep the file, and run the numbers without an account or subscription.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://payhip.com/b/LiA6h?utm_source=globalhotsellers&utm_medium=organic&utm_campaign=seller_tools_bundle"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:opacity-90"
            >
              Get the four-tool bundle — $39
            </a>
            <Link
              href="/free-cheat-sheet"
              className="rounded-lg border border-white/30 px-6 py-3 font-semibold text-white hover:bg-white/10"
            >
              Download the free 7-formula cheat sheet
            </Link>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-14">
        <div className="grid gap-6 md:grid-cols-2">
          {tools.map((tool) => (
            <article key={tool.name} className="rounded-2xl border border-gray-200 bg-white p-7 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary">{tool.tag}</span>
                  <h2 className="mt-2 text-2xl font-bold text-gray-900">{tool.name}</h2>
                </div>
                <span className="rounded-full bg-gray-100 px-3 py-1 text-sm font-bold text-gray-800">{tool.price}</span>
              </div>
              <p className="mt-4 min-h-16 text-gray-600">{tool.summary}</p>
              <a
                href={tool.href}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="mt-6 inline-flex rounded-lg bg-gray-900 px-5 py-2.5 font-semibold text-white hover:bg-gray-700"
              >
                View details on Payhip
              </a>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-2xl border border-amber-200 bg-amber-50 p-6 text-sm text-amber-900">
          These tools are calculation and writing aids, not accounting, tax, customs, legal or financial advice. Confirm platform fees, duty rates and listing rules against the current official source before acting.
        </div>
      </div>
    </div>
  )
}
