
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/globals.css";
import { errorTracking } from "./lib/errorTracking";
import { analytics } from "./lib/analytics";

// Initialize error tracking
errorTracking.init().catch(() => {
  // Silent fail if Sentry not configured
});

// Track page view on load
analytics.trackPageView(window.location.pathname);

// Track page views on navigation (for SPA)
window.addEventListener('popstate', () => {
  analytics.trackPageView(window.location.pathname);
});

createRoot(document.getElementById("root")!).render(<App />);
  