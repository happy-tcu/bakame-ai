import { useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import Navbar from '@/components/layout/Navbar';

const Index = () => {
  useEffect(() => {
    // Load ElevenLabs Conversational AI widget script
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Section with YouTube Video Background */}
      <section className="relative min-h-screen flex items-center justify-center bg-black overflow-hidden">
        {/* YouTube Video Background */}
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <iframe
            className="absolute top-1/2 left-1/2 w-[177.77777778vh] h-[56.25vw] min-h-full min-w-full -translate-x-1/2 -translate-y-1/2"
            src="https://www.youtube.com/embed/pB3otRKMFAc?autoplay=1&mute=1&loop=1&playlist=pB3otRKMFAc&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1&vq=hd2160&disablekb=1&fs=0&iv_load_policy=3"
            title="Background video"
            allow="autoplay; encrypted-media"
            style={{ pointerEvents: 'none' }}
          />
        </div>
        
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/80"></div>
        
        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight drop-shadow-2xl text-white">
            Empowering School Districts with Offline-AI
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto drop-shadow-lg">
            We are Dallas-based start-up specializing in developing cool AI tools and integrations for remote schools in Africa.
          </p>
        </div>
      </section>
      
      {/* ElevenLabs Conversational AI */}
      <div dangerouslySetInnerHTML={{ __html: '<elevenlabs-convai agent-id="agent_0301k3y6dwrve63sb37n6f4ffkrj"></elevenlabs-convai>' }} />
    </div>
  );
};

export default Index;