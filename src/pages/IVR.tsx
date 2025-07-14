import React from 'react';
import IVRInterface from '@/components/ivr/IVRInterface';

const IVR = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Navigation */}
      <nav className="relative z-20 flex justify-between items-center p-6 md:p-8">
        <a href="/" className="text-2xl font-bold hover:text-blue-400 transition-colors duration-300">
          Bakame AI
        </a>
        <div className="hidden md:flex space-x-8">
          <a href="/blog" className="text-white/70 hover:text-white transition-colors">Blog</a>
          <a href="/resources" className="text-white/70 hover:text-white transition-colors">Resources</a>
          <a href="/team" className="text-white/70 hover:text-white transition-colors">Team</a>
        </div>
      </nav>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            AI Web Scraper IVR
          </h1>
          <p className="text-xl text-white/70 max-w-2xl mx-auto mb-8">
            Experience our intelligent voice response system that can search and scrape the web in real-time. 
            Ask questions about any website or topic and get live data through voice interaction.
          </p>
          <div className="flex justify-center gap-4 text-sm text-white/60 mb-8">
            <span className="px-3 py-1 bg-blue-500/20 rounded-full border border-blue-500/30">🔍 Web Scraping</span>
            <span className="px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/30">🎤 Voice AI</span>
            <span className="px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30">⚡ Real-time Data</span>
          </div>
        </div>

        <div className="flex justify-center mb-16">
          <IVRInterface />
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-colors">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Voice Recognition</h3>
              <p className="text-white/70">
                Advanced speech-to-text technology powered by OpenAI Whisper with real-time processing
              </p>
            </div>
            <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-colors">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Web Scraping AI</h3>
              <p className="text-white/70">
                Intelligent web scraping that fetches live data from any website based on your voice commands
              </p>
            </div>
            <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-500/30 transition-colors">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2m0 0V3a1 1 0 011 1v4.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 01-.586.293H10a1 1 0 01-1-1V9a1 1 0 01.293-.707L15.707 2.293A1 1 0 0116 2v2" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Natural Speech</h3>
              <p className="text-white/70">
                Human-like text-to-speech synthesis that reads scraped data naturally in conversation
              </p>
            </div>
          </div>
        </div>

        {/* Example usage section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-8 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Try These Voice Commands
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-blue-500/30 transition-all duration-300 hover:bg-white/10">
              <p className="text-sm text-white/70">"What are the latest tech news headlines?"</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:bg-white/10">
              <p className="text-sm text-white/70">"Get me information about Tesla stock price"</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-green-500/30 transition-all duration-300 hover:bg-white/10">
              <p className="text-sm text-white/70">"Search for AI job openings"</p>
            </div>
            <div className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-yellow-500/30 transition-all duration-300 hover:bg-white/10">
              <p className="text-sm text-white/70">"What's trending on Reddit today?"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IVR;