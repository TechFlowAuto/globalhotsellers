import type { Metadata } from 'next'
import Link from 'next/link'
import NewsletterSignup from '@/components/NewsletterSignup'

export const metadata: Metadata = {
  title: 'Free Seller Cheat Sheet — 7 Formulas Every Online Seller Needs',
  description:
    'Free one-page reference: net profit, break-even ACOS, landed cost, reorder point, ROI, fee load and bulk pricing — with worked examples.',
  alternates: { canonical: '/free-cheat-sheet' },
}

export default function FreeCheatSheet() {
  return (
    <div className="max-w-3xl mx-auto px-4 py-14">
      <p className="text-sm font-semibold text-primary uppercase tracking-wide">Free download</p>
      <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
        7 Formulas Every Online Seller Needs
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        A one-page reference for pricing, ads, imports and inventory. Keep it open while you work.
      </p>

      <ul className="mt-8 space-y-3 text-gray-700">
        {[
          'Net profit per order — and why volume never fixes a negative number',
          'Break-even ACOS — the ceiling your margin can actually afford',
          'True landed cost per unit — price off this, never off the invoice',
          'Reorder point — when to order, before the stockout',
          'ROI on ad spend, fee load, and bulk pricing targets',
        ].map((t) => (
          <li key={t} className="flex gap-3">
            <span className="text-primary font-bold">✓</span>
            <span>{t}</span>
          </li>
        ))}
      </ul>

      <a
        href="/seller-cheat-sheet-7-formulas.pdf"
        className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-6 py-3 font-semibold text-white hover:opacity-90"
      >
        <span>Download the free cheat sheet (PDF)</span>
      </a>

      <NewsletterSignup />

      <div className="mt-10 text-sm text-gray-500">
        Want the maths done for you? See the{' '}
        <Link href="/blog" className="text-primary underline">
          buyer guides
        </Link>{' '}
        or the{' '}
        <a href="https://payhip.com/b/7LGxO" className="text-primary underline" target="_blank" rel="noopener noreferrer">
          seller toolkit
        </a>
        .
      </div>
    </div>
  )
}