<template>
  <div class="m-8">
    <div class="m-auto min-w-fit sm:w-2/3 lg:w-1/2">
      <div class="flex justify-between">
        <button onclick="history.back()">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m12 20-8-8 8-8 1.425 1.4-5.6 5.6H20v2H7.825l5.6 5.6Z"/></svg>
        </button>
        <HamburgerMenu></HamburgerMenu>
      </div>
      <h1 class="title-page">เช็คบิล</h1>
      <div class="text-center m-4 text-xl">
        เลือกโต๊ะที่ต้องการเช็คบิล
      </div>
      <div class="flex flex-wrap">
        <div v-for="table in tables">
          <div v-if="table.status === 0">
          <div class="rounded m-2 text-center" @click="openTableDetailPopup(table)" id="table-list">
            <p class="font-bold">โต๊ะที่ {{ table.id }}</p>
            <p>จำนวนลูกค้า {{ table.size }} คน</p>
<!--            <p v-else class="bg-red-500 text-white text-center">ไม่ว่าง</p>-->
          </div>
          </div>
        </div>
      </div>

      <Popup :open="isTableDetailOpen">
        <template v-slot:header>
          โต๊ะที่ {{ this.selectedTable.id }}
        </template>

        <template v-slot:content>

          <div class="flex justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" height="48" width="48"><path d="M27 27q-2.5 0-4.25-1.75T21 21q0-2.5 1.75-4.25T27 15q2.5 0 4.25 1.75T33 21q0 2.5-1.75 4.25T27 27Zm-16 7q-1.25 0-2.125-.875T8 31V11q0-1.25.875-2.125T11 8h32q1.25 0 2.125.875T46 11v20q0 1.25-.875 2.125T43 34Zm5-3h22q0-2.1 1.45-3.55Q40.9 26 43 26V16q-2.1 0-3.55-1.45Q38 13.1 38 11H16q0 2.1-1.45 3.55Q13.1 16 11 16v10q2.1 0 3.55 1.45Q16 28.9 16 31Zm24 9H5q-1.25 0-2.125-.875T2 37V14h3v23h35Zm-29-9V11v20Z"/></svg>
          </div>
        </template>

        <template v-slot:footer>
          <button v-if="this.selectedTable.status === 1" data-modal-toggle="defaultModal" type="button" @click="openNumberPeopleInputPopup" v-bind:disabled="false" class="text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            เปิดโต๊ะ
          </button>
          <button v-if="this.selectedTable.status === 0" data-modal-toggle="defaultModal" type="button" @click="toCheckoutTable" v-bind:disabled="false" class="text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            เช็คบิล
          </button>
          <button data-modal-toggle="defaultModal" type="button" @click="closeTablePopup" class="text-blue-700 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-gray-50 dark:focus:ring-blue-800">
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
import HamburgerMenu from "@/components/HamburgerMenu.vue";

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
    Popup,
    HamburgerMenu
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
      this.error = ""
      try{
        this.updateTable({
          'property' : 'check-in',
          'number_people' : this.numberPeople,
          'id' : this.selectedTable.id
        })
      }
      catch (error) {
        this.error = error.message
        console.log(this.error)
      }
      this.closeNumberPeopleInputPopup()
      this.closeTablePopup()
      this.tables = this.table_store.getTables
    },
    async toCheckoutTable(){
      this.$router.push("/manager/billing/" + this.selectedTable.id)
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
      await this.customer_store.fetch()
      this.tables = this.table_store.getTables
      this.isTableDetailOpen = false
      this.isUpdatingTable = false
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