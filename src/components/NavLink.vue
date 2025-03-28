<template>
  <router-link 
    :to="to" 
    custom
    v-slot="{ navigate }"
  >
    <a 
      @click.prevent="navigateWithScroll"
      class="nav-link" 
      :class="{ 'active': isActive }"
    >
      <span v-if="showIcon" class="nav-link-icon">{{ icon }}</span>
      <slot>{{ text }}</slot>
    </a>
  </router-link>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { scrollToTop } from '../utils/scroll';

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
  }
});

const route = useRoute();
const router = useRouter();

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
  // Если мы уже на этой странице, просто прокручиваем наверх
  if (isActive.value) {
    scrollToTop(500);
    return;
  }
  
  // Иначе переходим на новую страницу
  router.push(props.to);
  
  // После перехода прокручиваем наверх с плавной анимацией
  setTimeout(() => {
    scrollToTop(500);
  }, 100);
}
</script>

<style scoped>
.nav-link {
  text-decoration: none;
  color: var(--color-text);
  font-weight: 500;
  padding: 0.5rem 0;
  position: relative;
  transition: color 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.nav-link::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 0;
  height: 0.125rem;
  background-color: var(--color-primary);
  transition: width 0.3s;
}

.nav-link:hover, .nav-link.active {
  color: var(--color-primary);
}

.nav-link:hover::after, .nav-link.active::after {
  width: 100%;
}

.nav-link-icon {
  font-size: 1.1rem;
}

[data-theme="dark"] .nav-link {
  color: var(--color-text);
}

[data-theme="dark"] .nav-link:hover,
[data-theme="dark"] .nav-link.active {
  color: var(--color-primary);
}
</style> 