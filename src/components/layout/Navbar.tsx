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
  const [isMobileSolutionsOpen, setIsMobileSolutionsOpen] = useState(false);
  const [isMobileAboutOpen, setIsMobileAboutOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authModalTab, setAuthModalTab] = useState<'login' | 'signup'>('login');
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const solutionsRef = useRef<HTMLDivElement>(null);
  const aboutRef = useRef<HTMLDivElement>(null);

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

  // Handle click outside to close dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (solutionsRef.current && !solutionsRef.current.contains(event.target as Node)) {
        setIsSolutionsOpen(false);
      }
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

  const solutionsItems = [
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
          <div className="flex items-center justify-start">
            {/* Logo */}
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
          </div>
        </div>
      </nav>
      
      <AuthModal 
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        defaultTab={authModalTab}
      />
    </>
  );
};

export default Navbar;