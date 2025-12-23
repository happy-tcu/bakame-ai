// Security event logging utility
interface SecurityEvent {
  event_type: string;
  details: Record<string, unknown>;
  severity: 'low' | 'medium' | 'high';
}

export const logSecurityEvent = (event: SecurityEvent) => {
  // For now, just log to console in development
  if (import.meta.env.DEV) {
    console.log('[Security Event]', event);
  }
};
