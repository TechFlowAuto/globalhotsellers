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
  function handleClick() {
    const path = window.location.pathname
    track('affiliate_click', {
      productId: productId || 'unknown',
      source,
    })

    if (!path.startsWith('/guides')) return

    const payload = JSON.stringify({
      path,
      productId: productId || 'unknown',
      source,
      referrer: document.referrer,
    })

    if (navigator.sendBeacon) {
      navigator.sendBeacon('/api/guide-click', new Blob([payload], { type: 'application/json' }))
    } else {
      fetch('/api/guide-click', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: payload,
        keepalive: true,
      }).catch(() => undefined)
    }
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow sponsored"
      className={className}
      aria-label={ariaLabel}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}
