<script>
import {ref} from "vue";
import Popup from "@/components/foods/Popup.vue"
import FoodCard from "@/components/foods/FoodCard.vue"
import { useFoodStore } from "@/stores/food"
import {useAuthStore} from "@/stores/auth";
import {useFoodOrderStore} from "@/stores/foodOrder";
import AlertSuccess from "@/components/foods/AlertSuccess.vue";
import HamburgerMenu from "@/components/HamburgerMenu.vue";
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
    HamburgerMenu
  },
  data() {
    return {
      foods: [],
      categories: ["ทั้งหมด", "เนื้อสัตว์", "ผัก", "ของทานเล่น","ของใกล้หมด"],
      selectedType: null,
      selectedFood:[],
      addQuantity:1,
      orderQuantity:1,
      isOpen: false,
      isAddingQuantity: false,
      auth: null,
      isFoodOrderOpen: false,
      isAddingQuantityOrder: false,
      foodOrders: [],
      alertOrderFoodSuccess: false,
      loading: false,
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
    async handleSubmitForm(){
        this.isAddingQuantity = true;
        const food = {
          id : this.selectedFood.id,
          addQuantity : this.addQuantity
        }
        console.log(food, this.selectedFood)
        await this.food_store.addQuantity(food).then((res) => {
        console.log(res)
        this.isOpen = false
        this.isAddingQuantity = false;
      }).catch(error => {
        console.log(error)
        this.isAddingQuantity = false;
      })
      await this.food_store.fetch()
      this.foods = this.food_store.getFoods
    },
    handleIncreaseOrder(food){
      this.orderQuantity = 1
      this.selectedFood = food
      this.isFoodOrderOpen = true
    },
    handleSubmitFoodOrder() {
      this.isAddingQuantityOrder = true
      const foodOrder = this.food_order_store.getFoodById(this.selectedFood.id)
      if(foodOrder.length === 1){
        this.food_order_store.addQuantityFoodOrder(this.selectedFood.id, this.orderQuantity)
      }
      else if(foodOrder.length === 0){
        this.food_order_store.addFoodOrder(this.selectedFood, this.orderQuantity)
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
    incrementQuantity(){
      this.orderQuantity++
    },
    decrementQuantity(){
      if(this.orderQuantity > 1){
        this.orderQuantity--
      }
    }
    }, watch: {
      async selectedType(newOption, oldOption) {
        this.loading = true
        await this.food_store.fetch()
        switch (newOption) {
          case 'เนื้อสัตว์':
            this.foods = this.food_store.getMeatFoods
            this.loading = false
            break
          case 'ผัก':
            this.foods = this.food_store.getVegetableFoods
            this.loading = false
            break
          case 'ของทานเล่น':
            this.foods = this.food_store.getAppertizerFoods
            this.loading = false
            break
          case 'ของใกล้หมด':
            this.foods = this.food_store.getLowInStock
            this.loading = false
            break
          default:
            this.foods = this.food_store.getFoods
            this.loading = false
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
      },
      orderQuantity(newOption, oldOption){
        if(newOption <= 0){
          this.orderQuantity = 1
        }
        if(newOption > this.selectedFood.quantity){
          this.orderQuantity = this.selectedFood.quantity
        }
      },
      addQuantity(newOption, oldOption){
        if(newOption <= 0){
          this.addQuantity = 1
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
  <div class="m-auto  lg:w-1/2 pb-24">
    <div class="mt-6">
      <HamburgerMenu></HamburgerMenu>
        <h1 class="title-page">
            เมนูอาหาร
        </h1>
      <div class="menu">
        <div class=" flex gap-2 w-full lg:justify-center text-center bg-white overflow-auto whitespace-no-wrap py-3 px-4">
          <button v-for="category in categories" id="button-category" @click="selectType(category)" class="items-center justify-center text-center bg-gray-100 w-[100px] border border-2 rounded-full shrink-0">
            {{category}}
            <p v-if="category===selectedType" class="bg-blue-300  border-blue-300 border-4 rounded-sm"></p>
          </button>
        </div>
      </div>
    </div>
    
    <div>

      <div v-show="loading" role="status" class="max-w-sm animate-pulse ml-6 mt-4">
        <div class="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
        <div class="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
        <span class="sr-only">Loading...</span>

<!--        <div class="mt-4">-->
<!--          <img src="https://media.tenor.com/KEzW7ALwfUAAAAAC/cat-what.gif">-->
<!--        </div>-->

      </div>

      <food-card v-show="!loading" v-for="food in foods" :key="food.id" :food="{...food}" :url="`foods/${food.id}`">
          <template #food_button>
            <div v-if="auth && auth.role === 'Manager'">
              <button @click="handleIncreaseForm(food)"
                      class="py-2 px-6 rounded-lg bg-blue-600 text-white mt-2 ">
                เพิ่ม
              </button>
            </div>
            <div v-if="auth && auth.role === 'customer' && food.quantity > 0">
              <button @click="handleIncreaseOrder(food)"
                      class="py-2 px-6 rounded-lg bg-blue-600 text-white mt-2 ">
                เพิ่มลงออเดอร์
              </button>
            </div>
            <div v-if="food.quantity <= 0" class="text-red-600 text-lg mt-2">
              หมด
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
                    <input type="number" class="border-2 mx-1" v-model="addQuantity" required>
                  </div>
                </div>
              </div>
            </template>

          <template v-slot:footer>
              <button data-modal-toggle="defaultModal" type="button" @click="handleSubmitForm" v-bind:disabled="isAddingQuantity" class="text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                ยืนยัน
              </button>
              <button data-modal-toggle="defaultModal" type="button" @click="close" class="w-1/2 text-blue-700 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-white dark:hover:bg-gray-50 dark:focus:ring-blue-800">
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
              <button class="w-10 rounded-l cursor-pointer outline-none border" v-on:click="this.decrementQuantity()">
                <span class="m-auto text-2xl">−</span>
              </button>
              <input type="number" class="outline-none focus:outline-none text-center w-24 bg-gray-300 flex items-center mx-auto outline-none"
                     v-model="orderQuantity" required>
              <button class="h-full w-10 rounded-r cursor-pointer border" v-on:click="this.incrementQuantity()">
                <span class="m-auto text-2xl">+</span>
              </button>
            </div>
          </template>

          <template v-slot:footer>
            <button data-modal-toggle="defaultModal" type="button" @click="handleSubmitFoodOrder" v-bind:disabled="isAddingQuantityOrder"
                    class="text-white bg-blue-700 border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              ยืนยัน
            </button>
            <button data-modal-toggle="defaultModal" type="button" @click="close"
                    class="text-blue-700 bg-white border border-gray-300 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center dark:bg-white dark:hover:bg-gray-50 dark:focus:ring-blue-800">
              ปิด
            </button>
          </template>
        </Popup>
      </div>
    </div>

    <div class="fixed bottom-0 left-0 p-3 w-full bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-600">
      <div v-if="auth.role === 'customer'" class="flex flex-col items-center">
        <div class="flex flex-row space-x-4">
          <button @click="handleSubmitHistoryOrder" class="bg-gray-200 px-2 py-2 rounded">
            ประวิติการสั่ง
          </button>
          <button @click="handleSubmitCheckOrder" class="text-white bg-blue-700 px-2 py-2 rounded">
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

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>