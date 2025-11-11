import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, X, ChevronDown, Calendar, Play, Users, GraduationCap, School, Building,
  Sparkles, BookOpen, Map, Info, MessageSquare, FileText, Home, LogOut, User, Phone
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
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const aboutRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsMobileAboutOpen(false);
  };

  const handleOpenAuth = (tab: 'login' | 'signup') => {
    setAuthModalTab(tab);
    setIsAuthModalOpen(true);
  };

  const getUserInitials = () => {
    if (!user) return '';
    const name = user.user_metadata?.name || user.email || '';
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2) || 'U';
  };

  // Handle click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (aboutRef.current && !aboutRef.current.contains(event.target as Node)) {
        setIsAboutOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Auto-open login modal when redirected from protected routes
  useEffect(() => {
    if (location.state?.openAuth) {
      handleOpenAuth('login');
      // Clear the state to prevent re-opening on navigation
      window.history.replaceState({}, document.title);
    }
  }, [location.state]);


  const aboutItems = [
    {
      title: "Team",
      href: "/team",
      icon: Users,
      description: "Meet the people behind Bakame AI"
    },
    {
      title: "Contact",
      href: "/contact",
      icon: MessageSquare,
      description: "Get in touch with us"
    },
    {
      title: "Blog",
      href: "/blog",
      icon: FileText,
      description: "Latest news and insights"
    },
    {
      title: "Press",
      href: "/press",
      icon: FileText,
      description: "Media resources and press kit"
    }
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
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
            
            <div className="hidden md:flex items-center space-x-8">
              <Link 
                to="/" 
                className={cn(
                  "text-gray-300 hover:text-white transition-colors",
                  location.pathname === "/" && "text-white"
                )}
                data-testid="link-home-nav"
              >
                Home
              </Link>

              <Link 
                to="/for-students" 
                className={cn(
                  "text-gray-300 hover:text-white transition-colors",
                  location.pathname === "/for-students" && "text-white"
                )}
                data-testid="link-for-students"
              >
                For Students
              </Link>

              <Link 
                to="/for-teachers" 
                className={cn(
                  "text-gray-300 hover:text-white transition-colors",
                  location.pathname === "/for-teachers" && "text-white"
                )}
                data-testid="link-for-teachers"
              >
                For Teachers
              </Link>

              <Link 
                to="/for-schools" 
                className={cn(
                  "text-gray-300 hover:text-white transition-colors",
                  location.pathname === "/for-schools" && "text-white"
                )}
                data-testid="link-for-schools"
              >
                For Schools
              </Link>

              <Link 
                to="/features" 
                className={cn(
                  "text-gray-300 hover:text-white transition-colors",
                  location.pathname === "/features" && "text-white"
                )}
                data-testid="link-features"
              >
                All Features
              </Link>

              <Link 
                to="/roadmap" 
                className={cn(
                  "text-gray-300 hover:text-white transition-colors",
                  location.pathname === "/roadmap" && "text-white"
                )}
                data-testid="link-roadmap"
              >
                Roadmap
              </Link>

              <Link 
                to="/demo-scheduling" 
                className={cn(
                  "text-gray-300 hover:text-white transition-colors",
                  location.pathname === "/demo-scheduling" && "text-white"
                )}
                data-testid="link-schedule-demo"
              >
                Schedule Demo
              </Link>

              <Link 
                to="/contact" 
                className={cn(
                  "text-gray-300 hover:text-white transition-colors",
                  location.pathname === "/contact" && "text-white"
                )}
                data-testid="link-contact-sales"
              >
                Contact Sales
              </Link>

              <div ref={aboutRef} className="relative">
                <button
                  onClick={() => setIsAboutOpen(!isAboutOpen)}
                  className={cn(
                    "flex items-center text-gray-300 hover:text-white transition-colors",
                    isAboutOpen && "text-white"
                  )}
                >
                  About
                  <ChevronDown className={cn(
                    "ml-1 h-4 w-4 transition-transform",
                    isAboutOpen && "rotate-180"
                  )} />
                </button>
                {isAboutOpen && (
                  <div className="absolute top-full left-0 mt-2 w-[400px] bg-gray-900/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-xl">
                    <div className="p-6 space-y-4">
                      {aboutItems.map((item) => (
                        <Link
                          key={item.href}
                          to={item.href}
                          onClick={() => setIsAboutOpen(false)}
                          className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                          data-testid={`link-${item.href.substring(1)}`}
                        >
                          <item.icon className="h-5 w-5 text-gray-400 mt-0.5 group-hover:text-white" />
                          <div>
                            <div className="text-white font-medium group-hover:text-gray-300 transition-colors">
                              {item.title}
                            </div>
                            <div className="text-gray-400 text-sm">
                              {item.description}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>


              
              {user ? (
                <>
                  <Button 
                    onClick={() => navigate('/demo-scheduling')} 
                    className="bg-white text-black hover:bg-gray-200"
                    data-testid="button-schedule-demo"
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    Schedule Demo
                  </Button>
                  
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
                      <DropdownMenuItem onClick={() => navigate('/demo-scheduling')} data-testid="menu-item-schedule-demo">
                        <Calendar className="mr-2 h-4 w-4" />
                        <span>Schedule Demo</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/contact')} data-testid="menu-item-contact-sales">
                        <Phone className="mr-2 h-4 w-4" />
                        <span>Contact Sales</span>
                      </DropdownMenuItem>
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

            <button onClick={toggleMenu} className="md:hidden text-white" data-testid="button-menu-toggle">
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl md:hidden">
          <div className="flex flex-col h-full pt-20 px-6 pb-6 overflow-y-auto">
            <div className="space-y-4">
              <Link 
                to="/" 
                onClick={closeMenu} 
                className="block text-xl text-white hover:text-gray-400 transition-colors"
                data-testid="link-mobile-home"
              >
                Home
              </Link>

              <Link 
                to="/for-students" 
                onClick={closeMenu} 
                className="block text-xl text-white hover:text-gray-400 transition-colors"
                data-testid="link-mobile-for-students"
              >
                For Students
              </Link>

              <Link 
                to="/for-teachers" 
                onClick={closeMenu} 
                className="block text-xl text-white hover:text-gray-400 transition-colors"
                data-testid="link-mobile-for-teachers"
              >
                For Teachers
              </Link>

              <Link 
                to="/for-schools" 
                onClick={closeMenu} 
                className="block text-xl text-white hover:text-gray-400 transition-colors"
                data-testid="link-mobile-for-schools"
              >
                For Schools
              </Link>

              <Link 
                to="/features" 
                onClick={closeMenu} 
                className="block text-xl text-white hover:text-gray-400 transition-colors"
                data-testid="link-mobile-features"
              >
                All Features
              </Link>

              <Link 
                to="/roadmap" 
                onClick={closeMenu} 
                className="block text-xl text-white hover:text-gray-400 transition-colors"
                data-testid="link-mobile-roadmap"
              >
                Roadmap
              </Link>

              <Link 
                to="/demo-scheduling" 
                onClick={closeMenu} 
                className="block text-xl text-white hover:text-gray-400 transition-colors"
                data-testid="link-mobile-schedule-demo"
              >
                Schedule Demo
              </Link>

              <Link 
                to="/contact" 
                onClick={closeMenu} 
                className="block text-xl text-white hover:text-gray-400 transition-colors"
                data-testid="link-mobile-contact-sales"
              >
                Contact Sales
              </Link>

              {/* Mobile About Dropdown */}
              <div>
                <button
                  onClick={() => setIsMobileAboutOpen(!isMobileAboutOpen)}
                  className="flex items-center justify-between w-full text-xl text-white hover:text-gray-400 transition-colors"
                >
                  About
                  <ChevronDown className={cn(
                    "h-5 w-5 transition-transform",
                    isMobileAboutOpen && "rotate-180"
                  )} />
                </button>
                {isMobileAboutOpen && (
                  <div className="mt-4 ml-4 space-y-3">
                    {aboutItems.map((item) => (
                      <Link
                        key={item.href}
                        to={item.href}
                        onClick={closeMenu}
                        className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors"
                        data-testid={`link-mobile-${item.href.substring(1)}`}
                      >
                        <item.icon className="h-4 w-4" />
                        <span>{item.title}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>


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
                        navigate('/demo-scheduling');
                        closeMenu();
                      }}
                      className="w-full bg-white text-black hover:bg-gray-200"
                      data-testid="button-mobile-schedule-demo"
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      Schedule Demo
                    </Button>
                    
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