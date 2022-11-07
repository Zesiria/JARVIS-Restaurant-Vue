<template>
  <div class="m-8">
    <div class="m-auto min-w-fit sm:w-2/3 lg:w-1/2">
      <div class="flex justify-between">
        <button onclick="history.back()">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m12 20-8-8 8-8 1.425 1.4-5.6 5.6H20v2H7.825l5.6 5.6Z"/></svg>
        </button>

        <div  v-if="this.auth_store.getRole == 'Waiter'" id="button-dropdown" class="dropdown">
          <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M3 18v-2h18v2Zm0-5v-2h18v2Zm0-5V6h18v2Z"/></svg>          </button>
          <ul class="dropdown-menu">
            <RouterLink to="/waiter/foods"><li><a class="dropdown-item">เมนูอาหาร</a></li></RouterLink>
            <RouterLink to="/users/change-password"><li><a class="dropdown-item">เปลี่ยนรหัสผ่าน</a></li></RouterLink>
          </ul>
        </div>
        <div  v-if="this.auth_store.getRole == 'Manager'" id="button-dropdown" class="dropdown">
          <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M3 18v-2h18v2Zm0-5v-2h18v2Zm0-5V6h18v2Z"/></svg>          </button>
          <ul class="dropdown-menu">
            <RouterLink to="/waiter/foods"><li><a class="dropdown-item">เมนูอาหาร</a></li></RouterLink>
            <RouterLink to="/manager/bill/check"><li><a class="dropdown-item">เช็คบิล</a></li></RouterLink>
            <RouterLink to="/foods"><li><a class="dropdown-item">ตรวจสอบรายการอาหาร</a></li></RouterLink>
            <RouterLink to="/foods/new"><li><a class="dropdown-item">เพิ่มรายการอาหาร</a></li></RouterLink>
            <RouterLink to="/manager/report"><li><a class="dropdown-item">รายงานการขายทั้งหมด</a></li></RouterLink>
            <RouterLink to="/manager/tables"><li><a class="dropdown-item">รายการโต๊ะทั้งหมด</a></li></RouterLink>
            <RouterLink to="/manager/users"><li><a class="dropdown-item">พนักงานทั้งหมด</a></li></RouterLink>
            <RouterLink to="/users/change-password"><li><a class="dropdown-item">เปลี่ยนรหัสผ่าน</a></li></RouterLink>
          </ul>
        </div>

        <div  v-if="this.auth_store.getRole == 'Chef'" id="button-dropdown" class="dropdown">
          <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M3 18v-2h18v2Zm0-5v-2h18v2Zm0-5V6h18v2Z"/></svg>          </button>
          <ul class="dropdown-menu">
            <RouterLink to="/chef/kitchen"><li><a class="dropdown-item">หน้าหลัก</a></li></RouterLink>
            <RouterLink to="/users/change-password"><li><a class="dropdown-item">เปลี่ยนรหัสผ่าน</a></li></RouterLink>
          </ul>
        </div>
      </div>
      <h1 class="title-page">เปลี่ยนรหัสผ่าน</h1>
      <div class="bg-gray-100 shadow-md rounded-lg m-10">
        <div class="p-8 flex flex-col justify-center items-center">
          <div class="flex flex-col">
              <label for="">รหัสผ่านปัจจุบัน</label>
              <input type="password" v-model="this.oldPassword" class="rounded-lg">
          </div>

          <div class="mt-2 flex flex-col">
              <label for="">รหัสผ่านใหม่</label>
              <input type="password" v-model="this.newPassword" class="rounded-lg">
          </div>

          <div class="mt-2 flex flex-col">
              <label for="">ยืนยันรหัสผ่านใหม่</label>
              <input type="password" v-model="this.confirmNewPassword" class="rounded-lg">
          </div>
          <div class="mt-4 flex flex-col">
          <button v-on:click="handleChangePassword" :disabled="isChangingPassword" class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">เปลี่ยนรหัสผ่าน</button>
          </div>
        </div>
  </div>
    </div>
    </div>
</template>

<script>
import { useUserStore } from "@/stores/user.js"
import { useAuthStore } from "@/stores/auth.js"

export default{
    setup(){
        const user_store = useUserStore()
        const auth_store = useAuthStore()
        return { user_store,auth_store }
    },
    async mounted(){
        await this.user_store.fetch()
        await this.auth_store.fetch()
    },
    data(){
        return {
            oldPassword:"",
            newPassword:"",
            confirmNewPassword:"",
            isChangingPassword: false
        }
    },
    methods:{
        async handleChangePassword(){
            if(this.oldPassword == ""){
                this.error = "กรุณากรอก รหัสผ่านเก่า"
                return
            }
            else if(this.newPassword == ""){
                this.error = "กรุณากรอก รหัสผ่านใหม่"
                return
            }
            else if(this.confirmNewPassword == ""){
                this.error = "กรุณากรอก ยืนยันรหัสผ่านใหม่"
                return
            }
            else if(this.newPassword != this.confirmNewPassword){
                this.error = "รหัสผ่านใหม่ และยืนยันรหัสผ่านใหม่ไม่ตรงกัน"
                return                
            }
            else{
                this.isChangingPassword = true
                const response = await this.user_store.changePassword({
                    "email" : this.auth_store.getEmail,
                    'old_password' : this.oldPassword,
                    'new_password' : this.newPassword
                })
                console.log(response)
                this.isChangingPassword = false
            }
        }
    }
}
</script>