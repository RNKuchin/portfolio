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
              <p><a href="mailto:example@domain.com">example@domain.com</a></p>
            </div>
          </div>
          
          <div class="contact-method">
            <div class="contact-icon">
              <span>💬</span>
            </div>
            <div class="contact-detail">
              <h3>Telegram</h3>
              <p><a href="https://t.me/username" target="_blank">@username</a></p>
            </div>
          </div>
        </div>
        
        <div class="social-links">
          <h3>Социальные сети</h3>
          <div class="social-icons">
            <a href="https://github.com/username" target="_blank" class="social-icon" title="GitHub">
              <span>GH</span>
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