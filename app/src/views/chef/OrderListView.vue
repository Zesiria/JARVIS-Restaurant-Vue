<template>
  <div class="m-8">
    <div class="m-auto min-w-fit sm:w-2/3 lg:w-1/2">
      <div>
        <button @click="handleBackPage">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m12 20-8-8 8-8 1.425 1.4-5.6 5.6H20v2H7.825l5.6 5.6Z"/></svg>
        </button>
      </div>
      <div id="button-dropdown" class="dropdown">
        <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M3 18v-2h18v2Zm0-5v-2h18v2Zm0-5V6h18v2Z"/></svg>          </button>
        <ul class="dropdown-menu">
          <RouterLink to="/chef/kitchen"><li><a class="dropdown-item" href="#">หน้าหลัก</a></li></RouterLink>
        </ul>
      </div>
      <div class="title-page">
        รายการอาหารของ โต๊ะ: {{order.table_id}}
        <p>สถานะ: {{this.thaiStatus[order.status]}}</p>
      </div>

      <div id="flex-container" class="flex flex-wrap border-b-2 m-4 p-2 justify-between" v-for="food in foods">
        <div id="img-name" class="flex flex-wrap">
          <div class="flex border border-2 rounded">
            <img :src="food.img_path" alt="Food's Picture" class="w-[80px] h-[60px] border-2 border border-black rounded">
          </div>
          <div id="name" class="flex-wrap mt-4">
            <p class="text-2xl mx-4">{{food.name}}</p>
          </div>
        </div>
        <div id="quan" class=" pt-4">
          <p class="text-lg text-right">จำนวน: {{food.quantity}}</p>
        </div>
      </div>
      <div v-if="order.status === 'IN PROCESS' " class="fixed bottom-0 left-0 p-4 w-full bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-600">
        <div class="flex flex-col items-center">
          <button @click="handleServeOrder"
                  class="flex py-2 px-6 rounded-full bg-blue-600 text-white mt-3 ">
            เสิร์ฟ
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {useAuthStore} from "@/stores/auth";
import {useOrderStore} from "@/stores/order";
import {useFoodOrderStore} from "@/stores/foodOrder";
import {useFoodStore} from "@/stores/food";

export default {
  setup(){
    const auth_store = useAuthStore()
    const order_store = useOrderStore()
    const food_store = useFoodStore()
    const food_order_store = useFoodOrderStore()

    return {auth_store, order_store, food_store, food_order_store}
  },
  data() {
    return {
      orderID : null,
      order : Object,
      foods : [],
      thaiStatus: {'PENDING': 'รอดำเนินการ', 'IN PROCESS': 'กำลังเตรียม', 'COMPLETED': 'เสร็จสิ้น'}
      // status: this.order.status,
      // isUpdatingOrder: false,
    }
  },
  async mounted(){
    // await this.order_store.fetch()
  },
  async created() {
    await this.order_store.fetchWithId(this.$route.params.orderId)
    await this.food_store.fetch()
    this.orderID = this.$route.params.orderId
    this.order = this.order_store.getOrder
    let foodsId = this.order.food_list.map(food => food.food_id);
    this.foods = this.food_store.getFoods
        .filter(food => foodsId.indexOf(food.id) > -1)
    console.log(this.foods)

    this.status = this.order.status
    isUpdatingOrder: false,
    console.log(this.status)
  },
  methods:{
    handleServeOrder(){
      this.error = ""
      try {
        this.updateOrderStatus({
          'id' : this.order.order_id,
          'status' : 'serve'
        })

      }catch (error){
        this.error = error.message
        console.log(this.error)
      }
      console.log(this.order.order_id);
      this.$router.push(`/chef/kitchen`);
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
    handleBackPage(){
      console.log(this.order.order_id);
      this.$router.push(`/chef/kitchen`);
    }
  }
}
</script>


