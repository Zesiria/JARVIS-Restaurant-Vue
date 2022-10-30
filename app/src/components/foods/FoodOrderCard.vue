<template>
  <div>
    <div class="flex flex-col md:flex-row  flex-wrap bg-green-200 border-2 border-black m-4 p-2 justify-between">
      <div class="text-xl">
        <p>โต๊ะ {{order.table_id}}</p>
        <p>รายการอาหาร {{order.quantity}}</p>
        <p>สถานะ: {{this.thaiStatus[order.status]}}</p>

      </div>
      <div class="flex md:block justify-center" v-if="order.status === 'PENDING'">
        <button @click="handleTakeOrder"
                class="py-2 px-6 rounded-full bg-blue-600 text-white mt-3 ">
          รับออเดอร์
        </button>
      </div>
      <div class="flex md:block justify-center" v-if="order.status === 'IN PROCESS' || order.status ===  'COMPLETED' ">
        <button @click="handleViewOrder"
                class="bg-white hover:bg-gray-100 text-gray-800 py-2 px-4 border border-gray-400 rounded shadow py-2 px-6 rounded-full bg-blue-600 mt-3 ">
          ดูรายการอาการ
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
      thaiStatus: {'PENDING': 'รอดำเนินการ', 'IN PROCESS': 'กำลังเตรียม', 'COMPLETED': 'เสร็จสิ้น'}
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
    },
    handleViewOrder(){
      this.error = ""
      console.log(this.order.order_id);
      this.$router.push(`/chef/kitchen/order/${this.order.order_id}`);
    },
  },
}
</script>