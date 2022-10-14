<script>
import {ref} from "vue";
import Popup from "@/components/foods/Popup.vue"
import FoodCard from "@/components/foods/FoodCard.vue"
import { useFoodStore } from "@/stores/food"
import {useAuthStore} from "@/stores/auth";

export default {
  setup() {
    const food_store = useFoodStore()
    const auth_store = useAuthStore()
    return { food_store, auth_store }
  },
  components: {
    Popup,
    FoodCard
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
      auth: null
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
    async close() {
      this.isOpen = false
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
      }
    }
}
</script>

<template>
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
          <div v-if="auth.role === 'user'">
            <button @click="handleIncreaseForm(food)"
                    class="py-2 px-6 rounded-full bg-blue-600 text-white mt-2 ">
              เพิ่ม
            </button>
          </div>
          <div v-if="auth.role === 'customer'">
            <button class="py-2 px-6 rounded-full bg-blue-600 text-white mt-2 ">
              สั่ง
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
    </div>
</template>