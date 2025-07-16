
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import VideoModal from "@/components/VideoModal";

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
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Clean black background */}
      <nav className="relative z-20 flex justify-between items-center p-6 md:p-8">
        <div className="text-2xl font-bold">Bakame Ai</div>
        <div className="hidden md:flex space-x-8">
          <a href="/ivr" className="text-white/70 hover:text-white transition-colors">IVR Demo</a>
          <a href="/blog" className="text-white/70 hover:text-white transition-colors">Blog</a>
          <a href="/resources" className="text-white/70 hover:text-white transition-colors">Resources</a>
          <a href="/team" className="text-white/70 hover:text-white transition-colors">Careers</a>
          <a href="/signup" className="text-white/70 hover:text-white transition-colors">Sign In</a>
        </div>
      </nav>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 text-center">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
              Reimagining English Education<br />
            </span>
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
              with Offline AI
            </span>
          </h1>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-white/80 mb-8 sm:mb-12 max-w-4xl mx-auto leading-relaxed px-4">
            We help students in the Global South learn English through voice-based AI tutors — no apps, no data, just call and learn.
          </p>

          {/* Key Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white mb-2">Voice-first and mobile-accessible</h3>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white mb-2">Offline by design — no internet required</h3>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white mb-2">Built in collaboration with educators</h3>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-white/10">
              <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                <svg className="w-5 h-5 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
                </svg>
              </div>
              <h3 className="text-sm font-semibold text-white mb-2">Future-ready: supports local languages and custom content</h3>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <a href="/ivr" className="group bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <span className="flex items-center justify-center">
                Try Demo Now
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </a>
          </div>
        </div>

        {/* Introduction Video Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="max-w-4xl mx-auto text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              See How It Works
            </h2>
            <p className="text-lg text-white/70 mb-8">
              Watch how students can learn English by simply calling our AI tutor — no apps, no internet, just voice-based learning.
            </p>
            
            {/* Video placeholder - ready for your introduction video */}
            <div className="relative bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 aspect-video">
              <div className="absolute inset-0 flex items-center justify-center">
                <button 
                  onClick={handleWatchDemo}
                  className="group bg-white/10 hover:bg-white/20 rounded-full p-6 transition-all duration-300 hover:scale-110"
                >
                  <svg className="w-12 h-12 text-white group-hover:text-blue-300 transition-colors" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                </button>
              </div>
              <div className="absolute bottom-4 left-4 text-white/60 text-sm">
                Introduction Video Coming Soon
              </div>
            </div>
          </div>
        </div>

        {/* Main Products Section */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Our Solutions
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Offline-first AI systems that work anywhere, anytime, for any organization
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
              <div onClick={() => navigate('/solutions/education')} className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-colors">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Education</h3>
                <p className="text-white/70">
                  Offline AI tutors for schools and universities, enabling interactive learning experiences without internet dependency.
                </p>
              </div>

              <div onClick={() => navigate('/solutions/enterprise')} className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-colors">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Enterprise</h3>
                <p className="text-white/70">
                  Advanced AI solutions for businesses, providing customer service automation that works reliably in any environment.
                </p>
              </div>

              <div onClick={() => navigate('/solutions/government')} className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-500/30 transition-colors">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Government</h3>
                <p className="text-white/70">
                  Secure, offline-capable AI systems for government services, ensuring citizen access regardless of connectivity.
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
                Research Initiative
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Alongside our main AI solutions, we're pioneering the collection of Kinyarwanda voice data to create the first comprehensive LLM-ready dataset. Join us in building this groundbreaking resource.
              </p>
            </div>

            <div className="mb-16">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-white mb-4">Kinyarwanda Dataset Collection</h3>
                  <p className="text-white/70 mb-6">
                    We're building the foundation for AI that understands and speaks Kinyarwanda. Be part of this historic initiative.
                  </p>
                  <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg p-6">
                    <div className="text-4xl font-bold text-blue-400 mb-2">Coming Soon</div>
                    <div className="text-white/70">Voice contribution platform launching</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contribution CTA Button */}
            <div className="text-center">
              <button 
                onClick={handleJoinContribution}
                className="bg-gradient-to-r from-emerald-500 to-cyan-500 text-white px-8 py-3 rounded-full font-semibold text-lg hover:from-emerald-600 hover:to-cyan-600 transition-all duration-300 hover:scale-105"
              >
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
              Ready to Transform Education?
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Help students learn English through AI-powered voice tutors that work anywhere, anytime. No internet required.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a href="/ivr" className="group bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <span className="flex items-center justify-center">
                  Try Demo Now
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
              <a href="/resources" className="text-white/60 hover:text-white/80 transition-colors">Resources</a>
              <a href="/team" className="text-white/60 hover:text-white/80 transition-colors">Careers</a>
              <a href="/signup" className="text-white/60 hover:text-white/80 transition-colors">Sign In</a>
            </div>
            <p className="text-white/40 text-sm">© 2024 Bakame AI. All rights reserved.</p>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/50">
            <p>&copy; 2024 Bakame AI. Reimagining English education through intelligent offline AI tutors.</p>
          </div>
        </footer>
      </div>

      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} videoId="dQw4w9WgXcQ" />
    </div>
  );
};

export default Index;
