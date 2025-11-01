/**
 * Client-side rate limiter to prevent spam and abuse
 * Note: This is a client-side protection. Server-side rate limiting should also be implemented.
 */

interface RateLimitOptions {
  maxAttempts: number;
  windowMs: number; // Time window in milliseconds
  key: string; // Storage key
}

interface RateLimitResult {
  allowed: boolean;
  remainingAttempts: number;
  resetTime: number;
}

class RateLimiter {
  private storage: Storage;

  constructor() {
    // Use sessionStorage for per-tab rate limiting
    // Consider localStorage for cross-tab if needed
    this.storage = typeof window !== 'undefined' ? sessionStorage : {
      getItem: () => null,
      setItem: () => {},
      removeItem: () => {},
    } as Storage;
  }

  /**
   * Check if action is allowed based on rate limit
   */
  check(options: RateLimitOptions): RateLimitResult {
    const key = `rate_limit_${options.key}`;
    const countKey = `${key}_count`;
    const resetKey = `${key}_reset`;

    const now = Date.now();
    const resetTime = Number.parseInt(this.storage.getItem(resetKey) || '0', 10);
    const count = Number.parseInt(this.storage.getItem(countKey) || '0', 10);

    // If window expired, reset
    if (resetTime < now) {
      this.storage.setItem(countKey, '0');
      this.storage.setItem(resetKey, String(now + options.windowMs));
      return {
        allowed: true,
        remainingAttempts: options.maxAttempts - 1,
        resetTime: now + options.windowMs,
      };
    }

    // Check if limit exceeded
    if (count >= options.maxAttempts) {
      return {
        allowed: false,
        remainingAttempts: 0,
        resetTime,
      };
    }

    // Increment count
    const newCount = count + 1;
    this.storage.setItem(countKey, String(newCount));
    if (!resetTime) {
      this.storage.setItem(resetKey, String(now + options.windowMs));
    }

    return {
      allowed: true,
      remainingAttempts: options.maxAttempts - newCount,
      resetTime: resetTime || now + options.windowMs,
    };
  }

  /**
   * Reset rate limit for a key
   */
  reset(key: string): void {
    const prefix = `rate_limit_${key}`;
    this.storage.removeItem(`${prefix}_count`);
    this.storage.removeItem(`${prefix}_reset`);
  }

  /**
   * Get remaining attempts without incrementing
   */
  getRemaining(key: string, maxAttempts: number, windowMs: number): number {
    const rateLimitKey = `rate_limit_${key}`;
    const countKey = `${rateLimitKey}_count`;
    const resetKey = `${rateLimitKey}_reset`;

    const now = Date.now();
    const resetTime = Number.parseInt(this.storage.getItem(resetKey) || '0', 10);
    const count = Number.parseInt(this.storage.getItem(countKey) || '0', 10);

    if (resetTime < now) {
      return maxAttempts;
    }

    return Math.max(0, maxAttempts - count);
  }
}

// Singleton instance
export const rateLimiter = new RateLimiter();

/**
 * Rate limit configuration for appointment submissions
 */
export const appointmentRateLimit = {
  maxAttempts: 3, // Maximum 3 attempts
  windowMs: 15 * 60 * 1000, // 15 minutes window
  key: 'appointment_submission',
} as const;

