
import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

// Generate session ID once per session
const getSessionId = () => {
  let sessionId = sessionStorage.getItem('bakame_session_id');
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    sessionStorage.setItem('bakame_session_id', sessionId);
  }
  return sessionId;
};

export const useAnalytics = () => {
  const trackEvent = async (eventType: string, eventData?: any) => {
    try {
      const sessionId = getSessionId();
      
      await supabase.functions.invoke('analytics', {
        body: {
          page_path: window.location.pathname,
          event_type: eventType,
          event_data: eventData,
          session_id: sessionId
        }
      });
    } catch (error) {
      console.error('Analytics tracking error:', error);
    }
  };

  const trackPageView = () => {
    trackEvent('page_view');
  };

  const trackButtonClick = (buttonName: string, additionalData?: any) => {
    trackEvent('button_click', { button_name: buttonName, ...additionalData });
  };

  const trackFormSubmit = (formName: string, additionalData?: any) => {
    trackEvent('form_submit', { form_name: formName, ...additionalData });
  };

  // Auto-track page views
  useEffect(() => {
    trackPageView();
  }, []);

  return {
    trackEvent,
    trackPageView,
    trackButtonClick,
    trackFormSubmit
  };
};
