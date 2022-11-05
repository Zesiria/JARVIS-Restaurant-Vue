<template>
<div>
    <p>พนักงานทั้งหมด</p>
</div>

<button class="bg-blue-300" v-on:click="openAddPopup">เพิ่มบัญชีผู้ใช้งาน</button>

<div class="overflow-x-auto relative shadow-md sm:rounded-lg">
    <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" class="py-3 px-6">
                    ID
                </th>
                <th scope="col" class="py-3 px-6">
                    Name
                </th>
                <th scope="col" class="py-3 px-6">
                    Email
                </th>
                <th scope="col" class="py-3 px-6">
                    Role
                </th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="user in users" class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    {{user.id}}
                </th>
                <td class="py-4 px-6">
                    {{user.name}}
                </td>
                <td class="py-4 px-6">
                    {{user.email}}
                </td>
                <td class="py-4 px-6">
                    {{user.role}}
                </td>
                <td class="py-4 px-6 text-right">
                    <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" v-on:click="openDeletePopup(user)">ปิดการใช้งาน</a>
                </td>
            </tr>
        </tbody>
    </table>
</div>

<Popup :open="isDeletePopup">
    <template v-slot:header>
        ปิดการใช้งานบัญชีของ {{ this.selectedUser.name }}
    </template>

    <template v-slot:content>
        <div class="flex flex-col py-2">
            <p>การกระทำดังกล่าวจะทำให้บัญชีของ {{ this.selectedUser.name }} ถูกลบออกจากระบบโดยถาวร</p>
        </div>
    </template>

    <template v-slot:footer>
        <button data-modal-toggle="defaultModal" :disabled="this.disableButton" type="button" @click="handleSubmitDelete" class="text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          ยืนยัน
        </button>
        <button data-modal-toggle="defaultModal" :disabled="this.disableButton" type="button" @click="closeDeletePopup" class="text-blue-700 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-gray-50 dark:focus:ring-blue-800">
          ปิด
        </button>
    </template>
</Popup>

<Popup :open="isAddPopup">
    <template v-slot:header>
        เพิ่มบัญชีผู้ใช้งาน
    </template>

    <template v-slot:content>
        <div>
            <label for="">Name</label>
            <input type="text" v-model="this.addedUser.name">
        </div>
        <div>
            <label for="">Email</label>
            <input type="text" v-model="this.addedUser.email">
        </div>
        <div>
            <label for="">Role</label>
            <select class="rounded-lg" v-model="this.addedUser.role">
                <option>Waiter</option>
                <option>Chef</option>
            </select>
        </div>
    </template>

    <template v-slot:footer>
        <button data-modal-toggle="defaultModal" :disabled="this.disableButton" type="button" @click="handleSubmitAdd" class="text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          ยืนยัน
        </button>
        <button data-modal-toggle="defaultModal" :disabled="this.disableButton" type="button" @click="closeAddPopup" class="text-blue-700 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-gray-50 dark:focus:ring-blue-800">
          ปิด
        </button>
    </template>
</Popup>

<Popup :open="isErrorPopup">
    <template v-slot:header>
        ข้อผิดพลาด
    </template>

    <template v-slot:content>
        <p> {{ this.error }} </p>
    </template>

    <template v-slot:footer>
        <button data-modal-toggle="defaultModal" :disabled="this.disableButton" type="button" @click="closeErrorPopup" class="text-blue-700 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-gray-50 dark:focus:ring-blue-800">
          ปิด
        </button>
    </template>
</Popup>

<Popup :open="isAddDetailPopup">
    <template v-slot:header>
        สร้างสำเร็จ
    </template>

    <template v-slot:content>
        <p>อีเมล : {{ this.response.email }}</p>
        <p>ชื่อ : {{ this.response.name }}</p>
        <p>ตำแหน่ง : {{ this.response.role }}</p>
        <p>รหัสผ่าน : {{ this.response.password }}</p>
    </template>

    <template v-slot:footer>
        <button data-modal-toggle="defaultModal" :disabled="this.disableButton" type="button" @click="closeAddDetailPopup" class="text-blue-700 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-gray-50 dark:focus:ring-blue-800">
            ปิด
        </button>
    </template>
</Popup>
</template>

<script>
import { useUserStore } from "@/stores/user.js"
import { useAuthStore } from "@/stores/auth.js"
import Popup from "@/components/foods/Popup.vue"

export default {
    components:{
        Popup,
    },
    setup() {
        const user_store = useUserStore()
        const auth_store = useAuthStore()

        return {user_store, auth_store}
    }, 
    data(){
        return {
            users: [],
            isDeletePopup: false,
            isAddPopup: false,
            isAddDetailPopup: false,
            selectedUser: {
                id : null,
                name : ""
            },
            addedUser: {
                name : "",
                email: "",
                role: ""
            },
            error: "",
            isErrorPopup: false,
            disableButton: false,
            response: {
                email: "",
                name: "",
                role: "",
                password: ""
            }
        }
    },
    async mounted(){
        await this.user_store.fetch()
        this.users = this.user_store.getUsers
        this.isAlertSuccessOpen = true
    },
    methods:{
        openDeletePopup(user){
            this.selectedUser = user
            this.isDeletePopup = true
        },
        closeDeletePopup(){
            this.selectedUser = {
                id : null,
                name : ""
            }
            this.isDeletePopup = false
        },
        openErrorPopup(){
            this.isErrorPopup = true
        },
        closeErrorPopup(){
            this.isErrorPopup = false
        },
        openAddPopup(){
            this.isAddPopup = true
        },
        closeAddPopup(){
            this.isAddPopup = false
        },
        openAddDetailPopup(){
            this.isAddDetailPopup = true
        },
        closeAddDetailPopup(){
            this.isAddDetailPopup = false
        },
        async handleSubmitDelete(){
            this.disableButton = true
            this.error = null
            try{
                await this.user_store.delete(this.selectedUser.id)
                await this.user_store.fetch()
                this.users = this.user_store.getUsers
                this.closeDeletePopup()
            } catch (error){
                this.error = error
                this.openErrorPopup()
            }
            this.disableButton = false
        },
        async handleSubmitAdd(){
            this.disableButton = true
            this.error = null
            if(this.addedUser.name == ""){
                this.error = "กรุณาใส่ชื่อของพนักงาน"
                this.openErrorPopup()
            }
            else if(this.addedUser.email == ""){
                this.error = "กรุณาใส่อีเมลของพนักงาน"
                this.openErrorPopup()
            } else if(this.addedUser.role == ""){
                this.error = "กรุณาระบุตำแหน่งของพนักงาน"
                this.openErrorPopup()
            }
            else{
                try{
                    const response = await this.user_store.add(this.addedUser)
                    this.response = response
                    await this.user_store.fetch()
                    this.users = this.user_store.getUsers
                    this.closeAddPopup()
                    this.openAddDetailPopup()
                } catch (error){
                    this.error = error
                    this.openErrorPopup()
                }
                this.disableButton = false
            }
        }
    }
}
</script>