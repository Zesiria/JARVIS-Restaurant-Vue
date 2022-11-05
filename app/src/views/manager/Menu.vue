<template>
  <div  id="container">
    <div class="flex flex-col text-2xl text-center my-4">
        <div>
          <button @click="checkBill">เช็คบิล</button>
        </div>
        <div>
            <button @click="allFood">ตรวจสอบรายการอาหาร</button>
        </div>
        <div>
            <button @click="addFood">เพิ่มรายการอาหาร</button>
        </div>
        <div>
        </div>
        <div>
            <button @click="reportView" class="px-10">รายงานการขายทั้งหมด</button>
        </div>
        <div>
            <button @click="manageTable">รายการโต๊ะทั้งหมด</button>
        </div>
        <div>
            <button @click="checkUser">พนักงานทั้งหมด</button>
        </div>
        <div>
            <button @click="changePassword">เปลี่ยนรหัสผ่าน</button>
        </div>
    </div>
  </div>

</template>

<script>
import {useAuthStore} from "@/stores/auth";

export default {
  setup() {
    const auth_store = useAuthStore()
    return { auth_store }
  },
  data() {
    return {
      auth: null,

    }
  }, async mounted() {
    this.auth = this.auth_store.getAuth
    if (this.auth_store.isAuthen) {
      this.auth = this.auth_store.getAuth
    } else {
      this.auth = null
    }
  },
  auth_store: {
    immediate: true,
    deep: true,
    handler(newValue, oldValue) {
      console.log(newValue.getAuth)
      this.auth = this.auth_store.getAuth
    }
  },
  methods : {
    allFood(){
      this.$router.push(`foods`)
    },
    addFood(){
      this.$router.push(`foods/new`)
    },
    manageTable(){
      this.$router.push(`/manager/tables`)
    },
    reportView(){
      this.$router.push(`/manager/report`)
    },
    checkBill(){
      this.$router.push(`/manager/bill/check`)
    },
    checkUser(){
      this.$router.push(`/manager/users`)
    },
    changePassword(){
      this.$router.push('/users/change-password')
    }
  }
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
  background-color: #1554F6;
  border-radius: 20px;
  color: #FFFFFF;
  width: 300px;
  font-size: 20px;
  font-weight: 600;
  padding: 5px;
  margin: 10px;
}
</style>