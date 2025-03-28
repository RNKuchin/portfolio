<template>
  <div class="home">
    <div class="intro-section">
      <h1 class="animated-element">Привет, я <span class="highlight">Frontend-разработчик</span></h1>
      <p class="lead animated-element">Создаю современные, отзывчивые и производительные веб-приложения</p>
      <p class="stack animated-element">
        <span class="tech-tag">Vue.js</span>
        <span class="tech-tag">JavaScript</span>
        <span class="tech-tag">HTML</span>
        <span class="tech-tag">CSS</span>
        <span class="tech-tag">Pinia</span>
      </p>
      <div class="cta-buttons animated-element">
        <router-link to="/portfolio" class="btn btn-primary">Посмотреть работы</router-link>
        <router-link to="/contact" class="btn btn-outline">Связаться</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onBeforeUnmount } from 'vue';
import { initScrollAnimations, applyStaggerDelay } from '@/utils/animations';

let cleanupObserver = null;

onMounted(() => {
  // Initialize animations with 100ms stagger delay
  cleanupObserver = initScrollAnimations('.animated-element', {
    animationClass: 'visible',
    threshold: 0.1,
    rootMargin: '-50px 0px'
  });
  
  // Apply staggered delays to animation elements
  const elements = document.querySelectorAll('.animated-element');
  applyStaggerDelay(elements, 100, 150);
  
  // Apply stagger to tech tags
  const techTags = document.querySelectorAll('.tech-tag');
  applyStaggerDelay(techTags, 600, 100);
});

onBeforeUnmount(() => {
  // Cleanup intersection observer
  if (cleanupObserver) {
    cleanupObserver();
  }
});
</script>

<style scoped>
.home {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 6.25rem);
  text-align: center;
  padding: var(--spacing-xlarge);
  overflow: hidden;
}

.intro-section {
  max-width: 50rem;
}

h1 {
  font-size: var(--font-size-xxlarge);
  margin-bottom: var(--spacing-medium);
  line-height: 1.2;
}

.highlight {
  color: var(--color-primary);
  position: relative;
  display: inline-block;
}

.highlight::after {
  content: '';
  position: absolute;
  bottom: 0.125rem;
  left: 0;
  width: 100%;
  height: 0.5rem;
  background-color: rgba(var(--color-primary-rgb), 0.15);
  z-index: -1;
  transform: skewX(-5deg);
}

.lead {
  font-size: var(--font-size-large);
  margin-bottom: var(--spacing-medium);
  color: var(--color-text);
  font-weight: 500;
}

.stack {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--spacing-small);
  margin-bottom: var(--spacing-large);
}

.tech-tag {
  padding: 0.375rem 0.75rem;
  background-color: rgba(var(--color-surface-rgb), 0.8);
  border-radius: var(--border-radius-small);
  color: var(--color-primary);
  font-weight: 600;
  font-size: var(--font-size-small);
  box-shadow: var(--shadow-small);
  border: 1px solid rgba(var(--color-primary-rgb), 0.2);
  transform: translateY(0);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.tech-tag:hover {
  transform: translateY(-0.25rem);
  box-shadow: var(--shadow-medium);
}

.cta-buttons {
  display: flex;
  gap: var(--spacing-medium);
  justify-content: center;
  flex-wrap: wrap;
}

.btn {
  padding: 0.875rem 1.75rem;
  border-radius: var(--border-radius-medium);
  font-weight: 600;
  transition: all var(--transition-speed);
  text-decoration: none;
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
  border: 2px solid var(--color-primary);
}

.btn-outline {
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
}

.btn:hover {
  transform: translateY(-0.25rem);
  box-shadow: var(--shadow-medium);
}

.btn-primary:hover {
  background-color: var(--color-primary-dark);
  border-color: var(--color-primary-dark);
}

/* Animations */
.animated-element {
  opacity: 0;
  transform: translateY(1.25rem);
  transition: 
    opacity 0.8s ease,
    transform 0.8s ease;
  will-change: opacity, transform;
}

.animated-element.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 768px) {
  .home {
    padding: var(--spacing-large);
  }
  
  h1 {
    font-size: calc(var(--font-size-xxlarge) * 0.8);
  }
  
  .lead {
    font-size: var(--font-size-medium);
  }
  
  .cta-buttons {
    flex-direction: column;
    width: 100%;
    max-width: 20rem;
    margin: 0 auto;
  }
}
</style> 