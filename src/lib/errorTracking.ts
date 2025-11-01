/**
 * Error tracking service
 * Supports Sentry integration when configured
 */

interface ErrorTrackingConfig {
  enabled: boolean;
  dsn?: string;
  environment: string;
}

interface ErrorContext {
  userId?: string;
  email?: string;
  [key: string]: unknown;
}

class ErrorTrackingService {
  private config: ErrorTrackingConfig;
  private initialized = false;

  constructor() {
    this.config = {
      enabled: import.meta.env.PROD && !!import.meta.env.VITE_SENTRY_DSN,
      dsn: import.meta.env.VITE_SENTRY_DSN,
      environment: import.meta.env.MODE || 'development',
    };
  }

  /**
   * Initialize error tracking
   */
  async init(): Promise<void> {
    if (this.initialized || !this.config.enabled || !this.config.dsn) {
      return;
    }

    try {
      // Dynamic import with runtime check to prevent build-time resolution
      // Only attempts import if Sentry is configured
      const modulePath = '@sentry/react';
      // Use Function constructor to prevent static analysis
      const importSentry = new Function('specifier', 'return import(specifier)');
      const Sentry = await importSentry(modulePath);
      
      if (Sentry?.init) {
        Sentry.init({
          dsn: this.config.dsn,
          environment: this.config.environment,
          integrations: [
            Sentry.browserTracingIntegration?.(),
            Sentry.replayIntegration?.({
              maskAllText: true,
              blockAllMedia: true,
            }),
          ].filter(Boolean),
          tracesSampleRate: 1.0,
          replaysSessionSampleRate: 0.1,
          replaysOnErrorSampleRate: 1.0,
        });

        this.initialized = true;
      }
    } catch (error) {
      // Silent fail - Sentry not installed or not configured
      if (import.meta.env.DEV) {
        console.warn('Sentry not available (install @sentry/react to enable):', error);
      }
    }
  }

  /**
   * Capture exception
   */
  captureException(error: Error, context?: ErrorContext): void {
    if (this.config.enabled && this.initialized) {
      // Use Function constructor for dynamic import
      const importSentry = new Function('specifier', 'return import(specifier)');
      importSentry('@sentry/react').then((Sentry: typeof import('@sentry/react')) => {
        if (Sentry?.captureException) {
          Sentry.captureException(error, {
            contexts: {
              custom: context || {},
            },
          });
        }
      }).catch(() => {
        // Fallback if Sentry fails
        console.error('Error tracking failed:', error, context);
      });
    } else {
      // Fallback logging
      console.error('Error:', error, context);
    }
  }

  /**
   * Capture message
   */
  captureMessage(message: string, level: 'info' | 'warning' | 'error' = 'info', context?: ErrorContext): void {
    if (this.config.enabled && this.initialized) {
      const importSentry = new Function('specifier', 'return import(specifier)');
      importSentry('@sentry/react').then((Sentry: typeof import('@sentry/react')) => {
        if (Sentry?.captureMessage) {
          Sentry.captureMessage(message, {
            level: level === 'info' ? 'info' : level === 'warning' ? 'warning' : 'error',
            contexts: {
              custom: context || {},
            },
          });
        }
      }).catch(() => {
        console.warn('Error tracking failed:', message, context);
      });
    } else {
      if (level === 'error') {
        console.error('Error:', message, context);
      } else {
        console.warn('Warning:', message, context);
      }
    }
  }

  /**
   * Set user context
   */
  setUser(user: { id?: string; email?: string; username?: string }): void {
    if (this.config.enabled && this.initialized) {
      const importSentry = new Function('specifier', 'return import(specifier)');
      importSentry('@sentry/react').then((Sentry: typeof import('@sentry/react')) => {
        if (Sentry?.setUser) {
          Sentry.setUser(user);
        }
      }).catch(() => {
        // Silent fail
      });
    }
  }

  /**
   * Add breadcrumb
   */
  addBreadcrumb(message: string, category?: string, level?: 'info' | 'warning' | 'error'): void {
    if (this.config.enabled && this.initialized) {
      const importSentry = new Function('specifier', 'return import(specifier)');
      importSentry('@sentry/react').then((Sentry: typeof import('@sentry/react')) => {
        if (Sentry?.addBreadcrumb) {
          Sentry.addBreadcrumb({
            message,
            category,
            level: level || 'info',
          });
        }
      }).catch(() => {
        // Silent fail
      });
    }
  }
}

// Singleton instance
export const errorTracking = new ErrorTrackingService();

// Initialize on module load
if (typeof window !== 'undefined') {
  errorTracking.init();
}

