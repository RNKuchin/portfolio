<template>
  <div class="contact">
    <h1>Связаться со мной</h1>
    
    <div class="contact-container">
      <div class="contact-info">
        <div class="contact-methods">
          <div class="contact-method">
            <div class="contact-icon">
              <span>✉️</span>
            </div>
            <div class="contact-detail">
              <h3>Email</h3>
              <p><a href="mailto:roman.kuchin@mail.com">roman.kuchin@mail.com</a></p>
            </div>
          </div>
          
          <div class="contact-method">
            <div class="contact-icon">
              <span>💬</span>
            </div>
            <div class="contact-detail">
              <h3>Telegram</h3>
              <p><a href="https://t.me/R_o_m_a_n_it" target="_blank">@R_o_m_a_n_it</a></p>
            </div>
          </div>
        </div>
        
        <div class="social-links">
          <h3>Социальные сети</h3>
          <div class="social-icons">
            <a href="https://github.com/RNKuchin" target="_blank" class="social-icon" title="GitHub">
              <span><svg height="32" aria-hidden="true" viewBox="0 0 24 24" version="1.1" width="32" data-view-component="true" class="octicon octicon-mark-github v-align-middle">
    <path d="M12 1C5.9225 1 1 5.9225 1 12C1 16.8675 4.14875 20.9787 8.52125 22.4362C9.07125 22.5325 9.2775 22.2025 9.2775 21.9137C9.2775 21.6525 9.26375 20.7862 9.26375 19.865C6.5 20.3737 5.785 19.1912 5.565 18.5725C5.44125 18.2562 4.905 17.28 4.4375 17.0187C4.0525 16.8125 3.5025 16.3037 4.42375 16.29C5.29 16.2762 5.90875 17.0875 6.115 17.4175C7.105 19.0812 8.68625 18.6137 9.31875 18.325C9.415 17.61 9.70375 17.1287 10.02 16.8537C7.5725 16.5787 5.015 15.63 5.015 11.4225C5.015 10.2262 5.44125 9.23625 6.1425 8.46625C6.0325 8.19125 5.6475 7.06375 6.2525 5.55125C6.2525 5.55125 7.17375 5.2625 9.2775 6.67875C10.1575 6.43125 11.0925 6.3075 12.0275 6.3075C12.9625 6.3075 13.8975 6.43125 14.7775 6.67875C16.8813 5.24875 17.8025 5.55125 17.8025 5.55125C18.4075 7.06375 18.0225 8.19125 17.9125 8.46625C18.6138 9.23625 19.04 10.2125 19.04 11.4225C19.04 15.6437 16.4688 16.5787 14.0213 16.8537C14.42 17.1975 14.7638 17.8575 14.7638 18.8887C14.7638 20.36 14.75 21.5425 14.75 21.9137C14.75 22.2025 14.9563 22.5462 15.5063 22.4362C19.8513 20.9787 23 16.8537 23 12C23 5.9225 18.0775 1 12 1Z"></path>
