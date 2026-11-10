import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import type { Guide } from '@/data/guides'

export default function GuideCard({ guide }: { guide: Guide }) {
  return (
    <Link
      href={`/guides/${guide.slug}`}
      className="group flex h-full flex-col rounded-2xl border border-gray-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lg"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-bold uppercase tracking-[0.16em] text-primary">{guide.eyebrow}</span>
        <ArrowUpRight className="h-5 w-5 text-gray-400 transition group-hover:text-primary" />
      </div>
      <h2 className="mt-4 text-xl font-bold leading-snug text-gray-900 group-hover:text-primary">{guide.title}</h2>
      <p className="mt-3 flex-1 text-sm leading-6 text-gray-600">{guide.description}</p>
      <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4 text-xs text-gray-500">
        <span>{guide.category}</span>
        <span>{guide.readTime} · Updated {guide.updatedAt}</span>
      </div>
    </Link>
  )
}
