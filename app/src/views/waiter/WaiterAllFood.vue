<script>
import {ref} from "vue";
import Popup from "@/components/foods/Popup.vue"
import FoodCard from "@/components/foods/FoodCard.vue"
import AlertSuccess from "@/components/foods/AlertSuccess.vue"
import { useFoodStore } from "@/stores/food"
import {useAuthStore} from "@/stores/auth";
import {useFoodOrderStore} from "@/stores/foodOrder";
import { useTableStore } from "@/stores/table"

export default {
  setup() {
    const food_store = useFoodStore()
    const auth_store = useAuthStore()
    const food_order_store = useFoodOrderStore()
    const table_store = useTableStore()
    return { food_store, auth_store, food_order_store, table_store}
  },
  components: {
    Popup,
    FoodCard,
    AlertSuccess
  },
  data() {
    return {
      foods: [],
      categories: ["ทั้งหมด", "เนื้อสัตว์", "ผัก", "ของทานเล่น"],
      selectedType: null,
      selectedFood:[],
      selectedTable: null,
      orderQuantity: 1,
      auth: null,
      isFoodOrderOpen: false,
      isAddingQuantityOrder: false,
      foodOrders: [],
      tables: [],
      alertOrderFoodSuccess: false,
    }
  }, async mounted() {
      await this.food_store.fetch()
      await this.table_store.fetch()
      this.foods = this.food_store.getFoods
      this.tables = this.table_store.getTables.filter(table => table.status === 0)
      if (this.auth_store.isAuthen) {
        this.auth = this.auth_store.getAuth
      } else {
        this.auth = null
      }
      this.selectedTable = localStorage.getItem('selectTableID')
  }, methods: {
    selectType(type) {
      this.selectedType = type
      console.log(this.selectedType)
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
      setTimeout(() => {
        this.alertOrderFoodSuccess = false;
      }, 1200);
    },
    async close() {
      this.isFoodOrderOpen = false
    },
    async handleSubmitCheckOrder(){
      localStorage.setItem("selectTableID", this.selectedTable);
      this.$router.push(`/waiter/order`)
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
          default:
            this.foods = this.foods
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
    <div class="m-auto min-w-fit sm:w-2/3 lg:w-1/2">
      <div class="pb-24">
        <div id="button-dropdown" class="dropdown">
          <button class="btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" height="24" width="24"><path d="M3 18v-2h18v2Zm0-5v-2h18v2Zm0-5V6h18v2Z"/></svg>          </button>
          <ul class="dropdown-menu">
            <RouterLink to="/waiter/foods"><li><a class="dropdown-item">เมนูอาหาร</a></li></RouterLink>
            <RouterLink to="/users/change-password"><li><a class="dropdown-item" href="#">เปลี่ยนรหัสผ่าน</a></li></RouterLink>
          </ul>
        </div>
        <div>
          <h1 class="title-page">
              เมนูอาหาร
          </h1>
        </div>

        <div>
          <div class="menu">
            <div class=" flex gap-2 w-full text-center bg-white overflow-auto whitespace-no-wrap py-3 px-4">
              <!--          hover:bg-blue-200 active:blue focus:outline-none  focus:bg-blue-200 focus:ring focus:ring-blue-500-->
              <button v-for="category in categories" id="button-category" @click="selectType(category)" class="items-center justify-center text-center bg-gray-100 w-[100px] border border-2 rounded-full shrink-0">
                {{category}}
                <p v-if="category===selectedType" class="bg-blue-300  border-blue-300 border-4 rounded-sm"></p>
              </button>
            </div>
          </div>
        </div>
      </div>
    <div>
      <food-card v-for="food in foods" :key="food.id" :food="{...food}" :url="`foods/${food.id}`">
        <template #food_button>
          <div v-if="auth.role === 'Waiter'">
            <button @click="handleIncreaseOrder(food)"
                    class="py-2 px-6 rounded-lg bg-blue-600 text-white mt-2 ">
              เพิ่มลงออเดอร์
            </button>
          </div>
        </template>
      </food-card>

          <!-- Popup Food Order -->
          <Popup :open="isFoodOrderOpen">
            <template v-slot:header>
              {{selectedFood.name}}
            </template>

            <template v-slot:content>
              <div class="flex flex-row h-8 w-44 rounded-lg mx-auto">
                <button class="w-10 rounded-l cursor-pointer outline-none border" v-on:click="this.decrementQuantity">
                  <span class="m-auto text-2xl">−</span>
                </button>
                <input type="number" class="outline-none focus:outline-none text-center w-24 bg-gray-300 flex items-center mx-auto outline-none"
                       v-model="orderQuantity" required>
                <button class="h-full w-10 rounded-r cursor-pointer border" v-on:click="this.incrementQuantity">
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
  </div>
  
  <div class="fixed bottom-0 left-0 p-4 w-full bg-white border-t border-gray-200 dark:bg-gray-800 dark:border-gray-600">
    <div class="flex flex-warp items-center justify-center">
      <div class="flex-warp flex mx-4">
        <p class="mt-3 mx-5">โต๊ะที่ต้องการสั่งให้โต๊ะที่</p>
        <select v-model="selectedTable">
          <option disabled value="">Please select one</option>
          <option v-for="table in tables" :key="table.id" :table="{...table}">{{ table.id }}</option>
        </select>
      </div>
      <button @click="handleSubmitCheckOrder" class="bg-gray-200 px-4 py-2 rounded mx-4">
        ตรวจสอบรายการอาหาร
      </button>
    </div>  
  </div>
</template>

<style>
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
</style>