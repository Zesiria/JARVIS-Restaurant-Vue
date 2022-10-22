import { defineStore } from 'pinia'
import { authAPI } from '@/services/api'

const auth_storage = {
    email: localStorage.getItem('auth.email'),
    role: localStorage.getItem('auth.role'),
    code: localStorage.getItem('auth.code'),
    customer_id: localStorage.getItem('auth.id')
}

export const useAuthStore = defineStore({
    id: 'auth',
    state: () => {
        return {
            auth: {
                email: auth_storage.email,
                role: auth_storage.role,
                code: auth_storage.code,
                customer_id: auth_storage.customer_id,
            }
        }
    },

    getters: {
        getAuth: (state) => state.auth,

        getEmail: (state) => state.auth.email,

        getCode: (state) => state.auth.code,

        getRole: (state) => state.auth.role,

        isAuthen (state) {
            return (state.auth.email != null || state.auth.code != null)
        },

    },

    actions: {
        async login (email, password) {
            if (await authAPI.login(email, password)) {
                this.fetch()
                return true
            }
            return false
        },

        async customerLogin (code) {
            if (await authAPI.customerLogin(code)) {
                this.customerFetch()
                return true
            }
            return false
        },

        async fetch () {
            this.auth = await authAPI.me()
            localStorage.setItem('auth.email', this.auth.email)
            localStorage.setItem('auth.role', this.auth.role)
            localStorage.setItem('auth.code', "")
            localStorage.setItem('auth.id', "")
        },

        async customerFetch() {
            this.auth = await authAPI.customerMe()
            localStorage.setItem('auth.email', "")
            localStorage.setItem('auth.role', "customer")
            localStorage.setItem('auth.code', this.auth.code)
            localStorage.setItem('auth.id', this.auth.id)
        },

        logout () {
            authAPI.logout()
            localStorage.removeItem('auth.email')
            localStorage.removeItem('auth.role')
            localStorage.removeItem('auth.code')
            this.auth = {
                email: null,
            }
        }
    }
})