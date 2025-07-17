import React from 'react';
import IVRInterface from '@/components/ivr/IVRInterface';
const IVR = () => {
  return <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-400/20 to-cyan-400/20"></div>
        <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex justify-between items-center p-6 md:p-8 backdrop-blur-sm bg-white/5 border-b border-white/10">
        <a href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent hover:from-purple-400 hover:to-blue-400 transition-all duration-300">
          Bakame AI
        </a>
        <div className="hidden md:flex space-x-8">
          <a href="/" className="text-white/70 hover:text-white transition-colors">Home</a>
          <a href="/blog" className="text-white/70 hover:text-white transition-colors">Blog</a>
          
          
        </div>
      </nav>

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4 px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-green-400">LIVE AI ASSISTANT</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
            IVR Demo - Bakame AI
          </h1>
          
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-6">
            Interactive Voice Response powered by AI. Speak naturally in Kinyarwanda or English 
            for English learning, government services, and local knowledge.
          </p>
          
          <div className="flex justify-center gap-3 text-sm text-white/60 mb-8 flex-wrap">
            <span className="px-3 py-1 bg-blue-500/20 rounded-lg border border-blue-500/30 flex items-center gap-2">
              🇷🇼 Rwanda
            </span>
            <span className="px-3 py-1 bg-green-500/20 rounded-lg border border-green-500/30 flex items-center gap-2">
              📚 English Learning
            </span>
            <span className="px-3 py-1 bg-purple-500/20 rounded-lg border border-purple-500/30 flex items-center gap-2">
              🏛️ Irembo Services
            </span>
          </div>
        </div>

        {/* Main IVR Interface */}
        <div className="flex justify-center mb-12">
          <IVRInterface />
        </div>

        {/* Quick Examples */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-center mb-6 text-white/90">
            Try these examples:
          </h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:border-green-400/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                <span className="text-sm font-medium text-green-400">English Learning</span>
              </div>
              <p className="text-sm text-white/80">"Teach me business English words"</p>
              <p className="text-xs text-white/60 mt-1">"Mfasha kwiga amagambo y'ubucuruzi"</p>
            </div>
            
            <div className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:border-purple-400/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                <span className="text-sm font-medium text-purple-400">Government</span>
              </div>
              <p className="text-sm text-white/80">"How do I apply for ID on Irembo?"</p>
              <p className="text-xs text-white/60 mt-1">"Ngusaba indangamuntu muri Irembo"</p>
            </div>
            
            <div className="group bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:border-blue-400/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                <span className="text-sm font-medium text-blue-400">University</span>
              </div>
              <p className="text-sm text-white/80">"Tell me about UR admissions"</p>
              <p className="text-xs text-white/60 mt-1">"Mbwira ku kwinjira UR"</p>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default IVR;