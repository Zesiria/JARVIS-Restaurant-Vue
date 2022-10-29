<script>
import FoodOrderCard from "@/components/foods/FoodOrderCard.vue"
import { useOrderStore} from "@/stores/order";
import {useFoodOrderStore} from "@/stores/foodOrder";
import {useAuthStore} from "@/stores/auth";
export default {
  setup(){
    const auth_store = useAuthStore()
    const order_store = useOrderStore()
    const food_order_store = useFoodOrderStore()
    return {order_store, food_order_store, auth_store}
  },
  components:{
    FoodOrderCard
  },
  data() {
    return {
      foodOrders:[],
      orders:[],

    }
  },
  async mounted() {
    await this.order_store.fetchOrdersToday()
    this.orders = this.order_store.getOrdersToday

  },
}
</script>

<template>
  <div class="m-8">
    <div class="m-auto min-w-fit sm:w-2/3 lg:w-1/2">
      <h1 class="text-3xl">ครัว</h1>
      <food-order-card v-for="order in orders " v-bind:order="order" :key="order.id" :order="{...order}" :url="`orders/${order.id}`" >
      </food-order-card>
    </div>

  </div>
</template>