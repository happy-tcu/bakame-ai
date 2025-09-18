import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface BakameAnimationProps {
  variant?: 'hero' | 'brand' | 'loading' | 'background';
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  controls?: boolean;
  onEnded?: () => void;
}

export const BakameAnimation: React.FC<BakameAnimationProps> = ({
  variant = 'hero',
  className = '',
  autoPlay = true,
  loop = false,
  muted = true,
  controls = false,
  onEnded
}) => {
  const { theme } = useTheme();
  const [videoSrc, setVideoSrc] = useState('');
  const [isVertical, setIsVertical] = useState(false);

  useEffect(() => {
    const checkOrientation = () => {
      setIsVertical(window.innerHeight > window.innerWidth);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  useEffect(() => {
    const getVideoSrc = () => {
      const isDark = theme === 'dark';
      
      switch (variant) {
        case 'loading':
          return isVertical 
            ? '/videos/bakame-intro-blue-vertical.mp4'
            : '/videos/bakame-intro-blue.mp4';
            
        case 'brand':
          return isVertical
            ? isDark ? '/videos/bakame-intro-white-vertical.mp4' : '/videos/bakame-intro-black-vertical.mp4'
            : isDark ? '/videos/bakame-intro-white.mp4' : '/videos/bakame-intro-black.mp4';
            
        case 'background':
          return isVertical 
            ? '/videos/bakame-intro-blue-vertical.mp4'
            : '/videos/bakame-intro-blue.mp4';
            
        case 'hero':
        default:
          return isVertical 
            ? '/videos/bakame-intro-blue-vertical.mp4'
            : '/videos/bakame-intro-blue.mp4';
      }
    };

    setVideoSrc(getVideoSrc());
  }, [theme, isVertical, variant]);

  const getContainerClasses = () => {
    switch (variant) {
      case 'loading':
        return 'fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm';
      case 'background':
        return 'absolute inset-0 overflow-hidden opacity-10';
      case 'brand':
        return 'w-full h-auto flex justify-center';
      case 'hero':
      default:
        return 'relative w-full h-auto';
    }
  };

  const getVideoClasses = () => {
    switch (variant) {
      case 'loading':
        return 'w-full h-auto max-w-sm max-h-80 object-contain';
      case 'background':
        return 'w-full h-full object-cover scale-110';
      case 'brand':
        return 'w-full h-auto max-w-xs object-contain';
      case 'hero':
      default:
        return 'w-full h-auto max-w-md mx-auto object-contain drop-shadow-2xl';
    }
  };

  if (!videoSrc) return null;

  return (
    <div className={`${getContainerClasses()} ${className}`}>
      <video
        className={getVideoClasses()}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        playsInline
        controls={controls}
        onEnded={onEnded}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BakameAnimation;