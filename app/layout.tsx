import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { Analytics } from '@vercel/analytics/react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'GlobalHotSellers - Discover What\'s Hot Worldwide',
  description: 'Find the hottest selling products from Amazon, eBay, AliExpress, Walmart and more. Global trends, local deals.',
  keywords: 'hot products, best sellers, trending items, amazon deals, ebay trending, global shopping',
  openGraph: {
    title: 'GlobalHotSellers - Discover What\'s Hot Worldwide',
    description: 'Find the hottest selling products from global marketplaces',
    type: 'website',
    locale: 'en_US',
    url: 'https://globalhotsellers.net',
    siteName: 'GlobalHotSellers',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'GlobalHotSellers - Discover What\'s Hot Worldwide',
    description: 'Find the hottest selling products from global marketplaces',
    creator: '@GlobalHotSellers',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-50`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <Analytics />
        {GA_ID ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        ) : null}
      </body>
    </html>
  )
}