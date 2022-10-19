<template>
  <div class="m-auto min-w-fit sm:w-2/3 lg:w-1/2">
    <div id="container">
      <div id="signup">
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













    -----------------------------------------
<!--<template>-->
<!--&lt;!&ndash;  <div id="container">&ndash;&gt;-->
<!--    <div class="m-auto min-w-fit sm:w-2/3 lg:w-1/2">-->

<!--        <img alt="logo" class="logo items-center m-auto " src="@/assets/logo.jpg" width="125" height="125" />-->
<!--        <h1 class="text-3xl">Welcome!!</h1>-->
<!--        <h1 class="m-4"> JARVIS RESTAURANT</h1>-->

<!--        <div v-if="error">-->
<!--          {{ error }}-->
<!--        </div>-->
<!--          <div class="signup">-->
<!--        <form @submit.prevent="onFormSubmit()">-->
<!--            <label>Username</label>-->
<!--            <input type="email" v-model="email" placeholder="Email"  required autocomplete="off" class="rounded-lg">-->
<!--            <label>Password</label>-->
<!--            <input type="password" placeholder="Password" v-model="password" required class="rounded-lg">-->


<!--          <button type="submit" :disabled="disabledButton"-->
<!--                  class="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"-->
<!--                  :class="disabledButton ? 'cursor-not-allowed bg-blue-200 dark:bg-blue-200': 'bg-blue-700 dark:bg-blue-500'"-->
<!--          >-->
<!--            LOGIN-->
<!--          </button>-->
<!--        </form>-->
<!--    </div>-->
<!--    </div>-->
<!--&lt;!&ndash;  </div>&ndash;&gt;-->
<!--&lt;!&ndash;  </div>&ndash;&gt;-->
<!--</template>-->

<!--<script>-->
<!--import { useAuthStore } from '@/stores/auth.js'-->

<!--export default {-->
<!--  setup() {-->
<!--    const auth_store = useAuthStore()-->
<!--    return { auth_store }-->
<!--  },-->
<!--  data() {-->
<!--    return {-->
<!--      email: '',-->
<!--      password: '',-->
<!--      error: null,-->
<!--      disabledButton: false-->
<!--    }-->
<!--  },-->
<!--  methods: {-->
<!--    async onFormSubmit() {-->
<!--      this.error = null-->
<!--      this.disabledButton = true-->
<!--      try {-->
<!--        if (await this.auth_store.login(this.email, this.password)) {-->
<!--          this.$router.push('/')-->
<!--        } else {-->
<!--          this.disabledButton = false-->
<!--        }-->
<!--      } catch (error) {-->
<!--        this.error = error.message-->
<!--        this.disabledButton = false-->
<!--      }-->
<!--    }-->
<!--  },-->
<!--}-->
<!--</script>-->

<!--<style scoped>-->
<!--/*#container{*/-->
<!--/*  background-color: #222222;*/-->
<!--/*  !*width: 760px;*!*/-->
<!--/*  !*height: 100vh;*!*/-->
<!--/*  margin: 0 auto;*/-->
<!--/*  text-align: center;*/-->
<!--/*  !*padding: 3rem;*!*/-->
<!--/*  display: flex;*/-->
<!--/*  justify-content: center;*/-->
<!--/*  align-items: center;*/-->
<!--/*}*/-->
<!--  /*button{*/-->
<!--  /*  width: 30%;*/-->
<!--  /*  height: 40px;*/-->
<!--  /*  margin: 10px auto;*/-->
<!--  /*  float: right;*/-->
<!--  /*  display: block;*/-->
<!--  /*  color: #fff;*/-->
<!--  /*  !*background: #1B3FC8;*!*/-->
<!--  /*  border-radius: 5px;*/-->
<!--  /*}*/-->
<!--  /*button:hover{*/-->
<!--  /*  background: #003BAF;*/-->
<!--  /*}*/-->
<!--  /*label{*/-->
<!--  /*  display: flex;*/-->
<!--  /*  cursor: pointer;*/-->
<!--  /*  transition: .5s ease-in-out;*/-->
<!--  /*}*/-->
<!--  .signup{-->
<!--    justify-content: center;-->
<!--    height: 50px;-->
<!--    width: 300px;-->
<!--    display: flex;-->
<!--    margin: 10px auto;-->
<!--    padding: 10px;-->
<!--    border-color: #B4B5B7;-->
<!--  }-->
<!--</style>-->
