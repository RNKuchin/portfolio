import { defineStore } from 'pinia'

// Main store for the portfolio site
export const useMainStore = defineStore('main', {
  state: () => ({
    theme: 'light',
    // You can add more state here as needed
  }),
  
  actions: {
    toggleTheme() {
      this.theme = this.theme === 'light' ? 'dark' : 'light'
      document.documentElement.setAttribute('data-theme', this.theme)
      localStorage.setItem('theme', this.theme)
    },
    
    initTheme() {
      const savedTheme = localStorage.getItem('theme')
      if (savedTheme) {
        this.theme = savedTheme
      } else {
        // Check for system preference
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        this.theme = prefersDark ? 'dark' : 'light'
      }
      document.documentElement.setAttribute('data-theme', this.theme)
    }
  },
  
  getters: {
    isDarkTheme: (state) => state.theme === 'dark'
  }
}) 