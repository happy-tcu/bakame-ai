// Security utility - minimal implementation for logging
interface SecurityEvent {
  event_type: string;
  details: Record<string, unknown>;
  severity: 'low' | 'medium' | 'high';
}

export const logSecurityEvent = (event: SecurityEvent): void => {
  // In development, just log to console
  if (import.meta.env.DEV) {
    console.debug('[Security]', event.event_type, event.details);
  }
};
