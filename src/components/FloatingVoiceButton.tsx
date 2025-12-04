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
  const [isVisible, setIsVisible] = useState(!triggerSectionId);

  useEffect(() => {
    if (!triggerSectionId) return;

    const checkScrollPosition = () => {
      const section = document.getElementById(triggerSectionId);
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const sectionBottom = rect.bottom;
      const shouldBeVisible = sectionBottom < window.innerHeight * 0.5;
      
      setIsVisible(shouldBeVisible);
    };

    window.addEventListener('scroll', checkScrollPosition, { passive: true });
    checkScrollPosition();

    return () => {
      window.removeEventListener('scroll', checkScrollPosition);
    };
  }, [triggerSectionId]);

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

  const toggleWidget = () => {
    setIsOpen(!isOpen);
  };

  if (!isVisible) return null;

  return (
    <>
      <div 
        className={cn(
          "fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3",
          "animate-in slide-in-from-bottom-6 fade-in duration-500"
        )}
      >
        {!isOpen && (
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
        )}
        
        <button
          onClick={toggleWidget}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn(
            "group relative flex items-center justify-center",
            "w-16 h-16 rounded-full shadow-2xl",
            "transition-all duration-300 ease-out",
            "hover:scale-110 active:scale-95",
            isOpen 
              ? "bg-gray-800 hover:bg-gray-700" 
              : "bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500"
          )}
          data-testid="button-floating-voice"
          aria-label={isOpen ? "Close voice assistant" : "Talk to Bakame AI"}
        >
          <div className={cn(
            "absolute inset-0 rounded-full",
            "bg-gradient-to-br from-blue-400/20 to-purple-400/20",
            "animate-pulse",
            isOpen && "hidden"
          )} />
          
          {!isOpen && (
            <div className="absolute inset-0 rounded-full animate-ping bg-blue-500/30" style={{ animationDuration: '2s' }} />
          )}
          
          <div className="relative z-10 transition-transform duration-300">
            {isOpen ? (
              <X className="h-7 w-7 text-white" />
            ) : (
              <Phone className="h-7 w-7 text-white" />
            )}
          </div>
        </button>
      </div>

      {isOpen && isScriptLoaded && (
        <div 
          className={cn(
            "fixed bottom-28 right-6 z-50",
            "transition-all duration-300 ease-out",
            "animate-in slide-in-from-bottom-4 fade-in"
          )}
          data-testid="widget-container"
        >
          <div 
            dangerouslySetInnerHTML={{ 
              __html: `<elevenlabs-convai agent-id="${agentId}"></elevenlabs-convai>` 
            }} 
          />
        </div>
      )}

      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
          onClick={toggleWidget}
          data-testid="widget-overlay"
        />
      )}
    </>
  );
};

export default FloatingVoiceButton;
