<script>
import {ref} from "vue";
import Popup from "@/components/foods/Popup.vue"
import { useFoodStore } from "@/stores/food";

export default {
  setup() {
    const food_store = useFoodStore()
    return { food_store }
  },
  components: {
    Popup
  },
  data() {
    return {
      foods: [],
      categories: ["ทั้งหมด", "เนื้อสัตว์", "ผัก", "ของทานเล่น","ของใกล้หมด"],
      selectedType: null,
      selectedFood:[],
      addQuantity:0,
      isOpen: false,
      isAddingQuantity: false
    }
  }, async mounted() {
      await this.food_store.fetch()
      this.foods = this.food_store.getFoods
      this.isOpen = ref(false)
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
        <div v-for="food in foods" :key="food.id">
            <div class="flex flex-wrap bg-gray-200 m-4 p-2 justify-between">
              <div class="flex flex-wrap">
                <div class="flex border border-2 rounded">
                  <img src="{{food.image}}" alt="Food's Picture" class="w-[120px] h-[100px] border-2 border border-black rounded">
                </div>
                <div class="flex-wrap mt-4">
                  <p class="text-2xl mx-4">{{food.name}}</p>
                </div>
              </div>

              <div class=" p-2">
                <p class="text-lg">เหลือ : {{food.quantity}}</p>

                <button @click="handleIncreaseForm(food)"
                        class="py-2 px-6 rounded-full bg-blue-600 text-white mt-2 ">
                  เพิ่ม
                </button>
              </div>

            </div>
        </div>
      <!-- Popup -->
      <Popup :open="isOpen">
        <template v-slot:content>
          <div class="text-center font-bold mb-2">
            <h2> เพิ่มจำนวนอาหาร </h2>
          </div>

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
              <div class="flex flex-row float-right space-x-2 p-5">
                <button type="button" @click="close"
                        class="py-2 px-6 rounded-xl bg-yellow-300 text-white mt-2">
                  ปิด
                </button>
                <button type="button" @click="handleSubmitForm" v-bind:disabled="isAddingQuantity"
                        class="py-2 px-6 rounded-xl bg-green-500 text-white mt-2">
                  ยืนยัน
                </button>

              </div>
            </div>
          </div>
        </template>
      </Popup>
    </div>
</template>