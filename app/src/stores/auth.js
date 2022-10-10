import { defineStore } from 'pinia'
import { authAPI } from '@/services/api'

const auth_storage = {
    email: localStorage.getItem('auth.email')
}

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => {
        return {
            auth: {
                email: auth_storage.email
            }
        }
    },

    getters: {
        getAuth: (state) => state.auth,

        getEmail: (state) => state.auth.email,

        isAuthen (state) {
            return state.auth.email != null
        }
    },

    actions: {
        async login (email, password) {
            if (await authAPI.login(email, password)) {
                this.fetch()
                return true
            }
            return false
        },

        async fetch () {
            this.auth = await authAPI.me()
            localStorage.setItem('auth.email', this.auth.email)
        },

        logout () {
            authAPI.logout()
            localStorage.removeItem('auth.email')
            this.auth = {
                email: null,
            }
        }
    }
})