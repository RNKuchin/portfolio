<template>
  <header class="header" :class="{ 'scrolled': scrolled }">
    <div class="header-container">
      <div class="logo">
        <router-link to="/">
          <div class="header-logo-container">
            <div class="header-logo-name">ROMAN KUCHIN</div>
            <div class="header-logo-profession">Frontend Developer</div>
          </div>
        </router-link>
      </div>
      
      <nav class="nav-desktop">
        <ul class="nav-links">
          <li v-for="(item, index) in navItems" :key="item.path">
            <NavLink 
              :to="item.path" 
              :text="item.name"
              :icon="item.icon"
              :show-icon="false"
            />
          </li>
        </ul>
      </nav>
      
      <div class="header-actions">
        <button class="theme-toggle" @click="toggleTheme" :title="themeTitle">
          <span v-if="isDarkTheme">☀️</span>
          <span v-else>🌙</span>
        </button>
        
        <button class="mobile-menu-button" @click="toggleMobileMenu" :class="{ 'active': isMobileMenuOpen }">
          <span class="menu-icon"></span>
        </button>
      </div>
    </div>
    
    <!-- Mobile menu overlay -->
    <div 
      class="mobile-menu-overlay" 
      :class="{ 'visible': isMobileMenuOpen }" 
      @click="closeMobileMenu">
    </div>
    
    <!-- Mobile menu -->
    <div class="mobile-menu" :class="{ 'open': isMobileMenuOpen }">
      <nav class="nav-mobile">
        <ul class="mobile-nav-links">
          <li v-for="(item, index) in navItems" :key="`mobile-${item.path}`">
            <MobileNavLink 
              :to="item.path" 
              :text="item.name"
              :icon="item.icon"
              :show-icon="true"
              :index="index"
            />
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useMainStore } from '../store';
import { useNavigationStore } from '../store/navigation';
import { debounce } from 'lodash-es';
import NavLink from './NavLink.vue';
import MobileNavLink from './MobileNavLink.vue';

const mainStore = useMainStore();
const navigationStore = useNavigationStore();

/**
 * Получаем элементы навигации из хранилища
 */
const navItems = computed(() => navigationStore.navItems);

/**
 * Состояние мобильного меню из хранилища
 */
const isMobileMenuOpen = computed(() => navigationStore.isMobileMenuOpen);

/**
 * Отслеживаем, прокручена ли страница
 */
const scrolled = ref(false);

/**
 * Переключает состояние мобильного меню
 */
function toggleMobileMenu() {
  navigationStore.toggleMobileMenu();
}

/**
 * Закрывает мобильное меню
 */
function closeMobileMenu() {
  navigationStore.closeMobileMenu();
}

/**
 * Обработчик прокрутки страницы
 * Обновляет состояние прокрутки с debounce для оптимизации
 */
const handleScroll = debounce(() => {
  scrolled.value = window.scrollY > 50;
}, 100);

/**
 * Переключает тему
 */
function toggleTheme() {
  mainStore.toggleTheme();
}

/**
 * Вычисляемое свойство для определения текущей темы
 */
const isDarkTheme = computed(() => mainStore.isDarkTheme);

/**
 * Заголовок для кнопки переключения темы
 */
const themeTitle = computed(() => isDarkTheme.value 
  ? 'Переключить на светлую тему' 
  : 'Переключить на тёмную тему'
);

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Initial check
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
  handleScroll.cancel(); // Отменяем pending debounced функции
});
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  height: 4.375rem;
  background-color: transparent;
  transition: background-color 0.3s, box-shadow 0.3s;
}

.header.scrolled {
  background-color: rgba(var(--color-surface-rgb), 0.95);
  box-shadow: 0 0.125rem 0.625rem rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(0.625rem);
}

.header-container {
  max-width: 87.5rem;
  margin: 0 auto;
  padding: 0 2rem;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-size: 1.5rem;
  font-weight: bold;
}

.logo a {
  text-decoration: none;
  color: var(--color-text);
}

