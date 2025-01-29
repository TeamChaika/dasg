<template>
  <form @submit.prevent="handleLogin">
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Пароль" />
    <button type="submit">Войти</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '@/services/supabase'

const email = ref('')
const password = ref('')

const handleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (error) {
    alert('Ошибка: ' + error.message)
  } else {
    console.log('Пользователь:', data.user)
  }
}
</script>