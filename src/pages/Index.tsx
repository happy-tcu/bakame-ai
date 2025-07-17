import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoModal from "@/components/VideoModal";
import TypingAnimation from "@/components/TypingAnimation";

const Index = () => {
  const [currentProgress] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/early-access');
  };

  const handleWatchDemo = () => {
    setIsVideoModalOpen(true);
  };

  const handleScheduleDemo = () => {
    navigate('/schedule-consultation');
  };

  const handleJoinContribution = () => {
    // For now, navigate to early access - can be updated when contribution platform is ready
    navigate('/early-access');
  };

  const partners = [{
    name: "Institute for Entrepreneurship and Innovation (at TCU)",
    url: "https://www.tcu.edu/business/institute-entrepreneurship-innovation/"
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
        {/* Clean black background */}
        <nav className="relative z-20 flex justify-between items-center p-6 md:p-8">
          <div className="text-2xl font-bold">Bakame Ai</div>
          <div className="hidden md:flex space-x-8">
            <a href="/ivr" className="text-muted-foreground hover:text-foreground transition-colors">IVR Demo</a>
            <a href="/blog" className="text-muted-foreground hover:text-foreground transition-colors">Blog</a>
            <a href="/signup" className="text-muted-foreground hover:text-foreground transition-colors">Sign In</a>
          </div>
        </nav>

        <div className="relative z-10">
          {/* Hero Section */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center">
             <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold mb-6 sm:mb-8 leading-tight bg-gradient-to-r from-foreground via-accent to-secondary bg-clip-text text-transparent">
              Bakeme AI<br />
              <TypingAnimation text="f(x)=Access ; m=(offline/ivr)" speed={200} pauseDuration={1500} className="bg-gradient-to-r from-accent via-secondary to-accent bg-clip-text text-transparent text-5xl" />
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
              Revolutionizing communication with offline Interactive Voice Response systems for education, enterprise, and government. Powered by advanced AI that works without internet connectivity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
              <button onClick={handleGetStarted} className="group bg-gradient-to-r from-accent to-secondary text-primary-foreground px-8 py-4 rounded-full font-semibold text-lg hover:opacity-90 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <span className="flex items-center justify-center">
                  Request Early Access
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
            </div>
          </div>

          {/* Main Products Section */}
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent">
                  Our Solutions
                </h2>
                <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                  Offline-first AI systems that work anywhere, anytime, for any organization
                </p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
                <div onClick={() => navigate('/solutions/education')} className="group bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border hover:bg-card/80 transition-all duration-300 hover:scale-105 cursor-pointer">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent/30 transition-colors">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-card-foreground">Education</h3>
                  <p className="text-muted-foreground">
                    Offline IVR systems for schools and universities, enabling interactive learning experiences without internet dependency.
                  </p>
                </div>

                <div onClick={() => navigate('/solutions/enterprise')} className="group bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border hover:bg-card/80 transition-all duration-300 hover:scale-105 cursor-pointer">
                  <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-secondary/30 transition-colors">
                    <svg className="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-card-foreground">Enterprise</h3>
                  <p className="text-muted-foreground">
                    Advanced IVR solutions for businesses, providing customer service automation that works reliably in any environment.
                  </p>
                </div>

                <div onClick={() => navigate('/solutions/government')} className="group bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border hover:bg-card/80 transition-all duration-300 hover:scale-105 cursor-pointer">
                  <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-accent/30 transition-colors">
                    <svg className="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-card-foreground">Government</h3>
                  <p className="text-muted-foreground">
                    Secure, offline-capable IVR systems for government services, ensuring citizen access regardless of connectivity.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Research Initiative Section */}
          <div className="container mx-auto px-6 py-20">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                  The Dataset Problem
                </h2>
                <p className="text-xl text-white/70 max-w-3xl mx-auto">
                  At least 500,000 hours of audio dataset are needed to train an Kinyarwanda-Proficient* AI Model. Only 45,000 hours have been collected. We're 91% short, and need to fill the 455,000 hours - (as soon as yesterday). We are building a foundation of Ai to fluently process and speak low-resource languages.
                </p>
              </div>


              {/* Contribution CTA Button */}
              <div className="text-center">
                <button onClick={handleJoinContribution} className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105">
                  Join the Contribution
                </button>
                
                <p className="mt-4 text-white/60 text-base max-w-xl mx-auto">
                  Help shape the future of AI in Kinyarwanda
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
                Collaborating with leading organizations to advance AI research and offline communication solutions
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center max-w-4xl mx-auto">
              {partners.map((partner, index) => <a key={index} href={partner.url} target="_blank" rel="noopener noreferrer" className="group flex items-center justify-center h-24 w-full bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm px-6">
                  <span className="text-white/70 group-hover:text-white text-sm font-medium text-center">
                    {partner.name}
                  </span>
                </a>)}
            </div>
          </div>

          {/* Stats Section */}
          <div className="container mx-auto px-6 py-20">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div className="group">
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  12
                </div>
                <div className="text-white/70 text-lg">Pilot Deployments</div>
              </div>
              <div className="group">
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  3
                </div>
                <div className="text-white/70 text-lg">Partner Organizations</div>
              </div>
              <div className="group">
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  2K+
                </div>
                <div className="text-white/70 text-lg">Beta Test Calls</div>
              </div>
              <div className="group">
                <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                  24/7
                </div>
                <div className="text-white/70 text-lg">Offline Ready</div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="container mx-auto px-6 py-20 text-center">
            <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Ready to Transform Your Communication?
              </h2>
              <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
                Deploy intelligent IVR systems that work anywhere, anytime. No internet required.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a href="/ivr" className="group bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  <span className="flex items-center justify-center">
                    Try IVR Demo Now
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </a>
                <button onClick={handleScheduleDemo} className="group border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                  Schedule a Demo
                </button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <footer className="container mx-auto px-6 py-12 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10">
              <div className="flex space-x-6 mb-4 md:mb-0">
                <a href="/blog" className="text-white/60 hover:text-white/80 transition-colors">Blog</a>
                <a href="/signup" className="text-white/60 hover:text-white/80 transition-colors">Sign In</a>
              </div>
              <p className="text-white/40 text-sm">© 2024 Bakame AI. All rights reserved.</p>
            </div>
            <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/50">
              <p>&copy; 2024 Bakame AI. Revolutionizing communication through intelligent offline IVR systems.</p>
            </div>
          </footer>
        </div>

        <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} videoId="dQw4w9WgXcQ" />
      </div>
    </>
  );
};

export default Index;
