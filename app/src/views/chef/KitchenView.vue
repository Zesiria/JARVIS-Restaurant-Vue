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
      categories: ["รอดำเนินการ", "กำลังเตรียม", "เสร็จสิ้น"],
      selectedType: null,
    }
  },
  async mounted() {
    await this.order_store.fetchOrdersToday()
    this.orders = this.order_store.getOrdersToday
    this.order = this.order_store.getOrder
    this.status = this.order.status

  },
  methods: {
    selectType(status) {
      this.selectedType = status
      console.log(this.selectedType)
    },
  },
  watch: {
    async selectedType(newOption, oldOption) {
      await this.order_store.fetch()
      switch (newOption) {
        case 'รอดำเนินการ':
          this.order = this.order_store.getPendingFoods
          break
        case 'กำลังเตรียม':
          this.order = this.order_store.getInProcessFoods
          break
        case 'เสร็จสิ้น':
          this.order = this.order_store.getCompletedFoods
          break
        default:

          break
      }
    }
  }
}
</script>

<template>
  <div class="m-8">
    <div class="m-auto min-w-fit sm:w-2/3 lg:w-1/2">
      <h1 class="text-3xl">ครัว</h1>

      <div class="menu">
        <div class="text-center">
          <!--          hover:bg-blue-200 active:blue focus:outline-none  focus:bg-blue-200 focus:ring focus:ring-blue-500-->
          <button v-for="category in categories" id="button-category" @click="selectedType(category)" class="items-center justify-center text-center mx-2 my-2 bg-gray-100 w-[100px] border border-2 rounded-full">
            {{category}}rer
            <p v-if="category===selectedStatus" class="min-w-fit border-blue-300 border-4 rounded-full"></p>
          </button>
        </div>
      </div>

      <food-order-card v-for="order in orders " v-bind:order="order" :key="order.id" :order="{...order}" :url="`orders/${order.id}`" >
      </food-order-card>
    </div>

  </div>
</template>