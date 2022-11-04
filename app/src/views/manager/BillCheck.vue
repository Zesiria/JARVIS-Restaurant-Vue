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
          <button class="rounded m-2 text-center"  @click="toCheckoutTable(table)"  v-bind:disabled="false" id="table-list">
            <p class="font-bold">โต๊ะที่ {{ table.id }}</p>
            <p>จำนวนลูกค้า {{ table.size }} คน</p>
          </button>
          </div>
        </div>
      </div>

      <Popup :open="isTableDetailOpen">
        <template v-slot:header>
          โต๊ะที่ {{ this.selectedTable.id }}
        </template>
      </Popup>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from "@/stores/auth.js"
import { useTableStore} from '@/stores/table.js'
import { useCustomerStore} from '@/stores/customer.js'
import Popup from "@/components/foods/Popup.vue"
import HamburgerMenu from "@/components/HamburgerMenu.vue";
import {ref} from "vue";

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
      isAddTablePopupOpen: false,
      isTableDetailOpen: false,
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
    this.isTableDetailOpen = ref(false)
    this.tables = this.table_store.getTables
  },
  methods:{
    openTableDetailPopup(table){
      this.selectedTable = table
      if(this.selectedTable.status === 0)
        this.customer = this.customer_store.getByID(this.selectedTable.customer_id)
      console.log(this.selectedTable)
      this.isTableDetailOpen = true;
    },
    async toCheckoutTable(table){
      this.selectedTable = table
      if(this.selectedTable.status === 0)
        this.customer = this.customer_store.getByID(this.selectedTable.customer_id)
      console.log(this.selectedTable)
      this.isTableDetailOpen = true;
      this.$router.push("/manager/billing/" + this.selectedTable.id)
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