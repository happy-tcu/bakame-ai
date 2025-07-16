
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoModal from "@/components/VideoModal";
import AnimatedContentCarousel from "@/components/AnimatedContentCarousel";
import { useAdminContent } from "@/hooks/useAdminContent";

const Index = () => {
  const [currentProgress] = useState(0);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const navigate = useNavigate();

  // Use admin-managed content
  const contentItems = useAdminContent();

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

  const partners = [
    {
      name: "Institute for Entrepreneurship and Innovation (at TCU)",
      url: "https://www.tcu.edu/business/institute-entrepreneurship-innovation/"
    },
    {
      name: "Shaddock Seed Fund",
      url: "https://magazine.tcu.edu/fall-2017/shaddock-venture-capital-fund-entrepreneurs-investors/"
    },
    {
      name: "Values and Ventures",
      url: "https://valuesandventures.com/"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-black to-slate-900 text-white relative overflow-hidden">
      {/* Subtle geometric background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Modern navigation */}
      <nav className="relative z-20 flex justify-between items-center p-6 md:p-8 backdrop-blur-sm bg-black/20 border-b border-white/10">
        <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Bakame AI
        </div>
        <div className="hidden md:flex space-x-8">
          <a href="/ivr" className="text-white/70 hover:text-white transition-all duration-300 hover:scale-105 font-medium">IVR Demo</a>
          <a href="/blog" className="text-white/70 hover:text-white transition-all duration-300 hover:scale-105 font-medium">Blog</a>
          <a href="/resources" className="text-white/70 hover:text-white transition-all duration-300 hover:scale-105 font-medium">Resources</a>
          <a href="/team" className="text-white/70 hover:text-white transition-all duration-300 hover:scale-105 font-medium">Careers</a>
          <a href="/signup" className="bg-gradient-to-r from-blue-600 to-purple-600 px-4 py-2 rounded-full text-white font-medium hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-lg">Sign In</a>
          <a href="/admin-settings" className="text-white/70 hover:text-white transition-all duration-300 hover:scale-105 font-medium">Admin</a>
        </div>
      </nav>

      <div className="relative z-10">
        {/* Enhanced Hero Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-32 text-center">
          <div className="max-w-5xl mx-auto">
            <div className="mb-8 animate-fade-in">
              <span className="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-300 text-sm font-medium mb-6 backdrop-blur-sm">
                🚀 Next-Generation AI Education Platform
              </span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-8 leading-tight tracking-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent block mb-4">
                Reimagining Education
              </span>
              <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                with Offline AI
              </span>
            </h1>
            
            <p className="text-xl sm:text-2xl text-white/80 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
              Empowering students in the Global South with voice-based AI tutors that work without internet connectivity — 
              <span className="text-blue-300 font-medium"> just call and learn</span>
            </p>

            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <a href="/ivr" className="group relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-blue-500/20 backdrop-blur-sm">
                <span className="flex items-center justify-center relative z-10">
                  Try Live Demo
                  <svg className="ml-3 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-purple-600/50 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300 opacity-50"></div>
              </a>
              
              <button onClick={handleScheduleDemo} className="group border-2 border-white/20 text-white px-10 py-5 rounded-2xl font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm hover:border-white/40">
                Schedule Enterprise Demo
              </button>
            </div>

            {/* Animated Content Carousel */}
            <AnimatedContentCarousel 
              items={contentItems}
              className="mb-20"
            />
          </div>
        </div>

        {/* Enhanced Introduction Video Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent tracking-tight">
                See How It Works
              </h2>
              <p className="text-xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
                Experience how students can access world-class English education through simple voice calls — 
                no apps, no internet, just intelligent conversation.
              </p>
            </div>
            
            {/* Enhanced Video Container */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000"></div>
              <div className="relative bg-slate-900/50 backdrop-blur-xl rounded-3xl overflow-hidden border border-white/10 aspect-video">
                <div className="absolute inset-0 flex items-center justify-center">
                  <button 
                    onClick={handleWatchDemo}
                    className="group/btn relative bg-white/10 hover:bg-white/20 rounded-full p-8 transition-all duration-500 hover:scale-110 backdrop-blur-sm border border-white/20"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                    <svg className="w-16 h-16 text-white group-hover/btn:text-blue-300 transition-colors relative z-10" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </button>
                </div>
                <div className="absolute bottom-6 left-6">
                  <div className="bg-black/50 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                    <span className="text-white/80 text-sm font-medium">Product Demo • 3:24</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Solutions Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-20">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent tracking-tight">
                Enterprise Solutions
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                Offline-first AI systems engineered for reliability, scalability, and universal accessibility
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 mb-20">
              <div onClick={() => navigate('/solutions/education')} className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-10 border border-white/10 hover:border-blue-500/30 transition-all duration-500 hover:scale-105 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">Education</h3>
                  <p className="text-white/70 leading-relaxed">
                    AI-powered tutoring systems for schools and universities, delivering personalized learning experiences without internet dependency.
                  </p>
                </div>
              </div>

              <div onClick={() => navigate('/solutions/enterprise')} className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-10 border border-white/10 hover:border-purple-500/30 transition-all duration-500 hover:scale-105 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-indigo-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">Enterprise</h3>
                  <p className="text-white/70 leading-relaxed">
                    Advanced AI solutions for businesses, providing customer service automation that operates reliably in any environment.
                  </p>
                </div>
              </div>

              <div onClick={() => navigate('/solutions/government')} className="group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-3xl p-10 border border-white/10 hover:border-green-500/30 transition-all duration-500 hover:scale-105 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-emerald-500/5 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">Government</h3>
                  <p className="text-white/70 leading-relaxed">
                    Secure, offline-capable AI systems for government services, ensuring citizen access regardless of connectivity constraints.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Research Initiative Section */}
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent tracking-tight">
                Research Initiative
              </h2>
              <p className="text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
                Pioneering the development of the first comprehensive Kinyarwanda voice dataset for LLM training, 
                building the foundation for truly inclusive AI technology.
              </p>
            </div>

            <div className="relative group mb-16">
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 via-cyan-500 to-blue-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative bg-slate-900/50 backdrop-blur-xl rounded-3xl p-12 border border-white/10">
                <div className="text-center">
                  <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-8">
                    <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                    </svg>
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-6">Kinyarwanda Dataset Collection</h3>
                  <p className="text-white/70 mb-8 text-lg leading-relaxed max-w-2xl mx-auto">
                    Join us in creating the foundation for AI that understands and speaks Kinyarwanda. 
                    Be part of this groundbreaking initiative to democratize AI across languages.
                  </p>
                  <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl p-8 border border-emerald-500/20 backdrop-blur-sm">
                    <div className="text-5xl font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent mb-3">Coming Soon</div>
                    <div className="text-white/70 text-lg">Voice contribution platform launching</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Partners Section */}
        <div className="container mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent tracking-tight">
              Trusted Partners
            </h2>
            <p className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              Collaborating with leading institutions to advance AI research and offline communication solutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center justify-items-center max-w-5xl mx-auto">
            {partners.map((partner, index) => (
              <a 
                key={index} 
                href={partner.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center h-32 w-full bg-slate-900/30 border border-white/10 rounded-2xl hover:bg-slate-800/50 transition-all duration-300 hover:scale-105 backdrop-blur-sm px-8 hover:border-white/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <span className="text-white/70 group-hover:text-white text-sm font-medium text-center leading-relaxed relative z-10">
                  {partner.name}
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Enhanced Stats Section */}
        <div className="container mx-auto px-6 py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center max-w-6xl mx-auto">
            <div className="group p-8 bg-slate-900/30 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:scale-105">
              <div className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                12
              </div>
              <div className="text-white/70 text-lg font-medium">Pilot Deployments</div>
            </div>
            <div className="group p-8 bg-slate-900/30 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-green-500/30 transition-all duration-300 hover:scale-105">
              <div className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                3
              </div>
              <div className="text-white/70 text-lg font-medium">Partner Organizations</div>
            </div>
            <div className="group p-8 bg-slate-900/30 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:scale-105">
              <div className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                2K+
              </div>
              <div className="text-white/70 text-lg font-medium">Beta Test Calls</div>
            </div>
            <div className="group p-8 bg-slate-900/30 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-yellow-500/30 transition-all duration-300 hover:scale-105">
              <div className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="text-white/70 text-lg font-medium">Offline Ready</div>
            </div>
          </div>
        </div>

        {/* Enhanced CTA Section */}
        <div className="container mx-auto px-6 py-20 text-center">
          <div className="max-w-5xl mx-auto relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
            <div className="relative bg-slate-900/50 backdrop-blur-xl rounded-3xl p-16 border border-white/10">
              <h2 className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent tracking-tight">
                Ready to Transform Education?
              </h2>
              <p className="text-xl text-white/80 mb-12 max-w-3xl mx-auto leading-relaxed">
                Join the revolution in accessible education. Empower students with AI tutors that work anywhere, anytime — 
                <span className="text-blue-300 font-medium"> no barriers, just learning</span>
              </p>
              <div className="flex flex-col sm:flex-row gap-8 justify-center">
                <a href="/ivr" className="group/cta relative bg-gradient-to-r from-blue-600 to-purple-600 text-white px-12 py-6 rounded-2xl font-semibold text-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 hover:shadow-2xl border border-blue-500/20">
                  <span className="flex items-center justify-center relative z-10">
                    Start Free Trial
                    <svg className="ml-3 w-6 h-6 group-hover/cta:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/50 to-purple-600/50 rounded-2xl blur-xl group-hover/cta:blur-2xl transition-all duration-300 opacity-50"></div>
                </a>
                <button onClick={handleScheduleDemo} className="group/demo border-2 border-white/30 text-white px-12 py-6 rounded-2xl font-semibold text-xl hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm hover:border-white/50">
                  Schedule Enterprise Demo
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <footer className="container mx-auto px-6 py-16 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/10">
            <div className="flex space-x-8 mb-6 md:mb-0">
              <a href="/blog" className="text-white/60 hover:text-white/90 transition-colors font-medium">Blog</a>
              <a href="/resources" className="text-white/60 hover:text-white/90 transition-colors font-medium">Resources</a>
              <a href="/team" className="text-white/60 hover:text-white/90 transition-colors font-medium">Careers</a>
              <a href="/signup" className="text-white/60 hover:text-white/90 transition-colors font-medium">Sign In</a>
            </div>
            <p className="text-white/40 text-sm">© 2024 Bakame AI. All rights reserved.</p>
          </div>
          <div className="mt-12 pt-12 border-t border-white/10 text-center">
            <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              Bakame AI
            </div>
            <p className="text-white/50 max-w-2xl mx-auto leading-relaxed">
              Reimagining English education through intelligent offline AI tutors. 
              Empowering learners everywhere, regardless of connectivity.
            </p>
          </div>
        </footer>
      </div>

      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} videoId="dQw4w9WgXcQ" />
    </div>
  );
};

export default Index;
