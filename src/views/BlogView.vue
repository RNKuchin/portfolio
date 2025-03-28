<template>
  <div class="blog">
    <h1>Блог</h1>
    
    <div class="blog-grid">
      <article 
        v-for="post in blogPosts" 
        :key="post.id"
        class="blog-card"
        @click="openPost(post)"
      >
        <div class="blog-card-image">
          <div class="blog-image-placeholder">
            <span>{{ post.title.charAt(0) }}</span>
          </div>
        </div>
        <div class="blog-card-content">
          <div class="blog-card-meta">
            <span class="blog-date">{{ post.date }}</span>
            <span class="blog-category">{{ post.category }}</span>
          </div>
          <h2>{{ post.title }}</h2>
          <p>{{ post.excerpt }}</p>
          <button class="read-more-btn">Читать далее</button>
        </div>
      </article>
    </div>
    
    <!-- Blog Post Modal -->
    <div v-if="selectedPost" class="blog-modal-backdrop" @click="closePost">
      <div class="blog-modal" @click.stop>
        <button class="close-button" @click="closePost">&times;</button>
        
        <div class="blog-modal-header">
          <div class="blog-modal-meta">
            <span class="blog-date">{{ selectedPost.date }}</span>
            <span class="blog-category">{{ selectedPost.category }}</span>
          </div>
          <h1>{{ selectedPost.title }}</h1>
        </div>
        
        <!-- Оглавление для длинных статей -->
        <div v-if="blogHeaders.length > 2" class="blog-toc">
          <h3>Содержание</h3>
          <ul>
            <li v-for="(header, index) in blogHeaders" :key="index">
              <a :href="`#header-${index}`" @click.stop>{{ header }}</a>
            </li>
          </ul>
        </div>
        
        <!-- Обрабатываем содержимое статьи для добавления якорных ссылок -->
        <div class="blog-content" v-html="processedContent"></div>
        
        <div class="blog-tags">
          <span 
            v-for="(tag, index) in selectedPost.tags" 
            :key="index"
            class="blog-tag"
          >
            #{{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Sample blog posts data
