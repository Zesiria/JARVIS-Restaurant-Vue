<template>
  <div class="m-8">
    <div class="m-auto min-w-fit sm:w-2/3 lg:w-1/2">
      <div class="flex justify-between">
        <button onclick="history.back()">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m12 20-8-8 8-8 1.425 1.4-5.6 5.6H20v2H7.825l5.6 5.6Z"/></svg>
        </button>
        <HamburgerMenu></HamburgerMenu>
      </div>
      <h1 class="title-page">พนักงานทั้งหมด</h1>
      <div class=" mt-4 flex justify-center">
          <button class="flex mt-2 gap-2  bg-gray-300 border-b-4 border-gray-700 focus:outline-none hover:bg-gray-200 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700" v-on:click="openAddPopup">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M18 14v-3h-3V9h3V6h2v3h3v2h-3v3Zm-9-2q-1.65 0-2.825-1.175Q5 9.65 5 8q0-1.65 1.175-2.825Q7.35 4 9 4q1.65 0 2.825 1.175Q13 6.35 13 8q0 1.65-1.175 2.825Q10.65 12 9 12Zm-8 8v-2.8q0-.85.438-1.563.437-.712 1.162-1.087 1.55-.775 3.15-1.163Q7.35 13 9 13t3.25.387q1.6.388 3.15 1.163.725.375 1.162 1.087Q17 16.35 17 17.2V20Zm2-2h12v-.8q0-.275-.137-.5-.138-.225-.363-.35-1.35-.675-2.725-1.013Q10.4 15 9 15t-2.775.337Q4.85 15.675 3.5 16.35q-.225.125-.362.35-.138.225-.138.5Zm6-8q.825 0 1.413-.588Q11 8.825 11 8t-.587-1.412Q9.825 6 9 6q-.825 0-1.412.588Q7 7.175 7 8t.588 1.412Q8.175 10 9 10Zm0-2Zm0 10Z"/></svg>
            เพิ่มบัญชีผู้ใช้งาน
          </button>
      </div>
      <div class="mt-10 overflow-x-auto relative shadow-md sm:rounded-lg">
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
                      <td v-if="user.role != 'Manager'" class="py-4 px-6 text-right">
                          <a href="#" class="font-medium text-blue-600 dark:text-blue-500 hover:underline" v-on:click="openDeletePopup(user)">ปิดการใช้งาน</a>
                      </td>
                  </tr>
              </tbody>
          </table>
      </div>
    </div>
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
        <div class="mt-2">
            <label for="">Name</label>
            <input type="text" v-model="this.addedUser.name" class="ml-3 rounded-lg">
        </div>
        <div class="mt-2">
            <label for="">Email</label>
            <input type="text" v-model="this.addedUser.email" class="ml-3 rounded-lg">
        </div>
        <div class="mt-2">
            <label for="">Role</label>
            <select class="ml-3 rounded-lg" v-model="this.addedUser.role">
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
import HamburgerMenu from "@/components/HamburgerMenu.vue";

export default {
    components:{
        Popup,
        HamburgerMenu
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