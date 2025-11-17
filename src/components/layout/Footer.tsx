import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand Section */}
          <div className="flex items-center">
            <img 
              src="/logo-white.svg" 
              alt="Bakame AI" 
              className="h-8 w-auto"
            />
          </div>

          {/* Footer Links */}
          <div className="flex items-center gap-8">
            <Link 
              to="/press" 
              className="text-gray-400 hover:text-white transition-colors text-sm"
              data-testid="footer-link-press"
            >
              Press
            </Link>
            <Link 
              to="/privacy" 
              className="text-gray-400 hover:text-white transition-colors text-sm"
              data-testid="footer-link-privacy"
            >
              Privacy
            </Link>
            <Link 
              to="/terms" 
              className="text-gray-400 hover:text-white transition-colors text-sm"
              data-testid="footer-link-terms"
            >
              Terms
            </Link>
          </div>

          {/* Copyright */}
          <p className="text-gray-400 text-sm">
            © 2025 Bakame AI
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
