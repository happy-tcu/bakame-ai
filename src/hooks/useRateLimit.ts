
import { useState } from 'react';
import { checkRateLimit, getClientIdentifier, RateLimitOptions } from '@/utils/security';
import { useToast } from '@/hooks/use-toast';

interface UseRateLimitResult {
  isBlocked: boolean;
  remaining: number;
  checkLimit: (action: string, maxRequests?: number, windowMinutes?: number) => Promise<boolean>;
  resetBlock: () => void;
}

export const useRateLimit = (): UseRateLimitResult => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [remaining, setRemaining] = useState(0);
  const { toast } = useToast();

  const checkLimit = async (
    action: string, 
    maxRequests: number = 5, 
    windowMinutes: number = 15
  ): Promise<boolean> => {
    const options: RateLimitOptions = {
      identifier: getClientIdentifier(),
      action,
      maxRequests,
      windowMinutes
    };

    const result = await checkRateLimit(options);
    setRemaining(result.remaining);

    if (!result.allowed) {
      setIsBlocked(true);
      toast({
        title: "Too Many Requests",
        description: `Please wait ${windowMinutes} minutes before trying again.`,
        variant: "destructive",
      });
      
      // Auto-reset block after window period
      setTimeout(() => {
        setIsBlocked(false);
      }, windowMinutes * 60 * 1000);
      
      return false;
    }

    return true;
  };

  const resetBlock = () => {
    setIsBlocked(false);
  };

  return {
    isBlocked,
    remaining,
    checkLimit,
    resetBlock
  };
};