.header-logo-container {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.header-logo-name {
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 1px;
  font-family: 'Montserrat', sans-serif;
  background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  line-height: 1.2;
}

.header-logo-profession {
  font-size: 0.75rem;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  color: var(--color-text-muted);
  letter-spacing: 1.4px;
  text-transform: uppercase;
}

.logo-text {
  background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.nav-desktop ul {
  display: flex;
  list-style: none;
  gap: 2rem;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.theme-toggle {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.3s;
  position: relative;
  z-index: 101;
}

.theme-toggle:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

[data-theme="dark"] .theme-toggle:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.mobile-menu-button {
  display: none;
  background: none;
  border: none;
  width: 2.5rem;
  height: 2.5rem;
  cursor: pointer;
  position: relative;
  z-index: 101;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.mobile-menu-button:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

[data-theme="dark"] .mobile-menu-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

.mobile-menu-button:hover .menu-icon::before {
  top: -0.625rem;
}

.mobile-menu-button:hover .menu-icon::after {
  bottom: -0.625rem;
}

/* Отменяем анимацию при наведении если меню активно */
.mobile-menu-button.active:hover .menu-icon::before,
.mobile-menu-button.active:hover .menu-icon::after {
  top: 0;
  bottom: 0;
}

.menu-icon, .menu-icon::before, .menu-icon::after {
  display: block;
  width: 1.5rem;
  height: 0.125rem;
  background-color: var(--color-text);
  position: absolute;
  transition: transform 0.3s, opacity 0.3s;
}

.menu-icon {
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.menu-icon::before, .menu-icon::after {
  content: '';
  left: 0;
}

.menu-icon::before {
  top: -0.5rem;
}

.menu-icon::after {
  bottom: -0.5rem;
}

/* Анимация превращения меню в крестик */
.mobile-menu-button.active .menu-icon {
  background-color: transparent;
}

.mobile-menu-button.active .menu-icon::before {
  top: 0;
  transform: rotate(45deg);
}

.mobile-menu-button.active .menu-icon::after {
  bottom: 0;
  transform: rotate(-45deg);
}

.mobile-menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 98;
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
  backdrop-filter: blur(0.1875rem);
}

.mobile-menu-overlay.visible {
  opacity: 1;
  visibility: visible;
}

.mobile-menu {
  display: block;
  position: fixed;
  top: 4.375rem;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--color-surface);
  transform: translateX(100%);
  opacity: 0;
  transition: transform 0.4s ease, opacity 0.3s ease;
  z-index: 99;
  padding: 2rem;
  visibility: hidden;
  overflow-y: auto;
  max-height: calc(100vh - 4.375rem);
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
}

.mobile-menu::-webkit-scrollbar {
  width: var(--scrollbar-width-thin);
}

.mobile-menu.open {
  transform: translateX(0);
  opacity: 1;
  visibility: visible;
  box-shadow: -0.3125rem 0 0.9375rem rgba(0, 0, 0, 0.1);
}

.nav-mobile {
  width: 100%;
}

.mobile-nav-links {
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  padding-top: 1rem;
  padding-left: 0;
}

/* Медиа-запросы для различных размеров экрана */
@media (max-width: 1200px) {
  .header-container {
    padding: 0 1.75rem;
  }
}

@media (max-width: 992px) {
  .nav-desktop ul {
    gap: 1.25rem;
  }
}

@media (max-width: 768px) {
  .header-container {
    padding: 0 1.5rem;
  }
  
  .nav-desktop {
    display: none;
  }
  
  .mobile-menu-button {
    display: block;
  }
  
  .header.scrolled {
    background-color: var(--color-surface);
    box-shadow: 0 0.125rem 0.625rem rgba(0, 0, 0, 0.1);
  }
  
  /* Позиционирование элементов в адаптивном режиме */
  .header-actions {
    gap: 0.5rem;
  }
  
  /* Обеспечим контраст для элементов управления при открытом меню */
  .mobile-menu-button.active .menu-icon::before,
  .mobile-menu-button.active .menu-icon::after {
    background-color: var(--color-text);
  }
  
  /* Исправление видимости мобильных ссылок навигации */
  [data-theme="dark"] .mobile-menu {
    background-color: var(--color-surface);
    border-left: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  /* Увеличиваем контрастность активного состояния пункта меню */
  [data-theme="dark"] .mobile-menu .mobile-nav-link {
    color: var(--color-text);
  }
  
  [data-theme="dark"] .mobile-menu .mobile-nav-link.active {
    color: var(--color-primary);
  }
  
  [data-theme="dark"] .mobile-menu .mobile-nav-link:hover {
    color: var(--color-primary-light);
  }
  
  /* Стилизация для лучшей видимости мобильных ссылок */
  .mobile-menu.open .mobile-nav-link {
    opacity: 1 !important;
    transform: translateX(0) !important;
    transition-delay: calc(var(--item-index, 0) * 0.1s + 0.1s) !important;
  }
  
  .mobile-menu {
    width: 100%;
    height: calc(100vh - 4.375rem);
    overflow-y: auto;
  }
}

@media (max-width: 576px) {
  .header-container {
    padding: 0 1rem;
  }
  
  .logo {
    font-size: 1.25rem;
  }
  
  .header-logo-name {
    font-size: 1rem;
  }
  
  .header-logo-profession {
    font-size: 0.65rem;
    letter-spacing: 1px;
  }
}

@media (max-width: 360px) {
  .theme-toggle, .mobile-menu-button {
    width: 2.25rem;
    height: 2.25rem;
  }
}

/* Глобальные стили для отображения мобильного меню */
:deep(.mobile-menu.open .mobile-nav-link) {
  transform: translateX(0) !important;
  opacity: 1 !important;
}

[data-theme="dark"] .mobile-menu-overlay {
  background-color: rgba(0, 0, 0, 0.7);
}
</style> 