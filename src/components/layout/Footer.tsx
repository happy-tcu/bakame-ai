import { Link } from 'react-router-dom';
import { Sparkles, Map, Info, Users, MessageSquare, FileText, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Section */}
          <div className="col-span-1">
            <div className="flex items-center mb-4">
              <img 
                src="/logo-white.svg" 
                alt="Bakame AI" 
                className="h-8 w-auto"
              />
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Revolutionary language education that transforms speaking confidence through AI tutoring.
            </p>
          </div>

          {/* Solutions */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Solutions</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/features" 
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                  data-testid="footer-link-features"
                >
                  <Sparkles className="h-4 w-4" />
                  <span>All Features</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/roadmap" 
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                  data-testid="footer-link-roadmap"
                >
                  <Map className="h-4 w-4" />
                  <span>Roadmap</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/about" 
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                  data-testid="footer-link-about"
                >
                  <Info className="h-4 w-4" />
                  <span>About Us</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/team" 
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                  data-testid="footer-link-team"
                >
                  <Users className="h-4 w-4" />
                  <span>Team</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/blog" 
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                  data-testid="footer-link-blog"
                >
                  <FileText className="h-4 w-4" />
                  <span>Blog</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/press" 
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                  data-testid="footer-link-press"
                >
                  <FileText className="h-4 w-4" />
                  <span>Press</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4 text-white">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/contact" 
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                  data-testid="footer-link-contact"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>Contact</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/support" 
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                  data-testid="footer-link-support"
                >
                  <Phone className="h-4 w-4" />
                  <span>Support</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/privacy" 
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                  data-testid="footer-link-privacy"
                >
                  <FileText className="h-4 w-4" />
                  <span>Privacy</span>
                </Link>
              </li>
              <li>
                <Link 
                  to="/terms" 
                  className="text-gray-400 hover:text-white transition-colors flex items-center space-x-2"
                  data-testid="footer-link-terms"
                >
                  <FileText className="h-4 w-4" />
                  <span>Terms</span>
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2025 Bakame AI. All rights reserved.
            </p>
            <p className="text-gray-400 text-sm mt-4 md:mt-0">
              Kigali, Rwanda | Revolutionizing offline education
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
