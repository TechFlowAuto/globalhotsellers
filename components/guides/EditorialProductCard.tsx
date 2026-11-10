import Link from 'next/link'
import { Check, ExternalLink } from 'lucide-react'
import type { Product } from '@/data/products'
import type { ProductVerdict } from '@/data/guides'
import AffiliateLink from '@/components/AffiliateLink'

export default function EditorialProductCard({
  product,
  verdict,
  guideSlug,
}: {
  product: Product
  verdict: ProductVerdict
  guideSlug: string
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <div className="grid md:grid-cols-[210px_1fr]">
        <Link href={`/product/${product.id}`} className="block bg-gray-50">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="h-52 w-full object-contain p-6 md:h-full"
            loading="lazy"
          />
        </Link>
        <div className="p-6">
          <div className="mb-3 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              {verdict.award}
            </span>
            <span className="text-xs text-gray-500">Check the current rating and seller on Amazon</span>
          </div>
          <h3 className="text-xl font-bold leading-snug text-gray-900">
            {product.title}
          </h3>
          <p className="mt-2 text-sm font-semibold text-gray-700">
            Best for: {verdict.bestFor}
          </p>
          <div className="mt-4 grid gap-4 text-sm sm:grid-cols-2">
            <div>
              <p className="flex items-center gap-1 font-semibold text-gray-900">
                <Check className="h-4 w-4 text-green-600" /> Why it wins
              </p>
              <p className="mt-1 leading-relaxed text-gray-600">{verdict.whyItWins}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-900">The trade-off</p>
              <p className="mt-1 leading-relaxed text-gray-600">{verdict.tradeoff}</p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <AffiliateLink
              href={product.affiliateUrl}
              productId={product.id}
              source={`editorial_guide:${guideSlug}`}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary-600"
              ariaLabel={`Check current price for ${product.title} on Amazon`}
            >
              Check current price <ExternalLink className="h-4 w-4" />
            </AffiliateLink>
            <Link href={`/product/${product.id}`} className="text-sm font-semibold text-gray-700 underline decoration-gray-300 underline-offset-4 hover:text-primary">
              Read product details
            </Link>
          </div>
          <p className="mt-3 text-xs text-gray-500">
            Price, rating and availability are intentionally not cached here. Confirm them on the live Amazon listing before buying.
          </p>
        </div>
      </div>
    </article>
  )
}
