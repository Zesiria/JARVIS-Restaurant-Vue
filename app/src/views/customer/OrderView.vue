<script>
import {useOrderStore} from "@/stores/order";
import {useAuthStore} from "@/stores/auth";
import OrderCard from "@/components/foods/OrderCard.vue";
import {useCounterStore} from "@/stores/counter";

export default {
  setup() {
    const order_store = useOrderStore()
    const auth_store = useAuthStore()
    const counter_store = useCounterStore()
    return {order_store, auth_store, counter_store}
  },
  data() {
    return {
      orders: null,
      auth: null,
      index: 0,
    }
  },
  components: {
    OrderCard,
  },
  async mounted() {
    this.index = this.counter_store.getCounter
    if (this.auth_store.isAuthen) {
      this.auth = this.auth_store.getAuth
    } else {
      this.auth = null
    }
    if(this.auth != null){
      await this.order_store.fetchOrdersCustomer(this.auth.customer_id)
      this.orders = this.order_store.getOrders
    }
    else {
      this.orders = null
    }
    // console.log(this.orders[0].order_id)
  },
  methods :{
    handleSelectOrder(order){
      this.$router.push('/order/'.concat(order.order_id))
    }
  }
}
</script>

<template>

  <OrderCard v-for="order in orders" :key="order.order_id" :index="orders.indexOf(order) + 1"
             :order="{...order}" @click="handleSelectOrder(order)">

  </OrderCard>
</template>