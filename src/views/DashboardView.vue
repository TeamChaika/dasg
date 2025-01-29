<template>
  <div class="dashboard">
    <nav>
      <button @click="handleLogout">Выйти</button>
    </nav>
    <h1>Добро пожаловать, {{ userEmail }}</h1>
    <!-- Контент дашборда -->
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const userEmail = computed(() => authStore.user?.email)

const handleLogout = async () => {
  try {
    await authStore.signOut()
    await router.push({name: 'auth'}) // Перенаправление после выхода
  } catch (error) {
    console.error('Ошибка при выходе:', error)
    // Можно добавить отображение ошибки пользователю
  }
}
</script>