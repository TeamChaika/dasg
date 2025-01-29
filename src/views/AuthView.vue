<template>
  <div class="auth-container">
    <h1>Вход в систему</h1>
    <form @submit.prevent="handleSubmit">
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Пароль" required>
      <button type="submit">Войти</button>
    </form>
    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const errorMessage = ref('') // Переименовали переменную для ясности
const router = useRouter()
const authStore = useAuthStore()

const handleSubmit = async () => {
  try {
    errorMessage.value = '' // Сбрасываем сообщение об ошибке
    await authStore.signIn(email.value, password.value)
    const redirectPath = authStore.clearRedirectPath()
    router.push(redirectPath)
  } catch (err) {
    errorMessage.value = err.message || 'Произошла неизвестная ошибка'
    console.error('Ошибка авторизации:', err)
  }
}
</script>


<style scoped>
.auth-container {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 8px;
}

.error {
  color: #ff4444;
  margin-top: 1rem;
}
</style>