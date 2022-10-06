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
      categories: ["ทั้งหมด", "เนื้อสัตว์", "ผัก", "ของทานเล่น"],
      selectedType: null,
      showFoods: null,
      selectedFood:[],
      addQuantity:0,
      isOpen: false
    }
  }, async mounted() {
      await this.food_store.fetch()
      this.foods = this.food_store.getFoods
      this.showFoods = this.foods
      this.isOpen = ref(false)
  }, methods: {
    selectType(type) {
      this.selectedType = type
      console.log(this.selectedType)
    },
    lowInStock() {
      this.showFoods = this.foods.filter(food => food.quantity <= 10)
      console.log(this.error)
    },
    handleIncreaseForm(food) {
      this.addQuantity = 0
      this.selectedFood = food
      this.isOpen = true
    },
    handleSubmitForm(){
      const url = `/foods/`.concat(this.selectedFood.id)
      console.log(this.addQuantity)

      this.$axios.put(url,{quantity:parseInt(this.addQuantity) + parseInt(this.selectedFood.quantity ) }).then((res) => {
        console.log(res);
        this.selectedFood.quantity = parseInt(this.addQuantity) + parseInt(this.selectedFood.quantity)
        this.isOpen = false
      }).catch(error => {
        console.log(error)
      })
    },
    async close() {
      this.isOpen = false
    }
    }, watch: {
      selectedType(newOption, oldOption) {
        switch (newOption) {
          case 'เนื้อสัตว์':
            this.showFoods = this.foods.filter(food => food.type === "เนื้อสัตว์")
            break
          case 'ผัก':
            this.showFoods = this.foods.filter(food => food.type === "ผัก")
            break
          case 'ของทานเล่น':
            this.showFoods = this.foods.filter(food => food.type === "ของทานเล่น")
            break
          default:
            this.showFoods = this.foods
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
          <button class="mx-4 my-2 bg-gray-100 w-[130px] border border-2 rounded" @click="lowInStock()">
            วัตถุดิบที่ใกล้หมด
          </button>
        </nav>
    </div>
    <div>
        <div v-for="food in showFoods" :key="food.id">
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

                <button @click="handleIncreaseForm"
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
                <button type="button" @click="handleSubmitForm"
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