<script>
import {ref} from "vue";
import Popup from "@/components/foods/Popup.vue"
import FoodCard from "@/components/foods/FoodCard.vue"
import { useFoodStore } from "@/stores/food"
import {useAuthStore} from "@/stores/auth";
import {useFoodOrderStore} from "@/stores/foodOrder";
import AlertSuccess from "@/components/foods/AlertSuccess.vue";

export default {
  setup() {
    const food_store = useFoodStore()
    const auth_store = useAuthStore()
    const food_order_store = useFoodOrderStore()
    return { food_store, auth_store, food_order_store}
  },
  components: {
    Popup,
    FoodCard,
    AlertSuccess,
  },
  data() {
    return {
      foods: [],
      categories: ["ทั้งหมด", "เนื้อสัตว์", "ผัก", "ของทานเล่น","ของใกล้หมด"],
      selectedType: null,
      selectedFood:[],
      addQuantity:0,
      isOpen: false,
      isAddingQuantity: false,
      auth: null,
      isFoodOrderOpen: false,
      isAddingQuantityOrder: false,
      foodOrders: [],
      alertOrderFoodSuccess: false,
    }
  }, async mounted() {
      await this.food_store.fetch()
      this.foods = this.food_store.getFoods
      this.isOpen = ref(false)
      if (this.auth_store.isAuthen) {
        this.auth = this.auth_store.getAuth
      } else {
        this.auth = null
      }
  }, methods: {
    selectType(type) {
      this.selectedType = type
      console.log(this.selectedType)
    },

    handleIncreaseForm(food) {
      this.addQuantity = 0
      this.selectedFood = food
      this.isOpen = true
    },
    handleSubmitForm(){
        this.isAddingQuantity = true;
        const food = this.selectedFood
        console.log(food)
        food.quantity = parseInt(this.addQuantity) + parseInt(food.quantity )
        this.food_store.addQuantity(food).then((res) => {
        console.log(res)
        this.isOpen = false
        this.isAddingQuantity = false;
      }).catch(error => {
        console.log(error)
        this.isAddingQuantity = false;
      })
    },
    handleIncreaseOrder(food){
      this.addQuantity = 1
      this.selectedFood = food
      this.isFoodOrderOpen = true
    },
    handleSubmitFoodOrder() {
      this.isAddingQuantityOrder = true
      const foodOrder = this.food_order_store.getFoodById(this.selectedFood.id)
      if(foodOrder.length === 1){
        this.food_order_store.addQuantityFoodOrder(this.selectedFood.id, this.addQuantity)
      }
      else if(foodOrder.length === 0){
        this.food_order_store.addFoodOrder(this.selectedFood, this.addQuantity)
      }
      else{
        console.log("getFoodById return foodOrder > 1")
      }
      this.isFoodOrderOpen = false
      this.isAddingQuantityOrder = false;
      this.alertOrderFoodSuccess = true;
      // console.log(this.foodOrders)
      setTimeout(() => {
        this.alertOrderFoodSuccess = false;
      }, 1200);
    },
    async close() {
      this.isOpen = false
      this.isFoodOrderOpen = false
    },
    async handleSubmitCheckOrder(){
      this.$router.push(`/order/food`)
    },
    handleNewFood() {
      this.$router.push(`/foods/new`)
    },
    handleSubmitHistoryOrder() {
      this.$router.push(`/order/view`)
    },
    }, watch: {
      async selectedType(newOption, oldOption) {
        await this.food_store.fetch()
        switch (newOption) {
          case 'เนื้อสัตว์':
            this.foods = this.food_store.getMeatFoods
            break
          case 'ผัก':
            this.foods = this.food_store.getVegetableFoods
            break
          case 'ของทานเล่น':
            this.foods = this.food_store.getAppertizerFoods
            break
          case 'ของใกล้หมด':
            this.foods = this.food_store.getLowInStock
            break
          default:
            this.foods = this.food_store.getFoods
            break
        }
      },
      auth_store: {
        immediate: true,
        deep: true,
        handler(newValue, oldValue) {
          console.log(newValue.getAuth)
          this.auth = this.auth_store.getAuth
        }
      },
      food_order_store: {
        immediate: true,
        deep: true,
        handler(newValue, oldValue) {
          // console.log(newValue.getFoodOrder)
          this.foodOrders = this.food_order_store.getFoodOrder
        }
      }
    }
}
</script>

<template>

<AlertSuccess :open="alertOrderFoodSuccess">
  <template v-slot:content>
    เพิ่มลงออเดอร์สำเร็จ
  </template>
