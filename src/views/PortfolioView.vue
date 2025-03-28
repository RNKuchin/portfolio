<template>
  <div class="portfolio">
    <h1>Мои проекты</h1>
    
    <div class="filter-section">
      <div class="filter-pills">
        <button 
          class="filter-pill" 
          :class="{ active: activeFilter === 'all' }" 
          @click="setFilter('all')"
        >
          Все
        </button>
        <button 
          v-for="filter in filters" 
          :key="filter"
          class="filter-pill" 
          :class="{ active: activeFilter === filter }" 
          @click="setFilter(filter)"
        >
          {{ filter }}
        </button>
      </div>
    </div>
    
    <div class="projects">
      <div 
        v-for="project in filteredProjects" 
        :key="project.id"
        class="project-card"
        @click="openProject(project)"
      >
        <div class="project-image">
          <div class="project-image-placeholder">
            {{ project.title.charAt(0) }}
          </div>
        </div>
        <div class="project-info">
          <h2>{{ project.title }}</h2>
          <p>{{ project.shortDescription }}</p>
          <div class="project-techs">
            <span 
              v-for="tech in project.technologies" 
              :key="`${project.id}-${tech}`"
              class="tech-badge"
            >
              {{ tech }}
            </span>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Project Modal -->
    <div v-if="selectedProject" class="project-modal-backdrop" @click="closeProject">
      <div class="project-modal" @click.stop>
        <button class="close-button" @click="closeProject">&times;</button>
        
        <div class="modal-image">
          <div class="project-image-placeholder large">
            {{ selectedProject.title.charAt(0) }}
          </div>
        </div>
        
        <h2>{{ selectedProject.title }}</h2>
        <p class="modal-description">{{ selectedProject.description }}</p>
        
        <div class="modal-section">
          <h3>Использованные технологии:</h3>
          <div class="project-techs">
            <span 
              v-for="tech in selectedProject.technologies" 
              :key="`modal-${selectedProject.id}-${tech}`"
              class="tech-badge"
            >
              {{ tech }}
            </span>
          </div>
        </div>
        
        <div class="modal-section">
          <h3>Ключевые особенности:</h3>
          <ul>
            <li v-for="(feature, idx) in selectedProject.features" :key="idx">
              {{ feature }}
            </li>
          </ul>
        </div>
        
        <div class="modal-actions">
          <a :href="selectedProject.demoLink" target="_blank" class="modal-button primary">Открыть демо</a>
          <a :href="selectedProject.githubLink" target="_blank" class="modal-button secondary">GitHub</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Sample project data
const projects = ref([
  {
    id: 1,
    title: 'Личный блог на Vue',
    shortDescription: 'Блог с админ-панелью и Markdown-редактором',
    description: 'Полнофункциональный блог, созданный с использованием Vue 3 и Composition API. Включает в себя админ-панель для управления постами, систему комментариев и поддержку Markdown для форматирования контента.',
    technologies: ['Vue', 'Pinia', 'Firebase', 'Markdown'],
    features: [
      'Аутентификация и авторизация',
      'CRUD-операции для публикаций',
      'Комментарии и реакции',
      'Адаптивный дизайн для мобильных устройств'
    ],
    demoLink: 'https://example.com/blog-demo',
    githubLink: 'https://github.com/username/vue-blog'
  },
  {
    id: 2,
    title: 'Менеджер задач',
    shortDescription: 'Приложение для управления задачами с сортировкой и фильтрацией',
    description: 'Приложение для отслеживания и управления ежедневными задачами. Позволяет пользователям создавать задачи, устанавливать сроки, приоритеты и статусы, а также фильтровать и сортировать задачи по различным критериям.',
    technologies: ['Vue', 'Vuex', 'LocalStorage', 'CSS Grid'],
    features: [
      'Создание и редактирование задач',
      'Установка приоритетов и сроков',
      'Фильтрация и сортировка',
      'Сохранение данных в localStorage'
    ],
    demoLink: 'https://example.com/task-manager',
    githubLink: 'https://github.com/username/task-manager'
  },
  {
    id: 3,
    title: 'Интернет-магазин',
    shortDescription: 'E-commerce платформа с корзиной и оформлением заказа',
    description: 'Полнофункциональный интернет-магазин с возможностью просмотра товаров, добавления их в корзину и оформления заказа. Включает в себя систему поиска, фильтрации и сортировки товаров, а также интеграцию с платежными системами.',
    technologies: ['Vue', 'Pinia', 'REST API', 'Stripe'],
    features: [
      'Каталог товаров с фильтрацией',
      'Корзина покупок',
      'Оформление заказа',
      'Интеграция с платежной системой'
    ],
    demoLink: 'https://example.com/ecommerce',
    githubLink: 'https://github.com/username/ecommerce'
  },
  {
    id: 4,
    title: 'Приложение для прогноза погоды',
    shortDescription: 'Приложение с данными о погоде для разных городов',
    description: 'Приложение для получения актуальной информации о погоде в различных городах мира. Использует API внешних сервисов для получения данных о погоде и предоставляет пользователю информацию о текущих условиях и прогнозе на ближайшие дни.',
    technologies: ['JavaScript', 'API', 'CSS', 'Responsive Design'],
    features: [
      'Поиск городов',
      'Отображение текущей погоды',
      'Прогноз на 5 дней',
      'Геолокация для определения текущего местоположения'
    ],
    demoLink: 'https://example.com/weather-app',
    githubLink: 'https://github.com/username/weather-app'
  }
]);

