import Link from 'next/link'
import EmailSubscribe from './EmailSubscribe'
import { siteConfig } from '@/site.config'

export default function Footer() {
  return (
    <footer className="bg-gray-900 pb-8 pt-12 text-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <h3 className="text-2xl font-bold">Occasional useful updates</h3>
          <p className="mb-6 mt-2 text-gray-400">New buying guides and material product updates. No daily flood.</p>
          <EmailSubscribe />
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-start">
            <div>
              <h3 className="text-2xl font-bold">{siteConfig.name}</h3>
              <p className="mt-2 text-gray-400">Practical buying guides for everyday tech and small-space living.</p>
            </div>
            <div className="grid grid-cols-2 gap-x-10 gap-y-2 text-sm text-gray-400">
              <Link href="/guides" className="hover:text-white">Buying Guides</Link>
              <Link href="/products" className="hover:text-white">Products</Link>
              <Link href="/editorial-policy" className="hover:text-white">Editorial Policy</Link>
              <Link href="/how-we-test" className="hover:text-white">Review Method</Link>
              <Link href="/affiliate-disclosure" className="hover:text-white">Affiliate Disclosure</Link>
              <Link href="/about" className="hover:text-white">About</Link>
              <Link href="/contact" className="hover:text-white">Contact</Link>
              <Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-gray-800 pt-6 text-center text-xs leading-6 text-gray-500">
          <p>© {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
          <p className="mt-1">As an Amazon Associate, we earn from qualifying purchases. Product information and prices can change; verify details on the seller listing before buying.</p>
        </div>
      </div>
    </footer>
  )
}
