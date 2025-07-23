
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoModal from "@/components/VideoModal";
import TypingAnimation from "@/components/TypingAnimation";
import AnimatedCounter from "@/components/AnimatedCounter";
import EarlyAccessModal from "@/components/EarlyAccessModal";

const Index = () => {
  const [currentProgress] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isEarlyAccessModalOpen, setIsEarlyAccessModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    setIsEarlyAccessModalOpen(true);
  };

  const handleWatchDemo = () => {
    setIsVideoModalOpen(true);
  };

  const handleScheduleDemo = () => {
    window.location.href = 'mailto:happy@bakame.org?subject=Schedule a Demo Request&body=Hello, I would like to schedule a demo of Bakame AI.';
  };

  const handleJoinContribution = () => {
    navigate('/ivr');
  };

  const partners = [{
    name: "Institute for Entrepreneurship and Innovation (at TCU)",
    url: "https://www.neeley.tcu.edu/centers/institute-for-entrepreneurship-and-innovation/create"
  }, {
    name: "Shaddock Seed Fund",
    url: "https://magazine.tcu.edu/fall-2017/shaddock-venture-capital-fund-entrepreneurs-investors/"
  }, {
    name: "Values and Ventures",
    url: "https://valuesandventures.com/"
  }];

  return (
    <>
      <div className="min-h-screen bg-background text-foreground relative overflow-hidden">
        {/* Navigation */}
        <nav className="relative z-20 flex justify-between items-center p-6 md:p-8">
          <div className="text-2xl font-bold">Bakame AI</div>
          <div className="hidden md:flex space-x-8">
            <a href="/solutions/education" className="text-muted-foreground hover:text-foreground transition-colors">Education</a>
            <a href="/solutions/enterprise" className="text-muted-foreground hover:text-foreground transition-colors">Enterprise</a>
            <a href="/solutions/government" className="text-muted-foreground hover:text-foreground transition-colors">Government</a>
            <a href="/ivr" className="text-muted-foreground hover:text-foreground transition-colors">IVR Demo</a>
            <a href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a>
            <a href="mailto:happy@bakame.org" className="text-muted-foreground hover:text-foreground transition-colors">Contact</a>
          </div>
          <div className="md:hidden">
            <button className="text-muted-foreground hover:text-foreground">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </nav>

        <div className="relative z-10">
          {/* Hero Section */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold mb-6 sm:mb-8 leading-tight bg-gradient-to-r from-foreground via-accent to-secondary bg-clip-text text-transparent">
              Bakame AI
            </h1>
            
            <div className="mb-6">
              <TypingAnimation 
                text="AI that works offline. Communication that works everywhere." 
                speed={100} 
                pauseDuration={2000} 
                className="bg-gradient-to-r from-accent via-secondary to-accent bg-clip-text text-transparent text-2xl sm:text-3xl lg:text-4xl font-semibold" 
              />
            </div>
            
            <p className="text-lg sm:text-xl text-muted-foreground mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
              Advanced IVR systems powered by AI that bring communication and learning to everyone, regardless of internet connectivity or infrastructure.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button 
                onClick={handleGetStarted} 
                className="group bg-gradient-to-r from-accent to-secondary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              >
                <span className="flex items-center justify-center">
                  Get Early Access
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
              <button 
                onClick={handleWatchDemo} 
                className="border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/50"
              >
                Watch Demo
              </button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-1">24/7</div>
                <div className="text-sm text-muted-foreground">Always Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary mb-1">Offline</div>
                <div className="text-sm text-muted-foreground">No Internet Needed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-accent mb-1">Multi-Language</div>
                <div className="text-sm text-muted-foreground">Including Kinyarwanda</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-secondary mb-1">Secure</div>
                <div className="text-sm text-muted-foreground">Enterprise Grade</div>
              </div>
            </div>
          </div>

          {/* Use Cases Section */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Use Cases
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Versatile AI solutions for education, enterprise, and government applications
                </p>
              </div>

              <div className="grid sm:grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
                <div className="group bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border hover:bg-card/80 transition-all duration-300 hover:scale-105">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent/30 transition-colors">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-card-foreground">Education</h3>
                  <p className="text-muted-foreground mb-4">
                    Interactive English learning through offline IVR systems, perfect for schools and remote learning.
                  </p>
                  <button 
                    onClick={() => navigate('/solutions/education')}
                    className="text-accent hover:text-accent/80 font-semibold transition-colors"
                  >
                    Learn More →
                  </button>
                </div>

                <div className="group bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border hover:bg-card/80 transition-all duration-300 hover:scale-105">
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-secondary/30 transition-colors">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-card-foreground">Enterprise</h3>
                  <p className="text-muted-foreground mb-4">
                    Reliable customer service automation and internal communication systems for businesses.
                  </p>
                  <button 
                    onClick={() => navigate('/solutions/enterprise')}
                    className="text-secondary hover:text-secondary/80 font-semibold transition-colors"
                  >
                    Learn More →
                  </button>
                </div>

                <div className="group bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border hover:bg-card/80 transition-all duration-300 hover:scale-105">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent/30 transition-colors">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-card-foreground">Government</h3>
                  <p className="text-muted-foreground mb-4">
                    Secure citizen services and information systems that work regardless of infrastructure.
                  </p>
                  <button 
                    onClick={() => navigate('/solutions/government')}
                    className="text-accent hover:text-accent/80 font-semibold transition-colors"
                  >
                    Learn More →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Research Initiative Section */}
          <div className="container mx-auto px-6 py-20">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  Help Build the Future of AI
                </h2>
                <p className="text-xl text-white/70 max-w-3xl mx-auto">
                  We need your voice to train AI models that understand and speak Kinyarwanda fluently. Join thousands contributing to this groundbreaking research.
                </p>
              </div>

              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10 mb-12">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                  <div>
                    <h3 className="text-3xl font-bold mb-6">The Dataset Challenge</h3>
                    <p className="text-white/70 mb-6">
                      Training a truly fluent Kinyarwanda AI requires 500,000+ hours of audio data. We've collected 45,000 hours—we need your help to bridge the gap.
                    </p>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-green-500 rounded-full mr-3"></div>
                        <span>45,000 hours collected</span>
                      </div>
                      <div className="flex items-center">
                        <div className="w-4 h-4 bg-red-500 rounded-full mr-3"></div>
                        <span>455,000 hours needed</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-6xl font-bold text-red-400 mb-4">91%</div>
                    <p className="text-white/70">Still needed to reach our goal</p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <button 
                  onClick={handleJoinContribution} 
                  className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105 hover:shadow-lg"
                >
                  Contribute Your Voice
                </button>
                <p className="mt-4 text-white/60 text-base max-w-xl mx-auto">
                  Every contribution helps create more inclusive AI technology
                </p>
              </div>
            </div>
          </div>

          {/* Partners Section */}
          <div className="container mx-auto px-6 py-20">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Our Partners
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Collaborating with leading organizations to advance AI research and communication solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center max-w-4xl mx-auto">
              {partners.map((partner, index) => (
                <a 
                  key={index} 
                  href={partner.url} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="group flex items-center justify-center h-24 w-full bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm px-6"
                >
                  <span className="text-white/70 group-hover:text-white text-sm font-medium text-center">
                    {partner.name}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Stats Section */}
          <div className="container mx-auto px-6 py-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <AnimatedCounter end="12" duration={10000} className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent" />
                <div className="text-white/70 text-lg">Pilot Deployments</div>
              </div>
              <div className="group">
                <AnimatedCounter end="3" duration={10000} className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent" />
                <div className="text-white/70 text-lg">Partner Organizations</div>
              </div>
              <div className="group">
                <AnimatedCounter end="2K+" duration={10000} className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent" />
                <div className="text-white/70 text-lg">Beta Test Calls</div>
              </div>
              <div className="group">
                <AnimatedCounter end="24/7" duration={10000} className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent" />
                <div className="text-white/70 text-lg">Offline Ready</div>
              </div>
            </div>
          </div>

          {/* Final CTA Section */}
          <div className="container mx-auto px-6 py-20 text-center">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                Join organizations worldwide already using Bakame AI to transform their communication and learning systems.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={handleGetStarted} 
                  className="bg-gradient-to-r from-accent to-secondary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  Start Free Trial
                </button>
                <button 
                  onClick={handleScheduleDemo} 
                  className="border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:border-white/50"
                >
                  Schedule Demo
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="container mx-auto px-6 py-8 border-t border-white/20">
            <h3 className="text-sm font-bold text-foreground mb-4">Resources</h3>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex flex-wrap gap-4 text-sm">
                <a href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a>
                <a href="mailto:happy@bakame.org" className="text-muted-foreground hover:text-foreground transition-colors">Support</a>
                <a href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors">Privacy</a>
                <a href="/terms" className="text-muted-foreground hover:text-foreground transition-colors">Terms</a>
              </div>

              <div className="flex space-x-3">
                <a href="https://twitter.com/bakameai" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a href="https://linkedin.com/company/bakameai" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
                <a href="https://github.com/bakameai" className="text-muted-foreground hover:text-foreground transition-colors">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                </a>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-white/20 text-center">
              <p className="text-muted-foreground text-xs">© 2025 Bakame AI. All rights reserved.</p>
            </div>
          </footer>
        </div>

        <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} videoId="dQw4w9WgXcQ" />
        <EarlyAccessModal isOpen={isEarlyAccessModalOpen} onClose={() => setIsEarlyAccessModalOpen(false)} />
      </div>
    </>
  );
};

export default Index;
