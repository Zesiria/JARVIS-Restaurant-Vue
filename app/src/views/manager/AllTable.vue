<template>
  <div class="m-8">
    <div class="m-auto min-w-fit sm:w-2/3 lg:w-1/2">
      <h1 class="text-3xl">รายการโต๊ะทั้งหมด</h1>
      <div class="text-center mt-4">
        <button class=" mt-2 text-center bg-blue-700 hover:bg-blue-800 text-white font-bold py-2 px-5 border-b-4 border-blue-800 hover:border-blue-500 rounded" @click="openAddTablePopup">เพิ่มโต๊ะ</button>
      </div>
      <div id="grid">
      <div v-for="table in tables" >
          <div class="rounded m-2 text-center" @click="openTableDetailPopup(table)" id="table-list">
              <p class="font-bold">โต๊ะที่ {{ table.id }}</p>
              <p>จำนวนคนสูงสุด {{ table.size }}</p>
              <p v-if="table.status === 1" class="bg-green-500  text-white text-center">ว่าง</p>
              <p v-else class="bg-red-500 text-white text-center">ไม่ว่าง</p>
          </div>
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
          <p v-if="this.selectedTable.status === 1">รหัส : ไม่มี</p>
          <p v-else>รหัส : {{ this.customer.code }}</p>
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
          <button data-modal-toggle="defaultModal" type="button" @click="closeNumberPeopleInputPopup" class="text-blue-700 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-gray-50 dark:focus:ring-blue-800">
            ปิด
          </button>
        </template>
      </Popup>
    </div>
  </div>
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
        customer: {
          id: null,
          number_people: null,
          code: null,
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
    await this.customer_store.fetch()
    this.tables = this.table_store.getTables
    this.isAddTablePopupOpen = ref(false)
    this.isTableDetailOpen = ref(false)
    this.isNumberPeopleInputOpen = ref(false)
  }, methods:{
    AddTable(){
        this.$router.push('tables/new')
    },
    openAddTablePopup(){
      this.table.size = 1;
      this.isAddTablePopupOpen = true;
    },
    openTableDetailPopup(table){
      this.selectedTable = table
      if(this.selectedTable.status === 0)
        this.customer = this.customer_store.getByID(this.selectedTable.customer_id)
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
      this.tables = this.table_store.getTables
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
            'customer_id' : res
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

<style scoped>
#grid{
margin: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}

#table-list{
  background-color: #EFEFEF;
  border-color: #D0CFCF;
  border-width: 2px;
  margin: 5px;
  padding: 10px;
}
@media (max-width: 455px) {
  #grid {
    display: grid;
    grid-template-columns: 1fr 1fr ;
  }
  #table-list{
    font-size: 14px;

  }
}
</style>