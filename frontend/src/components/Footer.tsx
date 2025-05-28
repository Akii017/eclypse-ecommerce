import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {/* Logo and Copyright */}
          <div>
            <Link to="/" className="flex items-center">
              <div className="w-8 h-8">
                <svg
                  viewBox="0 0 40 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="20" cy="20" r="20" fill="white" />
                  <path
                    d="M20 5C11.7157 5 5 11.7157 5 20C5 28.2843 11.7157 35 20 35C28.2843 35 35 28.2843 35 20"
                    stroke="black"
                    strokeWidth="10"
                  />
                </svg>
              </div>
              <span className="ml-2 text-xl font-semibold">Eclypse</span>
            </Link>
            <p className="mt-4 text-sm text-gray-400">
              © 2024 Eclypse. All rights reserved.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider">
              Navigation
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link to="/buy" className="text-gray-400 hover:text-white">
                  Buy
                </Link>
              </li>
              <li>
                <Link
                  to="/customers"
                  className="text-gray-400 hover:text-white"
                >
                  Our Customers
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium uppercase tracking-wider">
              Contact
            </h3>
            <ul className="space-y-2">
              <li className="text-gray-400">
                <a href="tel:+911234567890" className="hover:text-white">
                  +91 123-456-7890
                </a>
              </li>
              <li className="text-gray-400">
                <a href="mailto:eclypse@gmail.com" className="hover:text-white">
                  eclypse@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
