<template>
  <div class="about">
    <h1>Обо мне</h1>
    
    <div class="about-content">
      <div class="about-image">
        <div class="image-placeholder">
          <!-- Placeholder for your photo -->
          <span>Фото</span>
        </div>
      </div>
      
      <div class="about-text">
        <h2>Frontend-разработчик</h2>
        
        <p>
          Привет! Я Роман, начинающий Frontend-разработчик. Мой путь в веб-разработке начался в 2022 году 
          с самостоятельного изучения верстки и основ программирования. Активно проходил онлайн-курсы 
          и применял полученные знания в практических проектах.
        </p>
        
        <p>
          В своих проектах я стремлюсь создавать удобные и функциональные интерфейсы, 
          постоянно изучая новые подходы и технологии. Начав с простой верстки, постепенно 
          перешел к разработке на Vue.js и React.
        </p>
        
        <div class="career-highlights">
          <h3>Мой путь:</h3>
          <ul>
            <li>Прошел несколько специализированных онлайн-курсов по верстке и JavaScript</li>
            <li>Создал несколько учебных проектов для портфолио</li>
            <li>Освоил основы современных фреймворков Vue.js и React</li>
            <li>Продолжаю активно развиваться в направлении frontend-разработки</li>
          </ul>
        </div>
        
        <div class="technologies">
          <h3>Основные технологии:</h3>
          <ul>
            <li>JavaScript (ES6+)</li>
            <li>HTML5 / CSS3</li>
            <li>Vue.js</li>
            <li>React</li>
            <li>Git</li>
          </ul>
        </div>
        
        <div class="interests">
          <h3>Мои интересы в разработке:</h3>
          <ul>
            <li>Создание интуитивных пользовательских интерфейсов</li>
            <li>Оптимизация производительности</li>
            <li>Анимации и интерактивность</li>
            <li>Архитектура приложений</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// About view component
</script>

<style scoped>
.about {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 3rem;
}

.about-content {
  display: flex;
  gap: 3rem;
}

.about-image {
  flex: 1;
}

.image-placeholder {
  background-color: #f0f0f0;
  border-radius: 10px;
  height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  font-size: 1.5rem;
}

.about-text {
  flex: 2;
}

h2 {
  margin-bottom: 1.5rem;
  color: var(--color-primary);
}

p {
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.technologies, .interests, .career-highlights {
  margin-top: 2rem;
}

h3 {
  margin-bottom: 1rem;
}

ul {
  list-style-type: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 0.5rem;
}

li {
  padding: 0.5rem 0;
  position: relative;
  padding-left: 1.5rem;
}

li:before {
  content: "→";
  position: absolute;
  left: 0;
  color: var(--color-primary);
}

@media (max-width: 768px) {
  .about-content {
    flex-direction: column;
  }
  
  .image-placeholder {
    height: 300px;
  }
}
</style> 