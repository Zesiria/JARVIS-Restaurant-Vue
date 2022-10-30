<script>
import FoodCard from "@/components/foods/FoodCard.vue"
import {useFoodOrderStore} from "@/stores/foodOrder";
import PlusMinusButtonCard from "@/components/foods/PlusMinusButtonCard.vue";
import {useOrderStore} from "@/stores/order";
import {useAuthStore} from "@/stores/auth";
import Popup from "@/components/foods/Popup.vue";
import {ref} from "vue";

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
      orderId: null,
      popupOpen: false,
      orderFoodSuccess: false,
    }
  },
  components: {
    FoodCard,
    PlusMinusButtonCard,
    Popup,
  },
  async mounted() {
    await this.food_order_store.fetch()
    this.foodOrders = this.food_order_store.getFoodOrders
    this.auth = this.auth_store.getAuth
    // console.log(this.auth.customer_id)
  },
  methods: {
    async handleSubmitOrder(){
      this.popupOpen = true
      await this.newOrder()
      this.orderFoodSuccess = true
      // this.$router.push('/order/'.concat(this.orderId))
    },
    async newOrder() {
      await this.food_order_store.fetch()
      if (this.food_order_store.getFoodOrders === null || this.food_order_store.getFoodOrders.length === 0){
        this.$router.push(`/foods`)
        return
      }
      this.error = ""
      try{
        const response = await this.order_store.add({
          'customer_id': this.auth.customer_id,
          'foodOrders': this.food_order_store.getFoodOrders
        })
        // console.log(response)
        this.orderId = response.order_id
        this.food_order_store.removeFoodOrder()
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
    handleBackToHomePage() {
      this.$router.push(`/foods`)
    },
    handleGoToHistoryOrder() {
      this.$router.push(`/order/`.concat(this.orderId))
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

<!--  Popup-->
  <Popup :open="popupOpen">
    <template v-slot:header>
      สั่งอาหาร
    </template>

    <template v-slot:content>
      <div class="text-center" v-if="orderFoodSuccess === false">
        <div role="status">
          <svg class="inline m-6 w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
          </svg>
          <span class="sr-only">Loading...</span>
        </div>
      </div>
      <transition name="fade scale-in">
        <div class="text-center" v-if="orderFoodSuccess">
          <div class="inline-flex flex-shrink-0 justify-center items-center w-20 h-20 text-green-500 bg-green-100 rounded-full dark:bg-green-800 dark:text-green-200 m-6">
            <svg aria-hidden="true" class="w-10 h-10" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"></path>
            </svg>
            <span class="sr-only">Check icon</span>
          </div>
        </div>
      </transition>


    </template>

    <template v-slot:footer>
      <button data-modal-toggle="defaultModal" type="button" @click="handleGoToHistoryOrder" class="text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        ประวัติการสั่ง
      </button>
      <button data-modal-toggle="defaultModal" type="button" @click="handleBackToHomePage" class="text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
        หน้าหลัก
      </button>
    </template>
  </Popup>
</template>

<style>

.fade-enter-from,
fade-leave-to{
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active{
  transition: 0.2s;
}

.scale-in-enter-active,
.scale-in-leave-active{
  transition: all 0.2s ease-out;
}

.scale-in-enter-from,
.scale-in-leave-to {
  opacity: 0;
  transform: scale(0.5) ;
}
</style>