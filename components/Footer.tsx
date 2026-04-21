export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-4">
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
        
        <div className="mt-8 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>
            This is a demo project. Product data is for demonstration purposes only.
          </p>
          <p className="mt-1">
            Not affiliated with Amazon, eBay, AliExpress, or any other marketplace.
          </p>
        </div>
      </div>
    </footer>
  )
}