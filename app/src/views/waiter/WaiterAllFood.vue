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
      categories: ["ทั้งหมด", "เนื้อสัตว์", "ผัก", "ของทานเล่น","ของใกล้หมด"],
      selectedType: null,
      selectedFood:[],
      selectedTable: null,
      addQuantity: 1,
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
          case 'ของใกล้หมด':
            this.foods = this.food_store.getLowInStock
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

  <div class="pb-24">
    <div>
        <h1 class="text-3xl">
            เมนูอาหาร
        </h1>
    </div>
    <div>
        <nav class="mx-4">
            <button v-for="category in categories" class="mx-4 my-2 bg-gray-100 w-[100px] border border-2 rounded" @click="selectType(category)">
                {{category}}
            </button>
        </nav>
    </div>
    <div>
      <food-card v-for="food in foods" :key="food.id" :food="{...food}" :url="`foods/${food.id}`">
        <template #food_button>
          <div v-if="auth.role === 'Waiter'">
            <button @click="handleIncreaseOrder(food)"
                    class="py-2 px-6 rounded-full bg-blue-600 text-white mt-2 ">
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