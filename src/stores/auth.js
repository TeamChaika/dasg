import { defineStore } from 'pinia'
import { supabase } from '@/services/supabase'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        isLoading: true,
        redirectPath: null
    }),

    actions: {
        /**
         * Инициализация хранилища и проверка текущей сессии
         */
        async initialize() {
            try {
                // Получаем текущую сессию из Supabase
                const { data: { session }, error } = await supabase.auth.getSession()

                if (error) throw error
                this.user = session?.user || null
            } catch (error) {
                console.error('Auth initialization error:', error)
                this.user = null
            } finally {
                this.isLoading = false
            }

            // Настраиваем слушатель изменений статуса аутентификации
            this.setupAuthListener()
        },

        /**
         * Настройка слушателя изменений статуса аутентификации
         */
        setupAuthListener() {
            supabase.auth.onAuthStateChange((event, session) => {
                console.log('Auth state changed:', event)
                this.user = session?.user || null
            })
        },

        /**
         * Авторизация по email и паролю
         * @param {string} email
         * @param {string} password
         */
        async signIn(email, password) {
            try {
                const { data, error } = await supabase.auth.signInWithPassword({
                    email,
                    password
                })

                if (error) throw error
                this.user = data.user
                return true
            } catch (error) {
                console.error('Sign in error:', error)
                throw error
            }
        },

        /**
         * Выход из системы
         */
        async signOut() {
            try {
                const { error } = await supabase.auth.signOut()
                if (error) throw error
                this.user = null
                this.redirectPath = null
                return true // Успешный выход
            } catch (error) {
                console.error('Sign out error:', error)
                throw error // Пробрасываем ошибку для обработки в компоненте
            }
        },

        /**
         * Сохранение пути для редиректа после авторизации
         * @param {string} path
         */
        setRedirectPath(path) {
            if (this.isValidRedirect(path)) {
                this.redirectPath = path
            } else {
                this.redirectPath = '/'
            }
        },

        /**
         * Очистка сохраненного пути редиректа
         * @returns {string} Сохраненный путь
         */
        clearRedirectPath() {
            const path = this.redirectPath || '/'
            this.redirectPath = null
            return path
        },

        /**
         * Валидация пути редиректа
         * @param {string} path
         * @returns {boolean}
         */
        isValidRedirect(path) {
            try {
                if (!path) return false
                const url = new URL(path, window.location.origin)
                return url.origin === window.location.origin
            } catch {
                return false
            }
        }
    },

    getters: {
        /**
         * Проверка авторизации пользователя
         * @returns {boolean}
         */
        isAuthenticated: (state) => !!state.user,

        /**
         * Получение email пользователя
         * @returns {string|null}
         */
        userEmail: (state) => state.user?.email || null
    }

})