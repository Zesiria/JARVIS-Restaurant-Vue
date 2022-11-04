<script>
import {useOrderStore} from "@/stores/order";
import {useAuthStore} from "@/stores/auth";
import FoodCard from "@/components/foods/FoodCard.vue";
import HamburgerMenu from "@/components/HamburgerMenu.vue";

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
    HamburgerMenu
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
  <div class="m-8">
    <div class="m-auto  lg:w-1/2">
      <div class="flex justify-between">
        <button onclick="history.back()">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m12 20-8-8 8-8 1.425 1.4-5.6 5.6H20v2H7.825l5.6 5.6Z"/></svg>
        </button>
        <HamburgerMenu></HamburgerMenu>
      </div>
      <div class="mt-6">
        <h1 class="title-page">
          รายการอาหาร
        </h1>
    <FoodCard v-for="foodOrder in foodOrders" :key="foodOrder.food.id" :food="foodOrder.food">
      <template v-slot:quantity_food_order>
        จำนวนที่สั่ง {{foodOrder.quantity}}
      </template>
    </FoodCard>
      </div>
    </div>
  </div>
<!--  {{foodOrders}}-->
</template>