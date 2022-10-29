<script>
import {useOrderStore} from "@/stores/order";
import {useAuthStore} from "@/stores/auth";

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
  async mounted() {
    if (this.auth_store.isAuthen) {
      this.auth = this.auth_store.getAuth
      await this.order_store.fetchOrdersCustomer(this.auth.customer_id)
      this.foodOrders = this.order_store.getOrderById(parseInt(this.$route.params.order_id))
    } else {
      this.auth = null
      this.foodOrders = []
    }

  }
}

</script>

<template>
  {{foodOrders}}
</template>