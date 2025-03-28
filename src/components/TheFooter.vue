<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-top">
        <div class="footer-logo">
          <div class="logo-container">
            <div class="logo-name">ROMAN KUCHIN</div>
            <div class="logo-profession">Frontend Developer</div>
          </div>
        </div>
        
        <div class="footer-nav">
          <h3>Навигация</h3>
          <ul>
            <li v-for="item in navItems" :key="item.path">
              <router-link :to="item.path">{{ item.name }}</router-link>
            </li>
          </ul>
        </div>
        
        <div class="footer-contact">
          <h3>Контакты</h3>
          <ul>
            <li>
              <a href="mailto:roman.kuchin@gmail.com">roman.kuchin@gmail.com</a>
            </li>
            <li>
              <a href="https://t.me/R_o_m_a_n_it" target="_blank">Telegram</a>
            </li>
          </ul>
        </div>
        
        <div class="footer-social">
          <h3>Социальные сети</h3>
          <div class="social-icons">
            <a href="https://github.com/RNKuchin" target="_blank" class="social-icon" title="GitHub">
              <span>GH</span>
            </a>
            <a href="https://linkedin.com/in/username" target="_blank" class="social-icon" title="LinkedIn">
              <span>LI</span>
            </a>
          </div>
        </div>
      </div>
      
      <div class="footer-bottom">
        <div class="copyright">
          &copy; {{ currentYear }} Frontend Portfolio. Все права защищены.
        </div>
        
        <div class="theme-toggle-container">
          <button class="theme-toggle" @click="toggleTheme">
            <span v-if="isDarkTheme">☀️ Светлая тема</span>
            <span v-else>🌙 Тёмная тема</span>
          </button>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from 'vue';
import { useMainStore } from '../store';
import { useNavigationStore } from '../store/navigation';

const mainStore = useMainStore();
const navigationStore = useNavigationStore();

/**
 * Получаем навигационные элементы из хранилища
 */
const navItems = computed(() => navigationStore.navItems);

/**
 * Переключает тему оформления
 */
function toggleTheme() {
  mainStore.toggleTheme();
}

/**
 * Вычисляемые свойства
 */
const isDarkTheme = computed(() => mainStore.isDarkTheme);
const currentYear = computed(() => new Date().getFullYear());
</script>

<style scoped>
.footer {
  background-color: var(--color-footer-bg);
  color: var(--color-footer-text);
  padding: 4rem 0 2rem;
  margin-top: 3rem;
}

.footer-container {
  max-width: 75rem;
  margin: 0 auto;
  padding: 0 2rem;
}

.footer-top {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12.5rem, 1fr));
  gap: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid var(--color-footer-border);
}

.footer-logo h2 {
  font-size: 1.75rem;
  margin-bottom: 0.5rem;
}

.logo-container {
  display: flex;
  flex-direction: column;
}

.logo-name {
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 1px;
  background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  margin-bottom: 0.25rem;
}

.logo-profession {
  font-size: 0.95rem;
  color: var(--color-footer-text-muted);
  letter-spacing: 1.4px;
  text-transform: uppercase;
}

.logo-text {
  background: linear-gradient(to right, var(--color-primary), var(--color-secondary));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.footer-logo p {
  color: var(--color-footer-text-muted);
}

.footer-nav h3, .footer-contact h3, .footer-social h3 {
  font-size: 1.1rem;
  margin-bottom: 1.25rem;
  position: relative;
  padding-bottom: 0.5rem;
}

.footer-nav h3::after, .footer-contact h3::after, .footer-social h3::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 2.5rem;
  height: 0.125rem;
  background-color: var(--color-primary);
}

.footer-nav ul, .footer-contact ul {
  list-style: none;
  padding: 0;
}

.footer-nav li, .footer-contact li {
  margin-bottom: 0.75rem;
}

.footer-nav a, .footer-contact a {
  text-decoration: none;
  color: var(--color-footer-text-muted);
  transition: color 0.3s;
}

.footer-nav a:hover, .footer-contact a:hover {
  color: var(--color-primary);
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.social-icon {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  background-color: var(--color-footer-social-bg);
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: var(--color-footer-text-muted);
  font-weight: bold;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background-color: var(--color-primary);
  color: white;
  transform: translateY(-0.1875rem);
}

.footer-bottom {
  padding-top: 2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
}

.copyright {
  color: var(--color-footer-text-muted);
  font-size: 0.9rem;
}

.theme-toggle {
  background: none;
  border: none;
  color: var(--color-footer-text-muted);
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.3s;
  padding: 0.5rem 1rem;
  border-radius: 0.3125rem;
  background-color: var(--color-footer-social-bg);
}

.theme-toggle:hover {
  color: var(--color-primary);
}

@media (max-width: 1200px) {
  .footer-container {
    padding: 0 1.75rem;
  }
}

@media (max-width: 992px) {
  .footer-top {
    gap: 2rem;
  }
}

@media (max-width: 768px) {
  .footer-top {
    grid-template-columns: 1fr 1fr;
  }
  
  .footer-bottom {
    flex-direction: column;
    align-items: flex-start;
    gap: 1.5rem;
  }
}

@media (max-width: 480px) {
  .footer-top {
    grid-template-columns: 1fr;
  }
  
  .footer-container {
    padding: 0 1rem;
  }
  
  .logo-profession {
    letter-spacing: 1px;
  }
}
</style> 