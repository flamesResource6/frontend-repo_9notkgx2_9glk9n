export default function Footer() {
  return (
    <footer className="mt-auto bg-white border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-4 text-sm text-gray-700">
        <div>
          <h4 className="text-gray-900 font-semibold">ROME</h4>
          <p className="mt-2 text-gray-600">A social world built with privacy at its core.</p>
        </div>
        <div>
          <h5 className="text-gray-900 font-semibold">Company</h5>
          <ul className="mt-2 space-y-2">
            <li><a href="/mission" className="hover:underline">Mission</a></li>
            <li><a href="/about" className="hover:underline">About</a></li>
            <li><a href="/features" className="hover:underline">Features</a></li>
            <li><a href="/download" className="hover:underline">Download</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-gray-900 font-semibold">Legal</h5>
          <ul className="mt-2 space-y-2">
            <li><a href="/legal/privacy" className="hover:underline">Privacy Policy</a></li>
            <li><a href="/legal/terms" className="hover:underline">Terms of Service</a></li>
            <li><a href="/legal/cookies" className="hover:underline">Cookie Policy</a></li>
          </ul>
        </div>
        <div>
          <h5 className="text-gray-900 font-semibold">Contact</h5>
          <p className="mt-2 text-gray-600">Have questions? Send us a message.</p>
          <a href="/contact" className="inline-block mt-3 rounded-lg bg-gray-900 text-white px-4 py-2">Contact Us</a>
        </div>
      </div>
      <div className="border-t border-gray-200 py-4 text-center text-xs text-gray-500">© {new Date().getFullYear()} ROME Labs, Inc. All rights reserved.</div>
    </footer>
  )
}
