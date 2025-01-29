import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.use(router)

// Инициализация после монтирования приложения
app.mount('#app')

// Добавьте это после монтирования
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
authStore.initialize()