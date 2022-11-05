<template>
  <div class="m-auto min-w-fit sm:w-2/3 lg:w-1/2">
    <div id="container">
      <div id="signup">
        <div class="m-8">
          <img alt="logo" class="logo items-center m-auto " src="@/assets/logo.jpg" width="125" height="125" />
          <h1 class="text-3xl">Welcome!!</h1>
          <h1 class="m-4"> JARVIS RESTAURANT</h1>
    <h1 class="text text-center m-8">โปรดเข้าสู่ระบบก่อนสั่งอาหาร</h1>
      <form @submit.prevent="onFormSubmit()">
        <div>
          <label class="flex">รหัสโต๊ะ</label>
          <input type="text" v-model="code" placeholder="ตัวอักษร 6 หลัก " required class="rounded-lg" autocomplete="off" >
        </div>
        <div class="text-red-400 " v-if="error">
          {{ error }}
        </div>
        <button type="submit" :disabled="disabledButton"
                class="text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                :class="disabledButton ? 'cursor-not-allowed bg-blue-200 dark:bg-blue-200': 'bg-blue-600 dark:bg-blue-500'"
        >
          เข้าสู่ระบบ
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
      code: '',
      error: null,
      disabledButton: false
    }
  },
  methods: {
    async onFormSubmit() {
      this.error = null
      if(this.validateCode()){
        this.error = null
        this.disabledButton = true
        try {
          if (await this.auth_store.customerLogin(this.code)) {
            this.$router.push('/foods').then(() => { this.$router.go() })
          } else {
            this.disabledButton = false
          }
        } catch (error) {
          // this.error = error.message
          this.error = "รหัสโต๊ะไม่ถูกต้อง"
          this.disabledButton = false
        }
      }
    },
    validateCode(){
      if(this.code){
        if(this.code.length == 6){
          return true
        }
        this.error = "รหัสโต๊ะมีความยาวไม่ถูกต้อง"
        return false
      }
      this.error = "กรุณาใส่รหัสโต๊ะ"
      return false
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

  text-align: center;
  margin: 15px auto ;
}
#signup {
  text-align: center;
}
input{
  width: 250px;
  display: flex;
  margin: 10px auto;
  padding: 10px;
  border-color: #B4B5B7;
}
</style>
