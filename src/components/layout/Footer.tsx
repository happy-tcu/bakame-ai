import { Award, Mail, MapPin } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { label: 'About', href: '/about' },
      { label: 'Careers', href: '/careers' },
      { label: 'Contact', href: 'mailto:sales@bakame.org' },
    ],
    legal: [
      { label: 'Privacy Policy', href: '/privacy' },
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Data Processing', href: '/dpa' },
    ],
    programs: [
      { label: 'Education', href: '#programs' },
      { label: 'Health', href: '#programs' },
      { label: 'Civic', href: '#programs' },
    ],
  };

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/brand-assets/Icon White.svg" 
                alt="Bakame" 
                className="h-8 w-8 dark:block hidden"
              />
              <img 
                src="/brand-assets/Icon Black.svg" 
                alt="Bakame" 
                className="h-8 w-8 dark:hidden block"
              />
              <span className="text-xl font-bold text-foreground">Bakame AI</span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed mb-6">
              Voice-AI infrastructure for offline programs. Reaching communities that traditional digital services cannot.
            </p>
            <Badge className="bg-primary/10 text-primary border-primary/20">
              <Award className="mr-1.5 h-3 w-3" />
              CREATE Award 2025
            </Badge>
          </div>

          {/* Programs Column */}
          <div>
            <h4 className="text-foreground font-semibold mb-4 text-sm uppercase tracking-wider">Programs</h4>
            <ul className="space-y-3">
              {footerLinks.programs.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors no-blue-hover"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-foreground font-semibold mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors no-blue-hover"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h4 className="text-foreground font-semibold mb-4 text-sm uppercase tracking-wider">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a 
                    href={link.href} 
                    className="text-muted-foreground hover:text-foreground text-sm transition-colors no-blue-hover"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Contact Row */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 py-6 border-t border-border mb-6">
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a 
              href="mailto:sales@bakame.org" 
              className="flex items-center gap-2 hover:text-foreground transition-colors no-blue-hover"
            >
              <Mail className="h-4 w-4" />
              sales@bakame.org
            </a>
            <span className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              Dallas, TX
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-6 border-t border-border">
          <p className="text-muted-foreground text-sm">
            © {currentYear} Bakame AI. All rights reserved.
          </p>
          <div className="flex items-center gap-4 text-muted-foreground text-sm">
            <span>Built for the offline world</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
