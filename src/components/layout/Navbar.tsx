import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, X, ChevronDown, Calendar, Play, Users, GraduationCap, School, Building,
  Sparkles, BookOpen, Map, Info, MessageSquare, FileText, Home, LogOut, User, Phone, BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/components/auth/AuthContext';
import { AuthModal } from '@/components/auth/AuthModal';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from "@/lib/utils";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  const handleOpenAuth = (tab: 'login' | 'signup') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const getUserInitials = () => {
    if (!user) return '';
    const name = user.user_metadata?.name || user.email || '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
  };

  // Auto-open login modal when redirected from protected routes
  useEffect(() => {
    if (location.state?.openAuth) {
      handleOpenAuth('login');
      // Clear the state to prevent re-opening on navigation
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);


  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="grid grid-cols-3 items-center">
            {/* Left: Logo */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center" data-testid="link-home">
                <img 
                  src="/logo-white.svg" 
                  alt="Bakame AI" 
                  className="h-8 w-auto"
                />
              </Link>
              <Badge variant="outline" className="border-white/30 text-white">
                v2.0
              </Badge>
            </div>
            
            {/* Center: Navigation */}
            <div className="hidden md:flex items-center justify-center space-x-8">
              {/* Navigation links removed - hero contains primary CTA */}
            </div>

            {/* Right: Auth buttons */}
            <div className="hidden md:flex items-center justify-end space-x-4">
              {user ? (
                <>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-9 w-9 rounded-full" data-testid="button-user-menu">
                        <Avatar className="h-9 w-9">
                          <AvatarFallback className="bg-white text-black">
                            {getUserInitials()}
                          </AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end" forceMount>
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium leading-none">{user.user_metadata?.name || 'User'}</p>
                          <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={() => navigate('/demo-scheduling')} data-testid="menu-item-demo">
                        <Play className="mr-2 h-4 w-4" />
                        <span>Demo</span>
                      </DropdownMenuItem>
                      {user.user_metadata?.role === 'admin' && (
                        <DropdownMenuItem onClick={() => navigate('/admin')} data-testid="menu-item-admin">
                          <BarChart3 className="mr-2 h-4 w-4" />
                          <span>Admin Dashboard</span>
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={signOut} data-testid="menu-item-logout">
                        <LogOut className="mr-2 h-4 w-4" />
                        <span>Log out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button 
                    variant="ghost"
                    onClick={() => handleOpenAuth('login')}
                    data-testid="button-login"
                  >
                    Log in
                  </Button>
                  <Button 
                    onClick={() => handleOpenAuth('signup')}
                    className="bg-white text-black hover:bg-gray-200"
                    data-testid="button-signup"
                  >
                    Sign up
                  </Button>
                </>
              )}
            </div>

            {/* Mobile menu toggle */}
            <div className="flex md:hidden justify-end">
              <button onClick={toggleMenu} className="text-white" data-testid="button-menu-toggle">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col h-full pt-20 px-6 pb-6 overflow-y-auto">
            <div className="space-y-4">
              {user ? (
                <>
                  <div className="border-t border-white/10 pt-6 mt-6">
                    <div className="flex items-center space-x-3 mb-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-white text-black">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-white font-medium">{user.user_metadata?.name || 'User'}</p>
                        <p className="text-gray-400 text-sm">{user.email}</p>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => {
                        signOut();
                        closeMenu();
                      }}
                      variant="outline"
                      className="w-full mt-3"
                      data-testid="button-mobile-logout"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-3 mt-6">
                    <Button 
                      onClick={() => {
                        handleOpenAuth('login');
                        closeMenu();
                      }}
                      variant="outline"
                      className="w-full"
                      data-testid="button-mobile-login"
                    >
                      Log in
                    </Button>
                    
                    <Button 
                      onClick={() => {
                        handleOpenAuth('signup');
                        closeMenu();
                      }}
                      className="w-full bg-white text-black hover:bg-gray-200"
                      data-testid="button-mobile-signup"
                    >
                      Sign up
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
      />
    </>
  );
};

export default Navbar;