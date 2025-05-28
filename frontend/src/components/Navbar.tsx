import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed w-full z-50 bg-dark/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
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
            <span className="ml-2 text-xl font-semibold text-white">
              Eclypse
            </span>
          </Link>

          {/* Navigation Items */}
          <div className="flex items-center space-x-8">
            <Link to="/about" className="text-white hover:text-gray-300">
              About Us
            </Link>
            <Link to="/waitlist" className="text-white hover:text-gray-300">
              Waitlist
            </Link>
            <Link to="/cart" className="text-white hover:text-gray-300">
              Cart
            </Link>
            <Link
              to="/buy"
              className="bg-white text-black px-4 py-2 rounded-md hover:bg-gray-200"
            >
              Buy
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
