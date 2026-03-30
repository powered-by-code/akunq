const PIXEL_ID = '3427308844110789';

function track(event: string, params?: Record<string, string>) {
  if (typeof window.fbq === 'function') {
    window.fbq('track', event, params);
  }
}

export const metaPixel = {
  trackPageView: () => track('PageView'),
  trackLead: () => track('Lead'),
  trackCustom: (event: string, params?: Record<string, string>) => {
    if (typeof window.fbq === 'function') {
      window.fbq('trackCustom', event, params);
    }
  },
  PIXEL_ID,
};
