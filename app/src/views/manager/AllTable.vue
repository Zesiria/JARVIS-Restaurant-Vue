<template>
    <div class="flex flex-warp">
        <h1 class="text-3xl">รายการโต๊ะทั้งหมด</h1>
        <button class="text-blue-600" @click="openPopup">เพิ่มโต๊ะ</button>
    </div>
    <div v-for="table in tables">
        <div class="bg-gray-200 rounded m-2">
            <p>โต๊ะที่ {{ table.id }}</p>
            <p>จำนวนคนสูงสุด {{ table.size }}</p>
            <p>สภานะ :</p>
            <p v-if="table.customer_id === null" class="bg-green-200 border-2">ว่าง</p>
            <p v-else class="bg-red-200">ไม่ว่าง</p>
        </div>
    </div>
    <Popup :open="isOpen">
      <template v-slot:header>
          เพิ่มโต๊ะ
      </template>

      <template v-slot:content>
        <div class="flex flex-col py-2">
          <label for=""> จำนวนคนสูงสุด </label>
          <input type="number" min="1" v-model="this.table.size">
        </div>
      </template>

      <template v-slot:footer>
        <button data-modal-toggle="defaultModal" type="button" @click="handleSubmitForm" v-bind:disabled="isAddingTable" class="text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          ยืนยัน
        </button>
        <button data-modal-toggle="defaultModal" type="button" @click="close" class="text-blue-700 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-gray-50 dark:focus:ring-blue-800">
          ปิด
        </button>
      </template>
    </Popup>
</template>

<script>
import {ref} from "vue";
import { useAuthStore } from "@/stores/auth.js"
import { useTableStore} from '@/stores/table.js'
import Popup from "@/components/foods/Popup.vue"

export default {
    setup() {
    const auth_store = useAuthStore()
    const table_store = useTableStore()
    return { auth_store,table_store }
  }, data () {
    return {
        tables: [],
        table: {
          customer_id: null,
          size: 1,
          status: 0,
        },
        isOpen: false,
        isAddingTable: false,
        error: ""
    }
  }, components :{
    Popup
  },
  async mounted() {
    await this.table_store.fetch()
    this.tables = this.table_store.getTables
    this.isOpen = ref(false)
  }, methods:{
    AddTable(){
        this.$router.push('tables/new')
    }
  }, methods:{
    openPopup(){
      this.table.size = 1;
      this.isOpen = true;
    },
     async handleSubmitForm(){
      this.error = ""
      this.isAddingTable = true;
      try{
        this.table_store.add(this.table)
      } catch (error){
        this.error = error.message
        console.log(this.error)
      }
      
      await this.table_store.fetch()
      this.tables = this.table_store.getTables
      this.isOpen = false;
      this.isAddingTable = false;
    },
    close() {
      this.isOpen = false;
    }
  }
}
</script>