import { defineStore } from 'pinia'

/**
 * Хранилище для управления навигацией
 */
export const useNavigationStore = defineStore('navigation', {
  state: () => ({
    navItems: [
      { name: 'Главная', path: '/', icon: '🏠' },
      { name: 'Обо мне', path: '/about', icon: '👤' },
      { name: 'Навыки', path: '/skills', icon: '💻' },
      { name: 'Проекты', path: '/portfolio', icon: '🚀' },
      { name: 'Блог', path: '/blog', icon: '📝' },
      { name: 'Контакты', path: '/contact', icon: '✉️' }
    ],
    mobileMenuOpen: false
  }),
  
  actions: {
    /**
     * Переключает состояние мобильного меню
     */
    toggleMobileMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
      if (this.mobileMenuOpen) {
        document.body.classList.add('overflow-hidden');
      } else {
        document.body.classList.remove('overflow-hidden');
      }
    },
    
    /**
     * Закрывает мобильное меню
     */
    closeMobileMenu() {
      if (this.mobileMenuOpen) {
        this.mobileMenuOpen = false;
        document.body.classList.remove('overflow-hidden');
      }
    }
  },
  
  getters: {
    /**
     * Возвращает состояние мобильного меню
     * @returns {boolean} Открыто ли мобильное меню
     */
    isMobileMenuOpen: (state) => state.mobileMenuOpen
  }
}) 