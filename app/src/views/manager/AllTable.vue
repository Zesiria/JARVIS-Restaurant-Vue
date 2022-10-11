<template>
    <div class="flex flex-warp">
        <h1 class="text-3xl">รายการโต๊ะทั้งหมด</h1>
        <button class="text-blue-600" @click="openAddTablePopup">เพิ่มโต๊ะ</button>
    </div>
    <div v-for="table in tables">
        <div class="bg-gray-200 rounded m-2" @click="openTableDetailPopup(table)">
            <p>โต๊ะที่ {{ table.id }}</p>
            <p>จำนวนคนสูงสุด {{ table.size }}</p>
            <p v-if="table.status === 1" class="bg-green-200 border-2">สถานะ : ว่าง</p>
            <p v-else class="bg-red-200">สถานะ : ไม่ว่าง</p>
        </div>
    </div>
    <Popup :open="isAddTablePopupOpen">
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
        <button data-modal-toggle="defaultModal" type="button" @click="closeAddPopup" class="text-blue-700 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-gray-50 dark:focus:ring-blue-800">
          ปิด
        </button>
      </template>
    </Popup>

    <Popup :open="isTableDetailOpen">
      <template v-slot:header>
          โต๊ะที่ {{ this.selectedTable.id }}
      </template>

      <template v-slot:content>
        <p>จำนวนคนสูงสุด {{ this.selectedTable.size }}</p>
        <p v-if="this.selectedTable.status === 1">สถานะ : ว่าง</p>
        <p v-else>สถานะ : ไม่ว่าง</p>
        <p v-if="this.selectedTable.code === null">รหัส : ไม่มี</p>
        <p v-else>รหัส : {{ this.selectedTable.code }}</p>
      </template>

      <template v-slot:footer>
        <button v-if="this.selectedTable.status === 1" data-modal-toggle="defaultModal" type="button" @click="openNumberPeopleInputPopup" v-bind:disabled="false" class="text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          เปิดโต๊ะ
        </button>
        <button v-if="this.selectedTable.status === 0" data-modal-toggle="defaultModal" type="button" @click="checkoutTable" v-bind:disabled="false" class="text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          ปิดโต๊ะ
        </button>
        <button data-modal-toggle="defaultModal" type="button" @click="closeTablePopup" class="text-blue-700 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-gray-50 dark:focus:ring-blue-800">
          ปิด
        </button>
      </template>
    </Popup>

    <Popup :open="isNumberPeopleInputOpen">
      <template v-slot:header>
      
      </template>

      <template v-slot:content>
        <div class="flex flex-col py-2">
          <label for=""> จำนวนลูกค้า </label>
          <input type="number" v-model="numberPeople" min="1">
        </div>
      </template>

      <template v-slot:footer>
        <button data-modal-toggle="defaultModal" type="button" @click="checkinTable" v-bind:disabled="false" class="text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          ยืนยัน
        </button>
        <button data-modal-toggle="defaultModal" type="button" @click="closeTablePopup" class="text-blue-700 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-gray-50 dark:focus:ring-blue-800">
          ปิด
        </button>
      </template>
    </Popup>
</template>

<script>
import {ref} from "vue";
import { useAuthStore } from "@/stores/auth.js"
import { useTableStore} from '@/stores/table.js'
import { useCustomerStore} from '@/stores/customer.js'
import Popup from "@/components/foods/Popup.vue"

export default {
    setup() {
    const auth_store = useAuthStore()
    const table_store = useTableStore()
    const customer_store = useCustomerStore()
    return { auth_store,table_store,customer_store }
  }, data () {
    return {
        tables: [],
        table: {
          customer_id: null,
          size: 1,
          status: 0,
        },
        numberPeople: 0,
        isAddTablePopupOpen: false,
        isTableDetailOpen: false,
        isNumberPeopleInputOpen: false,
        isAddingTable: false,
        isUpdatingTable: false,
        selectedTable: [],
        response: null,
        error: ""
    }
  }, components :{
    Popup
  },
  async mounted() {
    await this.table_store.fetch()
    this.tables = this.table_store.getTables
    this.isAddTablePopupOpen = ref(false)
    this.isTableDetailOpen = ref(false)
    this.isNumberPeopleInputOpen = ref(false)
  }, methods:{
    AddTable(){
        this.$router.push('tables/new')
    }
  }, methods:{
    openAddTablePopup(){
      this.table.size = 1;
      this.isAddTablePopupOpen = true;
    },
    openTableDetailPopup(table){
      this.selectedTable = table
      console.log(this.selectedTable)
      this.isTableDetailOpen = true;
    },
    openNumberPeopleInputPopup(table){
      this.numberPeople = 1;
      this.isNumberPeopleInputOpen = true;
    }
    ,
     async handleSubmitForm(){
      this.error = ""
      this.isAddingTable = true;
      try{
        this.table_store.add(this.table)
      } catch (error){
        this.error = error.message
        console.log(this.error)
        this.isAddTablePopupOpen = false;
        this.isAddingTable = false;
      }
      
      await this.table_store.fetch()
      this.tables = this.table_store.getTables
      this.isAddTablePopupOpen = false
      this.isAddingTable = false
    },
    closeAddPopup() {
      this.isAddTablePopupOpen = false
    },
    closeTablePopup() {
      this.isTableDetailOpen = false
    },
    closeNumberPeopleInputPopup() {
      this.isNumberPeopleInputOpen = false
    },
    async checkinTable(){
      this.addNewCustomer()
    },
    async checkoutTable(){
      this.updateTable({
        'property' : 'check-out',
        'id' : this.selectedTable.id,
      })
    },
    async updateTable(table){
      this.error = ""
      this.isUpdatingTable = true
      try{
        this.table_store.update(table)
      } catch (error) {
        this.error = error.message
        console.log(this.error)
        this.isTableDetailOpen = false
        this.isAddingTable = false
      }
      await this.table_store.fetch()
      this.tables = this.table_store.getTables
      this.isTableDetailOpen = false
      this.isUpdatingTable = false
    },
    addNewCustomer(){
    this.error = ""
    try{
        this.customer_store.add({
          'number_people' : this.numberPeople
        }).then(res => {
          console.log(res)
          this.updateTable({
            'property' : 'check-in',
            'id' : this.selectedTable.id,
            'customer_id' : res.id
          })
        })
      } catch (error) {
        this.error = error.message
        console.log(this.error)
      }
      this.closeNumberPeopleInputPopup()
      this.closeTablePopup()
    }
  }
}
</script>