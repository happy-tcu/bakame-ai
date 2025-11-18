import { Badge } from '@/components/ui/badge';

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-start">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <a href="/" className="flex items-center" data-testid="link-home">
              <img 
                src="/logo-white.svg" 
                alt="Bakame AI" 
                className="h-8 w-auto"
              />
            </a>
            <Badge variant="outline" className="border-white/30 text-white">
              v2.0
            </Badge>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;