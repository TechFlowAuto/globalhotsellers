'use client'

import { track } from '@vercel/analytics'
import type { ReactNode } from 'react'

type Props = {
  href: string
  productId?: string
  source: string
  className?: string
  children: ReactNode
  ariaLabel?: string
}

export default function AffiliateLink({
  href,
  productId,
  source,
  className,
  children,
  ariaLabel,
}: Props) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow sponsored"
      className={className}
      aria-label={ariaLabel}
      onClick={() =>
        track('affiliate_click', {
          productId: productId || 'unknown',
          source,
        })
      }
    >
      {children}
    </a>
  )
}
