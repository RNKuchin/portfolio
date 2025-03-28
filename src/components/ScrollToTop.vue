<template>
  <button 
    class="scroll-to-top" 
    :class="{ 'visible': isVisible }"
    @click="scrollToTop"
    aria-label="Прокрутить наверх"
    title="Наверх"
  >
    <span class="scroll-icon">↑</span>
  </button>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { scrollToTop as smoothScrollToTop } from '../utils/scroll';

const isVisible = ref(false);
const scrollThreshold = 500; // Высота прокрутки, после которой появляется кнопка

// Обработчик прокрутки страницы
const handleScroll = () => {
  isVisible.value = window.scrollY > scrollThreshold;
};

// Функция для прокрутки наверх
const scrollToTop = () => {
  smoothScrollToTop(500); // 500мс - продолжительность анимации
};

// Добавляем/удаляем слушатель события прокрутки
onMounted(() => {
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Проверяем начальное состояние
});

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style scoped>
.scroll-to-top {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: var(--color-primary);
  color: white;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  visibility: hidden;
  transform: translateY(1rem);
  transition: 
    opacity 0.3s ease, 
    visibility 0.3s ease, 
    transform 0.3s ease,
    background-color 0.3s ease;
  z-index: 99;
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.15);
}

.scroll-to-top.visible {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}

.scroll-to-top:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-0.25rem);
}

.scroll-icon {
  font-size: 1.25rem;
  line-height: 1;
  font-weight: bold;
}

@media (max-width: 768px) {
  .scroll-to-top {
    bottom: 1.5rem;
    right: 1.5rem;
    width: 2.5rem;
    height: 2.5rem;
  }
  
  .scroll-icon {
    font-size: 1rem;
  }
}

[data-theme="dark"] .scroll-to-top {
  box-shadow: 0 0.25rem 0.75rem rgba(0, 0, 0, 0.3);
}
</style> 