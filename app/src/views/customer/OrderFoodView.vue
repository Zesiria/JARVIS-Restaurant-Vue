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
    PlusMinusButtonCard
  },
  async mounted() {
    await this.food_order_store.fetch()
    this.foodOrders = this.food_order_store.getFoodOrders
    this.auth = this.auth_store.getAuth
    // console.log(this.auth.customer_id)
  },
  methods: {
    async handleSubmitOrder(){
      this.newOrder()
      this.$router.push(`/foods`)
    },
    newOrder() {
      this.error = ""
      try{
        this.order_store.add({
          'customer_id': this.auth.customer_id
        }).then(res => {
          console.log("orderId : " . res)
          this.postFoodOrder(res)
        })
      } catch (error) {
        this.error = error.message
        console.log(this.error)
      }
    },
    postFoodOrder(order_id) {
      this.error = ""
      try {
        this.food_order_store.add(order_id)
      } catch (error) {
        this.error = error.message
        console.log(this.error)
      }
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
  <div>
    <button @click="handleSubmitOrder">
      สั่งอาหาร
    </button>
  </div>
  <food-card v-for="foodOrder in foodOrders" :key="foodOrder.food.id" :food="{...foodOrder.food}" :url="`foods/${foodOrder.food.id}`">
    <template #food_button>
      <plus-minus-button-card :key="foodOrder.food.id" :foodOrder="{...foodOrder}"></plus-minus-button-card>
    </template>
  </food-card>
</template>

