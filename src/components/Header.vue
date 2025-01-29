<template>
  <header v-if="isAuthenticated" class="app-header">
    <nav>
      <!-- Навигационные ссылки -->
      <router-link to="/">Главная</router-link>
      <router-link to="/profile">Профиль</router-link>

      <div class="user-info">
        <span>{{ userEmail }}</span>
        <button @click="handleLogout">Выйти</button>
      </div>
      <div class="auth-status">
        <span v-if="isAuthenticated">Online</span>
        <span v-else>Offline</span>
      </div>
    </nav>
  </header>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const handleLogout = async () => {
  try {
    await authStore.signOut()
    router.push({
      name: 'auth',
      query: { logout: 'success' } // Опционально: добавить параметр для отображения сообщения
    })
  } catch (error) {
    console.error('Logout failed:', error)
    // Можно показать уведомление об ошибке
  }
}
</script>

<style scoped>
.app-header {
  background: #2c3e50;
  padding: 1rem;
  color: white;
}

nav {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
  align-items: center;
}

a {
  color: white;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}

a.router-link-exact-active {
  background: #42b983;
}

button {
  background: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.user-section {
  margin-left: auto;
  display: flex;
  gap: 1rem;
  align-items: center;
}
</style>