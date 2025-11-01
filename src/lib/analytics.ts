/**
 * Analytics service for tracking user interactions
 * Supports Google Analytics 4 and custom event tracking
 */

// Google Analytics 4
declare global {
  interface Window {
    gtag?: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer?: unknown[];
  }
}

interface AnalyticsConfig {
  ga4Id?: string;
  enabled: boolean;
}

class AnalyticsService {
  private config: AnalyticsConfig;

  constructor() {
    this.config = {
      ga4Id: import.meta.env.VITE_GA4_ID,
      enabled: import.meta.env.PROD && !!import.meta.env.VITE_GA4_ID,
    };
  }

  /**
   * Initialize analytics
   */
  init(): void {
    if (!this.config.enabled || !this.config.ga4Id) {
      return;
    }

    // Load Google Analytics 4
    const script1 = document.createElement('script');
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${this.config.ga4Id}`;
    document.head.appendChild(script1);

    const script2 = document.createElement('script');
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${this.config.ga4Id}', {
        page_path: window.location.pathname,
      });
    `;
    document.head.appendChild(script2);
  }

  /**
   * Track page view
   */
  trackPageView(path: string): void {
    if (!this.config.enabled) {
      return;
    }

    if (window.gtag) {
      window.gtag('config', this.config.ga4Id!, {
        page_path: path,
      });
    }

    // Custom analytics
    this.trackEvent('page_view', { path });
  }

  /**
   * Track custom event
   */
  trackEvent(eventName: string, params?: Record<string, unknown>): void {
    if (!this.config.enabled) {
      // Log to console in development
      if (import.meta.env.DEV) {
        console.log('[Analytics]', eventName, params);
      }
      return;
    }

    if (window.gtag) {
      window.gtag('event', eventName, params);
    }

    // You can add other analytics services here (e.g., Plausible, Mixpanel)
  }

  /**
   * Track appointment form submission
   */
  trackAppointmentSubmit(success: boolean, error?: string): void {
    this.trackEvent('appointment_submit', {
      success,
      error,
      timestamp: new Date().toISOString(),
    });
  }

  /**
   * Track button click
   */
  trackButtonClick(buttonName: string, location: string): void {
    this.trackEvent('button_click', {
      button_name: buttonName,
      location,
    });
  }

  /**
   * Track form error
   */
  trackFormError(formName: string, error: string): void {
    this.trackEvent('form_error', {
      form_name: formName,
      error,
    });
  }
}

// Singleton instance
export const analytics = new AnalyticsService();

// Initialize on module load
if (typeof window !== 'undefined') {
  analytics.init();
}

