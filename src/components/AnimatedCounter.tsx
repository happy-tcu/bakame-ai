import { useState, useEffect, useRef } from 'react';

interface AnimatedCounterProps {
  end: string;
  duration?: number;
  className?: string;
}

const AnimatedCounter = ({ end, duration = 5000, className = '' }: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const countRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  // Extract numeric part and suffix from the end value
  const getNumericParts = (value: string) => {
    const match = value.match(/^(\d+(?:\.\d+)?)(.*)/);
    if (match) {
      let numeric = parseFloat(match[1]);
      let suffix = match[2];
      
      // Convert K to actual thousands
      if (suffix.includes('K')) {
        numeric = numeric * 1000;
        suffix = suffix.replace('K', '');
      }
      
      return {
        numeric,
        suffix
      };
    }
    return { numeric: 0, suffix: value };
  };

  const { numeric: endValue, suffix } = getNumericParts(end);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.1 }
    );

    if (countRef.current) {
      observer.observe(countRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    const startTime = Date.now();
    const startValue = 0;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for smooth animation
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      const currentValue = startValue + (endValue - startValue) * easeOutCubic;

      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, endValue, duration]);

  const formatValue = (value: number) => {
    return Math.floor(value).toString() + suffix;
  };

  return (
    <div ref={countRef} className={className}>
      {formatValue(count)}
    </div>
  );
};

export default AnimatedCounter;