const blogPosts = ref([
  {
    id: 1,
    title: 'Создание To-Do List на Vue 3 и Pinia',
    excerpt: 'Пошаговое руководство по созданию приложения для управления задачами с использованием Vue 3 и Pinia для управления состоянием.',
    date: '15 марта 2023',
    category: 'Vue.js',
    tags: ['Vue', 'Pinia', 'JavaScript', 'Frontend'],
    content: `
      <p>Vue.js 3 в сочетании с Pinia предоставляет мощный инструментарий для создания современных веб-приложений. В этой статье я расскажу, как создать простое, но функциональное приложение для управления задачами (To-Do List) с использованием этих технологий.</p>
      
      <h2>Настройка проекта</h2>
      <p>Сначала нам нужно создать новый проект Vue 3 с использованием Vite:</p>
      <pre><code>npm create vite@latest todo-app -- --template vue</code></pre>
      
      <p>Затем установим Pinia:</p>
      <pre><code>cd todo-app
npm install pinia</code></pre>
      
      <h2>Настройка Pinia</h2>
      <p>Создадим хранилище для наших задач. Для этого создадим файл <code>src/stores/todo.js</code>:</p>
      
      <pre><code>import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    tasks: [],
    nextId: 1
  }),
  actions: {
    addTask(title) {
      this.tasks.push({
        id: this.nextId++,
        title,
        completed: false,
        createdAt: new Date()
      })
    },
    toggleCompleted(taskId) {
      const task = this.tasks.find(task => task.id === taskId)
      if (task) {
        task.completed = !task.completed
      }
    },
    removeTask(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId)
    }
  },
  getters: {
    completedTasks: (state) => state.tasks.filter(task => task.completed),
    uncompletedTasks: (state) => state.tasks.filter(task => !task.completed),
    totalTasks: (state) => state.tasks.length
  }
})</code></pre>
      
      <p>Далее, я расскажу как создать компоненты для отображения и управления задачами...</p>
    `
  },
  {
    id: 2,
    title: 'Работа с Fetch API: особенности и примеры',
    excerpt: 'Рассмотрим практические примеры использования Fetch API для работы с данными с сервера и обработки различных сценариев.',
    date: '3 февраля 2023',
    category: 'JavaScript',
    tags: ['JavaScript', 'API', 'Fetch', 'Асинхронность'],
    content: `
      <p>Fetch API — это современный интерфейс JavaScript для выполнения HTTP-запросов, который заменил устаревший XMLHttpRequest. В этой статье мы рассмотрим, как эффективно использовать Fetch API в ваших проектах.</p>
      
      <h2>Основы Fetch API</h2>
      <p>Базовый синтаксис Fetch API выглядит следующим образом:</p>
      
      <pre><code>fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error('Ошибка сети: ' + response.status);
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
  })
  .catch(error => {
    console.error('Проблема с fetch операцией:', error);
  });</code></pre>
      
      <h2>Обработка ошибок</h2>
      <p>Важно понимать, что Promise, возвращаемый fetch(), отклоняется только при сетевых ошибках, но не при ошибках HTTP (например, 404 или 500). Поэтому мы должны проверять свойство 'ok' в объекте response.</p>
      
      <h2>Отправка POST-запросов</h2>
      <p>Для отправки данных на сервер мы можем использовать следующий подход:</p>
      
      <pre><code>fetch('https://api.example.com/submit', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Пользователь',
    email: 'user@example.com'
  })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));</code></pre>
      
      <p>В следующих разделах мы рассмотрим более сложные сценарии использования Fetch API, включая отмену запросов, отправку файлов и использование асинхронных функций с async/await...</p>
    `
  },
  {
    id: 3,
    title: 'CSS Grid vs Flexbox: когда что использовать',
    excerpt: 'Сравнение CSS Grid и Flexbox, их преимущества и недостатки, а также рекомендации по выбору подходящего инструмента для конкретных задач верстки.',
    date: '20 января 2023',
    category: 'CSS',
    tags: ['CSS', 'Layout', 'Grid', 'Flexbox'],
    content: `
      <p>CSS Grid и Flexbox — два мощных инструмента для создания современных макетов веб-страниц. Хотя они могут решать похожие задачи, каждый из них имеет свои уникальные возможности и случаи использования.</p>
      
      <h2>Flexbox: одномерные макеты</h2>
      <p>Flexbox отлично подходит для создания одномерных макетов, то есть для управления элементами либо по горизонтали, либо по вертикали:</p>
      
      <pre><code>.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item {
  flex: 1;
}</code></pre>
      
      <p>Основные преимущества Flexbox:</p>
      <ul>
        <li>Простота использования для выравнивания элементов</li>
        <li>Хорошая поддержка во всех современных браузерах</li>
        <li>Отлично подходит для компонентов пользовательского интерфейса и небольших макетов</li>
      </ul>
      
      <h2>CSS Grid: двумерные макеты</h2>
      <p>CSS Grid предназначен для создания двумерных макетов, где важно управление как строками, так и столбцами:</p>
      
      <pre><code>.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}

.item {
  grid-column: span 2;
}</code></pre>
      
      <p>Основные преимущества CSS Grid:</p>
      <ul>
        <li>Мощный контроль над двумерными макетами</li>
        <li>Возможность создания сложных сеток без использования вспомогательного HTML-кода</li>
        <li>Встроенная поддержка промежутков между элементами</li>
      </ul>
      
      <p>В следующих разделах статьи мы рассмотрим конкретные примеры использования обоих подходов и сценарии, в которых лучше выбрать один над другим...</p>
    `
  }
]);

// Selected post for modal
const selectedPost = ref(null);

// Обработка содержимого с добавлением якорных ссылок
const processedContent = computed(() => {
  if (!selectedPost.value) return '';
  
  // Находим все h2 заголовки в контенте и добавляем им id для якорных ссылок
  let content = selectedPost.value.content;
  const headerRegex = /<h2>(.*?)<\/h2>/g;
  let match;
  let index = 0;
  
  while ((match = headerRegex.exec(content)) !== null) {
    const fullMatch = match[0];
    const headerText = match[1];
    const replacement = `<h2 id="header-${index}">${headerText} <a href="#header-${index}" class="header-anchor">#</a></h2>`;
    content = content.replace(fullMatch, replacement);
    index++;
  }
  
  return content;
});

// Извлекаем заголовки для оглавления
const blogHeaders = computed(() => {
  if (!selectedPost.value) return [];
  
  const headers = [];
  const headerRegex = /<h2>(.*?)<\/h2>/g;
  let match;
  
  // Создаем копию для работы, чтобы не влиять на оригинал
  let contentCopy = selectedPost.value.content;
  
  while ((match = headerRegex.exec(contentCopy)) !== null) {
    headers.push(match[1]);
  }
  
  return headers;
});

// Open post modal
function openPost(post) {
  selectedPost.value = post;
  document.body.style.overflow = 'hidden'; // Prevent scrolling
}

