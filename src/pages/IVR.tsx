import React from 'react';
import IVRInterface from '@/components/ivr/IVRInterface';

const IVR = () => {
  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Dynamic background effects */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Moving gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-radial from-blue-500/20 via-purple-500/10 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-radial from-purple-600/25 via-pink-500/15 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-radial from-cyan-400/15 via-blue-500/8 to-transparent rounded-full blur-2xl animate-pulse delay-500"></div>
        
        {/* Animated grid overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
        
        {/* Floating particles */}
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400/40 rounded-full animate-bounce delay-100"></div>
        <div className="absolute top-40 right-32 w-1.5 h-1.5 bg-purple-400/50 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-32 left-40 w-2.5 h-2.5 bg-cyan-400/30 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-20 right-20 w-1 h-1 bg-pink-400/60 rounded-full animate-bounce delay-1000"></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex justify-between items-center p-6 md:p-8">
        <a href="/" className="text-2xl font-bold text-white hover:text-blue-400 transition-colors duration-300">
          Bakame AI
        </a>
        <div className="hidden md:flex space-x-8">
          <a href="/blog" className="text-gray-300 hover:text-white transition-colors duration-300">Blog</a>
          <a href="/resources" className="text-gray-300 hover:text-white transition-colors duration-300">Resources</a>
          <a href="/team" className="text-gray-300 hover:text-white transition-colors duration-300">Team</a>
        </div>
      </nav>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-400 to-purple-400 bg-clip-text text-transparent animate-fade-in">
            AI Web Scraper IVR
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8 animate-fade-in">
            Experience our intelligent voice response system that can search and scrape the web in real-time. 
            Ask questions about any website or topic and get live data.
          </p>
          <div className="flex justify-center gap-4 text-sm text-gray-400 animate-fade-in">
            <span className="px-3 py-1 bg-blue-500/20 rounded-full border border-blue-500/30">🔍 Web Scraping</span>
            <span className="px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/30">🎤 Voice AI</span>
            <span className="px-3 py-1 bg-cyan-500/20 rounded-full border border-cyan-500/30">⚡ Real-time</span>
          </div>
        </div>

        <div className="flex justify-center">
          <IVRInterface />
        </div>

        <div className="mt-16 text-center">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="p-6 rounded-lg bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                🎤
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Voice Recognition</h3>
              <p className="text-gray-400">
                Advanced speech-to-text technology powered by OpenAI Whisper with real-time processing
              </p>
            </div>
            <div className="p-6 rounded-lg bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                🌐
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Web Scraping AI</h3>
              <p className="text-gray-400">
                Intelligent web scraping that fetches live data from any website based on your voice commands
              </p>
            </div>
            <div className="p-6 rounded-lg bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
                🗣️
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Natural Speech</h3>
              <p className="text-gray-400">
                Human-like text-to-speech synthesis that reads scraped data naturally
              </p>
            </div>
          </div>
        </div>

        {/* Example usage section */}
        <div className="mt-20 text-center">
          <h2 className="text-3xl font-bold text-white mb-8">Try These Examples</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 bg-gray-900/60 rounded-lg border border-gray-700/30 hover:border-blue-500/30 transition-colors">
              <p className="text-sm text-gray-300">"What are the latest tech news headlines?"</p>
            </div>
            <div className="p-4 bg-gray-900/60 rounded-lg border border-gray-700/30 hover:border-purple-500/30 transition-colors">
              <p className="text-sm text-gray-300">"Get me information about Tesla stock price"</p>
            </div>
            <div className="p-4 bg-gray-900/60 rounded-lg border border-gray-700/30 hover:border-cyan-500/30 transition-colors">
              <p className="text-sm text-gray-300">"Search for AI job openings"</p>
            </div>
            <div className="p-4 bg-gray-900/60 rounded-lg border border-gray-700/30 hover:border-green-500/30 transition-colors">
              <p className="text-sm text-gray-300">"What's trending on Reddit today?"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IVR;