import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';

type AnimationType = 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale' | 'rotate';

interface AnimatedSectionProps {
  children: React.ReactNode;
  animation?: AnimationType;
  className?: string;
  delay?: number;
  threshold?: number;
}

const animationClasses: Record<AnimationType, string> = {
  'fade-up': 'scroll-hidden',
  'fade-in': 'scroll-fade-in',
  'slide-left': 'scroll-slide-left',
  'slide-right': 'scroll-slide-right',
  'scale': 'scroll-scale',
  'rotate': 'scroll-rotate',
};

const AnimatedSection = ({
  children,
  animation = 'fade-up',
  className = '',
  delay = 0,
  threshold = 0.1,
}: AnimatedSectionProps) => {
  const { ref, isVisible } = useScrollAnimation({ threshold });

  return (
    <div
      ref={ref}
      className={cn(
        animationClasses[animation],
        isVisible && 'scroll-visible',
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

export default AnimatedSection;