// Close post modal
function closePost() {
  selectedPost.value = null;
  document.body.style.overflow = 'auto'; // Allow scrolling
}
</script>

<style scoped>
.blog {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 3rem;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 2rem;
}

.blog-card {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.08);
  cursor: pointer;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: white;
}

.blog-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 12px 20px rgba(0, 0, 0, 0.15);
}

.blog-card-image {
  height: 200px;
  overflow: hidden;
}

.blog-image-placeholder {
  height: 100%;
  background-color: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  font-weight: bold;
}

.blog-card-content {
  padding: 1.5rem;
}

.blog-card-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.85rem;
  color: #666;
  margin-bottom: 1rem;
}

.blog-category {
  color: var(--color-primary);
  font-weight: 600;
}

.blog-card h2 {
  margin-bottom: 1rem;
  font-size: 1.25rem;
  line-height: 1.4;
}

.blog-card p {
  color: #666;
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.read-more-btn {
  background: none;
  border: none;
  color: var(--color-primary);
  font-weight: 600;
  padding: 0;
  cursor: pointer;
  transition: color 0.3s;
  font-size: 0.9rem;
}

.read-more-btn:hover {
  color: var(--color-primary-dark);
  text-decoration: underline;
}

/* Blog Modal */
.blog-modal-backdrop {
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

.blog-modal {
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

.blog-modal::-webkit-scrollbar {
  width: var(--scrollbar-width-thin);
}

.blog-modal::-webkit-scrollbar-track {
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

.blog-modal-header {
  margin-bottom: 2rem;
}

.blog-modal-meta {
  display: flex;
  gap: 1rem;
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 0.5rem;
}

.blog-modal h1 {
  text-align: left;
  margin-bottom: 1rem;
  font-size: 2rem;
  line-height: 1.3;
}

.blog-content {
  line-height: 1.7;
  color: #333;
}

.blog-content h2 {
  margin: 1.5rem 0 1rem;
  color: var(--color-primary);
  font-weight: 700;
}

.blog-content p {
  margin-bottom: 1rem;
}

.blog-content ul, .blog-content ol {
  margin-bottom: 1rem;
  padding-left: 1.5rem;
}

.blog-content li {
  margin-bottom: 0.5rem;
}

.blog-content pre {
  background-color: #f5f5f5;
  padding: 1rem;
  border-radius: 5px;
  overflow-x: auto;
  margin: 1rem 0;
}

.blog-content code {
  font-family: monospace;
  font-size: 0.9rem;
}

.blog-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-top: 2rem;
}

.blog-tag {
  padding: 0.25rem 0.75rem;
  border-radius: 100px;
  background-color: #f0f0f0;
  font-size: 0.8rem;
  color: #555;
}

/* Стили для темного режима */
[data-theme="dark"] .blog-card {
  background-color: var(--color-surface);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

[data-theme="dark"] .blog-card p,
[data-theme="dark"] .blog-card-meta {
  color: var(--color-text-secondary);
}

[data-theme="dark"] .blog-modal {
  background-color: var(--color-surface);
  color: var(--color-text);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

[data-theme="dark"] .close-button:hover {
  background-color: rgba(255, 255, 255, 0.1);
}

[data-theme="dark"] .blog-content {
  color: var(--color-text);
}

[data-theme="dark"] .blog-content pre {
  background-color: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

[data-theme="dark"] .blog-tag {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--color-text-secondary);
}

@media (max-width: 768px) {
  .blog-grid {
    grid-template-columns: 1fr;
  }
}

/* Новые стили для якорных ссылок и оглавления */
.blog-toc {
  background-color: rgba(0, 0, 0, 0.03);
  border-radius: 10px;
  padding: 1.5rem;
  margin-bottom: 2rem;
}

[data-theme="dark"] .blog-toc {
  background-color: rgba(255, 255, 255, 0.05);
}

.blog-toc h3 {
  margin-bottom: 1rem;
  font-size: 1.2rem;
}

.blog-toc ul {
  list-style: none;
  padding-left: 0;
}

.blog-toc li {
  margin-bottom: 0.75rem;
}

.blog-toc a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color 0.3s;
}

.blog-toc a:hover {
  color: var(--color-primary-dark);
  text-decoration: underline;
}

.header-anchor {
  opacity: 0;
  font-size: 0.8em;
  margin-left: 0.5rem;
  transition: opacity 0.3s ease;
}

:deep(h2:hover .header-anchor) {
  opacity: 0.6;
}

:deep(.header-anchor:hover) {
  opacity: 1;
  text-decoration: none;
}
</style> 