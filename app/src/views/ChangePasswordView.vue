<template>
    <h1>เปลี่ยนรหัสผ่าน</h1>
    <div>
        <label for="">รหัสผ่านปัจจุบัน : </label>
        <input type="text" v-model="this.oldPassword">
    </div>

    <div>
        <label for="">รหัสผ่านใหม่ : </label>
        <input type="text" v-model="this.newPassword">
    </div>

    <div>
        <label for="">ยืนยันรหัสผ่านใหม่ : </label>
        <input type="text" v-model="this.confirmNewPassword">
    </div>

    <button v-on:click="handleChangePassword" :disabled="isChangingPassword">เปลี่ยนรหัสผ่าน</button>
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