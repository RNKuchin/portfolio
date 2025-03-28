<script setup>
import { onMounted, computed, onBeforeUnmount, provide, ref } from 'vue';
import { useMainStore } from './store';
import { useRouter } from 'vue-router';
import TheHeader from './components/TheHeader.vue';
import TheFooter from './components/TheFooter.vue';
import ScrollToTop from './components/ScrollToTop.vue';
import { startMark, endMark, trackCoreWebVitals } from './utils/performance';
import { initSmoothScrolling } from './utils/scroll';

const store = useMainStore();
const router = useRouter();
const performanceMetrics = ref({});
const webVitalsObserver = ref(null);
const isDev = ref(import.meta.env.DEV);

// Provide performance metrics to components
provide('performanceMetrics', performanceMetrics);

/**
 * Начинает отслеживание перехода страницы
 */
const startViewTransition = () => {
  startMark('view-transition');
};

/**
 * Заканчивает отслеживание перехода страницы
 */
const endViewTransition = () => {
  endMark('view-transition', isDev.value);
};

// Initialize theme and track performance
onMounted(() => {
  // Initialize theme based on user preference or system preference
  store.initTheme();
  
  // Start tracking core web vitals
  webVitalsObserver.value = trackCoreWebVitals((metric) => {
    performanceMetrics.value[metric.type] = metric.value;
    
    // Log core web vitals to console in development
    if (isDev.value) {
      console.log(`[WebVital] ${metric.type.toUpperCase()}: ${metric.value.toFixed(2)}ms`);
    }
  });
  
  // Инициализация плавного скролла для якорных ссылок
  // с учётом высоты шапки (4.375rem ≈ 70px)
  initSmoothScrolling('a[href^="#"]', 70);
  
  // Track route change performance
  router.beforeEach((to, from, next) => {
    if (from.path !== '/') {
      startMark(`route-change-${from.path}-to-${to.path}`);
    }
    next();
  });
  
  router.afterEach((to, from) => {
    if (from.path !== '/') {
      endMark(`route-change-${from.path}-to-${to.path}`, isDev.value);
    }
    
    // Focus management for accessibility
    const main = document.querySelector('main');
    if (main) {
      // Set focus to main content for screen readers
      main.setAttribute('tabindex', '-1');
      main.focus();
      // Remove tabindex after focus to avoid keyboard navigation issues
      setTimeout(() => {
        main.removeAttribute('tabindex');
      }, 100);
    }
  });
});

// Cleanup on component unmount
onBeforeUnmount(() => {
  if (webVitalsObserver.value) {
    webVitalsObserver.value.disconnect();
  }
});

// Computed properties
const isDarkTheme = computed(() => store.isDarkTheme);
const themeClass = computed(() => isDarkTheme.value ? 'dark-theme' : 'light-theme');
</script>

<template>
  <div id="app" :class="[themeClass]" :data-theme="isDarkTheme ? 'dark' : 'light'">
    <a href="#main-content" class="skip-link">Перейти к содержимому</a>
    
    <TheHeader />
    
    <main id="main-content" class="main-content" aria-live="polite">
      <router-view v-slot="{ Component }">
        <Transition 
          name="fade" 
          mode="out-in"
          @before-enter="startViewTransition"
          @after-enter="endViewTransition"
        >
          <component :is="Component" />
        </Transition>
      </router-view>
    </main>
    
    <TheFooter />
    
    <ScrollToTop />
  </div>
</template>

<style>
/* Import global styles */
@import './assets/main.css';

/* App specific styles */
#app {
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--color-background);
  color: var(--color-text);
  transition: 
    background-color var(--transition-speed),
    color var(--transition-speed);
}

.main-content {
  flex: 1;
  outline: none;
  scroll-behavior: smooth;
}

/* Skip links for accessibility */
.skip-link {
  position: absolute;
  top: -3.125rem;
  left: 0;
  background: var(--color-primary);
  color: white;
  padding: var(--spacing-small) var(--spacing-medium);
  z-index: 1000;
  transition: top 0.3s ease;
  text-decoration: none;
  font-weight: 600;
  border-bottom-right-radius: var(--border-radius-small);
}

.skip-link:focus {
  top: 0;
}

/* Transition animations for route changes */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Добавляем поддержку плавной прокрутки для контейнеров */
.blog-content,
.project-modal,
.blog-modal,
.mobile-menu {
  scroll-behavior: smooth;
}
</style>
