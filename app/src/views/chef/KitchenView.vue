<script>
import FoodOrderCard from "@/components/foods/FoodOrderCard.vue"
import { useOrderStore} from "@/stores/order";
import {useFoodOrderStore} from "@/stores/foodOrder";
import {useAuthStore} from "@/stores/auth";

export default {
  setup() {
    const auth_store = useAuthStore()
    const order_store = useOrderStore()
    const food_order_store = useFoodOrderStore()
    return {order_store, food_order_store, auth_store}
  },
  components: {
    FoodOrderCard
  },
  data() {
    return {
      foodOrders: [],
      orders: [],
      categories: ["ทั้งหมด", "รอดำเนินการ", "กำลังเตรียม", "เสร็จสิ้น"],
      selectedType: null,
      auth: null,
      loading: false,
    }
  },
  async mounted() {
    await this.order_store.fetchOrdersToday()
    this.orders = this.order_store.getOrdersToday
    console.log(this.orders)
    if (this.auth_store.isAuthen) {
      this.auth = this.auth_store.getAuth
    } else {
      this.auth = null
    }
  },
  methods: {
    selectType(status) {
      this.selectedType = status
      console.log(this.selectedType)
    },
  },
  watch: {
    async selectedType(newOption, oldOption) {
      this.loading = true
      await this.order_store.fetchOrdersToday()
      switch (newOption) {
        case 'ทั้งหมด':
          this.orders = this.order_store.getOrdersToday
          this.loading = false
          break
        case 'รอดำเนินการ':
          this.orders = this.order_store.getPendingFoods
          this.loading = false
          break
        case 'กำลังเตรียม':
          this.orders = this.order_store.getInProcessFoods
          this.loading = false
          break
        case 'เสร็จสิ้น':
          this.orders = this.order_store.getCompletedFoods
          this.loading = false
          break
        default:
          this.orders =this.order_store.getOrdersToday
          this.loading = false
          break
      }
      console.log(this.orders);
    }
  },
  auth_store: {
    immediate: true,
    deep: true,
    handler(newValue, oldValue) {
      console.log(newValue.getAuth)
      this.auth = this.auth_store.getAuth
    }
  }
}
</script>

<template>
    <div class="m-8">
      <div class="m-auto lg:w-1/2">
        <div id="button-dropdown" class="dropdown">
          <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M3 18v-2h18v2Zm0-5v-2h18v2Zm0-5V6h18v2Z"/></svg>          </button>
          <ul class="dropdown-menu">
            <RouterLink to="/chef/kitchen"><li><a class="dropdown-item" href="#">หน้าหลัก</a></li></RouterLink>
            <RouterLink to="/users/change-password"><li><a class="dropdown-item" href="#">เปลี่ยนรหัสผ่าน</a></li></RouterLink>
          </ul>
        </div>
        <div >
          <h1 class="title-page">ครัว</h1>
        </div>
        <div class="menu">
          <div class=" flex gap-2 w-full lg:justify-center text-center bg-white overflow-auto whitespace-no-wrap py-3 px-4">
            <button v-for="category in categories" id="button-category" @click="selectType(category)" class="items-center justify-center text-center bg-gray-100 w-[100px] border border-2 rounded-full shrink-0">
              {{category}}
              <p v-if="category===selectedType" class="bg-blue-300  border-blue-300 border-4 rounded-sm"></p>
            </button>
          </div>
        </div>

        <div v-show="loading" role="status" class="max-w-sm animate-pulse ml-6 mt-4">
          <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
          <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
          <span class="sr-only">Loading...</span>

          <!--        <div class="mt-4">-->
          <!--          <img src="https://media.tenor.com/KEzW7ALwfUAAAAAC/cat-what.gif">-->
          <!--        </div>-->
        </div>

        <food-order-card v-show="!loading" v-for="order in orders " v-bind:order="order" :key="order.order_id" :order="{...order}" :url="`orders/${order.id}`" >
        </food-order-card>
      </div>
    </div>
</template>