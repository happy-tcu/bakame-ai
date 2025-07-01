
import { useState } from "react";
import "../styles/warp-bg.css";
import { useNavigate } from "react-router-dom";
import VideoModal from "@/components/VideoModal";
const Index = () => {
  const [currentProgress] = useState(67);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const navigate = useNavigate();
  const handleGetStarted = () => {
    navigate('/signup');
  };
  const handleWatchDemo = () => {
    setIsVideoModalOpen(true);
  };
  return <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Enhanced space-time warping background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Complex warped grid system */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Animated geometric lines for space-warping effect */}
          {/* 2D geometric and gravitational white lines */}
          <g>
            {/* Radial lines (gravity rays) */}
            {[...Array(18)].map((_, i) => {
              const angle = (i * 20) * Math.PI / 180;
              const x1 = 50 + 8 * Math.cos(angle);
              const y1 = 50 + 8 * Math.sin(angle);
              const x2 = 50 + 30 * Math.cos(angle);
              const y2 = 50 + 30 * Math.sin(angle);
              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  className="warp-animated-line-white"
                />
              );
            })}
            {/* Concentric warped circles */}
            {[12, 18, 24, 30].map((r, i) => (
              <ellipse
                key={r}
                cx="50"
                cy="50"
                rx={r}
                ry={r * (0.85 + 0.1 * Math.sin(i))}
                className="warp-animated-line-white"
                fill="none"
              />
            ))}
          </g>
          <defs>
            <pattern id="baseGrid" width="5" height="5" patternUnits="userSpaceOnUse">
              <path d="M 5 0 L 0 0 0 5" fill="none" stroke="rgba(59,130,246,0.15)" strokeWidth="0.05" />
            </pattern>
            <filter id="glow">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
              <feMerge> 
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="strongGlow">
              <feGaussianBlur stdDeviation="2.5" result="coloredBlur" />
              <feMerge> 
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          
          {/* Base grid pattern */}
          <rect width="100" height="100" fill="url(#baseGrid)" opacity="0.3" />
          
          {/* Gravity well 1 - Top left quadrant */}
          <g transform="translate(25,25)">
            {/* Concentric curved lines creating gravity well effect */}
            <circle cx="0" cy="0" r="8" fill="none" stroke="rgba(59,130,246,0.4)" strokeWidth="0.1" filter="url(#glow)" />
            <circle cx="0" cy="0" r="12" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="0.08" />
            <circle cx="0" cy="0" r="16" fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth="0.06" />
            <circle cx="0" cy="0" r="20" fill="none" stroke="rgba(59,130,246,0.15)" strokeWidth="0.04" />
            
            {/* Radial grid lines bending toward center */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map(angle => <path key={angle} d={`M 0,0 Q ${8 * Math.cos(angle * Math.PI / 180)},${8 * Math.sin(angle * Math.PI / 180)} ${20 * Math.cos(angle * Math.PI / 180)},${20 * Math.sin(angle * Math.PI / 180)}`} fill="none" stroke="rgba(59,130,246,0.2)" strokeWidth="0.05" />)}
          </g>
          
          {/* Gravity well 2 - Bottom right */}
          <g transform="translate(75,75)">
            <circle cx="0" cy="0" r="6" fill="none" stroke="rgba(147,51,234,0.5)" strokeWidth="0.12" filter="url(#strongGlow)" />
            <circle cx="0" cy="0" r="10" fill="none" stroke="rgba(147,51,234,0.4)" strokeWidth="0.1" />
            <circle cx="0" cy="0" r="14" fill="none" stroke="rgba(147,51,234,0.3)" strokeWidth="0.08" />
            <circle cx="0" cy="0" r="18" fill="none" stroke="rgba(147,51,234,0.2)" strokeWidth="0.06" />
            
            {/* Spiral arms */}
            <path d="M 0,0 Q 5,-3 10,-2 T 18,2" fill="none" stroke="rgba(147,51,234,0.3)" strokeWidth="0.08" />
            <path d="M 0,0 Q -3,5 -2,10 T 2,18" fill="none" stroke="rgba(147,51,234,0.3)" strokeWidth="0.08" />
            <path d="M 0,0 Q -5,3 -10,2 T -18,-2" fill="none" stroke="rgba(147,51,234,0.3)" strokeWidth="0.08" />
            <path d="M 0,0 Q 3,-5 2,-10 T -2,-18" fill="none" stroke="rgba(147,51,234,0.3)" strokeWidth="0.08" />
          </g>
          
          {/* Gravity well 3 - Top right */}
          <g transform="translate(75,25)">
            <ellipse cx="0" cy="0" rx="12" ry="8" fill="none" stroke="rgba(34,197,94,0.4)" strokeWidth="0.1" filter="url(#glow)" />
            <ellipse cx="0" cy="0" rx="16" ry="12" fill="none" stroke="rgba(34,197,94,0.3)" strokeWidth="0.08" />
            <ellipse cx="0" cy="0" rx="20" ry="16" fill="none" stroke="rgba(34,197,94,0.2)" strokeWidth="0.06" />
          </g>
          
          {/* Curved connecting lines showing space-time fabric */}
          <path d="M 25,25 Q 50,35 75,25" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="0.1" filter="url(#glow)" />
          <path d="M 25,25 Q 35,50 75,75" fill="none" stroke="rgba(147,51,234,0.25)" strokeWidth="0.1" filter="url(#glow)" />
          <path d="M 75,25 Q 65,50 75,75" fill="none" stroke="rgba(34,197,94,0.25)" strokeWidth="0.1" filter="url(#glow)" />
          
          {/* Warped horizontal lines */}
          <path d="M 0,20 Q 25,15 50,20 Q 75,25 100,20" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="0.08" />
          <path d="M 0,40 Q 25,45 50,40 Q 75,35 100,40" fill="none" stroke="rgba(147,51,234,0.25)" strokeWidth="0.08" />
          <path d="M 0,60 Q 25,55 50,60 Q 75,65 100,60" fill="none" stroke="rgba(59,130,246,0.3)" strokeWidth="0.08" />
          <path d="M 0,80 Q 25,85 50,80 Q 75,75 100,80" fill="none" stroke="rgba(147,51,234,0.25)" strokeWidth="0.08" />
          
          {/* Warped vertical lines */}
          <path d="M 20,0 Q 15,25 20,50 Q 25,75 20,100" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="0.08" />
          <path d="M 40,0 Q 45,25 40,50 Q 35,75 40,100" fill="none" stroke="rgba(147,51,234,0.3)" strokeWidth="0.08" />
          <path d="M 60,0 Q 55,25 60,50 Q 65,75 60,100" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="0.08" />
          <path d="M 80,0 Q 85,25 80,50 Q 75,75 80,100" fill="none" stroke="rgba(147,51,234,0.3)" strokeWidth="0.08" />
        </svg>

        {/* Enhanced gravitational wave effects */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-blue-500/8 via-blue-500/4 to-transparent rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-purple-500/10 via-purple-500/5 to-transparent rounded-full blur-2xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-radial from-green-500/6 via-green-500/3 to-transparent rounded-full blur-2xl animate-pulse delay-2000"></div>
          
          {/* Subtle ripple effects */}
          <div className="absolute top-1/4 left-1/4 w-32 h-32 border border-blue-400/20 rounded-full animate-ping"></div>
          <div className="absolute bottom-1/4 right-1/4 w-24 h-24 border border-purple-400/20 rounded-full animate-ping delay-1000"></div>
        </div>

        {/* Enhanced connection points with subtle movement */}
        {[...Array(40)].map((_, i) => <div key={i} className="absolute w-0.5 h-0.5 bg-blue-400/30 rounded-full animate-pulse" style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 4}s`,
        animationDuration: `${3 + Math.random() * 3}s`
      }} />)}
      </div>

      {/* Navigation */}  
      <nav className="relative z-20 flex justify-between items-center p-6 md:p-8">
        <div className="text-2xl font-bold">Bakame Ai</div>
        <div className="hidden md:flex space-x-8">
          <a href="/blog" className="text-white/70 hover:text-white transition-colors">Blog</a>
          <a href="/resources" className="text-white/70 hover:text-white transition-colors">Resources</a>
          <a href="/team" className="text-white/70 hover:text-white transition-colors">Careers</a>
          <a href="/signup" className="text-white/70 hover:text-white transition-colors">Sign In</a>
        </div>
      </nav>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            IVR Offline<br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent animate-pulse">Intelligence, Bakame</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-4xl mx-auto leading-relaxed">
            Revolutionizing communication with offline Interactive Voice Response systems for education, enterprise, and government. Powered by advanced AI that works without internet connectivity.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <button onClick={handleGetStarted} className="group bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <span className="flex items-center justify-center">
                Get Started
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
            <button onClick={handleWatchDemo} className="group border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
              Watch Demo
            </button>
          </div>
        </div>

        {/* Main Products Section */}
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Our Solutions
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Offline-first AI systems that work anywhere, anytime, for any organization
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div onClick={() => navigate('/solutions/education')} className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 cursor-pointer">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-colors">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Education</h3>
                <p className="text-white/70">
                  Offline IVR systems for schools and universities, enabling interactive learning experiences without internet dependency.
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
                  Advanced IVR solutions for businesses, providing customer service automation that works reliably in any environment.
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
                Research Initiative
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                Alongside our main IVR solutions, we're pioneering <span className="text-blue-400 font-semibold">100,000 hours</span> of Kinyarwanda voice data collection to create the first comprehensive LLM-ready dataset.
              </p>
            </div>

            <div className="mb-16">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-white">Kinyarwanda Dataset Progress</span>
                  <span className="text-2xl font-bold text-green-400">{currentProgress}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3 mb-4">
                  <div className="bg-gradient-to-r from-green-400 to-blue-400 h-3 rounded-full transition-all duration-1000 ease-out" style={{
                  width: `${currentProgress}%`
                }}></div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-blue-400">67,250</div>
                    <div className="text-sm text-white/60">Hours Collected</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400">15,400</div>
                    <div className="text-sm text-white/60">Contributors</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-400">98.7%</div>
                    <div className="text-sm text-white/60">Quality Score</div>
                  </div>
                </div>
              </div>
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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
            {["University of Rwanda", "Rwanda Academy of Sciences", "Ministry of ICT", "African Development Bank", "Google AI", "OpenAI Research", "Meta AI", "Microsoft Research"].map((partner, index) => <div key={index} className="group flex items-center justify-center h-20 w-40 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                <span className="text-white/70 group-hover:text-white text-sm font-medium text-center px-4">
                  {partner}
                </span>
              </div>)}
          </div>
        </div>

        {/* Stats Section */}
        <div className="container mx-auto px-6 py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                500+
              </div>
              <div className="text-white/70 text-lg">IVR Deployments</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                99.9%
              </div>
              <div className="text-white/70 text-lg">Uptime</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                50M+
              </div>
              <div className="text-white/70 text-lg">Calls Processed</div>
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
              <button onClick={handleGetStarted} className="group bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <span className="flex items-center justify-center">
                  Start Your Deployment
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
              <button onClick={handleWatchDemo} className="group border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
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
            <p>&copy; 2024 Bakame AI. Revolutionizing communication through intelligent offline IVR systems.</p>
          </div>
        </footer>
      </div>

      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} videoId="dQw4w9WgXcQ" />
    </div>;
};
export default Index;
