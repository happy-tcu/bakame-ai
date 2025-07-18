
import React from 'react';
import IVRInterface from '@/components/ivr/IVRInterface';

const IVR = () => {
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-gradient-to-br from-[#ff914d]/20 via-[#0d4dcc]/20 to-[#081a2e]/20"></div>
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 flex justify-between items-center p-6 md:p-8 backdrop-blur-sm bg-white/5 border-b border-white/10">
        <a href="/" className="text-2xl font-bold bg-gradient-to-r from-[#ff914d] to-[#0d4dcc] bg-clip-text text-transparent hover:from-[#0d4dcc] hover:to-[#ff914d] transition-all duration-500">
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
          <div className="inline-flex items-center gap-3 mb-4 px-6 py-2 bg-gradient-to-r from-[#ff914d]/10 to-[#0d4dcc]/10 backdrop-blur-sm rounded-full border border-white/20">
            <div className="w-2 h-2 bg-gradient-to-r from-[#ff914d] to-[#0d4dcc] rounded-full animate-pulse"></div>
            <span className="text-sm font-medium bg-gradient-to-r from-[#ff914d] to-[#0d4dcc] bg-clip-text text-transparent">LIVE ENGLISH TUTOR</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
            Learn English with <span className="bg-gradient-to-r from-[#ff914d] to-[#0d4dcc] bg-clip-text text-transparent">Bakame AI</span>
          </h1>
          
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-6">
            Your personal English learning assistant. Practice conversation, learn new vocabulary, 
            and improve your pronunciation through real-time voice interaction.
          </p>
          
          <div className="flex justify-center gap-3 text-sm text-white/60 mb-8 flex-wrap">
            <span className="px-3 py-1 bg-gradient-to-r from-[#0d4dcc]/20 to-[#ff914d]/20 rounded-lg border border-white/30 flex items-center gap-2">
              🗣️ Conversation Practice
            </span>
            <span className="px-3 py-1 bg-gradient-to-r from-[#ff914d]/20 to-[#0d4dcc]/20 rounded-lg border border-white/30 flex items-center gap-2">
              📚 Vocabulary Building
            </span>
            <span className="px-3 py-1 bg-gradient-to-r from-[#081a2e]/40 to-[#0d4dcc]/20 rounded-lg border border-white/30 flex items-center gap-2">
              🎯 Pronunciation Help
            </span>
          </div>
        </div>

        {/* Main IVR Interface */}
        <div className="flex justify-center mb-12">
          <IVRInterface />
        </div>

        {/* Learning Examples */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-semibold text-center mb-6 text-white/90">
            Try these English learning exercises:
          </h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="group bg-[#081a2e]/60 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-[#081a2e]/80 transition-all duration-300 hover:border-gradient-to-r hover:from-[#ff914d]/50 hover:to-[#0d4dcc]/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-gradient-to-r from-[#ff914d] to-[#0d4dcc] rounded-full"></div>
                <span className="text-sm font-medium bg-gradient-to-r from-[#ff914d] to-[#0d4dcc] bg-clip-text text-transparent">Vocabulary</span>
              </div>
              <p className="text-sm text-white/80">"Teach me business English words"</p>
            </div>
            
            <div className="group bg-[#081a2e]/60 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-[#081a2e]/80 transition-all duration-300 hover:border-gradient-to-r hover:from-[#0d4dcc]/50 hover:to-[#ff914d]/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-gradient-to-r from-[#0d4dcc] to-[#ff914d] rounded-full"></div>
                <span className="text-sm font-medium bg-gradient-to-r from-[#0d4dcc] to-[#ff914d] bg-clip-text text-transparent">Grammar</span>
              </div>
              <p className="text-sm text-white/80">"Explain past tense in English"</p>
            </div>
            
            <div className="group bg-[#081a2e]/60 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-[#081a2e]/80 transition-all duration-300 hover:border-white/50">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 bg-gradient-to-r from-white to-[#0d4dcc] rounded-full"></div>
                <span className="text-sm font-medium text-white">Interview Prep</span>
              </div>
              <p className="text-sm text-white/80">"Help me practice job interview"</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IVR;
