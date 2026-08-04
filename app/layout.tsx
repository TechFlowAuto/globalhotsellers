import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { siteConfig } from '@/site.config'

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

const inter = Inter({ subsets: ['latin'] })

const SITE_NAME = siteConfig.name
export const metadata: Metadata = {
  title: {
    default: `${SITE_NAME} - ${siteConfig.tagline}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: siteConfig.tagline,
  keywords: 'hot products, best sellers, trending items, deals, global shopping',
  openGraph: {
    title: `${SITE_NAME} - ${siteConfig.tagline}`,
    description: siteConfig.tagline,
    type: 'website',
    locale: 'en_US',
    url: siteConfig.domain,
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} - ${siteConfig.tagline}`,
    description: siteConfig.tagline,
    creator: '@GlobalHotSellers',
  },
  metadataBase: new URL(siteConfig.domain),
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