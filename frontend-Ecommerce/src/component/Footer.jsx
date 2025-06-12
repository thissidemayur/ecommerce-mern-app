import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-white text-gray-800 border-t mt-12">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* Brand Info */}
        <div>
          <h2 className="text-xl font-bold mb-2">MayurWear</h2>
          <p className="text-sm text-gray-600">
            Elevate your everyday style with comfort and confidence.
          </p>
        </div>

        {/* Shop Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Shop</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/men" className="hover:underline">Men</Link></li>
            <li><Link to="/women" className="hover:underline">Women</Link></li>
            <li><Link to="/kids" className="hover:underline">Kids</Link></li>
            <li><Link to="/accessories" className="hover:underline">Accessories</Link></li>
          </ul>
        </div>

        {/* Support Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/contact" className="hover:underline">Contact Us</Link></li>
            <li><Link to="/returns" className="hover:underline">Returns & Exchanges</Link></li>
            <li><Link to="/shipping" className="hover:underline">Shipping Info</Link></li>
            <li><Link to="/faqs" className="hover:underline">FAQs</Link></li>
          </ul>
        </div>

        {/* Social Media Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Follow Us</h3>
          <div className="flex flex-col space-y-2 text-sm text-gray-600">
            <Link to="#" className="hover:text-black">Instagram</Link>
            <Link to="#" className="hover:text-black">Facebook</Link>
            <Link to="#" className="hover:text-black">Twitter</Link>
          </div>
        </div>

      </div>

      {/* Footer Bottom Bar */}
      <div className="border-t py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} MayurWear. All rights reserved.
      </div>
    </footer>
  );
}
