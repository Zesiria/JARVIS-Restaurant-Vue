<template>

  <div class="m-8">
    <div class="m-auto min-w-fit sm:w-2/3 lg:w-1/2">
      <div class="flex justify-between">
        <button onclick="history.back()">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m12 20-8-8 8-8 1.425 1.4-5.6 5.6H20v2H7.825l5.6 5.6Z"/></svg>
        </button>
        <HamburgerMenu></HamburgerMenu>
      </div>
      <h1 class="title-page">โต๊ะที่ {{ this.$route.params.tableId }}</h1>

    <div>
      <p class="fw-bold pt-lg-0 pt-4 pb-2 pl-3">ค่าใช้จ่ายทั้งหมด</p>
    </div>
    <div v-if="this.bill == null">
        <div class="text-center">
            <div role="status">
                <svg class="inline mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                </svg>
                <span class="sr-only">Loading...</span>
            </div>
        </div>
    </div>
    <div v-else>
      <div class="col payment-summary justify-center">
        <div class="card px-md-3 px-2 pt-4">
          <div class="unregistered mb-4"> <span class="py-1 fw-bold">ค่าบุฟเฟ่ต์</span> </div>
          <div class="d-flex flex-column b-bottom">
            <div class="d-flex justify-content-between pb-3"> <h1 class="text-muted">จำนวนลูกค้า {{this.bill.number_people}}  ท่าน</h1>
              <p class="fw-bold">{{this.bill.buffet_price }} บาท</p>
            </div>
            <div class="d-flex justify-content-between pb-3"> <h1 class="text-muted">เครื่องดื่มรีฟิล</h1>
              <p class="fw-bold">{{this.bill.beverage_price }} บาท</p>
            </div>
            <div class="d-flex justify-content-between pb-3"> <h1 class="text-muted">เซอร์วิซชาร์จ</h1>
              <p class="fw-bold">{{this.bill.service_charge_price }} บาท</p>
            </div>

            <div class="d-flex justify-content-between"> <h1 class="fw-bold">รวมทั้งสิ้น</h1>
              <p class="fw-bold">{{ this.bill.total_price }} บาท</p>
            </div>
          </div>
          <div class="d-flex justify-content-between b-bottom pt-4">

            <div @click="handleBack" class="btn btn-secondary">ย้อนกลับ</div>
            <div @click="checkoutTable" class="btn btn-success">ปิดโต๊ะ</div>
          </div>
          <div class=" my-3 text-center"> -- ราคาอาหารรวมภาษีมูลค่าเพิ่มแล้ว -- </div>
        </div>
      </div>
    </div>
    </div>
  </div>

</template>

<script>
import { useAuthStore } from "@/stores/auth.js"
import { useTableStore} from '@/stores/table.js'
import { useCustomerStore} from '@/stores/customer.js'
import { useReportStore } from '@/stores/report.js'
import HamburgerMenu from "@/components/HamburgerMenu.vue";

export default {
    setup() {
        const auth_store = useAuthStore()
        const table_store = useTableStore()
        const customer_store = useCustomerStore()
        const report_store = useReportStore()
        return { auth_store,table_store,customer_store,report_store }
    },
    data (){
        return {
            table : null,
            error : null,
            bill : null,
            isUpdatingTable : false,
            loaded : false
        }
    },
    async created(){
        await this.table_store.fetch()
        this.table = this.table_store.getTableById(parseInt(this.$route.params.tableId))
        await this.report_store.fetchBillFrom(this.table.id)
        this.bill = this.report_store.getBill
    },
    methods:{
        async checkoutTable(){
          this.updateTable({
            'property' : 'check-out',
            'id' : this.table.id,
          })
        },
        async updateTable(table){
            this.error = ""
            this.isUpdatingTable = true
            try{
              await this.table_store.update(table)
              this.handleBack()
            } catch (error) {
              this.error = error.message
              console.log(this.error)
            }
        },
        async handleBack(){
            this.$router.back()
        }
    },
  components:{
      HamburgerMenu
  }
}
</script>