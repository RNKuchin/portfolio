<template>
  <div class="skills">
    <h1>Мои навыки</h1>
    
    <div class="skills-container">
      <div class="skill-category">
        <h2>Языки</h2>
        <div class="skill-items">
          <div class="skill-item" v-for="(skill, index) in languages" :key="`lang-${index}`">
            <div class="skill-icon" :style="{ backgroundColor: skill.color }">
              <span>{{ skill.icon }}</span>
            </div>
            <div class="skill-info">
              <h3>{{ skill.name }}</h3>
              <div class="skill-level">
                <div class="skill-progress" :style="{ width: `${skill.level}%` }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="skill-category">
        <h2>Фреймворки и библиотеки</h2>
        <div class="skill-items">
          <div class="skill-item" v-for="(skill, index) in frameworks" :key="`frame-${index}`">
            <div class="skill-icon" :style="{ backgroundColor: skill.color }">
              <span>{{ skill.icon }}</span>
            </div>
            <div class="skill-info">
              <h3>{{ skill.name }}</h3>
              <div class="skill-level">
                <div class="skill-progress" :style="{ width: `${skill.level}%` }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="skill-category">
        <h2>Инструменты</h2>
        <div class="skill-items">
          <div class="skill-item" v-for="(skill, index) in tools" :key="`tool-${index}`">
            <div class="skill-icon" :style="{ backgroundColor: skill.color }">
              <span>{{ skill.icon }}</span>
            </div>
            <div class="skill-info">
              <h3>{{ skill.name }}</h3>
              <div class="skill-level">
                <div class="skill-progress" :style="{ width: `${skill.level}%` }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div class="skill-category">
        <h2>Методологии и стили</h2>
        <div class="skill-items">
          <div class="skill-item" v-for="(skill, index) in methodologies" :key="`method-${index}`">
            <div class="skill-icon" :style="{ backgroundColor: skill.color }">
              <span>{{ skill.icon }}</span>
            </div>
            <div class="skill-info">
              <h3>{{ skill.name }}</h3>
              <div class="skill-level">
                <div class="skill-progress" :style="{ width: `${skill.level}%` }"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Skills data with level (0-100) and colors
const languages = ref([
  { name: 'HTML', level: 90, icon: 'H', color: '#E44D26' },
  { name: 'CSS', level: 85, icon: 'C', color: '#264DE4' },
  { name: 'JavaScript', level: 88, icon: 'JS', color: '#F7DF1E' },
  { name: 'PHP', level: 60, icon: 'PHP', color: '#777BB3' }
]);

const frameworks = ref([
  { name: 'Vue.js', level: 90, icon: 'Vue', color: '#4FC08D' },
  { name: 'React', level: 70, icon: 'R', color: '#61DAFB' },
  { name: 'Pinia', level: 85, icon: 'P', color: '#FFE873' },
  { name: 'Vue Router', level: 85, icon: 'VR', color: '#3FB27F' }
]);

const tools = ref([
  { name: 'Webpack', level: 75, icon: 'W', color: '#8DD6F9' },
  { name: 'Vite', level: 85, icon: 'V', color: '#646CFF' },
  { name: 'Git', level: 80, icon: 'Git', color: '#F05032' },
  { name: 'Gulp', level: 70, icon: 'G', color: '#CF4647' }
]);

const methodologies = ref([
  { name: 'БЭМ', level: 85, icon: 'БЭМ', color: '#456BD9' },
  { name: 'Tailwind', level: 80, icon: 'TW', color: '#38B2AC' },
  { name: 'Bootstrap', level: 75, icon: 'BS', color: '#7952B3' },
  { name: 'SASS/SCSS', level: 85, icon: 'S', color: '#CD6799' }
]);
</script>

<style scoped>
.skills {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 3rem;
}

.skills-container {
  display: grid;
  gap: 3rem;
}

.skill-category {
  margin-bottom: 2rem;
}

.skill-category h2 {
  margin-bottom: 1.5rem;
  color: var(--color-primary);
  border-bottom: 2px solid #f0f0f0;
  padding-bottom: 0.5rem;
}

.skill-items {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.skill-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.skill-item:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.skill-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: 8px;
  color: white;
  font-weight: bold;
  font-size: 0.9rem;
}

.skill-info {
  flex: 1;
}

.skill-info h3 {
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
}

.skill-level {
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
}

.skill-progress {
  height: 100%;
  background-color: var(--color-primary);
  border-radius: 4px;
  transition: width 1s ease-in-out;
}

@media (max-width: 768px) {
  .skill-items {
    grid-template-columns: 1fr;
  }
}
</style> 