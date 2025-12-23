import { ArrowRight, Phone, Globe, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSectionProps {
  onGetStarted?: () => void;
}

const HeroSection = ({ onGetStarted }: HeroSectionProps) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Gradient Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-background" />
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-bl from-primary/10 to-transparent blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-primary/5 to-transparent blur-2xl" />
      </div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      
      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 md:py-32">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-8">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              <span className="text-sm font-medium text-foreground">The First Voice-AI Platform for Offline Programs</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-[1.1] mb-6">
              AI That Reaches
              <span className="block text-primary mt-2">Where Internet Cannot</span>
            </h1>
            
            {/* Subheadline */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 leading-relaxed">
              Deliver learning, health, and civic content through simple phone calls — no smartphone or internet required.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button 
                size="lg" 
                className="group text-base px-8"
                onClick={onGetStarted}
              >
                Partner With Us
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="text-base px-8"
                asChild
              >
                <a href="mailto:sales@bakame.org">
                  Contact Sales
                </a>
              </Button>
            </div>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-8 pt-8 border-t border-border">
              <div>
                <div className="text-2xl md:text-3xl font-bold text-foreground">4s</div>
                <div className="text-sm text-muted-foreground">Response time</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-foreground">100%</div>
                <div className="text-sm text-muted-foreground">Offline capable</div>
              </div>
              <div>
                <div className="text-2xl md:text-3xl font-bold text-foreground">10+</div>
                <div className="text-sm text-muted-foreground">Languages</div>
              </div>
            </div>
          </div>
          
          {/* Right Visual */}
          <div className="relative hidden lg:flex items-center justify-center">
            {/* Central Phone Icon */}
            <div className="relative">
              {/* Outer Glow Ring */}
              <div className="absolute inset-0 -m-16 rounded-full bg-gradient-to-r from-primary/20 to-primary/5 blur-2xl animate-pulse" />
              
              {/* Main Circle */}
              <div className="relative w-64 h-64 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/20 flex items-center justify-center">
                <Phone className="h-24 w-24 text-primary" strokeWidth={1.5} />
              </div>
              
              {/* Floating Feature Cards */}
              <div className="absolute -top-8 -left-24 bg-card border border-border rounded-xl p-4 shadow-lg animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Globe className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Offline First</div>
                    <div className="text-xs text-muted-foreground">No internet needed</div>
                  </div>
                </div>
              </div>
              
              <div className="absolute -bottom-4 -right-20 bg-card border border-border rounded-xl p-4 shadow-lg animate-float" style={{ animationDelay: '1s' }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Zap className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-foreground">Voice AI</div>
                    <div className="text-xs text-muted-foreground">Natural conversations</div>
                  </div>
                </div>
              </div>
              
              {/* Orbit Dots */}
              <div className="absolute inset-0 -m-8">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary/40" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary/30" />
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary/30" />
                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary/40" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
