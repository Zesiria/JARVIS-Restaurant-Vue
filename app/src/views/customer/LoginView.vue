<template>
  <div class="m-8">
    <h1 class="text-3xl">Login</h1>

    <div v-if="error">
      {{ error }}
    </div>

    <form @submit.prevent="onFormSubmit()">
      <div>
        <label>Email</label>
        <input type="text" v-model="code" required autocomplete="off">
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
      code: '',
      error: null,
      disabledButton: false
    }
  },
  methods: {
    async onFormSubmit() {
      this.error = null
      this.disabledButton = true
      try {
        if (await this.auth_store.customerLogin(this.code)) {
          this.$router.push('/')
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