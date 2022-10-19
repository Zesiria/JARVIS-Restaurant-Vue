<script>
import {useFoodOrderStore} from "@/stores/foodOrder";

export default {
  setup(){
    const food_order_store = useFoodOrderStore()
    return {food_order_store}
  },
  data() {
    return{
      orderQuantity: this.foodOrder.orderQuantity,
    }

  },
  props: {
    foodOrder: Object,

  },
  methods :{
    async handleUpdateOrderQuantity(){
      await this.food_order_store.updateQuantityFoodOrder(this.foodOrder.food.id, this.orderQuantity)
    }
  }
}
</script>

<template>
  <div class="flex flex-row h-8 w-44 rounded-lg mx-auto">
    <button class="w-10 rounded-l cursor-pointer outline-none border">
      <span class="m-auto text-2xl">−</span>
    </button>
    <input type="number" class="outline-none focus:outline-none text-center w-24 bg-gray-300 flex items-center mx-auto outline-none"
           v-model="orderQuantity" required @change="handleUpdateOrderQuantity">
    <button class="h-full w-10 rounded-r cursor-pointer border">
      <span class="m-auto text-2xl">+</span>
    </button>
  </div>
</template>