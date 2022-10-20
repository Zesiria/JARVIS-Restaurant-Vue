<template>
  <div class="m-8">
    <h1 class="text-3xl">Login</h1>

    <div v-if="error">
      {{ error }}
    </div>

    <form @submit.prevent="onFormSubmit()">
      <div>
        <label>Email</label>
        <input type="email" v-model="email" required autocomplete="off">
      </div>

      <div>
        <label>Password</label>
        <input type="password" v-model="password" required>
      </div>

      <button type="submit" :disabled="disabledButton"
              class="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              :class="disabledButton ? 'cursor-not-allowed bg-blue-200 dark:bg-blue-200': 'bg-blue-400 dark:bg-blue-500'"
      >
        Login
      </button>
    </form>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth.js'

export default {
  setup() {
    const auth_store = useAuthStore()
    return { auth_store }
  },
  data() {
    return {
      email: '',
      password: '',
      error: null,
      disabledButton: false
    }
  },
  methods: {
    async onFormSubmit() {
      this.error = null
      this.disabledButton = true
      try {
        if (await this.auth_store.login(this.email, this.password)) {
          await this.auth_store.fetch()
          console.log(this.auth_store.getRole)
          if(this.auth_store.getRole === 'Waiter'){
            this.$router.push('/waiter/home')
          }
          if(this.auth_store.getRole === 'Chef'){
            this.$router.push('/')
          }
          if(this.auth_store.getRole === 'Manager'){
            this.$router.push('/')
          }
        } else {
          this.disabledButton = false
        }
      } catch (error) {
        this.error = error.message
        this.disabledButton = false
      }
    }
  },
}
</script>