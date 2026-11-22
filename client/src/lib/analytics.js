export function trackEvent(eventName) {
  if (typeof window !== 'undefined' && typeof window.plausible === 'function') {
    window.plausible(eventName);
  }
}