// Extract unique technologies for filters
const filters = computed(() => {
  const techSet = new Set();
  projects.value.forEach(project => {
    project.technologies.forEach(tech => techSet.add(tech));
  });
  return Array.from(techSet);
});

// Active filter
const activeFilter = ref('all');

// Filtered projects based on active filter
const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') {
    return projects.value;
  }
  return projects.value.filter(project => 
    project.technologies.includes(activeFilter.value)
  );
});

// Selected project for modal
const selectedProject = ref(null);

// Set active filter
function setFilter(filter) {
  activeFilter.value = filter;
}

// Open project modal
function openProject(project) {
  selectedProject.value = project;
  document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close project modal
function closeProject() {
  selectedProject.value = null;
  document.body.style.overflow = 'auto'; // Allow scrolling
}
</script>

<style scoped>
.portfolio {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 3rem;
}

.filter-section {
  margin-bottom: 2rem;
}

.filter-pills {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.75rem;
}

.filter-pill {
  padding: 0.5rem 1rem;
  border-radius: 100px;
  background-color: #f0f0f0;
  border: none;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.filter-pill:hover {
  background-color: #e0e0e0;
}

.filter-pill.active {
  background-color: var(--color-primary);
  color: white;
}

.projects {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.project-card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
}

.project-image {
  height: 180px;
  overflow: hidden;
}

.project-image-placeholder {
  height: 100%;
  background-color: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: bold;
}

.project-info {
  padding: 1.5rem;
}

.project-info h2 {
  margin-bottom: 0.75rem;
  font-size: 1.25rem;
}

.project-info p {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.5;
}

.project-techs {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tech-badge {
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
  background-color: #f0f0f0;
  font-size: 0.8rem;
  color: #555;
}

/* Project Modal */
.project-modal-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.project-modal {
  background-color: white;
  border-radius: 10px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  padding: 2rem;
  scrollbar-width: thin;
  scrollbar-color: var(--scrollbar-thumb) var(--scrollbar-track);
}

.project-modal::-webkit-scrollbar {
  width: var(--scrollbar-width-thin);
}

.project-modal::-webkit-scrollbar-track {
  background: var(--scrollbar-track);
  border-radius: 10px;
}

.close-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  transition: background-color 0.3s;
}

.close-button:hover {
  background-color: #f0f0f0;
}

.modal-image {
  height: 250px;
  margin-bottom: 1.5rem;
  border-radius: 8px;
  overflow: hidden;
}

.project-image-placeholder.large {
  font-size: 4rem;
}

.modal-description {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.modal-section {
  margin-bottom: 1.5rem;
}

.modal-section h3 {
  margin-bottom: 0.75rem;
  color: var(--color-primary);
}

.modal-section ul {
  padding-left: 1.5rem;
}

.modal-section ul li {
  margin-bottom: 0.5rem;
}

.modal-actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
}

.modal-button {
  padding: 0.75rem 1.5rem;
  border-radius: 5px;
  text-decoration: none;
  font-weight: 600;
  text-align: center;
  transition: all 0.3s ease;
}

.modal-button.primary {
  background-color: var(--color-primary);
  color: white;
}

.modal-button.secondary {
  border: 2px solid var(--color-primary);
  color: var(--color-primary);
}

.modal-button:hover {
  transform: translateY(-3px);
  box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
  .projects {
    grid-template-columns: 1fr;
  }
  
  .modal-actions {
    flex-direction: column;
  }
}

/* Стили для темной темы */
[data-theme="dark"] .project-card {
  background-color: var(--color-surface);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

[data-theme="dark"] .project-info p {
  color: var(--color-text-secondary);
}

[data-theme="dark"] .tech-badge {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--color-text-secondary);
}

[data-theme="dark"] .filter-pill {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--color-text);
}

[data-theme="dark"] .filter-pill:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

[data-theme="dark"] .project-modal {
  background-color: var(--color-surface);
  color: var(--color-text);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

[data-theme="dark"] .close-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

[data-theme="dark"] .modal-description {
  color: var(--color-text);
}
</style> 