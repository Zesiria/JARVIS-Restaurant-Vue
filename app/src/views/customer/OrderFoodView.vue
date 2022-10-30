<script>
import FoodCard from "@/components/foods/FoodCard.vue"
import {useFoodOrderStore} from "@/stores/foodOrder";
import PlusMinusButtonCard from "@/components/foods/PlusMinusButtonCard.vue";
import {useOrderStore} from "@/stores/order";
import {useAuthStore} from "@/stores/auth";

export default {
  setup() {
    const food_order_store = useFoodOrderStore()
    const order_store = useOrderStore()
    const auth_store = useAuthStore()
    return {food_order_store, order_store, auth_store}
  },
  data (){
    return{
      foodOrders: null,
      error: "",
      auth: null,
    }
  },
  components: {
    FoodCard,
    PlusMinusButtonCard,
  },
  async mounted() {
    await this.food_order_store.fetch()
    this.foodOrders = this.food_order_store.getFoodOrders
    this.auth = this.auth_store.getAuth
    // console.log(this.auth.customer_id)
  },
  methods: {
    async handleSubmitOrder(){
      await this.newOrder()
      this.$router.push('/order/view')
    },
    async newOrder() {
      await this.food_order_store.fetch()
      if (this.food_order_store.getFoodOrders === null || this.food_order_store.getFoodOrders.length === 0){
        this.$router.push(`/foods`)
        return
      }
      this.error = ""
      try{
        this.order_store.add({
          'customer_id': this.auth.customer_id,
          'foodOrders': this.food_order_store.getFoodOrders
        }).then(res => {
          console.log(res.order_id)
          this.food_order_store.removeFoodOrder()
        })
      } catch (error) {
        this.error = error.message
        console.log(this.error)
      }
    },
    handleIncreaseFoodOrder() {
      this.$router.push(`/foods`)
    },
    async deleteFoodOrder(foodOrderID) {
      await this.food_order_store.deleteFoodOrder(foodOrderID)
    },
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
        <div @click="deleteFoodOrder(foodOrder.food.id)" class="flex flex-col space-y-2">
          <plus-minus-button-card :key="foodOrder.food.id" :foodOrder="{...foodOrder}"></plus-minus-button-card>
          <button class="text-red-600 "> ลบ </button>
        </div>
      </template>
    </food-card>
  </div>
  
  <div class="fixed bottom-0 left-0 p-4 w-full bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-600">
    <div class="flex flex-col items-center">
      <div class="flex space-x-4">
        <button @click="handleSubmitOrder" class="bg-gray-200 px-4 py-2 rounded">
          สั่งอาหาร
        </button>
        <button @click="handleIncreaseFoodOrder" class="bg-gray-200 px-4 py-2 rounded">
          ย้อนกลับ
        </button>
      </div>
    </div>
  </div>
</template>