</svg></span>
            </a>
            <a href="https://linkedin.com/in/username" target="_blank" class="social-icon" title="LinkedIn">
              <span>LI</span>
            </a>
          </div>
        </div>
      </div>
      
      <div class="contact-form-container">
        <h2>Отправить сообщение</h2>
        <form class="contact-form" @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Ваше имя</label>
            <input 
              type="text" 
              id="name" 
              v-model="formData.name" 
              required
              placeholder="Имя"
            >
          </div>
          
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              v-model="formData.email" 
              required
              placeholder="email@example.com"
            >
          </div>
          
          <div class="form-group">
            <label for="subject">Тема</label>
            <input 
              type="text" 
              id="subject" 
              v-model="formData.subject" 
              required
              placeholder="Тема сообщения"
            >
          </div>
          
          <div class="form-group">
            <label for="message">Сообщение</label>
            <textarea 
              id="message" 
              v-model="formData.message" 
              required
              placeholder="Ваше сообщение..."
              rows="5"
            ></textarea>
          </div>
          
          <button type="submit" class="submit-button" :disabled="isSubmitting">
            {{ isSubmitting ? 'Отправка...' : 'Отправить' }}
          </button>
          
          <div v-if="formStatus" :class="['form-status', formStatus.type]">
            {{ formStatus.message }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

// Form data
const formData = ref({
  name: '',
  email: '',
  subject: '',
  message: ''
});

// Form submission status
const isSubmitting = ref(false);
const formStatus = ref(null);

// Submit form
function submitForm() {
  isSubmitting.value = true;
  formStatus.value = null;
  
  // Simulate API call
  setTimeout(() => {
    // Success simulation
    isSubmitting.value = false;
    formStatus.value = {
      type: 'success',
      message: 'Спасибо! Ваше сообщение успешно отправлено.'
    };
    
    // Reset form after successful submission
    formData.value = {
      name: '',
      email: '',
      subject: '',
      message: ''
    };
    
    // Clear success message after a while
    setTimeout(() => {
      formStatus.value = null;
    }, 5000);
    
    // Error simulation (uncomment to test)
    /*
    formStatus.value = {
      type: 'error',
      message: 'Извините, произошла ошибка. Пожалуйста, попробуйте позже.'
    };
    */
  }, 1500);
}
</script>

<style scoped>
.contact {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 3rem;
}

.contact-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 3rem;
}

/* Contact Info */
.contact-info {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
}

.contact-methods {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.contact-method {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.contact-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--color-primary-light);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
}

.contact-detail h3 {
  margin-bottom: 0.25rem;
  font-size: 1.1rem;
}

.contact-detail a {
  color: var(--color-primary);
  text-decoration: none;
  transition: color 0.3s;
}

.contact-detail a:hover {
  color: var(--color-primary-dark);
  text-decoration: underline;
}

.social-links h3 {
  margin-bottom: 1rem;
}

.social-icons {
  display: flex;
  gap: 1rem;
}

.social-icon {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  color: #333;
  font-weight: bold;
  transition: all 0.3s ease;
}

.social-icon:hover {
  background-color: var(--color-primary);
  color: white;
  transform: translateY(-3px);
}

/* Contact Form */
.contact-form-container {
  background-color: white;
  border-radius: 10px;
  padding: 2rem;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.05);
}

.contact-form-container h2 {
  margin-bottom: 1.5rem;
  color: var(--color-primary);
  text-align: center;
}

.contact-form {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--color-text);
}

input, textarea {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-family: inherit;
  font-size: 1rem;
  transition: border-color 0.3s;
}

input:focus, textarea:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(var(--color-primary-rgb), 0.1);
}

.submit-button {
  background-color: var(--color-primary);
  color: white;
  border: none;
  padding: 0.875rem 1.5rem;
  border-radius: 5px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 0.5rem;
}

.submit-button:hover:not(:disabled) {
  background-color: var(--color-primary-dark);
  transform: translateY(-2px);
}

.submit-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.form-status {
  padding: 0.75rem;
  border-radius: 5px;
  margin-top: 1rem;
  text-align: center;
}

.form-status.success {
  background-color: rgba(46, 213, 115, 0.1);
  color: #2ed573;
  border: 1px solid rgba(46, 213, 115, 0.3);
}

.form-status.error {
  background-color: rgba(255, 71, 87, 0.1);
  color: #ff4757;
  border: 1px solid rgba(255, 71, 87, 0.3);
}

/* Темная тема для формы контактов */
[data-theme="dark"] .contact-form-container {
  background-color: var(--color-surface);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

[data-theme="dark"] input, 
[data-theme="dark"] textarea {
  background-color: rgba(255, 255, 255, 0.05);
  border-color: rgba(255, 255, 255, 0.1);
  color: var(--color-text);
}

[data-theme="dark"] input::placeholder, 
[data-theme="dark"] textarea::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

[data-theme="dark"] .social-icon {
  background-color: rgba(255, 255, 255, 0.1);
  color: var(--color-text);
}

@media (max-width: 768px) {
  .contact-container {
    grid-template-columns: 1fr;
  }
  
  .contact-info {
    order: 2;
  }
  
  .contact-form-container {
    order: 1;
  }
}
</style> 