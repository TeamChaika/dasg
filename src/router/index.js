import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

// Динамический импорт компонентов
const DashboardView = () => import('@/views/DashboardView.vue')
const AuthView = () => import('@/views/AuthView.vue')
const NotFoundView = () => import('@/views/NotFoundView.vue')

const routes = [
    {
        path: '/',
        name: 'dashboard',
        component: DashboardView,
        meta: {
            requiresAuth: true,
            title: 'Главная',
            hideHeader: false
        }
    },
    {
        path: '/auth',
        name: 'auth',
        component: AuthView,
        meta: {
            guestOnly: true,
            title: 'Авторизация',
            hideHeader: true
        }
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: NotFoundView,
        meta: {
            title: 'Страница не найдена',
            hideHeader: true
        }
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) {
            return savedPosition
        }
        return { top: 0, behavior: 'smooth' }
    }
})

router.beforeEach(async (to, from) => {
    const authStore = useAuthStore()

    try {
        // Инициализация хранилища при первом переходе
        if (authStore.isLoading) {
            await authStore.initialize()
        }

        // Установка динамического заголовка
        document.title = to.meta.title
            ? `${to.meta.title} | Restaurant System`
            : 'Restaurant System'

        // Проверка защищенных маршрутов
        if (to.meta.requiresAuth) {
            if (!authStore.user) {
                authStore.setRedirectPath(to.fullPath)
                return {
                    name: 'auth',
                    query: { redirect: to.fullPath }
                }
            }
        }

        // Проверка маршрутов только для гостей
        if (to.meta.guestOnly) {
            if (authStore.user) {
                const redirectPath = authStore.redirectPath || '/'
                authStore.clearRedirectPath()
                return { path: redirectPath }
            }
        }

    } catch (error) {
        console.error('Navigation error:', error)
        return { name: 'auth' }
    }
})

// Очистка состояния после навигации
router.afterEach((to) => {
    const authStore = useAuthStore()
    if (to.name !== 'auth' && !to.meta.requiresAuth) {
        authStore.clearRedirectPath()
    }
})

export default router