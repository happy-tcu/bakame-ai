import { useState } from "react";

const Index = () => {
  const [currentProgress] = useState(67);

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Enhanced animated background with larger, more colorful elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Large moving gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-green-500/15 to-blue-500/15 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Floating particles */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
        
        {/* Subtle moving lines */}
        <svg className="absolute inset-0 w-full h-full opacity-10">
          <defs>
            <pattern id="grid" width="50" height="50" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 50" fill="none" stroke="white" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" className="animate-pulse" />
        </svg>
      </div>

      {/* Navigation */}  
      <nav className="relative z-20 flex justify-between items-center p-6 md:p-8">
        <div className="text-2xl font-bold">DataAI</div>
        <div className="hidden md:flex space-x-8">
          <a href="/blog" className="text-white/70 hover:text-white transition-colors">Blog</a>
          <a href="/resources" className="text-white/70 hover:text-white transition-colors">Resources</a>
          <a href="/admin" className="text-white/70 hover:text-white transition-colors">Admin</a>
        </div>
      </nav>

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="container mx-auto px-6 py-20 text-center">
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight bg-gradient-to-r from-white via-gray-200 to-white/80 bg-clip-text text-transparent">
            The Future of<br />
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent animate-pulse">
              AI Data
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
            Pioneering the collection and curation of high-quality datasets that power the next generation of artificial intelligence.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <button className="group bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/90 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <span className="flex items-center justify-center">
                Get Started
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
            </button>
            <button className="group border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
              Learn More
            </button>
          </div>
        </div>

        {/* Kinyarwanda Dataset Section */}
        <div className="container mx-auto px-6 py-20">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                Kinyarwanda Dataset Initiative
              </h2>
              <p className="text-xl text-white/70 max-w-3xl mx-auto">
                We are on the road to collecting <span className="text-green-400 font-semibold">100,000 hours</span> of recorded voice to create the first of its kind proficient LLM-ready Kinyarwanda dataset.
              </p>
            </div>

            {/* Progress Section */}
            <div className="mb-16">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-lg font-semibold text-white">Collection Progress</span>
                  <span className="text-2xl font-bold text-green-400">{currentProgress}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-3 mb-4">
                  <div 
                    className="bg-gradient-to-r from-green-400 to-blue-400 h-3 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${currentProgress}%` }}
                  ></div>
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

            {/* Features Grid */}
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-colors">
                  <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Data Collection</h3>
                <p className="text-white/70">
                  Advanced voice recording infrastructure capturing authentic Kinyarwanda speech patterns from diverse speakers across all regions.
                </p>
              </div>

              <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-colors">
                  <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">AI Training</h3>
                <p className="text-white/70">
                  Preparing comprehensive datasets optimized for large language model training with proper tokenization and linguistic annotations.
                </p>
              </div>

              <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
                <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-500/30 transition-colors">
                  <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Global Impact</h3>
                <p className="text-white/70">
                  Empowering Kinyarwanda speakers worldwide with AI technology while preserving and promoting linguistic diversity.
                </p>
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
              Working with leading organizations to advance AI research and language preservation
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center opacity-60">
            {/* Partner logos - using placeholder rectangles */}
            {[
              "University of Rwanda",
              "Rwanda Academy of Sciences", 
              "Ministry of ICT",
              "African Development Bank",
              "Google AI",
              "OpenAI Research",
              "Meta AI",
              "Microsoft Research"
            ].map((partner, index) => (
              <div
                key={index}
                className="group flex items-center justify-center h-20 w-40 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm"
              >
                <span className="text-white/70 group-hover:text-white text-sm font-medium text-center px-4">
                  {partner}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="container mx-auto px-6 py-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                67K+
              </div>
              <div className="text-white/70 text-lg">Hours Recorded</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                15K+
              </div>
              <div className="text-white/70 text-lg">Contributors</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                99%
              </div>
              <div className="text-white/70 text-lg">Accuracy</div>
            </div>
            <div className="group">
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                24/7
              </div>
              <div className="text-white/70 text-lg">Collection</div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-6 py-20 text-center">
          <div className="max-w-4xl mx-auto bg-white/5 backdrop-blur-sm rounded-3xl p-12 border border-white/10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              Ready to Shape the Future?
            </h2>
            <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
              Join thousands of contributors helping to build the world's most comprehensive Kinyarwanda AI dataset.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <button className="group bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <span className="flex items-center justify-center">
                  Start Contributing
                  <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </span>
              </button>
              <button className="group border border-white/30 text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 hover:scale-105 backdrop-blur-sm">
                View Documentation
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="container mx-auto px-6 py-12 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-2xl font-bold mb-4 md:mb-0">DataAI</div>
            <div className="flex space-x-8 text-white/70">
              <a href="/blog" className="hover:text-white transition-colors">Blog</a>
              <a href="/resources" className="hover:text-white transition-colors">Resources</a>
              <a href="#" className="hover:text-white transition-colors">Privacy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
              <a href="/admin" className="hover:text-white transition-colors">Admin</a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-white/10 text-center text-white/50">
            <p>&copy; 2024 DataAI. Pioneering the future of artificial intelligence through quality data.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
