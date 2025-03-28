/**
 * Animation utilities for scroll-based animations
 */

/**
 * Creates and configures an Intersection Observer for animating elements 
 * as they enter the viewport
 * 
 * @param {Object} options - Configuration options
 * @param {String} options.animationClass - CSS class to add when element is visible
 * @param {Number} options.threshold - Visibility threshold (0-1)
 * @param {String} options.rootMargin - Root margin value
 * @param {Function} options.onEnter - Callback when element enters viewport
 * @param {Function} options.onExit - Callback when element exits viewport
 * @returns {IntersectionObserver} Configured observer instance
 */
export function createScrollObserver({
  animationClass = 'visible',
  threshold = 0.15,
  rootMargin = '0px',
  onEnter = null,
  onExit = null
} = {}) {
  return new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add(animationClass);
        if (onEnter && typeof onEnter === 'function') {
          onEnter(entry.target, observer);
        }
      } else {
        if (onExit && typeof onExit === 'function') {
          onExit(entry.target, observer);
        }
      }
    });
  }, {
    threshold,
    rootMargin
  });
}

/**
 * Initializes scroll animations for elements matching the selector
 * 
 * @param {String} selector - CSS selector for elements to animate
 * @param {Object} options - Observer configuration options
 * @returns {Function} Cleanup function to disconnect observer
 */
export function initScrollAnimations(selector, options = {}) {
  const elements = document.querySelectorAll(selector);
  if (!elements.length) return () => {};
  
  const observer = createScrollObserver(options);
  
  elements.forEach(element => {
    observer.observe(element);
  });
  
  // Return cleanup function
  return () => observer.disconnect();
}

/**
 * Applies stagger delay to a collection of elements
 * 
 * @param {NodeList|Array} elements - Elements to apply stagger to
 * @param {Number} baseDelay - Base delay in milliseconds
 * @param {Number} staggerAmount - Amount to stagger each element by
 */
export function applyStaggerDelay(elements, baseDelay = 0, staggerAmount = 100) {
  if (!elements || !elements.length) return;
  
  Array.from(elements).forEach((element, index) => {
    element.style.transitionDelay = `${baseDelay + (index * staggerAmount)}ms`;
  });
}

/**
 * Debounces a function call
 * 
 * @param {Function} func - Function to debounce
 * @param {Number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait = 100) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}

/**
 * Throttles a function call
 * 
 * @param {Function} func - Function to throttle
 * @param {Number} limit - Limit in milliseconds
 * @returns {Function} Throttled function
 */
export function throttle(func, limit = 100) {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
} 