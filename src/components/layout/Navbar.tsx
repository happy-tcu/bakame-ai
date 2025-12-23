import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Products', href: '#products' },
    { label: 'Solutions', href: '#solutions' },
    { label: 'Research', href: '#research' },
    { label: 'Partners', href: '#partners' },
  ];

  return (
    <nav className="fixed top-0 w-full z-50 bg-black/50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center no-blue-hover" data-testid="link-home">
            <img 
              src="/logo-white.svg" 
              alt="Bakame AI" 
              className="h-6 w-auto"
            />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-gray-300 hover:text-white transition-colors font-light no-blue-hover"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              className="text-sm text-white px-5 py-2 rounded-full border border-white/30 hover:bg-white/10 transition-all font-light no-blue-hover"
            >
              Book a Demo →
            </a>
            <a
              href="#login"
              className="text-sm text-gray-300 hover:text-white transition-colors font-light no-blue-hover"
            >
              Log In
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10 pt-4">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="text-gray-300 hover:text-white transition-colors font-light"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#contact"
                className="text-white px-5 py-2 rounded-full border border-white/30 hover:bg-white/10 transition-all text-center mt-2"
              >
                Book a Demo →
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
