import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, X, ChevronDown, Calendar, Play, Users, GraduationCap, School, Building,
  Sparkles, BookOpen, Map, Info, MessageSquare, FileText, Home, LogOut, User
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ThemeToggle } from '@/components/theme/ThemeToggle';
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
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsMobileSolutionsOpen(false);
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

  const solutionsItems = [
    {
      title: "For Students",
      href: "/for-students",
      icon: GraduationCap,
      description: "Interactive AI learning for student success"
    },
    {
      title: "For Teachers", 
      href: "/for-teachers",
      icon: Users,
      description: "Empower educators with AI tools"
    },
    {
      title: "For Schools",
      href: "/for-schools", 
      icon: School,
      description: "Enterprise solutions for institutions"
    }
  ];

  const additionalSolutionsItems = [
    {
      title: "All Features",
      href: "/features",
      icon: Sparkles,
      description: "Explore complete feature set"
    },
    {
      title: "Roadmap",
      href: "/roadmap",
      icon: Map,
      description: "See what's coming next"
    }
  ];

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

              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent text-gray-300 hover:text-white hover:bg-transparent data-[state=open]:bg-transparent">
                      Solutions
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[400px] bg-gray-900/95 backdrop-blur-xl border border-white/10">
                        <div className="p-6 space-y-4">
                          {solutionsItems.map((item) => (
                            <Link
                              key={item.href}
                              to={item.href}
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
                          
                          <div className="border-t border-white/10 pt-4">
                            {additionalSolutionsItems.map((item) => (
                              <Link
                                key={item.href}
                                to={item.href}
                                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors group"
                                data-testid={`link-${item.href.substring(1)}`}
                              >
                                <item.icon className="h-5 w-5 text-gray-500 mt-0.5 group-hover:text-white" />
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
                      </div>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <Link 
                to="/try" 
                className={cn(
                  "text-gray-300 hover:text-white transition-colors",
                  location.pathname === "/try" && "text-white"
                )}
                data-testid="link-try-demo"
              >
                Try Demo
              </Link>

              <Link 
                to="/pricing" 
                className={cn(
                  "text-gray-300 hover:text-white transition-colors",
                  location.pathname === "/pricing" && "text-white"
                )}
                data-testid="link-pricing"
              >
                Pricing
              </Link>

              <NavigationMenu>
                <NavigationMenuList>
                  <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-transparent text-gray-300 hover:text-white hover:bg-transparent data-[state=open]:bg-transparent">
                      About
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <div className="w-[400px] bg-gray-900/95 backdrop-blur-xl border border-white/10">
                        <div className="p-6 space-y-4">
                          {aboutItems.map((item) => (
                            <Link
                              key={item.href}
                              to={item.href}
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
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>

              <ThemeToggle />
              
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
                      <DropdownMenuItem onClick={() => navigate('/try')} data-testid="menu-item-try-demo">
                        <Play className="mr-2 h-4 w-4" />
                        <span>Try Demo</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => navigate('/pricing')} data-testid="menu-item-pricing">
                        <Sparkles className="mr-2 h-4 w-4" />
                        <span>Pricing</span>
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

              {/* Mobile Solutions Dropdown */}
              <div>
                <button
                  onClick={() => setIsMobileSolutionsOpen(!isMobileSolutionsOpen)}
                  className="flex items-center justify-between w-full text-xl text-white hover:text-gray-400 transition-colors"
                >
                  Solutions
                  <ChevronDown className={cn(
                    "h-5 w-5 transition-transform",
                    isMobileSolutionsOpen && "rotate-180"
                  )} />
                </button>
                {isMobileSolutionsOpen && (
                  <div className="mt-4 ml-4 space-y-3">
                    {[...solutionsItems, ...additionalSolutionsItems].map((item) => (
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

              <Link 
                to="/try" 
                onClick={closeMenu} 
                className="block text-xl text-white hover:text-gray-400 transition-colors"
                data-testid="link-mobile-try-demo"
              >
                Try Demo
              </Link>

              <Link 
                to="/pricing" 
                onClick={closeMenu} 
                className="block text-xl text-white hover:text-gray-400 transition-colors"
                data-testid="link-mobile-pricing"
              >
                Pricing
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

              <div className="pt-4 border-t border-white/10">
                <ThemeToggle />
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