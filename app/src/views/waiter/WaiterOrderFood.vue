<script>
import FoodCard from "@/components/foods/FoodCard.vue"
import {useFoodOrderStore} from "@/stores/foodOrder";
import PlusMinusButtonCard from "@/components/foods/PlusMinusButtonCard.vue";
import {useOrderStore} from "@/stores/order";
import {useAuthStore} from "@/stores/auth";
import { useTableStore } from "@/stores/table";

export default {
  setup() {
    const food_order_store = useFoodOrderStore()
    const order_store = useOrderStore()
    const auth_store = useAuthStore()
    const table_store = useTableStore()
    return {food_order_store, order_store, auth_store, table_store}
  },
  data (){
    return{
      foodOrders: null,
      error: "",
      auth: null,
      tables: [],
      table_id: null,
      customer_id: null
    }
  },
  components: {
    FoodCard,
    PlusMinusButtonCard
  },
  async mounted() {
    await this.food_order_store.fetch()
    await this.table_store.fetch()
    this.table_id = localStorage.getItem('selectTableID')
    this.tables = this.table_store.getTables.filter(table => table.status === 0)
    this.foodOrders = this.food_order_store.getFoodOrders
    this.auth = this.auth_store.getAuth
  },
  methods: {
    async handleSubmitOrder(){
      this.newOrder()
      this.$router.push(`/waiter/foods`)
    },
    async newOrder() {
      this.error = ""
      await this.food_order_store.fetch()
      if (this.food_order_store.getFoodOrders === null || this.food_order_store.getFoodOrders.length === 0){
        this.$router.push(`/foods`)
        return
      }
      try{
        this.customer_id = this.table_store.getTables.filter(table => table.id === parseInt(this.table_id))[0].customer_id
        this.order_store.add({
          'customer_id': this.customer_id,
          'foodOrders': this.food_order_store.getFoodOrders
        }).then(res => {
          console.log(res)
          this.food_order_store.removeFoodOrder()
        })
      } catch (error) {
        this.error = error.message
        console.log(this.error)
      }
      localStorage.removeItem('selectTableID')
    },
    handleIncreaseFoodOrder() {
      this.$router.push(`/waiter/foods`)
    },
    async deleteFoodOrder(foodOrderID) {
      await this.food_order_store.deleteFoodOrder(foodOrderID)
    }
  }, watch:{
    food_order_store: {
      immediate: true,
      deep: true,
      async handler(newValue, oldValue) {
        this.foodOrders = this.food_order_store.getFoodOrders
      }
    },
  }
}
</script>

<template>
    <div class="pb-24">
    <food-card v-for="foodOrder in foodOrders" :key="foodOrder.food.id" :food="{...foodOrder.food}" :url="`foods/${foodOrder.food.id}`">
      <template #food_button>
        <div class="flex flex-col space-y-2">
          <plus-minus-button-card :key="foodOrder.food.id" :foodOrder="{...foodOrder}"></plus-minus-button-card>
          <button class="text-red-600" @click="deleteFoodOrder(foodOrder.food.id)"> ลบ </button>
        </div>
      </template>
    </food-card>
  </div>
  
  <div class="fixed bottom-0 left-0 p-4 w-full bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-600">
    <div class="flex flex-warp items-center justify-center">
      <div class="flex-warp flex mx-4">
        <p class="mt-3 mx-5">โต๊ะที่ต้องการสั่งให้โต๊ะที่</p>
        <select v-model="table_id">
          <option disabled value="">Please select one</option>
          <option v-for="table in tables" :key="table.id" :table="{...table}">{{ table.id }}</option>
        </select>
      </div>
      <div class="flex space-x-4 mx-4">
        <button @click="handleIncreaseFoodOrder" class="bg-gray-200 px-4 py-2 rounded">
          ย้อนกลับ
        </button>
        <button @click="handleSubmitOrder" class="bg-gray-200 px-4 py-2 rounded">
          สั่งอาหาร
        </button>
      </div>
    </div>
  </div>
</template>

