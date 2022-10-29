<template>
  <div>
    <div class="flex flex-wrap bg-green-200 border-2 border-black m-4 p-2 justify-between">
      <div class="text-2xl">
        <p >โต๊ะ {{order.table_id}}</p>
        <p>รายการอาหาร {{order.quantity}}</p>
      </div>
      <div v-bind:order="order.order_id">
        <button @click="handleTakeOrder"
                class="flex py-2 px-6 rounded-full bg-blue-600 text-white mt-3 ">
          รับออเดอร์
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import {useOrderStore} from "@/stores/order";

export default {
  setup(){
    const order_store = useOrderStore()
    return { order_store}
  },
  data(){
    return{
      status: this.order.status,
      isUpdatingOrder: false,
    }
  },
  props: {
    order: Object,
    url: {
      type: String,
      default: ''
    }
  },
  async mounted(){
    await this.order_store.fetch()

  },
  methods:{
    handleTakeOrder(){
      this.error = ""
      try {
        this.updateOrderStatus({
          'id' : this.order.order_id,
          'status' : 'accept'
        })
      }catch (error){
        this.error = error.message
        console.log(this.error)
      }
      console.log(this.order.order_id);
      this.$router.push(`/chef/kitchen/order/${this.order.order_id}`);
    },
    updateOrderStatus(status){
      this.error = ""
      this.isUpdatingOrder = true
      try{
        this.order_store.update(status)
      } catch (error){
        this.error = error.message
        console.log(this.error)
      }
      this.order_store.fetch()
      this.status = this.order_store.getAll
    }
  },
}
</script>