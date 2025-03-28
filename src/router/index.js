import { createRouter, createWebHistory } from 'vue-router'

// Главная страница загружается сразу для быстрого отображения
import HomeView from '../views/HomeView.vue'

// Остальные компоненты загружаются асинхронно при необходимости
// Используем прямой импорт вместо defineAsyncComponent для маршрутов
const AboutView = () => import('../views/AboutView.vue')
const SkillsView = () => import('../views/SkillsView.vue')
const PortfolioView = () => import('../views/PortfolioView.vue')
const BlogView = () => import('../views/BlogView.vue')
const ContactView = () => import('../views/ContactView.vue')
const NotFoundView = () => import('../views/NotFoundView.vue')

/**
 * Конфигурация маршрутов приложения
 */
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        title: 'Главная'
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        title: 'Обо мне'
      }
    },
    {
      path: '/skills',
      name: 'skills',
      component: SkillsView,
      meta: {
        title: 'Навыки'
      }
    },
    {
      path: '/portfolio',
      name: 'portfolio',
      component: PortfolioView,
      meta: {
        title: 'Проекты'
      }
    },
    {
      path: '/blog',
      name: 'blog',
      component: BlogView,
      meta: {
        title: 'Блог'
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: ContactView,
      meta: {
        title: 'Контакты'
      }
    },
    {
      // Маршрут для страницы 404
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: NotFoundView,
      meta: {
        title: 'Страница не найдена'
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    // Если есть сохраненная позиция (при переходе назад/вперед),
    // используем ее, иначе прокручиваем наверх
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

/**
 * Обновляет заголовок страницы на основе метаданных маршрута
 */
router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title || 'Портфолио'} | Frontend-разработчик`
  next()
})

export default router 