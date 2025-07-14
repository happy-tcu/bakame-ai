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
            Bakame AI Rwanda
          </h1>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6 text-blue-400">
            Kwiga Icyongereza • Irembo Services • Ubumenyi bw'Igihugu
          </h2>
          <p className="text-xl text-white/70 max-w-3xl mx-auto mb-8">
            Hamagara kandi uvugane na AI kugirango wige Icyongereza, ubigire serivisi za leta muri Irembo, 
            cyangwa ubigire amakuru ku masomo ya kaminuza. Vuga mu Kinyarwanda cyangwa mu Cyongereza!
          </p>
          <p className="text-lg text-white/60 max-w-2xl mx-auto mb-8">
            <em>Call and speak with AI to learn English, access government services through Irembo, 
            or get information about university studies. Speak in Kinyarwanda or English!</em>
          </p>
          <div className="flex justify-center gap-4 text-sm text-white/60 mb-8 flex-wrap">
            <span className="px-3 py-1 bg-blue-500/20 rounded-full border border-blue-500/30">🇷🇼 Rwanda Yose</span>
            <span className="px-3 py-1 bg-green-500/20 rounded-full border border-green-500/30">📚 Kwiga Icyongereza</span>
            <span className="px-3 py-1 bg-purple-500/20 rounded-full border border-purple-500/30">🏛️ Irembo Services</span>
            <span className="px-3 py-1 bg-yellow-500/20 rounded-full border border-yellow-500/30">🎓 Kaminuza UR</span>
          </div>
        </div>

        <div className="flex justify-center mb-16">
          <IVRInterface />
        </div>

        {/* Features Section */}
        <div className="mb-20">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-green-500/30 transition-colors">
                <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Kwiga Icyongereza</h3>
              <h4 className="text-sm font-medium mb-2 text-green-400">Learn English</h4>
              <p className="text-white/70">
                Iga ijambo rishya, guca imvugo, cyangwa wisanganire mu gihe ryo kwiga. AI izakugiriraho nk'umwarimu w'Icyongereza.
              </p>
            </div>
            <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-purple-500/30 transition-colors">
                <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Serivisi za Irembo</h3>
              <h4 className="text-sm font-medium mb-2 text-purple-400">Government Services</h4>
              <p className="text-white/70">
                Bigire amakuru ku serivisi za leta, uburyo bwo gusaba inyandiko, cyangwa ikindi cyose ku Irembo.
              </p>
            </div>
            <div className="group bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-6 group-hover:bg-blue-500/30 transition-colors">
                <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white">Ubumenyi bw'Igihugu</h3>
              <h4 className="text-sm font-medium mb-2 text-blue-400">Local Knowledge</h4>
              <p className="text-white/70">
                Baza ibintu ku mateka y'u Rwanda, amategeko, kaminuza, cyangwa ikindi cyose ugomba kumenya.
              </p>
            </div>
          </div>
        </div>

        {/* Example usage section */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-white mb-4 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
            Bisubizo byiza byo kugerageza
          </h2>
          <h3 className="text-lg text-white/60 mb-8">
            <em>Great examples to try</em>
          </h3>
          
          {/* English Learning Examples */}
          <div className="mb-12">
            <h4 className="text-xl font-semibold text-green-400 mb-4">📚 Kwiga Icyongereza / Learning English</h4>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              <div className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-green-500/30 transition-all duration-300 hover:bg-white/10">
                <p className="text-sm text-white/70">"Mpigire amagambo yo gutanga ikinyururu ku kazi"</p>
                <p className="text-xs text-green-300 mt-2"><em>"Give me words for a job interview"</em></p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-green-500/30 transition-all duration-300 hover:bg-white/10">
                <p className="text-sm text-white/70">"Nitangirire gusoma Icyongereza, nshobora gute?"</p>
                <p className="text-xs text-green-300 mt-2"><em>"I'm starting to learn English, how can I do it?"</em></p>
              </div>
            </div>
          </div>

          {/* Government Services Examples */}
          <div className="mb-12">
            <h4 className="text-xl font-semibold text-purple-400 mb-4">🏛️ Serivisi za Leta / Government Services</h4>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              <div className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:bg-white/10">
                <p className="text-sm text-white/70">"Ngomba gusaba indangamuntu muri Irembo"</p>
                <p className="text-xs text-purple-300 mt-2"><em>"I need to apply for an ID card on Irembo"</em></p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-purple-500/30 transition-all duration-300 hover:bg-white/10">
                <p className="text-sm text-white/70">"Uburyo bwo kwandikisha ubucuruzi bwange"</p>
                <p className="text-xs text-purple-300 mt-2"><em>"How to register my business"</em></p>
              </div>
            </div>
          </div>

          {/* University & Education Examples */}
          <div className="mb-8">
            <h4 className="text-xl font-semibold text-yellow-400 mb-4">🎓 Kaminuza & Masomo / University & Education</h4>
            <div className="grid md:grid-cols-2 gap-4 max-w-4xl mx-auto">
              <div className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-yellow-500/30 transition-all duration-300 hover:bg-white/10">
                <p className="text-sm text-white/70">"Ni gute nshobora gusaba kaminuza ya UR?"</p>
                <p className="text-xs text-yellow-300 mt-2"><em>"How can I apply to University of Rwanda?"</em></p>
              </div>
              <div className="p-4 bg-white/5 rounded-lg border border-white/10 hover:border-yellow-500/30 transition-all duration-300 hover:bg-white/10">
                <p className="text-sm text-white/70">"Amategeko y'umuhanda muri Rwanda"</p>
                <p className="text-xs text-yellow-300 mt-2"><em>"Traffic laws in Rwanda"</em></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IVR;