<script>
import {useOrderStore} from "@/stores/order";
import {useAuthStore} from "@/stores/auth";
import FoodCard from "@/components/foods/FoodCard.vue";

export default {
  setup() {
    const order_store = useOrderStore()
    const auth_store = useAuthStore()
    return {order_store, auth_store}
  },
  data() {
    return {
      foodOrders: [],
      auth: null,
    }
  },
  components: {
    FoodCard,
  },
  async mounted() {
    if (this.auth_store.isAuthen) {
      this.auth = this.auth_store.getAuth
      await this.order_store.fetchOrdersCustomer(this.auth.customer_id)
      let order = this.order_store.getOrderById(parseInt(this.$route.params.order_id))
      this.foodOrders = order[0].food_list
    } else {
      this.auth = null
      this.foodOrders = []
    }

  }
}

</script>

<template>
    <FoodCard v-for="foodOrder in foodOrders" :key="foodOrder.food.id" :food="foodOrder.food">
      <template v-slot:quantity_food_order>
        จำนวนที่สั่ง {{foodOrder.quantity}}
      </template>
    </FoodCard>
<!--  {{foodOrders}}-->
</template>