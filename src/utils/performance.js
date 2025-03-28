/**
 * Utility functions for tracking and reporting application performance
 */

// Determine if Performance API is supported
const isPerformanceSupported = () => {
  return window && window.performance && 
    window.performance.timing && 
    window.performance.mark && 
    window.performance.measure;
};

/**
 * Marks the start of a performance measurement
 * 
 * @param {String} markName - Name for the performance mark
 * @returns {Boolean} Whether mark was successfully created
 */
export const startMark = (markName) => {
  if (!isPerformanceSupported() || !markName) return false;
  
  try {
    window.performance.mark(`${markName}_start`);
    return true;
  } catch (error) {
    console.error('[Performance] Error creating start mark:', error);
    return false;
  }
};

/**
 * Marks the end of a performance measurement and records the duration
 * 
 * @param {String} markName - Name of the mark to end (should match startMark name)
 * @param {Boolean} logResult - Whether to log the result to console
 * @returns {Number|null} Duration in milliseconds, or null if measurement failed
 */
export const endMark = (markName, logResult = false) => {
  if (!isPerformanceSupported() || !markName) return null;
  
  try {
    const endMarkName = `${markName}_end`;
    const measureName = `${markName}_measure`;
    
    window.performance.mark(endMarkName);
    window.performance.measure(
      measureName,
      `${markName}_start`,
      endMarkName
    );
    
    const entries = window.performance.getEntriesByName(measureName);
    const duration = entries[0]?.duration;
    
    if (logResult && duration) {
      console.log(`[Performance] ${markName}: ${duration.toFixed(2)}ms`);
    }
    
    // Clean up markers
    window.performance.clearMarks(`${markName}_start`);
    window.performance.clearMarks(endMarkName);
    window.performance.clearMeasures(measureName);
    
    return duration || null;
  } catch (error) {
    console.error('[Performance] Error creating end mark:', error);
    return null;
  }
};

/**
 * Track the time it takes to load critical resources
 * 
 * @returns {Object} Object containing performance metrics
 */
export const getPageLoadMetrics = () => {
  if (!isPerformanceSupported()) return null;
  
  const performance = window.performance;
  const timing = performance.timing;
  
  // Calculate timings
  const metrics = {
    // DNS lookup time
    dns: timing.domainLookupEnd - timing.domainLookupStart,
    
    // TCP connection time
    tcp: timing.connectEnd - timing.connectStart,
    
    // Time to first byte (TTFB)
    ttfb: timing.responseStart - timing.requestStart,
    
    // Download time of the page
    download: timing.responseEnd - timing.responseStart,
    
    // Time to DOM interactive
    domInteractive: timing.domInteractive - timing.navigationStart,
    
    // DOM content loaded
    domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
    
    // Time to fully loaded page
    domComplete: timing.domComplete - timing.navigationStart,
    
    // Full page load time
    pageLoad: timing.loadEventEnd - timing.navigationStart,
  };
  
  return metrics;
};

/**
 * Create a performance observer for specific entry types
 * 
 * @param {String|Array} entryTypes - The entry types to observe
 * @param {Function} callback - Callback function when entries are recorded
 * @returns {PerformanceObserver|null} Observer object or null if not supported
 */
export const createPerformanceObserver = (entryTypes, callback) => {
  if (!window.PerformanceObserver || !entryTypes || !callback) return null;
  
  try {
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      callback(entries);
    });
    
    // Convert string to array if needed
    const types = Array.isArray(entryTypes) ? entryTypes : [entryTypes];
    
    observer.observe({ entryTypes: types });
    return observer;
  } catch (error) {
    console.error('[Performance] Error creating observer:', error);
    return null;
  }
};

/**
 * Track first contentful paint and largest contentful paint metrics
 * 
 * @param {Function} callback - Callback function that receives metrics
 * @returns {Object} Object containing observer cleanup functions
 */
export const trackCoreWebVitals = (callback) => {
  if (!window.PerformanceObserver) return null;
  
  const metrics = {};
  const observers = {};
  
  // First Contentful Paint
  try {
    const fcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const fcp = entries[0];
      metrics.fcp = fcp.startTime;
      if (callback) callback({ type: 'fcp', value: fcp.startTime });
      fcpObserver.disconnect();
    });
    fcpObserver.observe({ type: 'paint', buffered: true });
    observers.fcp = fcpObserver;
  } catch (e) {
    console.warn('[Performance] FCP tracking not supported');
  }
  
  // Largest Contentful Paint
  try {
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lcp = entries[entries.length - 1];
      metrics.lcp = lcp.startTime;
      if (callback) callback({ type: 'lcp', value: lcp.startTime });
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    observers.lcp = lcpObserver;
  } catch (e) {
    console.warn('[Performance] LCP tracking not supported');
  }
  
  // First Input Delay
  try {
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      for (const entry of entries) {
        metrics.fid = entry.processingStart - entry.startTime;
        if (callback) callback({ type: 'fid', value: metrics.fid });
      }
    });
    fidObserver.observe({ type: 'first-input', buffered: true });
    observers.fid = fidObserver;
  } catch (e) {
    console.warn('[Performance] FID tracking not supported');
  }
  
  // Cumulative Layout Shift
  try {
    let clsValue = 0;
    let clsEntries = [];
    let sessionValue = 0;
    let sessionEntries = [];
    let clsReportEntropy = 0;
    
    const clsObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      
      for (const entry of entries) {
        // Only count layout shifts without recent user input
        if (!entry.hadRecentInput) {
          const firstSessionEntry = sessionEntries[0];
          const lastSessionEntry = sessionEntries[sessionEntries.length - 1];
          
          // If entry is within 1s of the previous entry and less than 5s has passed
          // since the first entry, include it in the session
          if (
            sessionValue &&
            entry.startTime - lastSessionEntry.startTime < 1000 &&
            entry.startTime - firstSessionEntry.startTime < 5000
          ) {
            sessionValue += entry.value;
            sessionEntries.push(entry);
          } else {
            sessionValue = entry.value;
            sessionEntries = [entry];
          }
          
          // If current session value is larger than CLS value, update CLS
          if (sessionValue > clsValue) {
            clsValue = sessionValue;
            clsEntries = sessionEntries;
            clsReportEntropy = 0;
          }
          
          // If two sessions have the same value, report the one with less entropy
          // (fewer layout shifts)
          if (sessionValue === clsValue && sessionEntries.length < clsEntries.length) {
            clsEntries = sessionEntries;
          }
          
          metrics.cls = clsValue;
          if (callback) callback({ type: 'cls', value: clsValue });
        }
      }
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });
    observers.cls = clsObserver;
  } catch (e) {
    console.warn('[Performance] CLS tracking not supported');
  }
  
  // Return cleanup function to disconnect all observers
  return {
    metrics,
    disconnect: () => {
      Object.values(observers).forEach(observer => {
        if (observer && typeof observer.disconnect === 'function') {
          observer.disconnect();
        }
      });
    }
  };
}; 