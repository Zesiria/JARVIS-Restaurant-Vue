<template>
  <div class="m-auto min-w-fit sm:w-2/3 lg:w-1/2">
    <div id="container">
      <div id="signup">
        <div class="float-left">
          <button onclick="history.back()">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m12 20-8-8 8-8 1.425 1.4-5.6 5.6H20v2H7.825l5.6 5.6Z"/></svg>
          </button>
        </div>
        <div class="m-8">
      <img alt="logo" class="logo items-center m-auto " src="@/assets/logo.jpg" width="125" height="125" />
      <h1 class="text-3xl text-center">Welcome!!</h1>
      <h1 class="m-4 text-center"> JARVIS RESTAURANT</h1>
        <div v-if="error">
          {{ error }}
        </div>
      <form @submit.prevent="onFormSubmit()">
        <div>
          <label>Username</label>
          <input type="email" v-model="email" placeholder="Email" required autocomplete="off" class="rounded-lg">
        </div>

        <div>
          <label>Password</label>
          <input type="password" v-model="password" placeholder="Password" required class="rounded-lg">
        </div>

        <button type="submit" :disabled="disabledButton"
                class="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                :class="disabledButton ? 'cursor-not-allowed bg-blue-200 dark:bg-blue-200': 'bg-blue-600 dark:bg-blue-500'"
        >
          Login
        </button>
      </form>
      </div>
      </div>
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
          console.log(this.auth_store.getRole)
          if(this.auth_store.getRole === 'Waiter'){
            this.$router.push('/waiter/home').then(() => { this.$router.go() })
          }
          if(this.auth_store.getRole === 'Chef'){
            this.$router.push('/chef/kitchen').then(() => { this.$router.go() })
          }
          if(this.auth_store.getRole === 'Manager'){
            this.$router.push('/manager').then(() => { this.$router.go() })
          }
          if(this.auth_store.getRole === 'customer'){
            this.$router.push('/foods').then(() => { this.$router.go() })
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

<style scoped>
#container{
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
button{
  margin: 15px auto ;
  color: #fff;
  float: right;
  border-radius: 5px;
}
input{
  width: 250px;
  display: flex;
  margin: 10px auto;
  padding: 10px;
  border-color: #B4B5B7;
}
</style>