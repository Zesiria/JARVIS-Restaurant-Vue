<script>
import { useFoodStore } from "@/stores/food"
import FoodList from "@/components/foods/FoodList.vue";

export default {
  setup() {
    const food_store = useFoodStore()
    return {food_store}
  },
  components: {
    FoodList,
  },
  data() {
    return {
      foods: [],
      meat: [],
      vegetable: [],
      appertizer: [],
    }
  },
  async mounted() {
    await this.food_store.fetch()
    this.foods = this.food_store.getFoods
    this.meat = this.food_store.getMeatFoods
    this.vegetable = this.food_store.getVegetableFoods
    this.appertizer = this.food_store.getAppertizerFoods
  },
}
</script>

<template>
  <div class="p-2 justify-between">
    <div class="p-5 m-4 text-center">
      <h1 class="text-5xl ">Welcome!!</h1>
      <h1 class=""> JARVIS RESTAURANT</h1>
    </div>
  </div>
<div>
    <div class="">
      <div class="w-full text-xl text-white bg-blue-800 rounded px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800  ">
        เมนูอาหาร
      </div>
      <a class="text-center font-bold inline-block p-2 w-full bg-gray-100 text-blue-700 border-b-4 border-gray-300">
        เนื้อสัตว์
      </a>
      <div class="flex gap-3 w-full bg-white overflow-auto whitespace-no-wrap py-3 px-4">
        <div class="flex">
            <FoodList v-for="food in meat" :key="food.id" :food="{...food}" :url="`foods/${food.id}`">
            </FoodList>
        </div>
      </div>

      <a class="text-center font-bold inline-block p-2 w-full bg-gray-100 text-blue-700 border-b-4 border-gray-300">
        ผัก
      </a>
      <div class="flex gap-3 w-full bg-white overflow-auto whitespace-no-wrap py-3 px-4">
        <div class="flex">
          <FoodList v-for="food in vegetable" :key="food.id" :food="{...food}" :url="`foods/${food.id}`">
          </FoodList>
        </div>
      </div>

      <a class="text-center font-bold inline-block p-2 w-full bg-gray-100 text-blue-700 border-b-4 border-gray-300">
        ของทานเล่น
      </a>
      <div class="flex gap-3 w-full bg-white overflow-auto whitespace-no-wrap py-3 px-4">
        <div class="flex">
          <FoodList v-for="food in vegetable" :key="food.id" :food="{...food}" :url="`foods/${food.id}`">
          </FoodList>
        </div>
      </div>
    </div>
    </div>
<div class="">
  <div class="w-full text-xl text-white bg-blue-800 rounded px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800  ">
    รีวิวจากลูกค้า
  </div>
  <div class="flex mt-3 justify-center content-center">
    <a class="block p-6 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md  dark:border-gray-700 ">
      <h1 class="mb-2 font-bold tracking-tight text-gray-900 dark:text-white">วันที่ 26/10/2022 เวลา 12.00</h1>
      <p class="font-normal text-gray-700 dark:text-gray-400">อาหารอร่อยมาก คุ้มค้ากับราคา พนักงานน่ารัก </p>
    </a>
  </div>
</div>
</template>