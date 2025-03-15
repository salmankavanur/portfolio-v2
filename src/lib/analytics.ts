/**
 * Client-side analytics tracking service
 *
 * This module provides functions to track page views and other analytics events.
 * It's designed to work with the API routes we've created for storing analytics data.
 */

// Record a page view
export const trackPageView = async (path: string = '') => {
  try {
    // Only track in production or if explicitly enabled
    if (process.env.NODE_ENV !== 'production' &&
        process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== 'true') {
      console.log('Analytics tracking disabled in development. Set NEXT_PUBLIC_ENABLE_ANALYTICS=true to enable.');
      return;
    }

    // Get the current path if not provided
    if (!path) {
      path = window.location.pathname;
    }

    // Get the referrer
    const referrer = document.referrer || '';

    // Make API call to record the page view
    const response = await fetch('/api/analytics/pageview', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        path,
        referrer,
      }),
    });

    if (!response.ok) {
      throw new Error(`Failed to track page view: ${response.statusText}`);
    }

    // No need to await or use the result
    return true;
  } catch (error) {
    // In production, fail silently to not affect user experience
    if (process.env.NODE_ENV === 'development') {
      console.error('Error tracking page view:', error);
    }
    return false;
  }
};

// Initialize analytics
export const initAnalytics = () => {
  if (typeof window !== 'undefined') {
    // Track initial page view
    trackPageView();

    // Set up history change listener for SPA navigation
    const handleRouteChange = (url: string) => {
      trackPageView(url);
    };

    // Clean up function if needed
    return {
      cleanup: () => {
        // No cleanup needed for now
      }
    };
  }

  return { cleanup: () => {} };
};

// Add event tracking functionality if needed
export const trackEvent = async (
  eventName: string,
  eventData: Record<string, any> = {}
) => {
  try {
    // Only track in production or if explicitly enabled
    if (process.env.NODE_ENV !== 'production' &&
        process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== 'true') {
      console.log('Analytics tracking disabled in development. Set NEXT_PUBLIC_ENABLE_ANALYTICS=true to enable.');
      return;
    }

    // For now, we'll just log the event
    // In a real implementation, you'd send this to your analytics API
    console.log(`[Analytics] Event: ${eventName}`, eventData);

    return true;
  } catch (error) {
    // In production, fail silently to not affect user experience
    if (process.env.NODE_ENV === 'development') {
      console.error('Error tracking event:', error);
    }
    return false;
  }
};
