
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-black border-t border-yalla-dark-gray py-12">
      <div className="container px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="flex flex-col space-y-3">
            <h3 className="text-xl font-bold text-white">
              Yalla<span className="text-yalla-green">Fit</span>
            </h3>
            <p className="text-sm text-gray-400">
              Unite, Grow, Strong - Your platform to connect with fitness
              coaches and achieve your health goals.
            </p>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium text-white">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="text-gray-400 hover:text-yalla-green">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-yalla-green">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-yalla-green">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-yalla-green">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium text-white">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/privacy-policy" className="text-gray-400 hover:text-yalla-green">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-gray-400 hover:text-yalla-green">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/cookies" className="text-gray-400 hover:text-yalla-green">
                  Cookie Policy
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-medium text-white">Connect</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-yalla-green">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/support" className="text-gray-400 hover:text-yalla-green">
                  Support
                </Link>
              </li>
              <li>
                <a href="mailto:info@yallafit.com" className="text-gray-400 hover:text-yalla-green">
                  info@yallafit.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-6 border-t border-yalla-dark-gray text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} YallaFit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
