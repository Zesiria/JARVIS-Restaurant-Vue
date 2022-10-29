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
      orders: null,
      auth: null,
    }
  },
  components: {

  },
  async mounted() {
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
  }
}
</script>

<template>
  <div>
    order
  </div>
  {{orders}}
</template>