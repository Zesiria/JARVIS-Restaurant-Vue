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
    },
    handleIncreaseQuantity(){
      console.log(this.foodOrder)
      if(this.orderQuantity >= this.foodOrder.food.quantity){
        this.orderQuantity = this.foodOrder.food.quantity
      }
      else{
        this.orderQuantity = this.orderQuantity + 1
      }
      this.handleUpdateOrderQuantity()
    },
    handleDecreaseQuantity(){
      if(this.orderQuantity-1 <= 1) {
        this.orderQuantity = 1
      }
      else {
        this.orderQuantity = this.orderQuantity - 1
      }
      this.handleUpdateOrderQuantity()
    }
  }
}
</script>

<template>
  <div class="flex flex-row h-8 w-44 rounded-lg mx-auto">
    <button @click="handleDecreaseQuantity" class="w-10 rounded-l cursor-pointer outline-none border">
      <span class="m-auto text-2xl">−</span>
    </button>
    <input type="number" class="outline-none focus:outline-none text-center w-24 bg-gray-300 flex items-center mx-auto outline-none"
           v-model="orderQuantity" required @change="handleUpdateOrderQuantity">
    <button @click="handleIncreaseQuantity" class="h-full w-10 rounded-r cursor-pointer border">
      <span class="m-auto text-2xl">+</span>
    </button>
  </div>
</template>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>