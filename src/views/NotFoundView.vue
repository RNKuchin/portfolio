<template>
  <div class="not-found">
    <div class="not-found-content">
      <h1 class="error-code">404</h1>
      <h2>Страница не найдена</h2>
      <p>Запрашиваемая страница не существует или была перемещена.</p>
      <router-link to="/" class="btn btn-primary">Вернуться на главную</router-link>
    </div>
  </div>
</template>

<script setup>
// Компонент страницы 404
</script>

<style scoped>
.not-found {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 10rem);
  text-align: center;
  padding: 2rem;
}

.not-found-content {
  max-width: 40rem;
}

.error-code {
  font-size: 8rem;
  margin-bottom: 1rem;
  color: var(--color-primary);
  line-height: 1;
  text-shadow: 0.125rem 0.125rem 0 rgba(var(--color-primary-rgb), 0.2);
}

h2 {
  font-size: 2rem;
  margin-bottom: 1.5rem;
}

p {
  font-size: 1.25rem;
  margin-bottom: 2rem;
  color: var(--color-text-secondary);
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 0.5rem;
  font-weight: 600;
  transition: all 0.3s ease;
  text-decoration: none;
  display: inline-block;
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
  border: none;
}

.btn-primary:hover {
  background-color: var(--color-primary-dark);
  transform: translateY(-0.1875rem);
  box-shadow: 0 0.5rem 1rem rgba(var(--color-primary-rgb), 0.2);
}

@media (max-width: 768px) {
  .error-code {
    font-size: 6rem;
  }
  
  h2 {
    font-size: 1.5rem;
  }
  
  p {
    font-size: 1rem;
  }
}

@media (max-width: 480px) {
  .error-code {
    font-size: 4rem;
  }
}
</style> 