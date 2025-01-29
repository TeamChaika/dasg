<template>
  <div class="home-page">
    <h1>Добро пожаловать!</h1>
    <p v-if="authStore.user">Вы авторизованы как: {{ authStore.user.email }}</p>
    <p v-else>Пожалуйста, войдите в систему</p>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<style>
.home-page {
  max-width: 800px;
  margin: 2rem auto;
  padding: 2rem;
  text-align: center;
}
</style>