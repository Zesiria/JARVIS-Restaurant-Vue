<template>
  <div class="container">
    <div class="signup">
        <img alt="logo" class="logo items-center m-auto " src="@/assets/logo.jpg" width="125" height="125" />
        <h1 class="text-3xl">Welcome!!</h1>
        <h1 class="m-4"> JARVIS RESTAURANT</h1>

        <div v-if="error">
          {{ error }}
        </div>

        <form @submit.prevent="onFormSubmit()">
            <label>Username</label>
            <input type="email" v-model="email" placeholder="Email"  required autocomplete="off" class="rounded-lg">
            <label>Password</label>
            <input type="password" placeholder="Password" v-model="password" required class="rounded-lg">


          <button type="submit" :disabled="disabledButton"
                  class="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  :class="disabledButton ? 'cursor-not-allowed bg-blue-200 dark:bg-blue-200': 'bg-blue-700 dark:bg-blue-500'"
          >
            LOGIN
          </button>
        </form>
    </div>
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

<style scoped>
.container{
  width: 100%;
  height: 100vh;
  margin: 0 auto;
  text-align: center;
  padding: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
  button{
    width: 30%;
    height: 40px;
    margin: 10px auto;
    float: right;
    display: block;
    color: #fff;
    background: #1B3FC8;
    border-radius: 5px;
  }
  button:hover{
    background: #003BAF;
  }
  label{
    display: flex;
    cursor: pointer;
    transition: .5s ease-in-out;
  }
  input{
    justify-content: center;
    height: 50px;
    width: 300px;
    display: flex;
    margin: 10px auto;
    padding: 10px;
    border-color: #B4B5B7;

  }
</style>