</AlertSuccess>
<div class="m-8">
  <div class="m-auto  lg:w-1/2">
    <div class="mt-6">
        <h1 class="text-3xl">
            เมนูอาหาร
        </h1>
      <div class="menu">
        <div class=" flex gap-2 w-full lg:justify-center text-center bg-white overflow-auto whitespace-no-wrap py-3 px-4">
          <!--          hover:bg-blue-200 active:blue focus:outline-none  focus:bg-blue-200 focus:ring focus:ring-blue-500-->
          <button v-for="category in categories" id="button-category" @click="selectType(category)" class="items-center justify-center text-center bg-gray-100 w-[100px] border border-2 rounded-full shrink-0">
            {{category}}
            <p v-if="category===selectedType" class="min-w-fit border-blue-300 border-4 rounded-full"></p>
          </button>
        </div>
      </div>
    </div>
    
    <div>
      <food-card v-for="food in foods" :key="food.id" :food="{...food}" :url="`foods/${food.id}`">
        <template #food_button>
          <div v-if="auth.role === 'Manager'">
            <button @click="handleIncreaseForm(food)"
                    class="py-2 px-6 rounded-full bg-blue-600 text-white mt-2 ">
              เพิ่ม
            </button>
          </div>
          <div v-if="auth.role === 'customer'">
            <button @click="handleIncreaseOrder(food)"
                    class="py-2 px-6 rounded-full bg-blue-600 text-white mt-2 ">
              เพิ่มลงออเดอร์
            </button>
          </div>
        </template>
      </food-card>
      
      <!-- Popup -->
      <Popup :open="isOpen">
        <template v-slot:header>
          เพิ่มจำนวนอาหาร
        </template>

          <template v-slot:content>

            <div class="flex flex-row">
              <div class="basis-1/4"> ชื่อ </div>
              <div class="basis-3/4"> {{selectedFood.name}} </div>
            </div>

            <div class="flex flex-row">
              <div class="basis-1/4"> ประเภท </div>
              <div class="basis-3/4"> {{selectedFood.type}} </div>
            </div>

            <div class="flex flex-row">
              <div class="basis-1/4"> จำนวน </div>
              <form> </form>
              <div class="basis-3/4"> {{selectedFood.quantity}} </div>
            </div>
            <div>
              <div @submit.prevent="handleIncreaseForm">
                <div>
                  <label for="quantity" >จำนวนที่ต้องการเพิ่ม</label>
                  <input class="border-2 mx-1" type="quantity" v-model="addQuantity" required>
                </div>
              </div>
            </div>
          </template>

        <template v-slot:footer>
            <button data-modal-toggle="defaultModal" type="button" @click="handleSubmitForm" v-bind:disabled="isAddingQuantity" class="text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              ยืนยัน
            </button>
            <button data-modal-toggle="defaultModal" type="button" @click="close" class="text-blue-700 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-gray-50 dark:focus:ring-blue-800">
              ปิด
            </button>
          </template>
        </Popup>

      <!-- Popup Food Order -->
      <Popup :open="isFoodOrderOpen">
        <template v-slot:header>
          {{selectedFood.name}}
        </template>

        <template v-slot:content>
          <div class="flex flex-row h-8 w-44 rounded-lg mx-auto">
            <button class="w-10 rounded-l cursor-pointer outline-none border">
              <span class="m-auto text-2xl">−</span>
            </button>
            <input type="number" class="outline-none focus:outline-none text-center w-24 bg-gray-300 flex items-center mx-auto outline-none"
                   v-model="addQuantity" required>
            <button class="h-full w-10 rounded-r cursor-pointer border">
              <span class="m-auto text-2xl">+</span>
            </button>
          </div>
        </template>

        <template v-slot:footer>
          <button data-modal-toggle="defaultModal" type="button" @click="handleSubmitFoodOrder" v-bind:disabled="isAddingQuantityOrder"
                  class="text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            ยืนยัน
          </button>
          <button data-modal-toggle="defaultModal" type="button" @click="close"
                  class="text-blue-700 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-gray-50 dark:focus:ring-blue-800">
            ปิด
          </button>
        </template>
      </Popup>
    </div>
  </div>
  
  <div class="fixed bottom-0 left-0 p-4 w-full bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-600">
    <div v-if="auth.role === 'customer'" class="flex flex-col items-center">
      <div class="flex flex-row space-x-4">
        <button @click="handleSubmitHistoryOrder" class="bg-gray-200 px-4 py-2 rounded">
          ประวิติการสั่ง
        </button>
        <button @click="handleSubmitCheckOrder" class="bg-gray-200 px-4 py-2 rounded">
          ตรวจสอบรายการอาหาร
        </button>
      </div>

    </div>
    <div v-else class="flex flex-col items-center">
      <button @click="handleNewFood" class="bg-gray-200 px-4 py-2 rounded">
        เพิ่มเมนูอาหาร
      </button>
    </div>
  </div>
</div>
</template>

<style>
@media (max-width: 480px) {
  .menu {
    flex-wrap: nowrap;
    align-items: center;
    align-content: center;
    justify-content: center;
    justify-items: center;
  }
  .menu div {
    font-size: 12px;
  }
  .menu div button{
    padding: 2px;
    margin-left: 0px;
    border-radius: 10px;
    width: 75px;
  }
}

</style>