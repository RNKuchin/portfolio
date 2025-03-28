<template>
  <router-link 
    :to="to" 
    custom
    v-slot="{ navigate }"
  >
    <a 
      @click.prevent="navigateWithScroll"
      class="mobile-nav-link" 
      :class="{ 'active': isActive }"
      :data-index="index"
    >
      <span v-if="showIcon" class="mobile-nav-icon">{{ icon }}</span>
      <span class="mobile-nav-text">{{ text }}</span>
    </a>
  </router-link>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useNavigationStore } from '../store/navigation';

const props = defineProps({
  /**
   * Путь для маршрутизации
   */
  to: {
    type: String,
    required: true
  },
  /**
   * Текст ссылки (если не используется слот)
   */
  text: {
    type: String,
    default: ''
  },
  /**
   * Иконка для ссылки
   */
  icon: {
    type: String,
    default: ''
  },
  /**
   * Показывать ли иконку
   */
  showIcon: {
    type: Boolean,
    default: false
  },
  /**
   * Индекс элемента для анимации
   */
  index: {
    type: Number,
    default: 0
  }
});

const route = useRoute();
const router = useRouter();
const navigationStore = useNavigationStore();

/**
 * Проверяет, является ли текущий маршрут активным
 */
const isActive = computed(() => {
  if (props.to === '/') {
    return route.path === '/';
  }
  return route.path.startsWith(props.to);
});

/**
 * Переход на страницу с плавной прокруткой наверх
 */
function navigateWithScroll() {
  // Если мы уже на этой странице, просто закрываем меню
  if (isActive.value) {
    navigationStore.closeMobileMenu();
    return;
  }
  
  // Закрываем мобильное меню
  navigationStore.closeMobileMenu();
  
  // Переходим на страницу
  router.push(props.to);
  
  // После перехода прокручиваем наверх с плавной анимацией
  setTimeout(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, 100);
}

// Устанавливаем CSS-переменную для задержки анимации
onMounted(() => {
  const el = document.querySelector(`.mobile-nav-link[data-index="${props.index}"]`);
  if (el) {
    el.style.setProperty('--item-index', props.index);
  }
});
</script>

<style scoped>
.mobile-nav-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  color: var(--color-text);
  font-size: 1.1rem;
  font-weight: 500;
  transition: all 0.3s ease;
  opacity: 0;
  transform: translateX(2rem);
  transition-duration: 0.5s;
  transition-property: opacity, transform;
  cursor: pointer;
}

.mobile-nav-link.active {
  color: var(--color-primary);
  background-color: rgba(var(--color-primary-rgb), 0.1);
}

.mobile-nav-link:hover:not(.active) {
  background-color: rgba(0, 0, 0, 0.05);
}

[data-theme="dark"] .mobile-nav-link:hover:not(.active) {
  background-color: rgba(255, 255, 255, 0.05);
}

.mobile-nav-icon {
  font-size: 1.25rem;
}

/* В мобильном меню модификаторов */
@media (max-width: 768px) {
  .mobile-nav-link {
    font-size: 1rem;
    padding: 0.625rem 0.875rem;
  }
}
</style> 