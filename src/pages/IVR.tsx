
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
      <div className="relative z-10">
        <IVRInterface />
      </div>
    </div>
  );
};

export default IVR;
