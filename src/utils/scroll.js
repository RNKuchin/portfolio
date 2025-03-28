/**
 * Утилита для плавного скролла к указанному элементу или позиции
 */

/**
 * Плавный скролл к указанному элементу
 * @param {string|HTMLElement} target - ID элемента или DOM-элемент
 * @param {number} offset - Отступ от верха (например, для фиксированного меню)
 * @param {number} duration - Длительность анимации в миллисекундах
 */
export function scrollToElement(target, offset = 0, duration = 500) {
  let targetElement;
  
  if (typeof target === 'string') {
    // Если передан ID элемента
    targetElement = document.getElementById(target);
  } else if (target instanceof HTMLElement) {
    // Если передан DOM-элемент
    targetElement = target;
  } else {
    console.error('Неверный тип цели для прокрутки');
    return;
  }
  
  if (!targetElement) {
    console.error('Элемент не найден:', target);
    return;
  }

  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - offset;
  smoothScrollTo(targetPosition, duration);
}

/**
 * Плавный скролл к указанной позиции
 * @param {number} targetPosition - Позиция в пикселях
 * @param {number} duration - Длительность анимации в миллисекундах
 */
export function smoothScrollTo(targetPosition, duration = 500) {
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  // Функция плавности (easing)
  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

/**
 * Скролл до начала страницы
 * @param {number} duration - Длительность анимации в миллисекундах
 */
export function scrollToTop(duration = 500) {
  smoothScrollTo(0, duration);
}

/**
 * Скролл до конца страницы
 * @param {number} duration - Длительность анимации в миллисекундах
 */
export function scrollToBottom(duration = 500) {
  const bottom = document.documentElement.scrollHeight - window.innerHeight;
  smoothScrollTo(bottom, duration);
}

/**
 * Добавляет обработчики событий для плавного скролла по якорным ссылкам
 * @param {string} selector - CSS-селектор для выбора якорных ссылок
 * @param {number} offset - Отступ от верха (например, для фиксированного меню)
 */
export function initSmoothScrolling(selector = 'a[href^="#"]', offset = 70) {
  document.querySelectorAll(selector).forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href').substring(1);
      if (!targetId) return;
      
      scrollToElement(targetId, offset);
    });
  });
} 