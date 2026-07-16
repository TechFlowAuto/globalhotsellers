import EmailSubscribe from './EmailSubscribe'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8">
      <div className="container mx-auto px-4">
        {/* Newsletter Section */}
        <div className="max-w-2xl mx-auto mb-10 text-center">
          <h3 className="text-2xl font-bold mb-2">📬 Stay Updated</h3>
          <p className="text-gray-400 mb-6">
            Get weekly trending product alerts delivered to your inbox.
          </p>
          <EmailSubscribe variant="inline" />
        </div>

        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-2xl font-bold">GlobalHotSellers</h3>
              <p className="text-gray-400 mt-2">Discover What's Hot Worldwide</p>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400">
                &copy; {new Date().getFullYear()} GlobalHotSellers. All rights reserved.
              </p>
              <p className="text-gray-500 text-sm mt-1">
                Tracking global trends from Amazon, eBay, AliExpress, and more.
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <a href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="/about" className="text-gray-400 hover:text-white transition-colors">
              About Us
            </a>
            <a href="/contact" className="text-gray-400 hover:text-white transition-colors">
              Contact
            </a>
          </div>
          <p>
            This is a demo project. Product data is for demonstration purposes only.
          </p>
          <p className="mt-1">
            Not affiliated with Amazon, eBay, AliExpress, or any other marketplace.
          </p>
          <p className="mt-2 text-gray-400">
            As an Amazon Associate I earn from qualifying purchases.
          </p>
        </div>
      </div>
    </footer>
  )
}