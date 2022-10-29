<template>
  <div class="m-8">
    <div class="m-auto min-w-fit sm:w-2/3 lg:w-1/2">
      <h1 class="text-3xl">
        รายการอาหารของ โต๊ะ: {{order.table_id}}
      </h1>
      <div id="flex-container" class="flex flex-wrap border-b-2 m-4 p-2 justify-between" v-for="food in foods">
        <div id="img-name" class="flex flex-wrap">
          <div class="flex border border-2 rounded">
            <img src="{{food.image}}" alt="Food's Picture" class="w-[80px] h-[60px] border-2 border border-black rounded">
          </div>
          <div id="name" class="flex-wrap mt-4">
            <p class="text-2xl mx-4">{{food.name}}</p>
          </div>
        </div>
        <div id="quan" class=" p-2">
          <p class="text-lg text-right">จำนวน : {{food.quantity}}</p>
        </div>
      </div>
      <div class="fixed bottom-0 left-0 p-4 w-full bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-600">
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
    }
  }
}
</script>


