import { useState, useEffect } from 'react';
import { Phone, X, WifiOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FloatingVoiceButtonProps {
  agentId: string;
  triggerSectionId?: string;
}

const FloatingVoiceButton = ({ agentId, triggerSectionId }: FloatingVoiceButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isScriptLoaded, setIsScriptLoaded] = useState(false);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (!triggerSectionId) {
      setShowButton(true);
      return;
    }

    const checkScrollPosition = () => {
      const section = document.getElementById(triggerSectionId);
      if (!section) {
        setShowButton(true);
        return;
      }

      const rect = section.getBoundingClientRect();
      const sectionBottom = rect.bottom;
      const shouldShow = sectionBottom < window.innerHeight * 0.5;
      
      setShowButton(shouldShow);
    };

    window.addEventListener('scroll', checkScrollPosition, { passive: true });
    checkScrollPosition();

    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, [triggerSectionId]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const existingScript = document.querySelector('script[src*="elevenlabs/convai-widget-embed"]');
    if (existingScript) {
      setIsScriptLoaded(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    script.onload = () => setIsScriptLoaded(true);
    document.body.appendChild(script);

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);

  const openWidget = () => {
    setIsOpen(true);
  };

  const closeWidget = () => {
    setIsOpen(false);
  };

  return (
    <>
      {showButton && !isOpen && (
        <div 
          className={cn(
            "fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-3",
            "animate-in slide-in-from-bottom-6 fade-in duration-500"
          )}
        >
          <div 
            className={cn(
              "bg-gray-900/95 backdrop-blur-sm text-white px-4 py-2 rounded-full shadow-lg",
              "transition-all duration-300 ease-out",
              "flex items-center gap-2 text-sm font-medium",
              "border border-white/10",
              isHovered ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4 pointer-events-none"
            )}
          >
            <WifiOff className="h-4 w-4 text-blue-400" />
            <span>Try Bakame AI - No internet needed</span>
          </div>
          
          <button
            onClick={openWidget}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className={cn(
              "group relative flex items-center justify-center",
              "w-16 h-16 rounded-full shadow-2xl cursor-pointer",
              "transition-all duration-300 ease-out",
              "hover:scale-110 active:scale-95",
              "bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
            )}
            data-testid="button-floating-voice"
            aria-label="Talk to Bakame AI"
            type="button"
          >
            <div className={cn(
              "absolute inset-0 rounded-full",
              "bg-gradient-to-br from-blue-400/20 to-purple-400/20",
              "animate-pulse"
            )} />
            
            <div className="absolute inset-0 rounded-full animate-ping bg-blue-500/30" style={{ animationDuration: '2s' }} />
            
            <div className="relative z-10">
              <Phone className="h-7 w-7 text-white" />
            </div>
          </button>
        </div>
      )}

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/90 z-[9999] flex items-center justify-center"
          data-testid="widget-overlay"
        >
          <button
            onClick={closeWidget}
            className={cn(
              "absolute top-6 right-6",
              "w-12 h-12 rounded-full cursor-pointer",
              "bg-white/10 hover:bg-white/20 border border-white/20",
              "flex items-center justify-center",
              "transition-all duration-300",
              "hover:scale-110"
            )}
            data-testid="button-close-widget"
            aria-label="Close voice assistant"
            type="button"
          >
            <X className="h-6 w-6 text-white" />
          </button>

          <div className="absolute top-6 left-6">
            <h2 className="text-white text-xl font-semibold">Bakame AI</h2>
            <p className="text-gray-400 text-sm">Voice AI - No internet needed</p>
          </div>

          {isScriptLoaded && (
            <div 
              className={cn(
                "w-full max-w-2xl h-[70vh]",
                "flex items-center justify-center",
                "animate-in zoom-in-95 fade-in duration-300"
              )}
              data-testid="widget-container"
            >
              <div 
                className="w-full h-full flex items-center justify-center"
                dangerouslySetInnerHTML={{ 
                  __html: `<elevenlabs-convai 
                    agent-id="${agentId}"
                    avatar-orb-color-1="#2563eb"
                    avatar-orb-color-2="#9333ea"
                    action-text="Talk to Bakame AI"
                    start-call-text="Start Call"
                    end-call-text="End Call"
                    listening-text="Listening..."
                    speaking-text="Bakame is speaking"
                  ></elevenlabs-convai>` 
                }} 
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FloatingVoiceButton;
