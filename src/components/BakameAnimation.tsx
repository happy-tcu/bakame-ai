import React, { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

interface BakameAnimationProps {
  variant?: 'hero' | 'brand' | 'loading';
  className?: string;
  autoPlay?: boolean;
  loop?: boolean;
  muted?: boolean;
  onEnded?: () => void;
}

export const BakameAnimation: React.FC<BakameAnimationProps> = ({
  variant = 'hero',
  className = '',
  autoPlay = true,
  loop = false,
  muted = true,
  onEnded
}) => {
  const { theme } = useTheme();
  const [videoSrc, setVideoSrc] = useState('');
  const [isVertical, setIsVertical] = useState(false);

  useEffect(() => {
    // Check if screen is vertical
    const checkOrientation = () => {
      setIsVertical(window.innerHeight > window.innerWidth);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, []);

  useEffect(() => {
    // Select appropriate video based on theme and orientation
    const getVideoSrc = () => {
      const isDark = theme === 'dark';
      
      if (variant === 'loading') {
        // Use blue animation for loading
        return isVertical 
          ? '/videos/bakame-intro-blue-vertical.mp4'
          : '/videos/bakame-intro-blue.mp4';
      }
      
      if (variant === 'brand') {
        // Use white/black based on theme
        return isVertical
          ? isDark ? '/videos/bakame-intro-white-vertical.mp4' : '/videos/bakame-intro-black-vertical.mp4'
          : isDark ? '/videos/bakame-intro-white.mp4' : '/videos/bakame-intro-black.mp4';
      }
      
      // Hero variant - use blue as primary brand color
      return isVertical 
        ? '/videos/bakame-intro-blue-vertical.mp4'
        : '/videos/bakame-intro-blue.mp4';
    };

    setVideoSrc(getVideoSrc());
  }, [theme, isVertical, variant]);

  const getContainerClasses = () => {
    switch (variant) {
      case 'loading':
        return 'fixed inset-0 z-50 flex items-center justify-center bg-background';
      case 'brand':
        return 'w-full h-auto';
      case 'hero':
      default:
        return 'w-full h-auto max-w-2xl mx-auto';
    }
  };

  const getVideoClasses = () => {
    const baseClasses = 'w-full h-auto object-contain';
    
    switch (variant) {
      case 'loading':
        return `${baseClasses} max-w-md max-h-96`;
      case 'brand':
        return `${baseClasses}`;
      case 'hero':
      default:
        return `${baseClasses} rounded-lg shadow-2xl`;
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
        onEnded={onEnded}
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

export default BakameAnimation;