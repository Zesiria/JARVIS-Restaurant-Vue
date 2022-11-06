<template>
  <div class="m-8">
    <div class="m-auto min-w-fit sm:w-2/3 lg:w-1/2">
      <div>
        <button onclick="history.back()">
          <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="m12 20-8-8 8-8 1.425 1.4-5.6 5.6H20v2H7.825l5.6 5.6Z"/></svg>
        </button>
      </div>
      <div class="title-page">
        รายการอาหารของ โต๊ะ: {{order.table_id}}
        <div>
          <div class="text-sm lg:text-lg">
            <div v-if="this.status === 'PENDING'" class="flex font-bold text-red-600 items-center" >
              <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M6.875 16.5h6.25V14q0-1.375-.896-2.365-.896-.989-2.229-.989-1.333 0-2.229.989-.896.99-.896 2.365ZM10 9.354q1.333 0 2.229-.989.896-.99.896-2.365V3.5h-6.25V6q0 1.375.896 2.365.896.989 2.229.989Zm-5.5 8.229V16.5h1.292V14q0-1.312.687-2.396.688-1.083 1.875-1.604-1.166-.521-1.864-1.604Q5.792 7.312 5.792 6V3.5H4.5V2.417h11V3.5h-1.292V6q0 1.312-.698 2.396-.698 1.083-1.864 1.604 1.187.521 1.875 1.604.687 1.084.687 2.396v2.5H15.5v1.083Z"/></svg>
              {{this.thaiStatus[order.status]}}
            </div>
            <div v-if="this.status === 'IN PROCESS'" class="flex font-bold text-yellow-400 items-center" >
              <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="M7.75 17v-2H2v-1.5h5.75q.604 0 1.052.448.448.448.448 1.052v2Zm3 0v-2q0-.604.438-1.052.437-.448 1.062-.448H18V15h-5.75v2ZM5.5 12.5q-1.062 0-1.781-.719Q3 11.062 3 10V7h14v3q0 1.062-.729 1.781-.729.719-1.771.719Zm0-1.5h9q.417 0 .708-.292.292-.291.292-.708V8.5h-11V10q0 .417.292.708.291.292.708.292ZM3 6V4.5h4.5v-.75q0-.292.208-.521Q7.917 3 8.229 3h3.542q.291 0 .51.229.219.229.219.521v.75H17V6Zm7 3.979Z"/></svg>
              {{this.thaiStatus[order.status]}}
            </div>

            <div v-if="this.status === 'COMPLETED'" class="flex font-bold text-green-500 items-center" >
              <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20"><path d="m6.104 14.146-3.542-3.542 1.063-1.062 2.479 2.479 1.063 1.062Zm4.25-.021-3.542-3.521 1.063-1.062 2.479 2.479 6-6.021 1.063 1.062Zm0-4.229L9.292 8.833 12.125 6l1.063 1.062Z"/></svg>
              {{this.thaiStatus[order.status]}}
            </div>
          </div>
        </div>
      </div>
      <div class="pb-24 ">
      <div id="flex-container" class="flex flex-wrap border-b-2 m-2 p-2 justify-between" v-for="food in foods">
        <div id="img-name" class="flex flex-wrap">
          <div class="flex border border-4 rounded">
            <img :src="food.img_path" alt="Food's Picture" class="w-[80px] h-[60px] rounded">
          </div>
          <div id="name" class="flex-wrap mt-3">
            <p class="text-2xl mx-4">{{food.name}}</p>
          </div>
        </div>
        <div id="quan" class=" pt-3">
          <p class="text-lg text-center md:text-right">จำนวน: {{ this.getOrderQuantity(food) }}</p>
        </div>
      </div>
      </div>
    </div>
    <div v-if="order.status === 'IN PROCESS' " class="fixed bottom-0 left-0 p-2 w-full bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-600">
      <div class="flex flex-col items-center">
        <button @click="handleServeOrder"
                class="flex py-2 px-6 rounded-full bg-blue-600 text-white mt-3 ">
          เสิร์ฟ
        </button>
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
    getOrderQuantity(inputFood){
      return this.order.food_list.filter(food => food.id == inputFood.food_id)[0].quantity
    }
  }
}
</script>



<style scoped>
@media (max-width: 640px) {

  #flex-container {
    flex-wrap: nowrap;
    flex-direction: column;
  }
  #img-name p{
    font-size: 20px;
    margin-left: 0;
  }
  #img-name img{
    width: 64px;
    height: 64px;
    overflow: hidden;
    text-align: center;
  }
  #quan p {
    font-size: 16px;
    text-align: center;
    justify-content: center;
    justify-items: center;
  }
}
</style>